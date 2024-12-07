const googleGenAIService = require("../services/googleGenAIService");
const nvidiaImageService = require("../services/nvidiaImageService");
const promptModel = require("../models/promptModel");

exports.generateIntroAndImage = async (req, res) => {
  try {
    // Validate payload
    const errors = promptModel.validatePrompt(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    // Generate content (caption and image prompt)
    const {
      buisnessName,
      industryName,
      targetAudience,
      usp,
      adType,
      keyMessage,
      brandVoice,
    } = req.body;
    const prompt = promptModel.constructPrompt({
      buisnessName,
      industryName,
      targetAudience,
      usp,
      adType,
      keyMessage,
      brandVoice,
    });

    const generatedContent = await googleGenAIService.generateContentWithRetry(
      prompt
    );

    // Split the response into caption and image prompt
    const [imagePrompt, caption] = generatedContent
      .split("<<SEPARATOR>>")
      .map((part) => part.trim());

    // Generate the image using NVIDIA API
    const imageBase64 = await nvidiaImageService.generateImage(imagePrompt);

    // Respond with the image and caption
    res.json({
      intro: caption,
      imagePrompt: `data:image/jpeg;base64,${imageBase64}`,
    });
  } catch (error) {
    console.error("Error generating content and image:", error);
    res.status(500).send({ error: "Failed to generate content and image." });
  }
};
