import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteFriend } from "@/apis/friends";
import {
  DeletePayment,
  friend_payment,
  getHistory,
} from "@/apis/friendpayment";
import { SyncLoader } from "react-spinners";
import { toast } from "sonner";

function Details({ friend }) {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    when: "",
    whoPaid: "",
  });

  const [isDelteLoading, setIsDeleteLoading] = useState(false);
  async function handleDelete() {
    setIsDeleteLoading(true);
    const { data, error } = await deleteFriend(friend.id);
    if (error) {
      toast.error("Friend deletion failed");
    } else {
      toast("Friend deleted successfully");
    }
    setIsDeleteLoading(false);
  }

  function handleChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  const [isLoadingPayment, setIsLoadingPayment] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoadingPayment(true);

    const { data, error } = await friend_payment({
      data: formData,
      friend: friend,
    });
    if (error) {
      console.log("Error adding payment:", error);
      toast.error("Payment failed to add");
    } else {
      toast("Payment added successfully");
      viewHistory();
    }
    setIsLoadingPayment(false);
  }

  async function handleDeletePayment(id) {
    const { data, error } = await DeletePayment(id);
    if (error) {
      toast.error("Payment deletion failed");
    } else {
      toast("Payment deleted successfully");
      viewHistory();
    }
  }

  const [history, setHistory] = useState([]);
  const [remaining, setRemaining] = useState(0);

  async function viewHistory() {
    const { data, error } = await getHistory(friend.id);
    if (error) {
      console.error("Error fetching payment history:", error);
    } else {
      setHistory(data);
      const totalPaid = data.reduce((acc, payment) => {
        return acc + (!payment.paid_by ? payment.amount : 0);
      }, 0);
      const totalOwed = data.reduce((acc, payment) => {
        return acc + (payment.paid_by ? payment.amount : 0);
      }, 0);
      const total = totalPaid - totalOwed;
      setRemaining(total);
    }
  }

  useEffect(() => {
    viewHistory();
  }, []);

  return (
    <div className="flex flex-col md:flex-row w-[100%] items-center justify-center gap-3 md:gap-5 border border-slate-950 rounded-xl p-3 md:p-5 bg-[#bec0c42b]">
      {/* Avatar & Name */}
      <div className="flex items-center gap-3 md:gap-5">
        <img
          src={`https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(
            friend.friend_details.name
          )}`}
          alt="Avatar"
          className="h-[40px] w-[40px] md:h-[50px] md:w-[50px] object-cover rounded-3xl transition-all duration-300 ease-in-out hover:scale-110"
        />

        <h2 className="text-white font-semibold text-lg md:text-xl">
          {friend.friend_details.name}
        </h2>
      </div>

      {/* Status Message */}
      <p className="text-white text-sm md:text-sm text-center">
        {remaining > 0
          ? `You owe them ${Math.abs(remaining).toFixed(2)} ₹`
          : `They owe you  ₹${Math.abs(remaining).toFixed(2)}`}
      </p>

      {/* Buttons */}
      <div className="flex items-center justify-center gap-3 md:gap-5">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="bg-green-500 text-white hover:bg-green-600"
            >
              Add Payment
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4">
            <h4 className="font-medium text-lg mb-2">Add Payment</h4>
            <form onSubmit={handleSubmit} className="grid gap-4">
              {/* Title Field */}
              <div className="grid gap-1">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Amount Field */}
              <div className="grid gap-1">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* When Field */}
              <div className="grid gap-1">
                <Label htmlFor="when">When</Label>
                <Input
                  id="when"
                  name="when"
                  type="date"
                  value={formData.when}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Who Paid Field */}
              <div className="grid gap-2">
                <Label>Who Paid?</Label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="whoPaid"
                      value="TRUE"
                      checked={formData.whoPaid === "TRUE"}
                      onChange={handleChange}
                      className="cursor-pointer"
                    />
                    Me
                  </label>
                  <label className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="whoPaid"
                      value="FALSE"
                      checked={formData.whoPaid === "FALSE"}
                      onChange={handleChange}
                      className="cursor-pointer"
                    />
                    {friend.friend_details.name}
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600"
              >
                {isLoadingPayment ? <SyncLoader size={8} /> : <p> Submit</p>}
              </Button>
            </form>
          </PopoverContent>
        </Popover>

        <Button
          variant="destructive"
          className="text-sm md:text-base px-3 md:px-5 py-1 md:py-2"
          onClick={() => handleDelete()}
        >
          Delete Friend
        </Button>
      </div>

      {/* Payment History Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" onClick={() => viewHistory()}>
            View History
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Payment History</DialogTitle>
            <DialogDescription>
              Here are all the past payments made.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {history.length > 0 ? (
              history.map((payment) => (
                <div
                  key={payment.id}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    payment.paid_by === true ? "bg-green-500" : "bg-red-700"
                  }`}
                >
                  <div>
                    <p className="text-white font-medium">{payment.title}</p>
                    <p className="text-slate-100 text-sm">
                      ₹{payment.amount.toFixed(2)} - {payment.when}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="destructive"
                    className={`${
                      payment.paid_by === true ? "bg-green-900" : "bg-red-500"
                    }`}
                    onClick={() => handleDeletePayment(payment.id)}
                  >
                    Delete
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-center">No payment history.</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Details;
