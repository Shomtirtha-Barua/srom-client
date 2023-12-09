const JobCardItems = ({job}) => {
    const {title, description, wage, status} = job
  return (
    <div className="m-2">
      <div className="container mx-auto p-4 bg-slate-100 max-w-sm  rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-500">
        {/* <img className="rounded-xl" src="" alt="img" /> */}
        <div className="">
          <div>
            <h1 className="mt-2 text-xl font-medium">{title}</h1>
            <p className="mt-1">{description}</p>
            <p>Wage: {wage}</p>
            <p>Status: {status}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCardItems;
