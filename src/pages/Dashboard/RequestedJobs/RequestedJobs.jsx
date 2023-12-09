import moment from "moment";
import { useQuery } from "react-query";
import Loader from "../../../components/Ui/Loader/Loader";

const RequestedJobs = () => {
  const { data: jobs, isLoading } = useQuery("jobs", () =>
    fetch("http://localhost:5000/api/v1/job/requested").then((res) =>
      res.json()
    )
  );

  const requestedJobs = jobs?.data.filter((job) => job?.status === "requested");

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section>
      {/* header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Requested Jobs ({requestedJobs?.length})
        </h1>
      </div>

      {/* table */}
      <div className="overflow-x-auto mt-16 border rounded-lg shadow-sm">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="bg-sky-200 text-black">
              <th></th>
              <th>Name</th>
              <th>Desc</th>
              <th>Category</th>
              <th>Customer Name</th>
              <th>Customer Email</th>
              <th>Requested Date</th>
            </tr>
          </thead>
          <tbody>
            {/* row 2 */}
            {requestedJobs?.map((job, index) => (
              <tr className="hover:bg-sky-50" key={job?._id}>
                <th>{index + 1}</th>
                <td>{job?.title}</td>
                <td>{job?.description}</td>
                <td>{job?.category}</td>
                <td>{job?.customer?.username}</td>
                <td>{job?.customer?.email}</td>
                <td>{moment(job?.createdAt).format("YYYY-MM-DD HH:mm a")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default RequestedJobs;
