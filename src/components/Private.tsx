/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Navigate } from "react-router-dom";

const Private = ({ children }: { children: React.ReactNode }) => {
  // Check if accessToken exists in localStorage
  const accessToken = localStorage.getItem("accessToken");

  // If accessToken doesn't exist, redirect to login
  if (!accessToken) {
    return <Navigate to="/login" />;
  }

  // If accessToken exists, render the children
  return <>{children}</>;
};

export default Private;
