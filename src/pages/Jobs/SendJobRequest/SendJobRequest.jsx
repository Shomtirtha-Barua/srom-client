import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { auth } from "../../../config/firebase.init";

const SendJobRequest = () => {
  // get user info from firebase
  const [user] = useAuthState(auth);

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
    const postJobData = {
      title: data.title,
      description: data.description,
      category: data.category,
      userEmail: user?.email,
    };

    // send data to the server
    fetch("http://localhost:5000/api/v1/postAdmin", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(postJobData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          // success toast
          toast.success("Job Request Send Successfully");
          reset();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Send Request Failed");
      });
  };

  return (
    <div className="w-full max-w-lg p-6 m-auto mx-auto bg-white rounded-lg my-14 border">
      <div className="flex justify-center mx-auto">
        <h1 className="text-2xl font-bold text-sky-800">Send Job Request</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
        <div>
          <label htmlFor="title" className="block text-sm text-gray-800 ">
            Job Title
          </label>
          <input
            type="text"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            {...register("title", { required: true })}
          />
        </div>
        {errors.title && (
          <span className="label-text-alt text-red-500 mt-2">
            Job Title is required
          </span>
        )}

        <div className="mt-4">
          <div className="flex items-center justify-between">
            <label htmlFor="category" className="block text-sm text-gray-800 ">
              Category
            </label>
          </div>

          <input
            type="text"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            {...register("category", { required: true })}
          />
        </div>
        {errors.category && (
          <span className="label-text-alt text-red-500 mt-2">
            Category is required
          </span>
        )}

        <div className="mt-4">
          <label htmlFor="description" className="block text-sm text-gray-800 ">
            Description
          </label>
          <textarea
            type="text"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
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
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendJobRequest;
