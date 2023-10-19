import React, { useState } from 'react';
import axios from 'axios';

const AddConnection = ({ userId }) => {
  const [targetUserId, setTargetUserId] = useState('');
  const [requestSent, setRequestSent] = useState(false);

  const sendConnectionRequest = async () => {
    try {
      await axios.post(`http://localhost:3000/send-request/${targetUserId}`);
      setRequestSent(true);
    } catch (error) {
      console.error('Error sending connection request:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={targetUserId}
        onChange={(e) => setTargetUserId(e.target.value)}
        placeholder="Enter target user ID"
      />
      <button onClick={sendConnectionRequest} disabled={requestSent}>
        {requestSent ? 'Request Sent' : 'Send Connection Request'}
      </button>
    </div>
  );
};

export default AddConnection;

