import React from 'react';
import JobsList from './JobsList';
import jobService from '../../features/jobs/jobService';

const SavedJobs = () => {
    const [jobDataFromAxios, setJobDataFromAxios] = React.useState([]);
    //Pass an empty array so it would always rendered once, unless props change.
    async function getJobs() {
        const userInfoFromLocalStorage = localStorage.getItem("user");
        if(userInfoFromLocalStorage) {
            const userInfoParsed = JSON.parse(userInfoFromLocalStorage);

            const { jobs } = await jobService.savedJobs(userInfoParsed.token);
            console.log('JOBS:', jobs);
            setJobDataFromAxios(jobs);
        }
    }
    React.useEffect(
        () => {
            getJobs();
        },
        []
    );

    return <JobsList refreshJobs={getJobs} jobs={jobDataFromAxios} />
}

export default SavedJobs;