import { getUserPayment, DeletePayment } from "@/apis/personalpayment";
import { Button } from "@/components/ui/button";

import { useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";
import { toast } from "sonner";

function Dashboard() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState({});

  const fetchPayment = async () => {
    setLoading(true);

    const { data, error } = await getUserPayment();

    if (error) {
      console.error("Error fetching payments:", error);
      toast.error("Failed to fetch payments");
    } else {
      setPayments(data || []);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchPayment();
  }, []);

  async function handleDeletePayment(id) {
    setDeleteLoading((prev) => ({ ...prev, [id]: true }));
    const { data, error } = await DeletePayment(id);
    if (data) {
      toast.success("Payment deleted successfully");
      fetchPayment();
    }
    if (error) {
      toast.error("Payment failed to delete");
    }

    setDeleteLoading((prev) => ({ ...prev, [id]: false }));
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-white text-2xl font-montserrat">Dashboard</h1>
      <div className="text-white bg-[#ccc4c433] p-6 rounded-lg shadow-lg w-full">
        <h2 className="text-white text-2xl font-bold text-center font-montserrat mb-4">
          Personal History
        </h2>

        {loading ? (
          <div className="flex justify-center items-center">
            <SyncLoader color="#fff" />
          </div>
        ) : (
          <>
            {/* Header Row */}
            <div className="grid grid-cols-4 gap-4 font-semibold border-b border-white pb-2 mb-2">
              <span>Title</span>
              <span>Amount</span>
              <span>Date</span>
              <span>Action</span>
            </div>

            {/* Data Rows */}
            <ul className="flex flex-col gap-2">
              {payments.map((payment) => (
                <li
                  key={payment.id}
                  className="grid grid-cols-4 gap-4 items-center border-b border-[#ffffff33] py-2"
                >
                  <p>{payment.title}</p>
                  <p>{Number(payment.amount).toFixed(2)}</p>
                  <p>{payment.when}</p>
                  <Button
                    variant="destructive"
                    onClick={() => handleDeletePayment(payment.id)}
                    disabled={deleteLoading[payment.id]}
                  >
                    {deleteLoading[payment.id] ? (
                      <SyncLoader color="#fff" size={6} />
                    ) : (
                      "Delete"
                    )}
                  </Button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <div className="text-white bg-[#ccc4c433] p-6 rounded-lg shadow-lg w-full">
        <h2 className="text-white text-2xl font-bold text-center font-montserrat mb-4">
          {" "}
          Split Bills History
        </h2>
        <p>will be implimented later</p>
      </div>
    </div>
  );
}

export default Dashboard;
