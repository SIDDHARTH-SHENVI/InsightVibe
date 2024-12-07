import PropTypes from 'prop-types';

const Preview = ({ intro, imagePrompt }) => {
  return (
    <div>
      {intro && <p>{intro}</p>}
      {imagePrompt ? (
        <img src={imagePrompt} alt="Generated Image" />
      ) : (
        <p>Loading image...</p> // Or a fallback message
      )}
    </div>
  );
};

Preview.propTypes = {
  intro: PropTypes.string.isRequired,
  imagePrompt: PropTypes.string, // This is optional, it might not be passed initially
};

export default Preview;
