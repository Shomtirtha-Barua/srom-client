import plumber from "../../../assets/images/plumber.jpg";

const CardItems = ({ service }) => {
  return (
    <>
      <div className="m-2">
        <div className="container mx-auto p-4 bg-white max-w-sm  rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-500">
          <img className="rounded-xl" src={plumber} alt="img" />
          <div className="flex justify-between">
            <div>
              <h1 className="mt-2 text-xl font-medium">{service?.name}</h1>
              <p className="mt-1">
                Discount:{" "}
                {service?.discounts}%
              </p>
            </div>
            <div className="mt-3">
              <p>{service?.price} TK</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardItems;
