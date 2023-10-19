import React, { useState, useEffect } from "react";
import styled from "styled-components";
import JobApplicationForm from "./JobApplicationForm";
import * as d3 from "d3";

const JobList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const JobCard = styled.div`
  display: flex;
  border: 1px solid #ccc;
  padding: 20px;
  width: 400px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  background-color: #fff;
  margin-bottom: 20px;
`;

const LeftSide = styled.div`
  flex: 1;
  padding-right: 20px;
`;

const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.h2`
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
`;

const JobTitle = styled.h3`
  font-size: 18px;
  margin: 0;
`;

const JobDescription = styled.p`
  font-size: 14px;
  color: #333;
`;

const Location = styled.div`
  margin-top: 10px;
  font-size: 12px;
`;

const ApplyButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin-top: 10px;
  cursor: pointer;
  border-radius: 4px;
`;

const SaveButton = styled.button`
  background-color: #f5f5f5;
  color: #333;
  border: none;
  padding: 10px 20px;
  margin-top: 10px;
  cursor: pointer;
  border-radius: 4px;
`;

const ShareButton = styled.button`
  background-color: #f5f5f5;
  color: #333;
  border: none;
  padding: 10px 20px;
  margin-top: 10px;
  cursor: pointer;
  border-radius: 4px;
`;
const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
`;

const JobListContainer = styled.div`
  flex: 1;
  padding: 20px;
`;

const PieChartContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
`;

const PieChart = styled.svg`
  width: 300px;
  height: 300px;
  path {
    transition: transform 0.2s, fill 0.2s;
  }

  &:hover {
    path {
      transform: scale(0.9); 
    }
  }
`;

const ChartTitle = styled.h2`
  text-align: center;
  margin: 10px 0;
`;

const Jobs = () => {
  const [jobs, setJobs] = useState([
    {
      id: 1,
      name: "Amazon",
      description:
        "Amazon is a multinational technology company known for e-commerce, cloud computing, and more.",
      location: "Seattle, WA",
    },
    {
      id: 2,
      name: "Facebook",
      description:
        "Facebook is a social media platform connecting people worldwide.",
      location: "Menlo Park, CA",
    },
    {
      id: 3,
      name: "Google",
      description:
        "Google is a technology company specializing in search, advertising, and more.",
      location: "Mountain View, CA",
    },
    {
      id: 4,
      name: "Microsoft",
      description:
        "Microsoft is a leading technology corporation famous for its software products.",
      location: "Redmond, WA",
    },
    {
      id: 5,
      name: "Apple",
      description:
        "Apple is a renowned tech company known for its hardware and software products.",
      location: "Cupertino, CA",
    },
    {
      id: 6,
      name: "Tesla",
      description:
        "Tesla is an electric vehicle and clean energy company founded by Elon Musk.",
      location: "Palo Alto, CA",
    },
    {
      id: 7,
      name: "Netflix",
      description:
        "Netflix is a streaming platform offering a wide range of movies and TV shows.",
      location: "Los Gatos, CA",
    },
    {
      id: 8,
      name: "Adobe",
      description:
        "Adobe is a software company known for its creative software products.",
      location: "San Jose, CA",
    },
    {
      id: 9,
      name: "Twitter",
      description:
        "Twitter is a social media platform for real-time communication.",
      location: "San Francisco, CA",
    },
    {
      id: 10,
      name: "Salesforce",
      description:
        "Salesforce is a leading customer relationship management (CRM) platform.",
      location: "San Francisco, CA",
    },
    // Add more job listings here with descriptions and locations
  ]);

  // Define a mapping from job ID to company name
  const jobIdToCompanyName = {};
  jobs.forEach((job) => {
    jobIdToCompanyName[job.id] = job.name;
  });

  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  // Initialize companyApplicationCounts state with values from localStorage or an empty object
  const [companyApplicationCounts, setCompanyApplicationCounts] = useState(
    () => {
      const countsFromStorage = localStorage.getItem(
        "companyApplicationCounts"
      );
      return countsFromStorage ? JSON.parse(countsFromStorage) : {};
    }
  );

  useEffect(() => {
    // Save application counts to localStorage whenever they change
    localStorage.setItem(
      "companyApplicationCounts",
      JSON.stringify(companyApplicationCounts)
    );
  }, [companyApplicationCounts]);

  const handleApplyClick = (jobId) => {
    setSelectedJobId(jobId);
    setShowApplicationForm(true);

    // Get the company name from the job ID
    const companyName = jobIdToCompanyName[jobId];
    console.log(companyName);

    if (!companyName) {
      // Handle the case where the company name is not found
      console.error("Company name not found for job ID:", jobId);
    }
  };

  const handleSubmitApplication = async (applicationData) => {
    // Send the job application data to your server (Node.js) to store in the collection
    try {
      const response = await fetch("http://localhost:5000/jobs/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(applicationData),
      });

      if (response.ok) {
        const companyName = jobIdToCompanyName[selectedJobId];
        setCompanyApplicationCounts((prevCounts) => ({
          ...prevCounts,
          [companyName]: (prevCounts[companyName] || 0) + 1,
        }));
        // Handle success (e.g., show a success message)
        console.log("Application submitted successfully.");
      } else {
        // Handle errors
        console.error("Failed to submit application.");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
    }
  };

  // Prepare data for the pie chart
  const pieData = Object.entries(companyApplicationCounts).map(
    ([companyName, count]) => ({
      companyName,
      count,
    })
  );

  // Create a pie layout and arc generator from D3.js
  const pie = d3.pie().value((d) => d.count);
  const arcGenerator = d3.arc().innerRadius(0).outerRadius(100);

  return (
    <PageContainer>
      <JobListContainer>
        <Title>Job Listings:</Title>
        <JobList>
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              style={{ display: showApplicationForm ? "none" : "flex" }}
            >
              <LeftSide>
                <JobTitle>{job.name}</JobTitle>
                <JobDescription>{job.description}</JobDescription>
                <Location>{job.location}</Location>
              </LeftSide>
              <RightSide>
                <div>
                  Applications: {companyApplicationCounts[job.name] || 0}
                </div>
                <ApplyButton onClick={() => handleApplyClick(job.id)}>
                  Apply
                </ApplyButton>
                <div>
                  <SaveButton>Save</SaveButton>
                  <ShareButton>Share</ShareButton>
                </div>
              </RightSide>
            </JobCard>
          ))}
        </JobList>
        {showApplicationForm && (
          <JobApplicationForm
            jobId={selectedJobId}
            companyName={
              jobs[selectedJobId - 1].name
            } /* Pass the company name here */
            onClose={() => setShowApplicationForm(false)}
            onSubmit={(applicationData) =>
              handleSubmitApplication(
                applicationData,
                jobs[selectedJobId - 1].name
              )
            }
          />
        )}
      </JobListContainer>
      <PieChartContainer>
        <ChartTitle>Application Statistics:</ChartTitle>
        <PieChart width={200} height={200}>
          <g transform={`translate(100, 100)`}>
            {pie(pieData).map((slice, index) => (
              <g key={index}>
                <path
                  key={index}
                  d={arcGenerator(slice)}
                  fill={d3.schemeCategory10[index]}
                />
                <text
                  transform={`translate(${arcGenerator.centroid(slice)})`}
                  textAnchor="middle"
                  fontSize="12"
                  fill="#fff"
                >
                  {slice.data.companyName}
                </text>
              </g>
            ))}
          </g>
        </PieChart>
      </PieChartContainer>
    </PageContainer>
  );
};

export default Jobs;
