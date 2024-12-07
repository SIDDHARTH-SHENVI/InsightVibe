const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

exports.generateContentWithRetry = async (prompt, retries = 3, delay = 1000) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  for (let i = 0; i < retries; i++) {
    try {
      const response = await model.generateContent(prompt);
      return response.response.text();
    } catch (error) {
      if (error.status === 503 && i < retries - 1) {
        console.warn(`Retrying... (${i + 1}/${retries})`);
        await new Promise((resolve) => setTimeout(resolve, delay * (i + 1)));
      } else {
        throw error;
      }
    }
  }
};
