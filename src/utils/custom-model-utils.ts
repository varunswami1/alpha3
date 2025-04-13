import * as tf from "@tensorflow/tfjs";
import { toast } from "@/hooks/use-toast";

// Global variables for the directly loaded model
let directDiseaseModel: tf.LayersModel | null = null;
let directDiseaseLabels: string[] = [];

// Direct model loading function for disease detection
export const loadDiseaseModelDirectly = async (
  modelPath: string = "/models/disease-model/model.json",
  labelsPath: string = "/models/disease-model/labels.json"
): Promise<{ model: tf.LayersModel | null, labels: string[] }> => {
  try {
    // Initialize TensorFlow.js if not already done
    await tf.ready();
    console.log("TensorFlow.js initialized successfully");
    
    // Check if model is already loaded
    if (directDiseaseModel) {
      console.log("Disease model already loaded");
      return { model: directDiseaseModel, labels: directDiseaseLabels };
    }

    console.log(`Loading disease model from ${modelPath}`);
    
    // Verify model files exist
    try {
      const modelResponse = await fetch(modelPath);
      if (!modelResponse.ok) {
        throw new Error(`Model file not found: ${modelResponse.status} ${modelResponse.statusText}`);
      }
      console.log("Model file exists and is accessible");
    } catch (error) {
      console.error("Error checking model file:", error);
      throw error;
    }
    
    // Load the model with explicit error handling
    try {
      directDiseaseModel = await tf.loadLayersModel(modelPath, {
        onProgress: (fraction) => {
          console.log(`Model loading progress: ${(fraction * 100).toFixed(1)}%`);
        }
      });
      console.log("Disease model loaded successfully");
    } catch (error) {
      console.error("Error loading model:", error);
      throw error;
    }
    
    // Load and verify labels
    try {
      console.log(`Loading labels from ${labelsPath}`);
      const response = await fetch(labelsPath);
      if (!response.ok) {
        throw new Error(`Failed to fetch labels: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      directDiseaseLabels = Object.keys(data);
      console.log(`Labels loaded successfully. Found ${directDiseaseLabels.length} classes:`, directDiseaseLabels);
    } catch (error) {
      console.error("Error loading labels:", error);
      throw error;
    }

    // Verify model is ready for predictions
    try {
      const inputShape = directDiseaseModel.inputs[0].shape;
      console.log("Model input shape:", inputShape);
      const outputShape = directDiseaseModel.outputs[0].shape;
      console.log("Model output shape:", outputShape);
      
      // Verify model matches number of classes in labels
      const numClasses = outputShape[outputShape.length - 1];
      if (numClasses !== directDiseaseLabels.length) {
        console.warn(`Warning: Number of model classes (${numClasses}) doesn't match number of labels (${directDiseaseLabels.length})`);
      }
    } catch (error) {
      console.error("Error verifying model:", error);
      throw error;
    }
    
    return { model: directDiseaseModel, labels: directDiseaseLabels };
  } catch (error) {
    console.error("Error in loadDiseaseModelDirectly:", error);
    // Clear any partially loaded model
    directDiseaseModel = null;
    directDiseaseLabels = [];
    throw error;
  }
};

// Function to detect disease using the directly loaded model
export const detectDiseaseWithDirectModel = async (
  imageElement: HTMLImageElement | HTMLCanvasElement
): Promise<{ name: string; confidence: number } | null> => {
  if (!directDiseaseModel) {
    console.error("Direct disease model not loaded");
    return null;
  }

  try {
    // Ensure we have a valid image element
    if (!imageElement) {
      throw new Error("No image element provided");
    }

    console.log("Starting disease detection process");
    console.log("Image element dimensions:", imageElement.width, "x", imageElement.height);

    // Preprocess image to match model input requirements
    const tensor = tf.tidy(() => {
      // Convert image to tensor
      const imageTensor = tf.browser.fromPixels(imageElement);
      console.log("Original image tensor shape:", imageTensor.shape);

      // Resize image
      const resized = tf.image.resizeBilinear(imageTensor, [224, 224]);
      console.log("Resized tensor shape:", resized.shape);

      // Normalize pixel values
      const normalized = resized.toFloat().div(255.0);
      console.log("Normalized tensor shape:", normalized.shape);

      // Add batch dimension
      const batched = normalized.expandDims(0);
      console.log("Final input tensor shape:", batched.shape);

      return batched;
    });

    // Run inference
    console.log("Running prediction with model");
    const predictions = await directDiseaseModel.predict(tensor) as tf.Tensor;
    const probabilities = await predictions.data();
    console.log("Raw prediction probabilities:", probabilities);

    // Get the index with highest probability
    const maxIndex = probabilities.indexOf(Math.max(...Array.from(probabilities)));
    const confidence = probabilities[maxIndex];
    console.log(`Predicted class index: ${maxIndex}, confidence: ${confidence}`);

    // Get the label
    const name = directDiseaseLabels[maxIndex] || `Unknown (Class ${maxIndex})`;
    console.log("Predicted disease:", name);

    // Cleanup tensors
    tf.dispose([tensor, predictions]);
    console.log("Tensors cleaned up");

    return { name, confidence };
  } catch (error) {
    console.error("Error during disease detection:", error);
    return null;
  }
};

// Helper function to check if the model is loaded
export const isDiseaseModelLoaded = (): boolean => {
  return directDiseaseModel !== null && directDiseaseLabels.length > 0;
};
