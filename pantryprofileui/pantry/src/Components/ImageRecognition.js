import React, { useState, useEffect, useRef } from "react";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs";

// Load a pre-trained model (example)
const loadModel = async () => {
  const model = await cocoSsd.load();
  return model;
};

// Predict function using the loaded model
const detect = async (model, image) => {
  
  // Perform prediction
  const prediction = model.detect(image);
  
  return prediction;
};

const ImageRecognition = () => {
  // State variables
  const [fileName, setFileName] = useState("");
  const [prediction, setPrediction] = useState("");
  const [model, setModel] = useState(null); // State to hold the loaded model
  const [imageElement, setImageElement] = useState(null); // State to hold the selected image element
  const imageRef = useRef(null);

  // Load the model when the component mounts
  useEffect(() => {
    loadModel().then(setModel);
  }, []);

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      const element = imageRef.current;
      setImageElement(element); // Set the selected image element
      setPrediction(""); // Reset prediction
      // return imageElement;
    }
  };

  // Handle prediction
  const handlePrediction = async () => {
    if (!model) return; // Model not loaded yet
    // Perform prediction
    try {
      const predictedResult = await detect(model, imageElement);
      setPrediction(predictedResult);
    } catch (error) {
      console.error('Prediction error:', error);
      setPrediction("Error occurred during prediction.");
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="mb-4 p-2 border rounded-md"
      />
      {fileName && (
        <div>
          <button onClick={handlePrediction}>Search Now</button>
        </div>
      )}
      {prediction && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Item Searched:</h2>
          <p>{prediction}</p>
        </div>
      )}
    </div>
  );
};

export default ImageRecognition;
