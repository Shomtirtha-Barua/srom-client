import moment from "moment";
import { Link } from "react-router-dom";
import handleAddToCart from "../../../helper/addToCart";

const JobCard = ({ job }) => {
  const {
    _id,
    title,
    description,
    wage,
    category,
    status,
    location,
    worker,
    updatedAt,
  } = job;

  return (
    <div className="px-8 py-4 bg-slate-200 rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <span className="text-sm font-normal text-sky-500">
          {moment(updatedAt).format("Do MMM, YY")}
        </span>
        <button
          onClick={() => handleAddToCart(job)}
          className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-300 transform bg-gray-600 rounded"
        >
          Hire Worker
        </button>
      </div>

      <div className="mt-2">
        <Link to={`/job/${_id}`}>
          <h1 className="text-xl font-bold text-gray-700 hover:underline hover:text-sky-500">
            {title}
          </h1>
        </Link>
        <p className="mt-2 text-gray-600 font-bold">$ {wage}</p>
        <p className={`mt-2 ${status === "open" ? 'text-emerald-500' : `${status === "hired" ? 'text-yellow-600' : 'text-zinc-400' }`} font-bold`}>{status}</p>
        <p className="mt-2 text-gray-600 font-bold">{location}</p>
        <p className="mt-2 text-gray-600 font-bold">{category}</p>
      </div>

      <hr className="mt-8" />

      <div className="flex items-center">
        <div>
          <p className="font-bold text-gray-700">{worker?.username}</p>{" "}
          <p className="text-gray-700">{worker?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
