import axios from "axios";

const API_URL = "/api/jobs/";

//Create new Job
const createJob = async (jobData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, jobData, config);

  return response.data;
};

const saveJob = async (jobData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + 'save', { job:jobData }, config);

  return response.data;
};

const searchJob = async (searchForm, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + 'search', searchForm, config);

  return response.data;
};

//GEts the User Saved Jobs.
const savedJobs = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + 'save', config);

  return response.data;
};


//Get user jobs
const getJobs = async (token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  
    const response = await axios.get(API_URL,config);
    console.log("GEt JOB RESPONSE:", response);
    return response.data;
  };

  // Delete user Job
  const deleteJob = async (jobId, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  
    const response = await axios.delete(API_URL + jobId, config);
  
    return response.data;
  }; 

const jobService = {
  createJob,
  saveJob,
  getJobs,
  deleteJob,
  searchJob,
  savedJobs,
};

export default jobService;