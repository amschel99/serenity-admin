import { CasualData, EmployeeData, SupplierData } from "../store";

import axios, { AxiosResponse } from "axios";

const api_url = `http://ec2-54-226-161-79.compute-1.amazonaws.com/`; //OR localhost:5000
type SignupData = {
  email: string;
  password: string;
};

export const saveCasual = async (
  casual: CasualData
): Promise<AxiosResponse> => {
  try {
    const response = await axios.post(
      `${api_url}/user/casuals/create`,
      casual,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error saving casual data:", error);
    throw error; // Re-throwing the error so the caller can handle it if necessary
  }
};

export const saveEmployee = async (
  employee: EmployeeData
): Promise<AxiosResponse> => {
  try {
    const response = await axios.post(
      `${api_url}/user/employees/create`,
      employee,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error saving employee data:", error);
    throw error;
  }
};

export const saveSupplier = async (
  supplier: SupplierData
): Promise<AxiosResponse> => {
  try {
    const response = await axios.post(
      `${api_url}/user/suppliers/create`,
      supplier,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error saving saving data:", error);
    throw error;
  }
};
export const fetchAllSuppliers = async (): Promise<AxiosResponse> => {
  try {
    const response = await axios.get(
      `${api_url}/user/suppliers/get`,

      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error saving saving data:", error);
    throw error;
  }
};

export const fetchAllEmployees = async (): Promise<AxiosResponse> => {
  try {
    const response = await axios.get(
      `${api_url}/user/employees/get`,

      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error saving saving data:", error);
    throw error;
  }
};

export const fetchAllCasuals = async (): Promise<AxiosResponse> => {
  try {
    const response = await axios.get(
      `${api_url}/user/casuals/get`,

      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error saving saving data:", error);
    throw error;
  }
};
export const signUp = async (data: SignupData): Promise<AxiosResponse> => {
  try {
    const response = await axios.post(`${api_url}/api/auth/emailLogin`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error saving saving data:", error);
    throw error;
  }
};
export const login = async (data: SignupData): Promise<AxiosResponse> => {
  try {
    const response = await axios.post(`${api_url}/api/auth/emailLogin`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error saving saving data:", error);
    throw error;
  }
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const saveReading = async (data: any): Promise<AxiosResponse> => {
  try {
    const response = await axios.post(`${api_url}/api/user/stepwork`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error saving saving data:", error);
    throw error;
  }
};



export const fetchUsers = async (): Promise<AxiosResponse> => {
  try {
    const response = await axios.get(`http://ec2-54-226-161-79.compute-1.amazonaws.com/api/user/users`, {
      headers:{
        "Content-Type": "application/json",
      }
   
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error saving saving data:", error);
    throw error;
  }
};

export const deleteAccount = async (userId:string): Promise<AxiosResponse> => {
  try {
    const response = await axios.delete(`http://ec2-54-226-161-79.compute-1.amazonaws.com/api/user/singleUser/${userId}`, {
      headers:{
        "Content-Type": "application/json",
       authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      }
   
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error saving saving data:", error);
    throw error;
  }
};
