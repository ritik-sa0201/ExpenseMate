import ScrollImageChange from "@/components/ImageScroll1";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { getFriends } from "@/apis/friends";
import { addBill } from "@/apis/Splitting";
import supabase from "../../../utils/supabase";
import Spinner from "react-spinner";
import { SyncLoader } from "react-spinners";
const imageList = ["/ex4.png", "/ex5.png", "/sbbg.png"];

function SplitBill() {
  const todayDate = new Date().toISOString().split("T")[0];
  const [myId, setmyId] = useState();
  useEffect(() => {
    async function fetchId() {
      const Id = await supabase.auth
        .getUser()
        .then((user) => user.data.user.id);
      setmyId(Id);
    }
    fetchId();
  });

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "",
    category: "",
    paymentmethod: "",
    date: todayDate,
    reoccuring: false,
    autoadd: false,
    paidby: "",
    Friends: [],
    include: false,
  });

  const [IsLoading, SetLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(formData);
    SetLoading(true);
    const { data, error } = await addBill({ data: formData });
    if (error) {
      toast.error(error);
    } else {
      toast.success("Payment added successfully");
      setFormData({
        title: "",
        amount: "",
        type: "",
        category: "",
        paymentmethod: "",
        date: todayDate,
        reoccuring: false,
        autoadd: false,
        paidby: "",
        Friends: [],
        include: false,
      });
    }
    SetLoading(false);
  }
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  function handleFriendToggle(uuid) {
    setFormData((prev) => {
      const alreadySelected = prev.Friends.includes(uuid);
      return {
        ...prev,
        Friends: alreadySelected
          ? prev.Friends.filter((id) => id !== uuid)
          : [...prev.Friends, uuid],
      };
    });
  }

  // real logic
  const [Friends, setFriends] = useState([]);
  useEffect(() => {
    async function fetchFriends() {
      const { data, error } = await getFriends();
      if (error) {
        console.error("Error fetching friends:", error);
      } else {
        setFriends(data || []);
      }
    }
    fetchFriends();
  }, []);

  useEffect(() => {
    if (formData.paidby !== myId && !formData.include) {
      setFormData((prev) => ({ ...prev, include: true }));
    }
  }, [formData.paidby, myId]);

  return (
    <div className="flex min-h-screen w-full">
      {/* Left Section */}
      <div className="w-[40%] flex items-center justify-center p-4">
        <ScrollImageChange images={imageList} />
      </div>

      {/* Right Section */}
      <div className="w-[60%] flex items-center justify-center p-6">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg flex flex-col gap-8"
        >
          {/* Basic Expense Details */}
          <section className="bg-[#ccc4c433] p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl text-white mb-6 text-center">
              BASIC EXPENSE DETAILS
            </h2>

            <Label className="text-white mb-1">Title</Label>
            <input
              type="text"
              name="title"
              placeholder="What was the bill for?"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full p-2 mb-4 bg-[#BBBBBB4D] text-white border border-[#888888] rounded-md placeholder-[#b5b5b5] focus:outline-none focus:ring-2 focus:ring-white"
            />

            <div className="flex gap-4">
              <div className="flex-1">
                <Label className="text-white mb-1">Amount</Label>
                <input
                  type="number"
                  name="amount"
                  placeholder="Enter amount"
                  value={formData.amount}
                  required
                  onChange={handleChange}
                  className="w-full p-2 bg-[#BBBBBB4D] text-white border border-[#888888] rounded-md placeholder-[#b5b5b5] focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>
              <div className="flex-1">
                <Label className="text-white mb-1">Type</Label>
                <select
                  name="type"
                  value={formData.type}
                  required
                  onChange={handleChange}
                  className="w-full p-2 bg-[#BBBBBB4D] text-white border border-[#888888] rounded-md focus:outline-none focus:ring-2 focus:ring-white"
                >
                  <option value="" disabled className="text-gray-400">
                    Select type
                  </option>
                  <option className="text-black" value="Income">
                    Income
                  </option>
                  <option className="text-black" value="Expense">
                    Expense
                  </option>
                </select>
              </div>
            </div>

            <div className="flex gap-4 mt-4">
              <div className="flex-1">
                <Label className="text-white mb-1">Category</Label>
                <select
                  name="category"
                  value={formData.category}
                  required
                  onChange={handleChange}
                  className="w-full p-2 bg-[#BBBBBB4D] text-white border border-[#888888] rounded-md focus:outline-none focus:ring-2 focus:ring-white"
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
                <Label className="text-white mb-1">Payment Method</Label>
                <select
                  name="paymentmethod"
                  value={formData.paymentmethod}
                  onChange={handleChange}
                  required
                  className="w-full p-2 bg-[#BBBBBB4D] text-white border border-[#888888] rounded-md focus:outline-none focus:ring-2 focus:ring-white"
                >
                  <option value="" disabled className="text-gray-400">
                    Select method
                  </option>
                  <option className="text-black">Cash</option>
                  <option className="text-black">Credit Card</option>
                  <option className="text-black">UPI</option>
                </select>
              </div>
            </div>
          </section>

          {/* Date & Options */}
          <section className="bg-[#ccc4c433] p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl text-white mb-6 text-center">WHEN?</h2>
            <Label className="text-white mb-1">Date</Label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-2 bg-[#BBBBBB4D] text-white border border-[#888888] rounded-md focus:outline-none focus:ring-2 focus:ring-white"
            />

            <div className="flex gap-4 mt-4">
              <div className="flex items-center space-x-2 flex-1">
                <Switch
                  checked={formData.reoccuring}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, reoccuring: checked }))
                  }
                />
                <Label className="text-white">Recurring Bill?</Label>
              </div>
              <div className="flex items-center space-x-2 flex-1">
                <Switch
                  checked={formData.autoadd}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, autoadd: checked }))
                  }
                />
                <Label className="text-white">Auto-add this bill?</Label>
              </div>
            </div>
          </section>

          {/* Split Details */}
          <section className="bg-[#ccc4c433] p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl text-white mb-6 text-center">
              Split Details
            </h2>

            <Label className="text-white mb-1">Who Paid</Label>
            <select
              name="paidby"
              required
              onChange={handleChange}
              value={formData.paidby}
              className="w-full p-2 bg-[#BBBBBB4D] text-white border border-[#888888] rounded-md focus:outline-none focus:ring-2 focus:ring-white
              max-h-[13.5rem] overflow-y-auto
              "
            >
              <option value="" disabled className="text-gray-400">
                Who Paid the bill?
              </option>
              <option value={myId} className="text-black">
                Me
              </option>
              {Friends.map((friend) => (
                <option
                  key={friend.id}
                  value={friend.friend_details.uuid}
                  className="text-black"
                >
                  {friend.friend_details.name}
                </option>
              ))}
            </select>

            <div className="flex gap-4 mt-4">
              <div className="flex-1">
                <Label className="text-white mb-1">Add Friend</Label>

                <div className="relative w-full">
                  <div
                    className="w-full p-2 bg-[#BBBBBB4D] text-white border border-[#888888] rounded-md cursor-pointer"
                    onClick={() => setDropdownOpen((prev) => !prev)}
                  >
                    {formData.Friends.length > 0
                      ? `${formData.Friends.length} selected`
                      : "Select a friend"}
                  </div>

                  {dropdownOpen && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-md">
                      {/* 🔍 Search Input */}
                      <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-2 border-b border-gray-300 focus:outline-none"
                      />

                      {/* 🧾 Filtered List */}
                      <ul className="max-h-[13.5rem] overflow-y-auto">
                        {[...Friends]
                          .filter((friend) =>
                            friend.friend_details.name
                              .toLowerCase()
                              .includes(searchQuery.toLowerCase())
                          )
                          .sort((a, b) => {
                            const aSelected = formData.Friends.includes(
                              a.friend_details.uuid
                            );
                            const bSelected = formData.Friends.includes(
                              b.friend_details.uuid
                            );
                            if (aSelected === bSelected) return 0;
                            return aSelected ? -1 : 1; // selected first
                          })
                          .map((friend) => {
                            const uuid = friend.friend_details.uuid;
                            const name = friend.friend_details.name;
                            const selected = formData.Friends.includes(uuid);

                            return (
                              <li
                                key={friend.id}
                                onClick={() => handleFriendToggle(uuid)}
                                className="cursor-pointer px-4 py-2 hover:bg-gray-100 flex justify-between items-center"
                              >
                                <span className="text-black">{name}</span>
                                {selected && (
                                  <span className="text-green-500">✔</span>
                                )}
                              </li>
                            );
                          })}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2 flex-1 mt-2">
              <div>
                <Switch
                  checked={formData.paidby === myId ? formData.include : true}
                  disabled={formData.paidby !== myId}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, include: checked }))
                  }
                />
              </div>

              <Label className="text-white ">Are you part of this bill?</Label>
              {formData.paidby !== myId ? (
                <p className="text-red-300 mt-2 text-sm">
                  {" "}
                  "You cannot exclude yourself when someone else paid."
                </p>
              ) : (
                ""
              )}
            </div>

            <p className="text-red-300 mt-2 text-sm">
              Friend not listed? Add them{" "}
              <Link to="/friends" className="text-blue-400 underline">
                here
              </Link>
              .
            </p>
          </section>

          {/* Summary */}
          <section className="bg-[#ccc4c433] p-6 rounded-lg shadow-lg text-white">
            <h3 className="text-xl font-medium mb-4 text-center">Summary</h3>
            <p>
              <strong>Title:</strong> {formData.title}
            </p>
            <p>
              <strong>Date:</strong> {formData.date}
            </p>
            <p>
              <strong>Amount:</strong> ₹{formData.amount}
            </p>
            <p>
              <strong>Type:</strong> {formData.type}
            </p>
            <p>
              <strong>Category:</strong> {formData.category}
            </p>
            <p>
              <strong>Participants Count: </strong>{" "}
              {formData.include === true
                ? formData.Friends.length + 1
                : formData.Friends.length}
            </p>
          </section>

          <button
            type="submit"
            className="mt-4 p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            {IsLoading ? <SyncLoader size={15} /> : <p>Add Payment</p>}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SplitBill;
