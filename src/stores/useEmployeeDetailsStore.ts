import { create } from "zustand";

interface Addresses {
  id: string;
  type: "home" | "mailing" | "custom";
  address: string;
}

export interface EmployeeDetails {
  firstName: string;
  lastName: string;
  jobTitle: string;
  photoURL: string;
  birthdate: Date;
  startDate: Date;
  addresses: Addresses[];
}

interface EmployeeDetailsState {
  data: EmployeeDetails | null;
  setEmployeeDetails: (employeeDetails: EmployeeDetails) => void;
  clearEmployeeDetails: () => void;
}

export const useEmployeeDetailsStore = create<EmployeeDetailsState>((set) => ({
  data: null,
  setEmployeeDetails: (employeeDetails) => set({ data: employeeDetails }),
  clearEmployeeDetails: () => set({ data: null }),
}));
