import {create} from "zustand"

export const useAppContentStore = create(() => ({
  appContent:{
      heading: "Welcome to the Special Garden Group!"
  }
}));
