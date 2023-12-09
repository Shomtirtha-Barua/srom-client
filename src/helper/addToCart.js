import toast from "react-hot-toast";

const handleAddToCart = (job) => {
  // Retrieve the existing array from Local Storage
  const storedArrayString = localStorage.getItem("jobs");

  // Parse the JSON string into an array or initialize an empty array if it doesn't exist
  const jobsArray = JSON.parse(storedArrayString) || [];

  // Check if the job already exists in the array
  const existingJob = jobsArray.find(
    (existingJob) => existingJob._id === job._id
  );

  if (!existingJob) {
    // Add the job object to the array
    jobsArray.push(job);

    // Update Local Storage with the modified array
    localStorage.setItem("jobs", JSON.stringify(jobsArray));
    toast.success("Added to cart");
  } else {
    toast.error("Already added!");
  }
};

export default handleAddToCart;
