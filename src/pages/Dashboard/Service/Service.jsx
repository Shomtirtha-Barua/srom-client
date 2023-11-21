import moment from "moment";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaPercent, FaTrashCan } from "react-icons/fa6";
import { useQuery } from "react-query";
import Loader from "../../../components/Ui/Loader/Loader";
import AddService from "../AddService/AddService";

const Service = () => {
  // handle isHidden toggle state
  const [selectedToggleValue, setSelectedToggleValue] = useState(true);
  const [selectedDiscountModalId, setSelectedDiscountModalId] = useState(null);

  const {
    data: services,
    isLoading,
    refetch,
  } = useQuery("services", () =>
    fetch("http://localhost:5000/api/v1/service").then((res) => res.json())
  );

  // handle form hook
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm();

  // handle discount button
  const onSubmit = async (data) => {
    const discount = data.discount;
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/service/${selectedDiscountModalId}/setDiscount`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            discount,
          }),
        }
      );
      if (response.ok) {
        // success toast
        toast.success("Discount updated successfully");
        refetch();
        reset();
        // close modal
        document.getElementById("set-discount-modal").close();
      }
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  // handle Booking delete button
  const handleDeleteServiceBtn = (id) => {
    const confirm = window.confirm("Are you sure you want to Delete?");

    if (confirm) {
      fetch(`http://localhost:5000/api/v1/service/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            // success toast
            toast.success("Service deleted successfully");
            refetch();
          }
        });
    }
  };

  // handle isHidden toggle button
  const handleToggleChange = async (id) => {
    if (id !== null) {
      setSelectedToggleValue(!selectedToggleValue);

      const confirm = window.confirm(
        "Are you sure you want to toggle the value?"
      );

      if (confirm) {
        try {
          const response = await fetch(
            `http://localhost:5000/api/v1/service/${id}/toggleIsHidden`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                isHidden: selectedToggleValue,
              }),
            }
          );
          if (response.ok) {
            // success toast
            toast.success("Hidden status updated successfully");
            refetch();
          }
        } catch (error) {
          console.error("Error during API call:", error);
        }
      }
    }
  };

  return (
    <section>
      {/* header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Manage Service ({services?.data?.length})
        </h1>
        <button
          onClick={() =>
            document.getElementById("add-service-modal").showModal()
          }
          className="btn hover:bg-sky-400 hover:text-white"
        >
          Add Service
        </button>
      </div>

      {/* table */}
      <div className="overflow-x-auto mt-16 border rounded-lg shadow-sm">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="bg-sky-200 text-black">
              <th></th>
              <th>Name</th>
              <th>Price</th>
              <th>Discount</th>
              <th>Hide Status</th>
              <th>Created Time</th>
              <th>isHidden</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 2 */}
            {services?.data?.map((service, index) => (
              <tr className="hover:bg-sky-50" key={service._id}>
                <th>{index + 1}</th>
                <td>{service.name}</td>
                <td>{service.price}$</td>
                <td
                  className={
                    service?.discounts === 0 ? "text-red-500" : "text-green-500"
                  }
                >
                  {service?.discounts === 0
                    ? "No Discount"
                    : `${service.discounts}%`}
                </td>

                <td>
                  <div
                    className={`inline-block px-3 py-1 rounded-full text-sm ${
                      service?.isHidden
                        ? "bg-red-50 text-red-600"
                        : "bg-green-50 text-green-600"
                    }`}
                  >
                    {service.isHidden ? "Hidden" : "Visible"}
                  </div>
                </td>

                <td>
                  {moment(service.createdAt).format("YYYY-MM-DD HH:mm a")}
                </td>
                <td>
                  <input
                    type="checkbox"
                    id={`checkbox_${service._id}`}
                    className="toggle"
                    checked={service.isHidden || false}
                    onChange={() => handleToggleChange(service?._id)}
                  />
                </td>

                {/* action button here */}
                <td>
                  {/* set discount modal */}
                  <button
                    onClick={() => {
                      document.getElementById("set-discount-modal").showModal();
                      setSelectedDiscountModalId(service?._id);
                    }}
                    className="bg-blue-500 p-2 rounded shadow-lg mx-2 text-slate-200"
                  >
                    <FaPercent />
                  </button>

                  {/* delete button */}
                  <button
                    onClick={() => handleDeleteServiceBtn(service._id)}
                    className="bg-red-600 p-2 rounded shadow-lg text-slate-200"
                  >
                    <FaTrashCan />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/*add service modal */}
      <dialog id="add-service-modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div>
            <AddService></AddService>
          </div>
        </div>
      </dialog>

      {/*set discount modal */}
      <dialog id="set-discount-modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                type="text"
                placeholder="Set Discount"
                className="input input-bordered input-info w-full max-w-xs"
                {...register("discount", { required: true })}
              />

              <button className="text-lg px-5 py-1 bg-sky-400 ms-5 rounded shadow text-white">
                Save
              </button>

              <div>
                {errors.discount && (
                  <span className="label-text-alt text-red-500 mt-2">
                    Discount is required
                  </span>
                )}
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </section>
  );
};

export default Service;
