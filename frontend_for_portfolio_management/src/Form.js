import React from 'react';

const Form = ({ handleInputChange, sendPost, newPost }) => {
  return (
    <form>
      <input
        type="text"
        name="name"
        value={newPost.name}
        placeholder="Name"
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="description"
        value={newPost.description}
        placeholder="Description"
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="message"
        value={newPost.message}
        placeholder="Message"
        onChange={handleInputChange}
      />
      <button onClick={sendPost} type="submit">
        Send
      </button>
    </form>
  );
};

export default Form;
