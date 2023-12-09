import moment from "moment";
import { useQuery } from "react-query";
import Loader from "../../../components/Ui/Loader/Loader";
import { FaDownload } from "react-icons/fa6";

const TotalExpense = () => {
  const { data: orders, isLoading } = useQuery("orders", () =>
    fetch("http://localhost:5000/api/v1/order").then((res) => res.json())
  );

  // is loading
  if (isLoading) {
    return <Loader />;
  }

  // Initialize variables to store totalAmount and serviceCharge
  let totalAmount = 0;
  let totalServiceCharge = 0;

  // Check if data is available and not loading
  if (!isLoading && orders) {
    orders?.data.forEach((order) => {
      totalAmount += order.totalAmount;
      totalServiceCharge += order.serviceCharge;
    });
  }

  return (
    <section>
      {/* header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Expanses Report ({orders?.data?.length})
        </h1>
        <button
          onClick={() => window.print()}
          className="btn hover:bg-sky-400 hover:text-white print:hidden"
        >
          <FaDownload />
          Report
        </button>
      </div>

      <div className="print:block">
        <div className="flex items-center justify-between mt-8 mb-4">
          <h1>
            Total Expense:{" "}
            <span className="font-semibold text-lg">
              {totalAmount.toFixed(2)}$
            </span>
          </h1>
          <h1>
            Total Service Charge:{" "}
            <span className="font-semibold text-lg">
              {totalServiceCharge.toFixed(2)}$
            </span>
          </h1>
        </div>
        <hr />

        {/* table */}
        <div className="overflow-x-auto mt-8 border rounded-lg shadow-sm">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="bg-sky-200 text-black">
                <th>No.</th>
                <th>Transaction Id</th>
                <th>Amount</th>
                <th>Service Charge</th>
                <th>Payment Method</th>
                <th>Purchase Time</th>
              </tr>
            </thead>
            <tbody>
              {orders?.data?.map((order, index) => (
                <tr className="hover:bg-sky-50" key={order?._id}>
                  <th>{index + 1}</th>
                  <td>{order?._id}$</td>
                  <td>{order?.totalAmount}$</td>
                  <td>{order?.serviceCharge}$</td>
                  <td>
                    <span className="bg-blue-200 text-blue-600 font-bold px-3 py-1 rounded">
                      {order?.paymentMethod}
                    </span>
                  </td>

                  <td>
                    {moment(order?.createdAt).format("YYYY-MM-DD HH:mm a")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default TotalExpense;
