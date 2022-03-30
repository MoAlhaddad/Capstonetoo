import React, { useState, useEffect } from "react";
import jobService from "../features/jobs/jobService";
import { getUserFromLocalStorage } from "../features/utils";

const filters = [
  {
    key: 1,
    name: "company",
  },

  {
    key: 2,
    name: "location",
  },
  {
    key: 3,
    name: "salary_min",
  },
  {
    key: 4,
    name: "salary_max",
  },
  {
    key: 5,
    name: "title",
  },
];

export default function SearchFilter({ setJobs }) {
  const [filter, setFilterForm] = useState({
    searchFilters: filters,
    selectedFilter: filters[0].name,
  });

  const [filterValue, setFilterValue] = React.useState("");

  const handleFilterChange = (evt) => {
    const copyOfFilter = Object.assign({}, filter);
    const target = evt.target;
    const value = target.value;
    copyOfFilter.selectedFilter = value;
    setFilterForm(copyOfFilter);
  };

  const handleChange = (evt) => {
    const target = evt.target;
    const value = target.value;
    setFilterValue(value);
  };

  const onFilter = async (evt) => {
    evt.preventDefault();
    const userFromLocalStorage = getUserFromLocalStorage();
    let searchValue = '';
    if(filter.selectedFilter === 'salary_max' || filter.selectedFilter === 'salary_min'){
      //In cases when a filter value is number and it's referencing salary_man and salary_min.
      searchValue = filterValue.replace(/[^\d\.\-eE+]/g, "");
    } else {
      searchValue = filterValue;
    }
    const { jobs } = await jobService.searchJob({
      searchFilter: filter.selectedFilter,
      searchValue,
    }, userFromLocalStorage.token);
    setJobs(jobs);
  };

  const resetToOriginalJobList = async (evt) => {
    console.log("EVENT:", evt);
    evt.preventDefault();
    const userFromLocalStorage = getUserFromLocalStorage();
    const { jobs } = await jobService.getJobs(userFromLocalStorage.token);
    setFilterForm({
      searchFilters: filters,
      selectedFilter: filters[0].name,
    });
    setFilterValue("");
    console.log("reset jobs:", jobs);
    setJobs(jobs);
  };

  return (
    <form
      style={{ display: "flex", justifyContent: "space-between" }}
      onSubmit={onFilter}
    >
      <div style={{ marginRight: "10px", display: "flex" }}>
        <select onChange={handleFilterChange}>
          {filters.map((filter) => (
            <option key={filter.key} value={filter.name}>{filter.name}</option>
          ))}
        </select>
        <input value={filterValue} onChange={handleChange} />
        <button type="submit">Filter Jobs</button>
        <button
          type="button"
          className="btn btn-secondary"
          style={{ width: "120px" }}
          disabled={!filterValue ? true : false}
          onClick={resetToOriginalJobList}
        >
          Reset
        </button>
      </div>
    </form>
  );
}