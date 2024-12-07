const axios = require("axios");

exports.generateImage = async (imagePrompt) => {
  const payload = {
    text_prompts: [{ text: imagePrompt, weight: 1 }],
    cfg_scale: 5,
    sampler: "K_EULER_ANCESTRAL",
    seed: 0,
    steps: 25,
  };

  try {
    const response = await axios.post(process.env.NVIDIA_API_URL, payload, {
      headers: { "Content-Type": "application/json" },
    });

    const imageData = response.data.artifacts[0].base64;

    return imageData;
  } catch (error) {
    console.error("Error generating image:", error);
    throw new Error("Image generation failed.");
  }
};
