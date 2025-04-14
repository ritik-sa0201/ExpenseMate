import { createSlice } from "@reduxjs/toolkit";

const SplitSlice = createSlice({
  name: "split",
  initialState: {
    Split: [],
    friends: [],
  },
  reducers: {
    AddFriend(state, action) {
      state.friends.push(action.payload);
    },

    RemoveFriend(state, action) {
      state.friends = state.friends.filter(
        (friend) => friend.id !== action.payload.id
      );
    },

    AddHistoryToFriend: (state, action) => {
      const { friendName, historyEntry } = action.payload;
      const friend = state.friends.find((f) => f.name === friendName);
      if (friend) {
        if (!friend.history) friend.history = [];
        friend.history.push(historyEntry);
      }
    },
    removeHistoryFromFriend: (state, action) => {
      const { friendName, historyId } = action.payload;
      const friend = state.friends.find((f) => f.name === friendName);
      if (friend && friend.history) {
        friend.history = friend.history.filter(
          (entry, idx) => idx !== historyId
        );
      }
    },
  },
});

export const {
  AddFriend,
  RemoveFriend,
  AddHistoryToFriend,
  removeHistoryFromFriend,
} = SplitSlice.actions;

export default SplitSlice.reducer;
