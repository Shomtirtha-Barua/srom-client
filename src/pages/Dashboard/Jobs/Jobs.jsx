import moment from "moment";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { FaTrashCan } from "react-icons/fa6";
import { useQuery } from "react-query";
import Loader from "../../../components/Ui/Loader/Loader";
import { auth } from "../../../config/firebase.init";
import AddJobs from "../AddJobs/AddJobs";

const Jobs = () => {
  // get user info from firebase
  const [user] = useAuthState(auth);

  const {
    data: jobs,
    isLoading,
    refetch,
  } = useQuery(
    "jobs",
    () => fetch("http://localhost:5000/api/v1/job").then((res) => res.json()),
    {
      refetchInterval: 60000, // Refetch every 60 seconds
    }
  );

  // is loading
  if (isLoading) {
    return <Loader />;
  }

  // handle delete button
  const handleDeleteJobBtn = (id) => {
    const confirm = window.confirm("Are you sure you want to Delete?");

    if (confirm) {
      fetch(`http://localhost:5000/api/v1/job/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            // success toast
            toast.success("Job deleted successfully");
            refetch();
          }
        });
    }
  };

  return (
    <section>
      {/* header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Manage Jobs ({jobs?.data?.length})
        </h1>
        <button
          onClick={() => document.getElementById("add-job-modal").showModal()}
          className="btn hover:bg-sky-400 hover:text-white"
        >
          Add Job
        </button>
      </div>

      {/* table */}
      <div className="overflow-x-auto mt-16 border rounded-lg shadow-sm">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="bg-sky-200 text-black">
              <th>No.</th>
              <th>Job Title</th>
              <th>Wage</th>
              <th>Category</th>
              <th>Location</th>
              <th>Status</th>
              <th>Worker Name</th>
              <th>Worker Email</th>
              <th>Created Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {jobs?.data?.map((job, index) => (
              <tr className="hover:bg-sky-50" key={job?._id}>
                <th>{index + 1}</th>
                <td>{job?.title}</td>
                <td>{job?.wage}$</td>
                <td>{job?.category}</td>
                <td>{job?.location}</td>
                <td>{job?.status}</td>
                <td>{job?.worker?.username}</td>
                <td>{job?.worker?.email}</td>
                <td>{moment(job.createdAt).format("YYYY-MM-DD HH:mm a")}</td>

                {/* action button here */}
                <td>
                  {user?.email === job?.worker?.email && (
                    <button
                      onClick={() => handleDeleteJobBtn(job._id)}
                      className="bg-red-600 p-2 rounded shadow-lg text-slate-200"
                    >
                      <FaTrashCan />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/*add job modal */}
      <dialog id="add-job-modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div>
            <AddJobs></AddJobs>
          </div>
        </div>
      </dialog>
    </section>
  );
};

export default Jobs;
