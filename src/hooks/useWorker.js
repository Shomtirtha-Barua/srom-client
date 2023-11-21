import { useEffect, useState } from "react";

const useWorker = (user) => {
  const [worker, setWorker] = useState(false);

  useEffect(() => {
    const email = user?.email;
    if (email) {
      fetch(`http://localhost:5000/api/v1/worker/${email}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setWorker(data.admin);
        });
    }
  }, [user]);

  return [worker];
};

export default useWorker;
