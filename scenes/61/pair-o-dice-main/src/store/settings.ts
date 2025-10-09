import { create } from "zustand";

type SettingsState = {
  use3D: boolean;
  setUse3D: (v: boolean) => void;
};

export const useSettings = create<SettingsState>((set) => ({
  use3D: true,
  setUse3D: (v) => set({ use3D: v }),
}));