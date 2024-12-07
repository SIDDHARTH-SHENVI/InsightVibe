import  { useState } from "react";
import PropTypes from "prop-types";

const Form = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    buisnessName: "",
    industryName: "",
    targetAudience: "",
    usp: "",
    adType: "",
    keyMessage: "",
    brandVoice: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto"
    >
      <h2 className="text-xl font-bold mb-4">Enter Ad Details</h2>
      {Object.keys(formData).map((key) => (
        <div key={key} className="mb-4">
          <label
            htmlFor={key}
            className="block text-gray-700 font-medium mb-2"
          >
            {key}
          </label>
          <input
            type="text"
            id={key}
            name={key}
            value={formData[key]}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2"
            required
          />
        </div>
      ))}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Generate Ad
      </button>
    </form>
  );
};

// PropTypes validation
Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Form;
