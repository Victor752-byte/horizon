// src/store/userStore.js
import { create } from 'zustand';

interface UserState {
  user: any; // Define your user type instead of `any`
  setUser: (user: any) => void; // Replace `any` with your actual user type
}

const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

export default useUserStore;
