import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaTrashCan } from "react-icons/fa6";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import Loader from "../../components/Ui/Loader/Loader";
import { auth } from "../../config/firebase.init";

const Carts = () => {
  // handle form hook
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  // get user info from firebase
  const [user] = useAuthState(auth);

  // set success data temp state
  const [paymentSuccessData, setPaymentSuccessData] = useState([]);

  // get current user from database
  const { data: currentUser, isLoading } = useQuery("currentUser", () =>
    fetch(`http://localhost:5000/api/v1/user/${user?.email}`).then((res) =>
      res.json()
    )
  );

  // initial state for job
  const [jobsArray, setJobsArray] = useState(
    JSON.parse(localStorage.getItem("jobs")) || []
  );

  // Function to remove a specific job from the cart
  const removeFromCart = (jobId) => {
    const updatedArray = jobsArray.filter((job) => job._id !== jobId);
    setJobsArray(updatedArray);
    localStorage.setItem("jobs", JSON.stringify(updatedArray));
  };

  // Use useEffect to update the state when local storage changes
  useEffect(() => {
    const storedArray = JSON.parse(localStorage.getItem("jobs")) || [];
    setJobsArray(storedArray);
  }, []);

  // Calculate total price (total wages)
  const totalWages = jobsArray.reduce((total, job) => {
    return total + job.wage;
  }, 0);

  // Calculate the service charge (5% of the total amount)
  const serviceChargePercentage = 5;
  const serviceCharge = (totalWages * serviceChargePercentage) / 100;

  // calculate final amount
  const finalAmount = totalWages + serviceCharge;

  // handle payment button
  const onSubmit = async (data) => {
    // modify data
    const paymentData = {
      customer: currentUser?.data?._id,
      items: jobsArray.map((job) => ({ job: job._id })),
      shippingAddress: data.shippingAddress,
      billingAddress: data.billingAddress,
      paymentMethod: data.paymentMethod,
      totalAmount: finalAmount,
      serviceCharge: serviceCharge,
      isPaid: true,
    };

    // send data to the server
    fetch("http://localhost:5000/api/v1/order/create", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(paymentData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          // set success data temp
          setPaymentSuccessData(data?.data);
          document.getElementById("order_success_modal").showModal();
          // Clear local storage
          localStorage.removeItem("jobs");
          reset();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Payment Failed");
      });
  };

  // is loading
  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="container mx-auto py-10">
      {jobsArray.length === 0 ? (
        <h1 className="text-center text-2xl text-red-500 py-20">
          Your cart is empty!
        </h1>
      ) : (
        <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
          <div className="max-w-lg mx-auto gap-12 justify-between lg:flex lg:max-w-none">
            <div className="max-w-lg space-y-3">
              {/* left side */}
              <div>
                {/* cart job data */}
                <div>
                  {jobsArray.map((job) => (
                    <div
                      className="flex justify-between bg-gray-50 p-4 w-80 rounded-lg mb-4 relative shadow-lg border border-sky-200"
                      key={job._id}
                    >
                      <div className="">
                        <p className="text-xl font-medium">{job.title}</p>
                        <p className="text-lg">{job.description}</p>
                        <p className="text-lg">Wage: ${job.wage}</p>
                      </div>

                      {/* remove from cart btn */}
                      <button
                        onClick={() => removeFromCart(job._id)}
                        className="bg-red-600 absolute right-5 top-1/2 -translate-y-1/2 p-2 w-8 h-8 rounded shadow-lg text-slate-200"
                      >
                        <FaTrashCan />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* right side */}
            <div className="flex-1 sm:max-w-lg lg:max-w-md">
              {/* cart header */}
              <div className="text-end">
                <h1 className="text-md">
                  Total Worker: <b>{jobsArray.length}</b>
                </h1>
                <h1 className="text-md">
                  Amount: <b>{totalWages ? totalWages : 0 }$</b>
                </h1>
                <h1 className="text-md text-red-600">
                  Service Charge (5%): <b>{serviceCharge ? serviceCharge : 0}$</b>
                </h1>
                <hr className="my-2" />
                <h1 className="text-lg font-bold">
                  Total Amount: {finalAmount}$
                </h1>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
                <div>
                  <label
                    htmlFor="shippingAddress"
                    className="block text-sm text-gray-800 "
                  >
                    Shipping Address
                  </label>
                  <input
                    type="text"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    {...register("shippingAddress", { required: true })}
                  />
                </div>
                {errors.shippingAddress && (
                  <span className="label-text-alt text-red-500 mt-2">
                    Shipping Address is required
                  </span>
                )}

                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="billingAddress"
                      className="block text-sm text-gray-800 "
                    >
                      Billing Address
                    </label>
                  </div>

                  <input
                    type="text"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    {...register("billingAddress", { required: true })}
                  />
                </div>
                {errors.billingAddress && (
                  <span className="label-text-alt text-red-500 mt-2">
                    Billing Address is required
                  </span>
                )}

                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="paymentMethod"
                      className="block text-sm text-gray-800 "
                    >
                      Payment Method
                    </label>
                  </div>
                  <select
                    className=" mt-2 select select-bordered w-full hover:outline-none focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    {...register("paymentMethod", { required: true })}
                  >
                    <option disabled selected value="">
                      Select Method
                    </option>
                    <option value="bKash">bKash</option>
                    <option value="Nagad">Nagad</option>
                    <option value="Rocket">Rocket</option>
                  </select>

                  {errors.paymentMethod && (
                    <span className="label-text-alt text-red-500 mt-2">
                      Payment Method is required
                    </span>
                  )}
                </div>

                <div className="mt-6">
                  <button className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-sky-500 rounded-lg hover:bg-sky-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                    Payment
                  </button>
                </div>
              </form>

              {/* Payment Success Modal */}
              <dialog
                id="order_success_modal"
                className="modal modal-bottom sm:modal-middle"
              >
                <div className="modal-box">
                  <h3 className="font-bold text-xl text-green-600 mb-4">
                    Payment Success!
                  </h3>
                  <div className="flex justify-between">
                    <div>
                      <p>Transaction Id:</p>
                      <p>Customer Id:</p>
                      <p>Shipping Address:</p>
                      <p>Billing Address:</p>
                      <p>Payment Method:</p>
                      <p>Total Amount:</p>
                      <p>Service Charge:</p>
                    </div>
                    <div>
                      <p><b>{paymentSuccessData._id}</b></p>
                      <p><b>{paymentSuccessData.customer}</b></p>
                      <p><b>{paymentSuccessData.shippingAddress}</b></p>
                      <p><b>{paymentSuccessData.billingAddress}</b></p>
                      <p><b>{paymentSuccessData.paymentMethod}</b></p>
                      <p><b>{paymentSuccessData.totalAmount}$</b></p>
                      <p><b>{paymentSuccessData.serviceCharge}$</b></p>
                    </div>
                  </div>
                  <div className="modal-action">
                    <Link to="/my-orders" className="btn btn-outline">
                      Go to Order Page
                    </Link>
                  </div>
                </div>
              </dialog>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Carts;
