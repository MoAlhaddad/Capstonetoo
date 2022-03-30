import React from "react";
import { Button, Card } from "antd";
import {
  AiOutlineShop,
  AiFillCheckCircle,
  AiFillCloseCircle,
} from "react-icons/ai";
import { GoGlobe } from "react-icons/go";
import PropTypes from "prop-types";

const JobsCard = ({
  company,
  description,
  id,
  location,
  redirect_url,
  salary_max,
  salary_min,
  setSelectedJob,
  viewDetails,
  setViewDetails,
  title,
  isSaved,
}) => {
  const viewJobDetails = () => {
    setViewDetails(true);
    setSelectedJob({
      location: location.display_name,
      redirect_url,
      salary_max,
      salary_min,
      description,
      company: company.display_name,
      adzunaId: id,
      title,
    });
  };
  return (
    <Card
      title={title}
      style={{
        backgroundColor: viewDetails ? "lightgrey" : "white",
        border: "solid 2px lightgrey",
        flex: "30%",
        maxWidth: "30%",
        margin: "10px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ width: "100%", margin: "0" }}>
        <span style={{ marginRight: "10px" }}>
          <AiOutlineShop />
          {company.display_name}
        </span>
        <span>
          <GoGlobe />
          {location.display_name}
        </span>
      </div>
      <div>
        <span style={{ marginRight: "10px" }}>Type:</span>
        <span>Full Time</span>
      </div>
      {/* <div>
        <span style={{ marginRight: "10px" }}>Job Saved:</span>
        {!isSaved ? (
          <span style={{ color: "red" }}>
            <AiFillCloseCircle />
          </span>
        ) : (
          <span style={{ color: "green" }}>
            <AiFillCheckCircle />
          </span>
        )}
      </div> */}
      <Button onClick={viewJobDetails}>
        {!viewDetails ? "View Details" : null}
      </Button>
    </Card>
  );
};

JobsCard.propTypes = {
  company: PropTypes.object,
  description: PropTypes.string,
  id: PropTypes.string,
  location: PropTypes.object,
  redirect_url: PropTypes.string,
  salary_max: PropTypes.number,
  salary_min: PropTypes.number,
  setSelectedJob: PropTypes.func,
  viewDetails: PropTypes.bool,
  setViewDetails: PropTypes.func,
  title: PropTypes.string,
  isSaved: PropTypes.bool,
};

export default JobsCard;