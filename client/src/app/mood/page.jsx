"use client";
import { useRef, useState, useEffect } from 'react';
import Webcam from "react-webcam";
import { Camera, CameraOff, Sparkles } from 'lucide-react';

const moods = [
  { id: 'happy', label: 'Happy', emoji: '😊', color: 'from-emerald-400 to-teal-500' },
  { id: 'neutral', label: 'Neutral', emoji: '😐', color: 'from-amber-400 to-orange-500' },
  { id: 'sad', label: 'Sad', emoji: '😢', color: 'from-rose-400 to-pink-500' },
  { id: 'surprise', label: 'Surprised', emoji: '😲', color: 'from-cyan-400 to-blue-500' },
  { id: 'fear', label: 'Fear', emoji: '😨', color: 'from-indigo-400 to-purple-500' },
  { id: 'disgust', label: 'Disgust', emoji: '🤢', color: 'from-lime-400 to-green-500' },
  { id: 'anger', label: 'Angry', emoji: '😠', color: 'from-red-400 to-rose-500' }
];

const getApiBase = () => {
  const raw = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
  const trimmed = raw.replace(/\/+$/, '');
  return trimmed.endsWith('/api') ? trimmed : `${trimmed}/api`;
};

const MoodTracker = () => {
  const webcamRef = useRef(null);
  const [selectedMood, setSelectedMood] = useState(null);
  const [loading, setLoading] = useState(false);
  const [confidence, setConfidence] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [suggestion, setSuggestion] = useState(null);
  const [webcamReady, setWebcamReady] = useState(false);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [suggestionLoading, setSuggestionLoading] = useState(false);
  const API_BASE_URL = getApiBase();

  const captureAndPredict = async () => {
    if (!webcamRef.current || !webcamReady) {
      console.error('Webcam not ready');
      setCameraError('Webcam is not ready. Please try again.');
      setWebcamReady(false);
      return;
    }

    try {
      const imageSrc = webcamRef.current.getScreenshot();
      if (!imageSrc) {
        console.error('Failed to capture image');
        return;
      }

      setLoading(true);
      const blob = await (await fetch(imageSrc)).blob();
      const formData = new FormData();
      formData.append("image", blob, "frame.jpg");

      const res = await fetch(`${API_BASE_URL}/detect-emotion`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success && data.emotion) {
        const mood = moods.find((m) => m.id === data.emotion);
        if (mood) {
          setSelectedMood(mood);
          setConfidence(data.confidence);
          fetchSuggestion(mood.id);
          setCameraActive(false);
        }
      }
    } catch (err) {
      console.error("Prediction error:", err);
      setCameraError("Failed to analyze emotion. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let interval;
    if (cameraActive && webcamReady) {
      interval = setInterval(() => {
        captureAndPredict();
      }, 3000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [cameraActive, webcamReady]);

  const fetchSuggestion = async (moodId, previousSuggestion = null) => {
    try {
      setSuggestionLoading(true);
      const res = await fetch(`${API_BASE_URL}/mood-suggestion`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mood: moodId, previousSuggestion }),
      });

      const data = await res.json();
      if (data.success) {
        setSuggestion(data.suggestion);
        setShowSuggestion(true);
      }
    } catch (err) {
      console.error("Suggestion fetch failed:", err);
    } finally {
      setSuggestionLoading(false);
    }
  };

  const handleStartCamera = async () => {
    try {
      setCameraError(null);
      setWebcamReady(false);
      
      // Request camera permissions first
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      
      // Stop the stream as we'll let react-webcam handle it
      stream.getTracks().forEach(track => track.stop());
      
      // Only activate camera after permissions are granted
      setCameraActive(true);
    } catch (err) {
      console.error('Camera access error:', err);
      setCameraError('Could not access camera. Please check your permissions and try again.');
      setCameraActive(false);
      setWebcamReady(false);
    }
  };

  const handleCloseCamera = () => {
    setCameraActive(false);
    setWebcamReady(false);
  };

  const handleUserMedia = (stream) => {
    if (stream) {
      setWebcamReady(true);
      setCameraError(null);
    } else {
      setWebcamReady(false);
      setCameraError('Failed to initialize webcam. Please try again.');
    }
  };

  const handleUserMediaError = (err) => {
    console.error('Error accessing webcam:', err);
    setCameraError('Could not access webcam. Please check permissions and try again.');
    setCameraActive(false);
    setWebcamReady(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent">
          Mood Tracker
        </h1>
        
        <div className="bg-gray-800/50 rounded-xl p-6 mb-8">
          {cameraActive ? (
            <div className="flex flex-col items-center justify-center">
              {cameraError ? (
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg w-full aspect-video flex items-center justify-center text-red-500 p-4">
                  {cameraError}
                </div>
              ) : (
                <div className="relative w-full flex justify-center">
                  <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    className="rounded-lg w-full h-auto max-h-[60vh] object-cover"
                    videoConstraints={{
                      facingMode: 'user',
                      width: { ideal: 1280 },
                      height: { ideal: 720 },
                      aspectRatio: 16/9
                    }}
                    onUserMedia={handleUserMedia}
                    onUserMediaError={handleUserMediaError}
                    forceScreenshotSourceSize={true}
                    minScreenshotWidth={1280}
                    minScreenshotHeight={720}
                    screenshotQuality={0.8}
                  />
                  {!webcamReady && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                    </div>
                  )}
                </div>
              )}
              {loading && <p className="mt-4 text-gray-400 animate-pulse">Analyzing your mood...</p>}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-500 p-12 border-2 border-dashed border-gray-700 rounded-lg">
              <Camera size={64} className="mb-4"/>
              <p className="text-lg mb-4">Camera is off</p>
              <p className="text-sm text-gray-600 text-center">
                Turn on the camera to analyze your mood. We'll detect your emotion and suggest something nice for you!
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          {!cameraActive ? (
            <button
              onClick={handleStartCamera}
              className="group inline-flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-purple-600 to-teal-600 text-white rounded-xl hover:from-purple-500 hover:to-teal-500 transition-all duration-300 transform hover:scale-105 shadow-xl font-semibold"
              disabled={loading}
            >
              <Camera className="w-5 h-5" />
              {loading ? 'Starting Camera...' : 'Start Camera'}
            </button>
          ) : (
            <button
              onClick={handleCloseCamera}
              className="group inline-flex items-center gap-3 px-8 py-3 bg-gray-800/50 backdrop-blur-sm text-gray-300 rounded-xl hover:bg-red-700/50 hover:text-red-300 transition-all duration-300 border border-gray-700 hover:border-red-600/50"
              disabled={loading}
            >
              <CameraOff className="w-5 h-5" />
              Close Camera
            </button>
          )}
        </div>

        {selectedMood && (
          <div className={`p-6 rounded-xl text-center bg-gradient-to-br ${selectedMood.color} shadow-lg max-w-sm mx-auto mb-8 transition-all duration-500`}>
            <p className="text-3xl font-semibold mb-2">
              {selectedMood.emoji} {selectedMood.label}
            </p>
            {confidence !== null && (
              <p className="text-sm text-white/80">
                Confidence: {(confidence * 100).toFixed(2)}%
              </p>
            )}
          </div>
        )}

        {showSuggestion && suggestion && (
          <div className="mt-6 bg-gray-800/50 p-6 rounded-lg shadow-lg max-w-md mx-auto text-left backdrop-blur-sm">
            <h3 className="text-xl font-semibold text-white mb-2">Here's something you can try:</h3>
            <p className="text-lg text-teal-300 mb-4">{suggestion.activity}</p>
            {suggestion.link && (
              <a
                href={suggestion.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg shadow transition-colors"
              >
                Try It Now
              </a>
            )}
            <div className="mt-6 flex gap-3">
              <button
                className="px-4 py-2 bg-green-700 hover:bg-green-800 text-white rounded transition-colors flex-1"
                onClick={() => alert("Awesome! Hope it helps 😊")}
              >
                I'm Interested
              </button>
              <button
                className="px-4 py-2 bg-red-700 hover:bg-red-800 text-white rounded transition-colors flex-1"
                onClick={() => fetchSuggestion(selectedMood.id, suggestion.activity)}
                disabled={suggestionLoading}
              >
                {suggestionLoading ? 'Loading...' : 'Not Interested'}
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-4">
              ⚠️ These suggestions are not medical advice. If you're feeling distressed, please talk to a mental health professional. You're not alone 💙
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoodTracker;
