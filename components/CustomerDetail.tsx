// components/CustomerDetail.tsx
'use client'

import React from "react";

interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: string;
  country: string;
  city: string;
  height: number;
  email: string;
  phoneNumber: string;
  undergraduateCollege: string;
  degree: string;
  income: number;
  currentCompany: string;
  designation: string;
  maritalStatus: string;
  languagesKnown: string[];
  siblings: string;
  caste: string;
  religion: string;
  wantKids: string;
  openToRelocate: string;
  openToPets: string;
  statusTag: string;
}

interface Props {
  customer: Customer;
}

const CustomerDetail: React.FC<Props> = ({ customer }) => {
  return (
    <div className="max-w-3xl mx-auto p-6 border rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-bold mb-4">
        {customer.firstName} {customer.lastName}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-800">
        <p><strong>Gender:</strong> {customer.gender}</p>
        <p><strong>Date of Birth:</strong> {customer.dateOfBirth}</p>
        <p><strong>City:</strong> {customer.city}</p>
        <p><strong>Country:</strong> {customer.country}</p>
        <p><strong>Height:</strong> {customer.height} cm</p>
        <p><strong>Email:</strong> {customer.email}</p>
        <p><strong>Phone:</strong> {customer.phoneNumber}</p>
        <p><strong>College:</strong> {customer.undergraduateCollege}</p>
        <p><strong>Degree:</strong> {customer.degree}</p>
        <p><strong>Income:</strong> ₹{customer.income.toLocaleString("en-IN")}</p>
        <p><strong>Company:</strong> {customer.currentCompany}</p>
        <p><strong>Designation:</strong> {customer.designation}</p>
        <p><strong>Marital Status:</strong> {customer.maritalStatus}</p>
        <p><strong>Siblings:</strong> {customer.siblings}</p>
        <p><strong>Caste:</strong> {customer.caste}</p>
        <p><strong>Religion:</strong> {customer.religion}</p>
        <p><strong>Wants Kids:</strong> {customer.wantKids}</p>
        <p><strong>Open to Relocate:</strong> {customer.openToRelocate}</p>
        <p><strong>Open to Pets:</strong> {customer.openToPets}</p>
        <p><strong>Status:</strong> {customer.statusTag}</p>
        <div className="col-span-full">
          <p><strong>Languages Known:</strong> {customer.languagesKnown.join(", ")}</p>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetail;
