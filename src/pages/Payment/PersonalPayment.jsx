import ScrollImageChange from "@/components/ImageScroll1";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { addPayment, DeletePayment } from "@/apis/personalpayment";
import supabase from "../../../utils/supabase";
const imageList = ["/gx4.png", "/ex6.png"];

function PersonalPayment() {
  async function handleSubmit(e) {
    e.preventDefault();

    const { data, error } = await addPayment(formData);
    if (data) {
      toast.success("payment added successfully");
    }
    if (error) {
      toast.error("payment failed to add");
    }
  }

  const todayDate = new Date().toISOString().split("T")[0];

  const [currUser, setcurrUser] = useState(null);
  const [formData, setFormData] = useState({
    user_id: "",
    title: "",
    amount: "",
    type: "",
    category: "Can't tell",
    payment_method: "",
    when: todayDate,
    reoccuring: false,
    auto_add: false,
  });

  // Fetch user on mount
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        console.error("Error fetching user:", error.message);
        return;
      }

      setcurrUser(user.id); // ✅ Set user ID after fetching
    };

    getUser();
  }, []);

  // Update formData when currUser changes
  useEffect(() => {
    if (currUser) {
      setFormData((prev) => ({ ...prev, user_id: currUser }));
    }
  }, [currUser]); // ✅ Runs only when currUser is updated

  function handleChange(e) {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }

  return (
    <div className="flex min-h-screen w-full  ">
      {/* Left Side - Scrolling Images (30%) */}
      <div className="w-[40%] flex items-center justify-center p-4">
        <ScrollImageChange images={imageList} scrollStep={150} />
      </div>

      {/* Right Side - Form (70%) */}
      <div className="w-[60%] flex items-center justify-center p-6">
        <form
          className="w-full max-w-lg flex flex-col items-center justify-center gap-15"
          onSubmit={(e) => handleSubmit(e)}
        >
          {/* top form  */}
          <div className="bg-[#ccc4c433] p-8 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-regular text-white mb-6 text-center">
              BASIC EXPENSE DETAILS
            </h2>

            {/* Title Input */}
            <label className="text-white block mb-2">Title</label>
            <input
              type="text"
              placeholder="What was the bill for?"
              className="w-full p-2 bg-[#BBBBBB4D] text-white placeholder-[#b5b5b5] border border-[#888888] rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
            />

            {/* Amount and Type */}
            <div className="flex gap-4 mt-4">
              <div className="flex-1">
                <label className="text-white block mb-2">Amount</label>
                <input
                  type="number"
                  placeholder="Enter amount"
                  className="w-full p-2 bg-[#BBBBBB4D] text-white placeholder-[#b5b5b5] border border-[#888888] rounded-md focus:outline-none focus:ring-2 focus:ring-white"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex-1">
                <label className="text-white block mb-2">Type</label>
                <select
                  className="w-full p-2 bg-[#BBBBBB4D] text-white border border-[#888888] rounded-md focus:outline-none focus:ring-2 focus:ring-white"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled className="text-gray-400">
                    Select type
                  </option>
                  <option className="text-black">Income</option>
                  <option className="text-black">Expense</option>
                </select>
              </div>
            </div>

            {/* Category and Payment Method */}
            <div className="flex gap-4 mt-4">
              <div className="flex-1">
                <label className="text-white block mb-2">Category</label>
                <select
                  className="w-full p-2 bg-[#BBBBBB4D] text-white border border-[#888888] rounded-md focus:outline-none focus:ring-2 focus:ring-white"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled className="text-gray-400">
                    Select category
                  </option>
                  <option className="text-black">Select</option>
                  <option className="text-black">Lifestyle and Personal</option>
                  <option className="text-black">Housing and bills</option>
                  <option className="text-black">Food and entertainment</option>
                  <option className="text-black">Travel</option>
                  <option className="text-black">Education</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="text-white block mb-2">Payment Method</label>
                <select
                  className="w-full p-2 bg-[#BBBBBB4D] text-white border border-[#888888] rounded-md focus:outline-none focus:ring-2 focus:ring-white"
                  name="payment_method"
                  value={formData.payment_method}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled className="text-gray-400">
                    payment method
                  </option>
                  <option className="text-black">Cash</option>
                  <option className="text-black">Credit Card</option>
                  <option className="text-black">UPI</option>
                </select>
              </div>
            </div>
          </div>
          {/* top form  */}

          {/* middle form  */}
          <div className="bg-[#ccc4c433] p-8 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-regular text-white mb-6 text-center">
              WHEN?
            </h2>

            {/* Title Input */}
            <label className="text-white block mb-2">Date</label>
            <input
              type="date"
              placeholder="enter date in dd/mm/yyyy format"
              className="w-full p-2 bg-[#BBBBBB4D] text-white placeholder-[#b5b5b5] border border-[#888888] rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              name="when"
              value={formData.when}
              required
              onChange={handleChange}
            />

            {/* Amount and Type */}
            <div className="flex gap-4 mt-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={formData.reoccuring}
                    onCheckedChange={(checked) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        reoccuring: checked,
                      }))
                    }
                  />
                  <Label
                    className="text-white block mb-2 font-normal"
                    htmlFor=""
                  >
                    is this a reoccuring bill?
                  </Label>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={formData.auto_add}
                    onCheckedChange={(checked) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        auto_add: checked,
                      }))
                    }
                  />
                  <Label
                    className="text-white block mb-2 font-normal"
                    htmlFor=""
                  >
                    Do you like to a add this bill ?
                  </Label>
                </div>
              </div>
            </div>
          </div>
          {/* last summary  */}
          <div className="bg-[#ccc4c433] p-6 mt-6 rounded-lg shadow-lg text-white w-full">
            <h3 className="text-xl font-medium mb-4 text-center">Summary</h3>
            <p className="mb-2">
              <strong>Title: </strong>
              {formData.title}
            </p>
            <p className="mb-2">
              <strong>Date: </strong>
              {formData.when}
            </p>
            <p className="mb-2">
              <strong>Amount: </strong> {formData.amount}
            </p>
            <p className="mb-2">
              <strong>Type: </strong> {formData.type}
            </p>
            <p className="mb-2">
              <strong>Category: </strong> {formData.category}
            </p>

            <button
              type="submit"
              className="w-full mt-4 p-3 text-white font-medium rounded-lg bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 transition-all shadow-md"
            >
              Add Payment
            </button>
          </div>
          {/* main form */}
        </form>
      </div>
    </div>
  );
}

export default PersonalPayment;
