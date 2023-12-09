import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import Loader from "../../../components/Ui/Loader/Loader";
import { auth } from "../../../config/firebase.init";

const AddJobs = () => {
  // get user info from firebase
  const [user] = useAuthState(auth);

  const { data: services, isLoading } = useQuery("services", () =>
    fetch("http://localhost:5000/api/v1/service").then((res) => res.json())
  );

  // handle form hook
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  // handle save button
  const onSubmit = async (data) => {
    // modify data
    const jobData = {
      title: data.title,
      description: data.description,
      wage: data.wage,
      category: data.category,
      status: data.status,
      location: data.location,
    };

    // send data to the server
    fetch(`http://localhost:5000/api/v1/job/${user?.email}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(jobData),
    })
      .then((response) => response.json())
      .then((data) => {
        // You can check if 'data' exists, then show a success toast and close the modal.
        if (data) {
          // success toast
          toast.success("Job added successfully");
          // close modal
          document.getElementById("add-job-modal").close();
          // clear form data
          reset();
        }
      })
      .catch((error) => {
        // Handle any errors that may occur during the fetch request.
        console.error("Error:", error);

        // Show an error toast with the error message.
        toast.error("An error occurred while adding the job.");
      });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section>
      <div className="w-full">
        <div className="flex justify-center mx-auto">
          <h1 className="text-2xl font-bold text-sky-800">Add Jobs</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
          <div>
            <label htmlFor="name" className="block text-sm text-gray-800 ">
              Job Title
            </label>
            <input
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              {...register("title", { required: true })}
            />
          </div>
          {errors.title && (
            <span className="label-text-alt text-red-500 mt-2">
              Job title is required
            </span>
          )}

          <div className="mt-4">
            <label htmlFor="wage" className="block text-sm text-gray-800 ">
              Wage
            </label>
            <input
              type="number"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              {...register("wage", { required: true })}
            />
          </div>
          {errors.wage && (
            <span className="label-text-alt text-red-500 mt-2">
              Wage is required
            </span>
          )}

          {/* category */}
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <label
                htmlFor="category"
                className="block text-sm text-gray-800 "
              >
                Category
              </label>
            </div>
            <select
              className=" mt-2 select select-bordered w-full hover:outline-none focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              {...register("category", { required: true })}
            >
              <option disabled selected value="">
                Select Category
              </option>
              {services?.data?.map((service) => (
                <option key={service?._id} value={service?.name}>
                  {service?.name}
                </option>
              ))}
            </select>
            {errors.category && (
              <span className="label-text-alt text-red-500 mt-2">
                Category is required
              </span>
            )}
          </div>

          {/* status */}
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <label
                htmlFor="category"
                className="block text-sm text-gray-800 "
              >
                Status
              </label>
            </div>
            <select
              className=" mt-2 select select-bordered w-full hover:outline-none focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              {...register("status", { required: true })}
            >
              <option disabled selected value="">
                Select Status
              </option>
              <option value="open">Open</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
              <option value="canceled">Canceled</option>
              <option value="pending">Pending</option>
            </select>

            {errors.status && (
              <span className="label-text-alt text-red-500 mt-2">
                Status is required
              </span>
            )}
          </div>

          <div className="mt-4">
            <label htmlFor="location" className="block text-sm text-gray-800 ">
              Location
            </label>
            <input
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              {...register("location", { required: true })}
            />
          </div>
          {errors.location && (
            <span className="label-text-alt text-red-500 mt-2">
              Location is required
            </span>
          )}

          <div className="mt-4">
            <label
              htmlFor="description"
              className="block text-sm text-gray-800 "
            >
              Description
            </label>
            <textarea
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              {...register("description", { required: true })}
            />
          </div>
          {errors.description && (
            <span className="label-text-alt text-red-500 mt-2">
              Description is required
            </span>
          )}

          <div className="mt-6">
            <button className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-sky-500 rounded-lg hover:bg-sky-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
              Save
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddJobs;
