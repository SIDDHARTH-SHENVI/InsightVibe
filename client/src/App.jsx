import { useState } from 'react';
import Form from './components/Form';

import axios from 'axios';

function App() {
  const [intro, setIntro] = useState('');
  const [imagePrompt, setImagePrompt] = useState('');

  const handleFormSubmit = async (formData) => {
    try {
      // Make sure to update the API URL and pass the correct payload
      const response = await axios.post('http://localhost:1312/generate-intro-prompt', formData, {
        headers: { 'Content-Type': 'application/json' },
      });

      // Set the intro and image prompt
      setIntro(response.data.intro);

      setImagePrompt(response.data.imagePrompt); 
      console.log(response.data.imagePrompt);
      // Assuming this is the base64 image string

    } catch (error) {
      console.error('Error generating ad:', error);
    }
  };

  return (
    <div>
      <Form onSubmit={handleFormSubmit} />
      {intro && <p>{intro}</p>}
      {imagePrompt&& <img src={imagePrompt} alt="Generated Ad" />}
    </div>
  );
}

export default App;
