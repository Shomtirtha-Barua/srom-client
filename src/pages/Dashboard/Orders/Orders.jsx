import moment from "moment";
import { useQuery } from "react-query";
import Loader from "../../../components/Ui/Loader/Loader";

const Orders = () => {
  const { data: orders, isLoading } = useQuery("orders", () =>
    fetch("http://localhost:5000/api/v1/order").then((res) => res.json())
  );

  // is loading
  if (isLoading) {
    return <Loader />;
  }

  return (
    <section>
      {/* header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          Total Orders ({orders?.data.length})
        </h1>
      </div>

      {/* table */}
      <div className="overflow-x-auto mt-16 border rounded-lg shadow-sm">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="bg-sky-200 text-black">
              <th>No.</th>
              <th>Transaction Id.</th>
              <th>Customer Info</th>
              <th>Total Worker</th>
              <th>Total Amount</th>
              <th>Service Charge</th>
              <th>Payment Status</th>
              <th>Payment Method</th>
              <th>Ordered Time</th>
            </tr>
          </thead>
          <tbody>
            {orders?.data?.map((order, index) => (
              <tr className="hover:bg-sky-50" key={order?._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="overflow-y-auto w-24">{order?._id}</div>
                </td>
                <td>
                  <div className="overflow-y-auto w-28">
                    <p>{order?.customer?.username}</p>
                    <p>{order?.customer?.email}</p>
                  </div>
                </td>
                <td>{order?.items.length}</td>
                <td>{order?.totalAmount}$</td>
                <td>{order?.serviceCharge}$</td>
                <td>
                  <span className="bg-green-100 text-green-600 font-bold px-3 py-1 rounded">
                    Paid
                  </span>
                </td>
                <td>
                  <span className="bg-blue-200 text-blue-600 font-bold px-3 py-1 rounded">
                    {order?.paymentMethod}
                  </span>
                </td>

                <td>{moment(order?.createdAt).format("YYYY-MM-DD HH:mm a")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Orders;
