import moment from "moment";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import Loader from "../../components/Ui/Loader/Loader";
import { auth } from "../../config/firebase.init";

const MyOrders = () => {
  // get user info from firebase
  const [user] = useAuthState(auth);

  const { data: orders, isLoading } = useQuery("orders", () =>
    fetch(`http://localhost:5000/api/v1/order/customer/${user?.email}`).then(
      (res) => res.json()
    )
  );

  // is loading
  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="container mx-auto pt-8 pb-16">
      {orders?.data?.length > 0 ? (
        <>
          {/* header */}
          <h1 className="text-2xl font-bold text-center mt-4">
            Total Orders ({orders?.data?.length || 0})
          </h1>

          {/* table */}
          <div className="overflow-x-auto mt-6 mb-10 border rounded-lg shadow-sm">
            <table className="table">
              {/* head */}
              <thead>
                <tr className="bg-sky-200 text-black">
                  <th>Transaction Id</th>
                  <th>Shipping Address</th>
                  <th>Billing Address</th>
                  <th>Total Amount</th>
                  <th>Service Charge</th>
                  <th>Payment Status</th>
                  <th>Payment Method</th>
                  <th>Ordered Time</th>
                </tr>
              </thead>
              <tbody>
                {orders?.data?.map((order) => (
                  <tr className="hover:bg-sky-50" key={order?._id}>
                    <td>{order?._id}</td>
                    <td>{order?.shippingAddress}</td>
                    <td>{order?.billingAddress}</td>
                    <td>{order?.totalAmount}$</td>
                    <td>{order?.serviceCharge}$</td>
                    <td>Paid</td>
                    <td>{order?.paymentMethod}</td>
                    <td>
                      {moment(order?.createdAt).format("YYYY-MM-DD HH:mm a")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <h1 className="text-2xl text-red-500 font-bold text-center my-28">
          Total Orders ({orders?.data?.length || 0})
        </h1>
      )}
    </section>
  );
};

export default MyOrders;
