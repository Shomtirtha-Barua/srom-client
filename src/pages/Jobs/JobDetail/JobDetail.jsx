import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Loader from "../../../components/Ui/Loader/Loader";
import handleAddToCart from "../../../helper/addToCart";

const JobDetail = () => {
  // get job id from params
  const { id } = useParams();

  // get data
  const { data: job, isLoading } = useQuery("job", () =>
    fetch(`http://localhost:5000/api/v1/job/${id}`).then((res) => res.json())
  );

  if (isLoading) {
    return <Loader />;
  }

  console.log(job.data);

  return (
    <section>
      <div className="py-24">
        <div className="card w-96 mx-auto bg-base-100 shadow-xl border border-sky-300">
          <div className="card-body">
            <span
              className={`text-sm ${
                job?.data?.status === "open"
                  ? "text-emerald-500"
                  : `${
                      job?.data?.status === "hired"
                        ? "text-yellow-600"
                        : "text-zinc-400"
                    }`
              } font-bold`}
            >
              {job?.data?.status}
            </span>
            <div className="flex justify-between">
              <h2 className="card-title">{job?.data?.title}</h2>
              <span className="card-title font-normal">${job?.data?.wage}</span>
            </div>
            <div className="flex justify-between">
              <span>{job?.data?.worker.username}</span>
              <span>{job?.data?.worker.email}</span>
            </div>
            <p>{job?.data?.description}</p>
            <div className="card-actions justify-end">
              <button
                onClick={() => handleAddToCart(job?.data)}
                className="btn bg-sky-500 text-white hover:bg-sky-600"
              >
                Hire Worker
              </button>
            </div>
          </div>
        </div>
        <h2 className="font-bold"></h2>
      </div>
    </section>
  );
};

export default JobDetail;
