exports.validatePrompt = (data) => {
    const errors = [];
    const requiredFields = [
      "buisnessName",
      "industryName",
      "targetAudience",
      "usp",
      "adType",
      "keyMessage",
      "brandVoice",
    ];
    requiredFields.forEach((field) => {
      if (!data[field]) errors.push(`${field} is required.`);
    });
    return errors;
  };
  
  exports.constructPrompt = (data) => {
    return `
      Act as a social media marketer for the following business. Your goal is to create a compelling image prompt for an image generation model to generate a visual that aligns with the business's brand and target audience. Also, create an engaging introductory caption to post alongside the image on social media. Please separate the two parts with the word "<<SEPARATOR>>". Here are the business details:
        Business Name: ${data.buisnessName}
        Industry Type: ${data.industryName}
        Target Audience: ${data.targetAudience}
        Unique Selling Proposition (USP): ${data.usp}
        Ad Type: ${data.adType}
        Key Message or Theme: ${data.keyMessage}
        Brand Voice and Tone: ${data.brandVoice}
      Create:
        1. Image Prompt for Midjourney: Describe an image that visually represents the brand, aligns with the industry, and appeals to the target audience. It should emphasize the USP and match the brand's voice and tone.
        <<SEPARATOR>>
        2. Introductory Caption for Social Media: Write a short, engaging intro that highlights the USP, connects with the target audience, and reinforces the key message or theme, encouraging engagement or action.
    `;
  };
  