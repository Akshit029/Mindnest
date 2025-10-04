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
const API_BASE_URL = getApiBase();

const MoodTracker = () => {
  const webcamRef = useRef(null);
  const [selectedMood, setSelectedMood] = useState(null);
  const [loading, setLoading] = useState(false);
  const [confidence, setConfidence] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
    const [cameraError, setCameraError] = useState(null);
  const [suggestion, setSuggestion] = useState(null);
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [suggestionLoading, setSuggestionLoading] = useState(false);

  const captureAndPredict = async () => {
    if (!webcamRef.current) return;

    const imageSrc = webcamRef.current.getScreenshot();

    if (!imageSrc) return;

    try {
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
          setCameraActive(false); // Turn off camera after detection
        }
      }
    } catch (err) {
      console.error("Prediction error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let interval;

    if (cameraActive) {
      interval = setInterval(() => {
        captureAndPredict();
      }, 3000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [cameraActive]);

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

  const handleUserMediaError = (err) => {
    console.error("Webcam error:", err);
    setCameraError("Camera access was denied or not available.");
  };

  const handleStartCamera = () => {
    setCameraError(null);
    setCameraActive(true);
  };

  const handleCloseCamera = () => {
    setCameraActive(false);
    setSelectedMood(null);
    setConfidence(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <div className="relative w-full max-w-4xl text-center bg-gradient-to-br from-purple-900/50 via-gray-900 to-teal-900/50 py-12 sm:py-20 px-6 md:px-12 rounded-3xl border border-gray-700/50 shadow-2xl">
        
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-purple-800/30 backdrop-blur-sm rounded-full border border-purple-700/30">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span className="text-sm text-purple-300">Real-Time Emotion Analysis</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 bg-gradient-to-r from-purple-400 via-teal-400 to-purple-400 bg-clip-text text-transparent leading-tight">
          Mood Detector
        </h1>
        <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">Let our AI analyze your expression to detect your current mood.</p>

        <div className="h-96 flex flex-col items-center justify-center">
          {cameraError && (
            <div className="text-red-400 mb-4 p-4 bg-red-900/50 rounded-lg">
              <p>{cameraError}</p>
              <p className="text-sm text-red-300/80">Please allow camera access in your browser settings.</p>
            </div>
          )}

          {cameraActive ? (
            <div className="flex flex-col items-center justify-center">
              <Webcam
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                onUserMediaError={handleUserMediaError}
                className="rounded-lg border-2 border-gray-700 mb-4 shadow-lg transform scale-x-[-1]"
                videoConstraints={{
                  width: 480,
                  height: 360,
                  facingMode: "user",
                }}
              />
              {loading && <p className="mb-2 text-gray-400 animate-pulse">Analyzing...</p>}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-500">
              <Camera size={64} className="mb-4"/>
              <p>Camera is off</p>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          {!cameraActive ? (
            <button
              onClick={handleStartCamera}
              className="group inline-flex items-center gap-3 px-8 py-3 bg-gradient-to-r from-purple-600 to-teal-600 text-white rounded-xl hover:from-purple-500 hover:to-teal-500 transition-all duration-300 transform hover:scale-105 shadow-xl font-semibold"
            >
              <Camera className="w-5 h-5" />
              Start Camera
            </button>
          ) : (
            <button
              onClick={handleCloseCamera}
              className="group inline-flex items-center gap-3 px-8 py-3 bg-gray-800/50 backdrop-blur-sm text-gray-300 rounded-xl hover:bg-red-700/50 hover:text-red-300 transition-all duration-300 border border-gray-700 hover:border-red-600/50"
            >
              <CameraOff className="w-5 h-5" />
              Close Camera
            </button>
          )}
        </div>

        {selectedMood && (
          <div className={`p-6 rounded-xl text-center bg-gradient-to-br ${selectedMood.color} shadow-lg max-w-sm mx-auto`}>
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
          <div className="mt-6 bg-gray-800/50 p-6 rounded-lg shadow-lg max-w-md mx-auto text-left">
            <h3 className="text-xl font-semibold text-white mb-2">Here's something you can try:</h3>
            <p className="text-lg text-teal-300 mb-2">{suggestion.activity}</p>
            {suggestion.link && (
              <a
                href={suggestion.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg shadow"
              >
                Try It Now
              </a>
            )}
            <div className="mt-4 flex gap-3">
              <button
                className="px-4 py-2 bg-green-700 hover:bg-green-800 text-white rounded"
                onClick={() => alert("Awesome! Hope it helps 😊")}
              >
                I'm Interested
              </button>
              <button
                className="px-4 py-2 bg-red-700 hover:bg-red-800 text-white rounded"
                onClick={() => fetchSuggestion(selectedMood.id, suggestion.activity)} // 👈 Retry
              >
                Not Interested
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
