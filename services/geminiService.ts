import { GoogleGenAI, GenerateContentResponse, Part, Modality } from "@google/genai";
import qrcode from 'qrcode';

// IMPORTANT: This service requires a valid Gemini API key.
// The key should be set in an environment variable `process.env.API_KEY`.
// For this example, we'll proceed assuming the key is available.
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("Gemini API key not found. Using mocked responses. Please set process.env.API_KEY.");
}

const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

interface BotResponse {
    text: string;
    enhancedImageUrl?: string;
    qrCodeUrl?: string;
}

const fileToGenerativePart = async (file: File): Promise<Part> => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: {
      data: await base64EncodedDataPromise,
      mimeType: file.type,
    },
  };
};


export const generateBotResponse = async (text: string, image?: File): Promise<BotResponse> => {
    if (!ai) {
        // Mocked response if API key is not available
        await new Promise(res => setTimeout(res, 1000));
        let mockText = "This is a mocked response. ";
        if(text.toLowerCase().includes('qr code')) {
             mockText += `I've generated a QR code for your new product: a handcrafted wooden bowl.`;
             const qr = await qrcode.toDataURL('Mock Product: Handcrafted Wooden Bowl');
             return { text: mockText, qrCodeUrl: qr };
        }
        if(image) {
            mockText += "I've enhanced your image to make it more vibrant. Check it out!";
            return { text: mockText, enhancedImageUrl: URL.createObjectURL(image) };
        }
        return { text: mockText + "How can I help you market your craft today?" };
    }

    try {
        // Handle image enhancement
        if (image && text.toLowerCase().includes('enhance')) {
            const imagePart = await fileToGenerativePart(image);
            const promptPart = { text: `Enhance the lighting and color vibrancy of this image of a craft product. Make it look professional for marketing. Your response should only contain the enhanced image. Current instruction: ${text}` };
            
            const result = await ai.models.generateContent({
                model: 'gemini-2.5-flash-image-preview',
                contents: { parts: [imagePart, promptPart] },
                config: {
                    responseModalities: [Modality.IMAGE, Modality.TEXT],
                },
            });

            let responseText = "I've enhanced your image!";
            let enhancedImageUrl: string | undefined = undefined;

            for (const part of result.candidates[0].content.parts) {
                if (part.text) {
                  responseText = part.text;
                } else if (part.inlineData) {
                  const base64ImageBytes: string = part.inlineData.data;
                  enhancedImageUrl = `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
                }
            }

            return { text: responseText, enhancedImageUrl };
        }

        // Handle text and combined text/image queries
        const contents: Part[] = [{ text }];
        if (image) {
            contents.unshift(await fileToGenerativePart(image));
        }

        const systemInstruction = `You are VAANI, a friendly and helpful AI assistant for local Indian artisans. 
        Your goal is to help them market their products. 
        - Be encouraging and use simple language.
        - If the user describes a product, summarize it clearly and ask if they'd like to create a marketing post or a QR code.
        - To trigger QR code generation, end your response with the exact token: [GENERATE_QR_CODE_FOR:"Product Name - Brief Description"]. Replace the content inside the brackets with the actual product details.
        - Respond in the language of the user's prompt.`;

        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: contents },
            config: {
                systemInstruction,
            }
        });

        let responseText = response.text;
        let qrCodeUrl: string | undefined;

        const qrRegex = /\[GENERATE_QR_CODE_FOR:"([^"]+)"\]/;
        const qrMatch = responseText.match(qrRegex);

        if (qrMatch && qrMatch[1]) {
            responseText = responseText.replace(qrRegex, '').trim();
            responseText += `\nHere is the QR code for your product.`;
            qrCodeUrl = await qrcode.toDataURL(qrMatch[1], { width: 256 });
        }

        return { text: responseText, qrCodeUrl };

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return { text: "I'm sorry, I'm having trouble connecting. Please try again later." };
    }
};

// Placeholder for Meshy API integration
export const generate3DModel = async (image: File) => {
    console.log("Placeholder: Integrating with Meshy API to generate 3D model from image.");
    // Example: const formData = new FormData(); formData.append('image', image);
    // const response = await fetch('https://api.meshy.ai/v1/image-to-3d', { method: 'POST', body: formData, headers: {'Authorization': 'Bearer ...'} });
    await new Promise(res => setTimeout(res, 1500));
    return { success: true, message: "3D model generation has started (simulation)." };
};

// Placeholder for another external API
export const callRubbishAPI = async (data: any) => {
    console.log("Placeholder: Calling another external API.", data);
    await new Promise(res => setTimeout(res, 800));
    return { success: true, data: "Received response from the placeholder API." };
};
