import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import Loader from "../../../components/Ui/Loader/Loader";
import Banner from "../Banner/Banner";
import CardItems from "../CardItems/CardItems";
import JobCardItems from "../JobCardItems/JobCardItems";

const Home = () => {
  const { data: services, isLoading } = useQuery("products", () =>
    fetch("http://localhost:5000/api/v1/service").then((res) => res.json())
  );

  const { data: jobs } = useQuery("jobs", () =>
    fetch("http://localhost:5000/api/v1/job").then((res) => res.json())
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div>
        <Banner></Banner>
      </div>
      <div className=" w-10/12 mx-auto  my-24">
        <div className="text-2xl font-semibold ps-3 py-5 text-blue-500">
          <h2>Featured Services</h2>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {services?.data?.map((service, index) => (
            <CardItems key={index} service={service} />
          ))}
        </div>
      </div>
      <div className="w-10/12 mx-auto  my-24">
        <div className="text-2xl font-semibold ps-3 py-5 text-blue-500">
          <h2>Featured Jobs</h2>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {jobs?.data?.map((job, index) => (
            <JobCardItems key={index} job={job} />
          ))}
        </div>
        <div className="text-center my-8">
          <Link
            to="/all-jobs"
            className="btn border border-sky-300 hover:bg-sky-300 hover:text-white"
          >
            More Jobs
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
