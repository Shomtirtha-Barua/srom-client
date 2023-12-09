import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Loader from "../../../components/Ui/Loader/Loader";
import JobCard from "../JobCard/JobCard";

const AllJobs = () => {
  const [formData, setFormData] = useState({
    sortWage: "default",
    jobCategory: "",
    jobLocation: "",
  });

  // fetch data from database
  const { data: jobs, isLoading } = useQuery("jobs", () =>
    fetch("http://localhost:5000/api/v1/job").then((res) => res.json())
  );

  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    // This effect will be triggered when the sortWage value changes
    if (jobs?.data) {
      handleFilterChange(formData);
    }
  }, [formData.sortWage, formData.jobCategory, formData.jobLocation, jobs]);

  const handleFilterChange = (formData) => {
    const { sortWage, jobCategory, jobLocation } = formData;

    let updatedJobs = jobs?.data || [];

    if (sortWage && sortWage !== "default") {
      updatedJobs = sortJobs(updatedJobs, sortWage);
    }

    if (jobCategory) {
      updatedJobs = filterJobsByCategory(updatedJobs, jobCategory);
    }

    if (jobLocation) {
      updatedJobs = filterJobsByLocation(updatedJobs, jobLocation);
    }

    setFilteredJobs(updatedJobs);
  };

  const sortJobs = (jobs, sortWage) => {
    return sortWage === "lowToHigh"
      ? jobs.sort((a, b) => b.wage - a.wage)
      : sortWage === "highToLow"
      ? jobs.sort((a, b) => a.wage - b.wage)
      : jobs;
  };

  const filterJobsByCategory = (jobs, category) => {
    return jobs.filter(
      (job) =>
        job.category &&
        job.category.toLowerCase().includes(category.toLowerCase())
    );
  };

  const filterJobsByLocation = (jobs, location) => {
    return jobs.filter(
      (job) =>
        job.location &&
        job.location.toLowerCase().includes(location.toLowerCase())
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleFilterChange(formData);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section>
      <h1 className="text-center text-2xl font-bold py-6">All Jobs</h1>

      <form
        onSubmit={onSubmit}
        className="flex items-center justify-center gap-2 mb-10"
      >
        <select
          name="sortWage"
          value={formData.sortWage}
          onChange={handleInputChange}
          className="select select-bordered w-full max-w-xs"
        >
          <option value="default" selected>
            Sort by Price
          </option>
          <option value="lowToHigh">Low to High</option>
          <option value="highToLow">High to Low</option>
        </select>

        <input
          type="text"
          name="jobCategory"
          value={formData.jobCategory}
          placeholder="Search by category"
          onChange={handleInputChange}
          className="input input-bordered w-full max-w-xs"
        />

        <input
          type="text"
          name="jobLocation"
          value={formData.jobLocation}
          placeholder="Search by Location"
          onChange={handleInputChange}
          className="input input-bordered w-full max-w-xs"
        />
      </form>

      <div className="mt-20 mb-24 w-11/12 mx-auto">
        <div className="text-2xl font-semibold ps-3 py-5 text-blue-500">
          <h2>Featured Jobs</h2>
        </div>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 container mx-auto">
          {(filteredJobs || jobs?.data)?.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllJobs;
