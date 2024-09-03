import { create } from "zustand";

interface UserState {
  id: string | null;
  type: string | null;
  setUser: (user: { id: string; type: string }) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  id: null,
  type: null,
  setUser: (user) => set({ id: user.id, type: user.type }),
  clearUser: () => set({ id: null, type: null }),
}));
