import { create } from "zustand";

type Profile = {
  userId: number;
  roomId: number;
  name: string;
  passwordHash: string;
  username: string;
  token: string;
};

type UserState = {
  profile: Profile;
  setUser: (p: (prev: Profile) => Profile) => void;
};

const initialProfile: Profile = {
  userId: 0,
  roomId: 0,
  name: "",
  passwordHash: "",
  username: "",
  token: "",
};

export const useUserStore = create<UserState>((set) => ({
  profile: initialProfile,
  setUser: (updater) =>
    set((state) => ({
      profile: updater(state.profile),
    })),
}));
