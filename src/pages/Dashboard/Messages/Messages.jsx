import moment from "moment/moment";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import Loader from "../../../components/Ui/Loader/Loader";
import { auth } from "../../../config/firebase.init";

const Messages = () => {
  // get user info from firebase
  const [user] = useAuthState(auth);

  // handle chat and chat info state
  const [chatToggle, setChatToggle] = useState(false);
  const [chatInfo, setChatInfo] = useState(null);

  // handle form data
  const { register, handleSubmit, reset } = useForm();

  // get all users
  const { data: users, isLoading } = useQuery(
    "users",
    () => fetch("http://localhost:5000/api/v1/user").then((res) => res.json()),
    {
      refetchInterval: 60000, // Refetch every 60 seconds
    }
  );

  // get one user
  const { data: singleUser } = useQuery(
    "singleUser",
    () =>
      fetch(`http://localhost:5000/api/v1/user/${user?.email}`).then((res) =>
        res.json()
      ),
    {
      refetchInterval: 60000, // Refetch every 60 seconds
    }
  );

  const { data: conversations, messageLoading } = useQuery(
    "conversations",
    () =>
      fetch(`http://localhost:5000/api/v1/messages`).then((res) => res.json()),
    {
      refetchInterval: 500, // Refetch every 0.5 seconds
    }
  );

  // is loading
  if (isLoading || messageLoading) {
    return <Loader />;
  }

  // filter only customer data
  const filterCustomerData = users?.data.filter(
    (item) => item.role === "customer"
  );

  // handle chat button
  const handleChatBtn = (customerId, customerName, customerEmail) => {
    const chatInfo = {
      senderId: singleUser?.data?._id,
      customerId: customerId,
      customerName,
      customerEmail,
    };
    setChatInfo(chatInfo);
    setChatToggle(true);
  };

  // handle send message
  const onSubmit = async (data) => {
    const chatData = {
      senderId: chatInfo?.senderId,
      customerId: chatInfo?.customerId,
      messageContent: data.content,
    };

    // send data to the server
    fetch(`http://localhost:5000/api/v1/messages/customer`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(chatData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          reset();
        }
      });
  };

  // filtered message
  const filteredMessages = conversations?.data.filter((message) => {
    const isSenderMatch =
      message.sender._id === chatInfo?.senderId &&
      message.recipient._id === chatInfo?.customerId;
    const isReceiverMatch =
      message.sender._id === chatInfo?.customerId &&
      message.recipient._id === chatInfo?.senderId;

    return isSenderMatch || isReceiverMatch;
  });

  return (
    <div>
      <div className="grid grid-cols-4 sm:grid-cols-12 gap-6">
        {/* chat list */}
        <div className="col-span-4 sm:col-span-3">
          <div className="bg-gray-100 shadow rounded-lg p-2">
            <h3 className="text-sky-600 text-lg font-bold ml-2 mb-5">
              Customer List
            </h3>
            <div className="h-[550px] overflow-y-auto">
              {filterCustomerData.map((customer) => (
                <div
                  onClick={() =>
                    handleChatBtn(
                      customer?._id,
                      customer?.username,
                      customer?.email
                    )
                  }
                  key={customer._id}
                  className="rounded-md overflow-hidden w-full mb-3"
                >
                  <div className="w-full bg-white rounded-lg px-2 py-2 cursor-pointer hover:bg-gray-50">
                    <h3 className="text-base font-medium text-gray-800">
                      {customer.username}
                    </h3>
                    <p className="text-gray-600 text-sm">{customer.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* conversation */}
        {chatToggle ? (
          <div className="col-span-4 sm:col-span-9">
            <div className="bg-gray-200 shadow rounded-lg">
              <div>
                <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6 px-4 border rounded-t-lg bg-blue-50">
                  <div className="py-2">
                    <p className="text-xl font-medium text-black">
                      {chatInfo?.customerName}
                    </p>
                    <p className="text-sm text-gray-400">
                      {chatInfo?.customerEmail}
                    </p>
                  </div>
                </div>

                <div className="p-6 h-[450px] overflow-y-auto">
                  {filteredMessages?.map((message, index) => (
                    <div
                      key={index}
                      className={`${
                        message.sender._id === chatInfo.senderId
                          ? "flex flex-wrap justify-end"
                          : "flex flex-wrap justify-start"
                      } ${
                        index === 0
                          ? "chat-start"
                          : index === filteredMessages.length - 1
                          ? "chat-end"
                          : ""
                      }`}
                    >
                      <div className="chat-image avatar"></div>

                      <div
                        className={`${
                          message.sender._id === chatInfo.senderId
                            ? "bg-blue-500 text-white"
                            : "bg-gray-300 text-gray-800"
                        } rounded-md p-2 my-2 max-w-3/4`}
                      >
                        {message.content}
                        <div
                          className={`chat-footer opacity-50 ${
                            message.sender._id === chatInfo.senderId
                              ? "text-end"
                              : "text-start"
                          }`}
                        >
                          {message.sender.username}
                          <time className="text-xs opacity-80 ml-1">
                            {moment(message.createdAt).format("LT")}
                          </time>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* chat input */}
                <div className="p-6 rounded-b-lg">
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="items-center justify-center sm:flex"
                  >
                    <input
                      {...register("content", { required: true })}
                      type="text"
                      placeholder="Write message"
                      className="text-gray-500 w-full p-3 rounded-md border outline-none focus:border-indigo-600"
                    />
                    <button className="w-full mt-3 px-5 py-3 rounded-md text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 duration-150 outline-none shadow-md focus:shadow-none focus:ring-2 ring-offset-2 ring-indigo-600 sm:mt-0 sm:ml-3 sm:w-auto">
                      Send
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <h1>No chats available</h1>
        )}
      </div>
    </div>
  );
};

export default Messages;
