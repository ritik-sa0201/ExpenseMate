import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Details from "./Details";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { AddFriend, getFriends } from "@/apis/friends";
import { toast } from "sonner";
import { SyncLoader } from "react-spinners";
import Spinner from "react-spinner";

function Friends() {
  const [error, setError] = useState(null);
  const [friends, setFriends] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchFriends() {
      setLoading(true);
      const { data, error } = await getFriends();
      if (error) {
        console.error("Error fetching friends:", error);
      } else {
        setFriends(data || []);
      }
      setLoading(false);
    }

    fetchFriends();
  }, [refreshTrigger]);

  const [newFriend, setNewFriend] = useState({
    name: "",
    email: "",
    phone: "",
  });

  function handleChange(e) {
    setNewFriend({ ...newFriend, [e.target.name]: e.target.value });
  }

  const [isAdded, setIsAdded] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setIsAdded(true);
      const result = await AddFriend(newFriend);
      if (result) {
        toast("Friend added successfully!");
      }
      setNewFriend({ name: "", email: "", phone: "" });
    } catch (error) {
      setError(error.message);
      console.error("Error:", error.message);
      toast("Error adding friend");
    }
    setRefreshTrigger((prev) => prev + 1);
    setIsAdded(false);
  }

  function handleInvite() {
    const url = "http://localhost:5173/"; // Replace with your actual URL
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast("URL copied to clipboard!");
      })
      .catch((err) => {
        toast("failed to copy URL to clipboard");
      });
  }

  return (
    <div className="w-full flex flex-col items-center justify-center">
      {/* Header */}
      <header className="w-full bg-black-500 h-16 sm:h-20 flex flex-col sm:flex-row items-center justify-between px-5 sm:px-20 shadow-lg gap-5 sm:gap-20 mb-10 sm:mb-10 ">
        <h1 className="text-white text-xl sm:text-3xl font-bold text-center">
          Manage Friends
        </h1>
        <Select>
          <SelectTrigger className="w-[160px] sm:w-[180px] text-sm sm:text-base">
            <SelectValue placeholder="Sort friends by" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="latest">Latest</SelectItem>
              <SelectItem value="to-pay">To pay</SelectItem>
              <SelectItem value="to-receive">To receive</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </header>
      {/* Friends List */}
      <div className="w-[90%] sm:w-[70%] md:w-[60%] flex flex-col items-center justify-center gap-4">
        {loading ? (
          <div className="flex flex-row items-center justify-center h-40">
            <p className="text-white">Loading your friends </p>
            <p className="opacity-0">___</p>
            <SyncLoader size={8} color="white" />
          </div>
        ) : (
          friends.map((friend) => (
            <Details key={friend.friend_details.email} friend={friend} />
          ))
        )}
        {/* add new friend  */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="bg-slate-800 text-white hover:bg-slate-900 hover:text-red-300"
            >
              Add Friend
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4">
            <h4 className="font-medium text-lg mb-2">Add Friend</h4>
            <form onSubmit={handleSubmit} className="grid gap-4    ">
              {/* Title Field */}
              <div className="grid gap-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={newFriend.name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Amount Field */}
              <div className="grid gap-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="text"
                  value={newFriend.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* When Field */}
              <div className="grid gap-1">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="number"
                  value={newFriend.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              {error && (
                <div className="text-red-500 text-sm">
                  {error === "User not found" ? (
                    <>
                      <p>User not found. Would you like to invite them?</p>
                      <button
                        onClick={handleInvite}
                        className="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Send Invite
                      </button>
                    </>
                  ) : (
                    <p>{error}</p>
                  )}
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600"
              >
                {isAdded ? <SyncLoader size={8} /> : <p> Submit</p>}
              </Button>
            </form>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

export default Friends;
