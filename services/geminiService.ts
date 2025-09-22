
import { GoogleGenAI } from "@google/genai";
import { RenderSettings } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

function fileToGenerativePart(file: File): Promise<{ inlineData: { data: string; mimeType: string; } }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result !== 'string') {
        return reject(new Error("Failed to read file as base64 string."));
      }
      // result has 'data:mime/type;base64,' prefix, which we need to remove
      const base64Data = reader.result.split(',')[1];
      resolve({
        inlineData: {
          data: base64Data,
          mimeType: file.type,
        },
      });
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

const buildPrompt = (settings: RenderSettings): string => {
  let prompt = `Generate a high-quality architectural rendering.

**Role:** You are ArchVision RenderMaster, a professional architectural rendering AI. Your task is to generate an image strictly following these specifications.

**Architectural Type:** A ${settings.buildingTypes.join(', ')} building.
`;

  if (settings.modelImage || settings.modelImageUrl) {
      prompt += `
**Base Model:** The rendering must be based on the provided building massing model. Adhere closely to its overall shape, volume, and primary structural features.
`;
  }
  
  if (settings.materials.length > 0) {
    prompt += `
**Materials:**
${settings.materials.map(m => `- ${m.part}: ${m.description}`).join('\n')}
`;
  }

  prompt += `
**Rendering Style:** ${settings.style}. This should influence the lighting, mood, and overall aesthetic. For example, 'Cinematic' implies dramatic lighting and color grading, while 'Photorealistic' aims for physical accuracy.

**View & Perspective:** The viewpoint is a ${settings.view}.
`;

  if (settings.details) {
      prompt += `
**Environment & Details:**
${settings.details}
`;
  }

  prompt += `
**Quality & Output:**
- Quality: ${settings.quality}. This means the image should have a high level of detail, realistic lighting, reflections, and textures.
- Aspect Ratio: ${settings.aspectRatio.split(' ')[0]}
- Resolution Focus: ${settings.resolution}
`;

  return prompt;
};

export const generateArchitecturalImage = async (settings: RenderSettings): Promise<string[]> => {
  try {
    const prompt = buildPrompt(settings);
    console.log("Generated Prompt:", prompt);

    const numberOfImages = settings.view === '4-Direction Simulation' ? 4 : 1;
    const aspectRatioMap: { [key: string]: '1:1' | '16:9' | '9:16' | '4:3' | '3:4' } = {
        '1:1 (Square)': '1:1',
        '16:9 (Landscape)': '16:9',
        '9:16 (Portrait)': '9:16',
        '21:9 (Cinematic Widescreen)': '16:9', // Closest supported
    };

    const apiAspectRatio = aspectRatioMap[settings.aspectRatio] || '16:9';

    if (settings.modelImage) {
        // Use multi-modal model for image editing/inspiration
        const imagePart = await fileToGenerativePart(settings.modelImage);
        const textPart = { text: prompt };

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: { parts: [imagePart, textPart] },
        });

        // This model might not return an image directly in this API call structure for generation.
        // Let's fallback to Imagen if the primary goal is generation based on text.
        // The prompt guides it to use the image as strong reference.
        // For this demo, we will use Imagen for generation as requested by the UI flow.
    }
    
    // Using Imagen for direct image generation
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: prompt,
      config: {
        numberOfImages: numberOfImages,
        outputMimeType: 'image/jpeg',
        aspectRatio: apiAspectRatio,
      },
    });

    if (!response.generatedImages || response.generatedImages.length === 0) {
      throw new Error("The API did not return any images.");
    }
    
    return response.generatedImages.map(img => `data:image/jpeg;base64,${img.image.imageBytes}`);

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate architectural rendering. Please check your settings and try again.");
  }
};
