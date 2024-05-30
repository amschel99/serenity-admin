import { create } from "zustand";

enum Gender {
  Male = "Male",
  Female = "Female",
}
enum MaritalStatus {
  Single = "Single",
  Married = "Married",
  Divorced = "Divorced",
}
export interface CasualData {
  name: string;
  id: string;
  contact: string;
  mpesa: string;
  age: number;
  gender: Gender;
  maritalStatus: MaritalStatus;
  dailyRate: number;
}
export interface EmployeeData {
  name: string;
  id: string;
  employeeNo: string;
  contact: string;
  contactEmail: string;
}
export interface SupplierData {
  businessData: string;
  location: string;
  contactPersonName: string;
  contactPersonId: string;
  contactPersonBankDetails: string;
  contactPersonMpesaNumber: string;
  harverstCapacity: HarvestCapacity;
}

export interface HarvestCapacity {
  january: number;
  february: number;
  march: number;
  april: number;
  may: number;
  june: number;
  july: number;
  august: number;
  september: number;
  october: number;
  november: number;
  december: number;
}

export const useCasualDataStore = create((set) => ({
  casualData: {
    name: "",
    id: "",
    contact: "",
    mpesa: "",
    age: "",
    gender: "",
    maritalStatus: null,
    dailyRate: null,
  },
  updateCasualData: (payload: CasualData) =>
    set(() => ({ casualData: payload })),
}));

export const useEmployeeData = create((set) => ({
  employeeData: {
    name: "",
    id: "",
    employeeNo: "",
    contact: "",
    contactEmail: "",
  },
  updateEmployeeData: (payload: EmployeeData) =>
    set(() => ({ employeeData: payload })),
}));

export const useSupplierData = create((set) => ({
  supplierData: {
    businessData: "",
    location: "",
    contactPersonName: "",
    contactPersonId: "",
    contactPersonBankDetails: "",
    contactPersonMpesaNumber: "",
    harverstCapacity: "",
  },
  updateSupplierData: (payload: SupplierData) =>
    set(() => ({ supplierData: payload })),
}));
