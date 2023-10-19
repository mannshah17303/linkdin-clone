import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const EmailVerification = () => {
  const { token } = useParams(); // Get the token from URL params
  const [verificationStatus, setVerificationStatus] = useState('Verifying...');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch(`/auth/verify/${token}`);
        const data = await response.json();

        if (response.ok) {
          setVerificationStatus(data.message); // Email verified successfully
        } else {
          setVerificationStatus('Email verification failed'); // Verification failed
        }
      } catch (error) {
        console.error('Error verifying email:', error);
        setVerificationStatus('An error occurred while verifying email');
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div>
      <h2>Email Verification</h2>
      <p>{verificationStatus}</p>
    </div>
  );
};

export default EmailVerification;

