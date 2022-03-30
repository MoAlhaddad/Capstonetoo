import React from 'react';
import { Button, Modal } from 'antd';
// import { AiOutlineShop } from 'react-icons/ai';
// import { GoGlobe } from 'react-icons/go';
import PropTypes from 'prop-types';
import jobService from '../features/jobs/jobService';
import NumberFormat from 'react-number-format';

const JobsModal = ({
    job,
    // company,
    // description,
    // location,
    viewDetails,
    setViewDetails,
    refreshJobs,
    // title
}) => {

    const handleOk = () => {
        setViewDetails(false);
    }

    const handleCancel = () => {
        setViewDetails(false);
    }

    const saveJob = async () => {
        const userInfoFromLocalStorage = localStorage.getItem("user");
        if(userInfoFromLocalStorage) {
            const userInfoParsed = JSON.parse(userInfoFromLocalStorage);
            await jobService.saveJob(job, userInfoParsed.token);
            await refreshJobs();
            setViewDetails(false);
        }
    }
    
    return (
        <Modal 
            title={job ? job.title : ""} 
            visible={viewDetails} 
            onOk={handleOk} 
            onCancel={handleCancel}
            footer={[
                <Button 
                    key="back" 
                    onClick={handleCancel}
                >
                  Return to Jobs
                </Button>,
                <Button
                  key="link"
                  href={job ? job.redirect_url : ''}
                  type="primary"
                  target="_blank"
                  onClick={handleOk}
                >
                  Look at Adzuna
                </Button>,
                <Button 
                    key="submit" 
                    type="primary" 
                    onClick={saveJob}
                >
                  Save Job
                </Button>
            ]}
        >
            {
                job && <>
                    <p>Company: {job.company}</p>
                    <p>Location: {job.location.display_name}</p>
                    <p>Description: {job.description}</p>
                    <p>Min Salary: 
                        <NumberFormat
                            value={job.salary_min}
                            className="foo"
                            displayType={'text'}
                            thousandSeparator={true}
                            prefix={'£'}
                            renderText={(value, props) => <div {...props}>{value}</div>}
                        />
                    </p>
                    <p>Max Salary: 
                        <NumberFormat
                            value={job.salary_max}
                            className="foo"
                            displayType={'text'}
                            thousandSeparator={true}
                            prefix={'£'}
                            renderText={(value, props) => <div {...props}>{value}</div>}
                        />
                    </p>    
                  </>
            }
      </Modal>
    );
}

JobsModal.propTypes = {
    viewDetails: PropTypes.bool.isRequired,
    setViewDetails: PropTypes.func.isRequired,
    job: PropTypes.object
}

export default JobsModal;