import sys
import cv2
import numpy as np
import requests
from deepface import DeepFace
import warnings
import os

# Suppress TensorFlow logging and other warnings
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
warnings.filterwarnings('ignore', category=UserWarning, module='tensorflow')
warnings.filterwarnings('ignore', category=FutureWarning, module='tensorflow')

# Function to detect emotion from an image URL
def detect_emotion_from_url(image_url):
    try:
        # Download the image from the URL
        response = requests.get(image_url)
        response.raise_for_status()  # Raise an exception for bad status codes

        # Convert the image content to a numpy array
        image_array = np.frombuffer(response.content, np.uint8)
        
        # Decode the image array into an image that OpenCV can use
        img = cv2.imdecode(image_array, cv2.IMREAD_COLOR)

        if img is None:
            # print("Failed to decode image from URL.", file=sys.stderr)
            return None, 0.0

        # DeepFace.analyze can take a numpy array (the image) directly
        analysis = DeepFace.analyze(
            img_path=img, 
            actions=['emotion'], 
            enforce_detection=True  # Fails if no face is detected
        )

        # The result is a list of dictionaries, one for each face.
        # We'll use the first face found.
        if analysis and isinstance(analysis, list):
            first_face = analysis[0]
            dominant_emotion = first_face['dominant_emotion']
            # Confidence is the score for the dominant emotion, scaled to 0-1
            confidence = first_face['emotion'][dominant_emotion] / 100.0
            return dominant_emotion, confidence
        else:
            return None, 0.0

    except Exception as e:
        # If DeepFace fails (e.g., no face found, or URL is invalid)
        # print(f"Error in emotion detection: {e}", file=sys.stderr)
        return None, 0.0

if __name__ == "__main__":
    if len(sys.argv) > 1:
        image_url = sys.argv[1]
        emotion, confidence = detect_emotion_from_url(image_url)
        if emotion:
            # Output format: "emotion,confidence"
            print(f"{emotion},{confidence}")
        else:
            # If no emotion is detected, print nothing.
            # This ensures the Node.js script gets an empty stdout on failure.
            pass










# import sys
# import cv2
# import numpy as np
# from tensorflow.keras.models import Model
# from tensorflow.keras.applications import VGG16
# from tensorflow.keras.layers import Dense, Flatten
# from deepface import DeepFace
# import warnings
# import os

# # Suppress warnings
# os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
# warnings.filterwarnings('ignore', category=UserWarning, module='tensorflow')
# warnings.filterwarnings('ignore', category=FutureWarning, module='tensorflow')

# # --- Load your custom VGG16 RAF-DB model ---
# IMAGE_SIZE = 96
# NUM_CLASSES = 7
# emotion_labels = ['angry', 'disgust', 'fear', 'happy', 'neutral', 'sad', 'surprise']

# base_model = VGG16(weights=None, include_top=False, input_shape=(IMAGE_SIZE, IMAGE_SIZE, 3))
# x = Flatten()(base_model.output)
# x = Dense(256, activation='relu')(x)
# output = Dense(NUM_CLASSES, activation='softmax')(x)
# emotion_model = Model(inputs=base_model.input, outputs=output)
# emotion_model.load_weights("VGG16_RAFDB_Pro_Weights.h5")
# print("Custom VGG16 model loaded!")

# def preprocess_for_custom_model(img):
#     img = cv2.resize(img, (IMAGE_SIZE, IMAGE_SIZE))
#     img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
#     img = img.astype('float32') / 255.0
#     img = np.expand_dims(img, axis=0)
#     return img

# def predict_emotion_custom_model(img):
#     processed_img = preprocess_for_custom_model(img)
#     preds = emotion_model.predict(processed_img)[0]
#     dominant_idx = np.argmax(preds)
#     dominant_emotion = emotion_labels[dominant_idx]
#     confidence = preds[dominant_idx]
#     return dominant_emotion, confidence

# def preprocess_face(image_path):
#     img = cv2.imread(image_path)
#     if img is None:
#         return None

#     gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
#     face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
#     faces = face_cascade.detectMultiScale(gray, 1.1, 5)
#     if len(faces) == 0:
#         return None

#     x, y, w, h = faces[0]
#     face_img = img[y:y+h, x:x+w]
#     return face_img

# def detect_emotion_from_file(image_path):
#     face_img = preprocess_face(image_path)
#     if face_img is None:
#         return None, 0.0

#     # Predict with custom model
#     custom_emotion, custom_confidence = predict_emotion_custom_model(face_img)

#     # Optionally, predict with DeepFace as fallback or for ensembling
#     try:
#         df_analysis = DeepFace.analyze(img_path=image_path, actions=['emotion'], enforce_detection=True)
#         df_emotion = df_analysis[0]['dominant_emotion']
#         df_confidence = df_analysis[0]['emotion'][df_emotion] / 100.0
#     except Exception:
#         df_emotion, df_confidence = None, 0.0

#     # Ensemble: pick the one with higher confidence
#     if df_confidence > custom_confidence:
#         return df_emotion, df_confidence
#     else:
#         return custom_emotion, custom_confidence

# if __name__ == "__main__":
#     if len(sys.argv) > 1:
#         image_path = sys.argv[1]
#         emotion, confidence = detect_emotion_from_file(image_path)
#         if emotion:
#             print(f"{emotion},{confidence}")
