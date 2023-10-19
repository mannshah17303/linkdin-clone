import React, { useState } from "react";
import styled from "styled-components";

const FormContainer = styled.div`
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 20px;
  width: 400px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin-top: 10px;
  cursor: pointer;
  border-radius: 4px;
`;

const JobApplicationForm = ({ jobId, companyName, onClose, onSubmit }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [resumeLink, setResumeLink] = useState("");
  const [salaryExpectation, setSalaryExpectation] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [educationLevel, setEducationLevel] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [Companyname, setCompanyName] = useState(companyName); // Use the companyName prop as the initial value

  const categories = ["DSA", "Java", "AI", "ML", "Other"];

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a job application object with the form data
    const applicationData = {
      companyName,
      name,
      email,
      resumeLink,
      salaryExpectation,
      yearsOfExperience,
      educationLevel,
      category: selectedCategory,
    };

    // Submit the application data to the server (you'll need to implement this)
    await onSubmit(applicationData);

    // Close the form
    onClose();
  };

  return (
    <FormContainer>
      <Title>Apply for the Job</Title>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={Companyname}
          onChange={(e) => setCompanyName(e.target.value)}
          required
        />
        <Input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          type="text"
          placeholder="Resume Link"
          value={resumeLink}
          onChange={(e) => setResumeLink(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Salary Expectation"
          value={salaryExpectation}
          onChange={(e) => setSalaryExpectation(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Years of Experience"
          value={yearsOfExperience}
          onChange={(e) => setYearsOfExperience(e.target.value)}
        />
        <Select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>
        <Select
          value={educationLevel}
          onChange={(e) => setEducationLevel(e.target.value)}
        >
          <option value="">Select Education Level</option>
          <option value="High School">High School</option>
          <option value="Associate's Degree">Associate's Degree</option>
          <option value="Bachelor's Degree">Bachelor's Degree</option>
          <option value="Master's Degree">Master's Degree</option>
          <option value="Ph.D.">Ph.D.</option>
        </Select>
        <SubmitButton type="submit">Submit</SubmitButton>
      </form>
    </FormContainer>
  );
};

export default JobApplicationForm;
