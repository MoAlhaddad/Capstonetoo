import React from 'react';
import JobCard from '../JobCard';
import { v4 as uuidv4 } from 'uuid';
import JobsModal from '../JobsModal';

const JobsList = ({
    jobs,
    refreshJobs,
}) => {
    const [ viewDetails, setViewDetails ] = React.useState(false);
    const [ selectedJob, setSelectedJob ] = React.useState(undefined);
    return (
        <div style={{display: 'flex', flexWrap: "wrap"}}>
            {jobs && jobs.map(job => <JobCard setSelectedJob={setSelectedJob} setViewDetails={setViewDetails} key={uuidv4()} {...job} />)}
            <JobsModal refreshJobs={refreshJobs} job={selectedJob || undefined} viewDetails={viewDetails} setViewDetails={setViewDetails} />
        </div>
    );
}

export default JobsList;