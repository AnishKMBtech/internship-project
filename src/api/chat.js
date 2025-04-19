import { GoogleGenerativeAI } from "@google/generative-ai";

// Keep track of the chat history for context
let chatHistory = [];

export async function handleChatMessage(currentMessages, newMessage, apiKey) {
  if (!apiKey) {
    throw new Error("Gemini API key is not provided or invalid.");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

  // Format messages for Gemini API
  // Gemini expects roles 'user' and 'model'
  const formattedHistory = currentMessages.map(msg => ({
    role: msg.role === 'user' ? 'user' : 'model', // Ensure roles are correct
    parts: [{ text: msg.content }]
  }));

  try {
    console.log("Starting chat with Gemini API...");
    const chat = model.startChat({
      history: formattedHistory,
      generationConfig: {
        maxOutputTokens: 200, // Limit response length if needed
      },
    });

    console.log("Sending message to Gemini API:", newMessage);
    const result = await chat.sendMessage(newMessage);
    const response = await result.response;
    const text = response.text();

    console.log("Received response from Gemini API.");

    // Add the new user message and AI response to history (optional, depends if ChatBot manages full state)
    // chatHistory.push({ role: "user", parts: [{ text: newMessage }] });
    // chatHistory.push({ role: "model", parts: [{ text: text }] });

    return text || "I'm not sure how to respond to that.";

  } catch (error) {
    console.error("Gemini API error:", error);
    // Try to provide a more specific error message
    let message = "Failed to get response from chat API.";
    if (error.message) {
        message += ` Details: ${error.message}`;
    }
    // Check for specific API key errors (example, adjust based on actual SDK errors)
    if (error.message && error.message.includes("API key")) {
        message = "Invalid Gemini API key. Please check your key.";
    }
    throw new Error(message);
  }
}