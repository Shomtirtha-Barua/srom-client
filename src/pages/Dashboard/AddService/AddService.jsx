import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const AddService = () => {
  // handle form hook
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  // handle save button
  const onSubmit = async (data) => {
    // modify data
    const serviceData = {
      name: data.name,
      description: data.description,
      price: data.price,
      discounts: data.discounts === "" ? 0 : data.discounts,
    };

    // send data to the server
    fetch("http://localhost:5000/api/v1/service", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(serviceData),
    })
      .then((response) => response.json())
      .then((data) => {
        // You can check if 'data' exists, then show a success toast and close the modal.
        if (data) {
          // success toast
          toast.success("Service added successfully");
          // close modal
          document.getElementById("add-service-modal").close();
        }
      })
      .catch((error) => {
        // Handle any errors that may occur during the fetch request.
        console.error("Error:", error);

        // Show an error toast with the error message.
        toast.error("An error occurred while adding the service.");
      });
  };

  return (
    <section>
      <div className="w-full">
        <div className="flex justify-center mx-auto">
          <h1 className="text-2xl font-bold text-sky-800">Add Service</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
          <div>
            <label htmlFor="name" className="block text-sm text-gray-800 ">
              Service Name
            </label>
            <input
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              {...register("name", { required: true })}
            />
          </div>
          {errors.name && (
            <span className="label-text-alt text-red-500 mt-2">
              Service Name is required
            </span>
          )}

          <div className="mt-4">
            <label htmlFor="price" className="block text-sm text-gray-800 ">
              Price
            </label>
            <input
              type="number"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              {...register("price", { required: true })}
            />
          </div>
          {errors.price && (
            <span className="label-text-alt text-red-500 mt-2">
              Price is required
            </span>
          )}

          <div className="mt-4">
            <div className="flex items-center justify-between">
              <label
                htmlFor="discount"
                className="block text-sm text-gray-800 "
              >
                Discount
              </label>
            </div>

            <input
              type="number"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              {...register("discounts")}
            />
          </div>

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

export default AddService;
