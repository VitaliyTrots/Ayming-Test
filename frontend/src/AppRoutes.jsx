import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import EmployeeList from './EmployeeList';
import Employee from './Employee';

const AppRoutes = () => {
  return (
    <Suspense fallback={<>Loading</>}>
      <Routes>
        <Route path="/" element={<EmployeeList />} />
        <Route path="/employee/:id" element={<Employee />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
