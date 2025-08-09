'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Customer = {
  id: string;
  firstName: string;
  lastName: string;
  city: string;
  statusTag: string;
  gender: string;
  dateOfBirth: string;
  maritalStatus: string;
  country: string;
  height: number;
  email: string;
  phoneNumber: string;
  undergraduateCollege: string;
  degree: string;
  income: number;
  currentCompany: string;
  designation: string;
  languagesKnown: string[];
  siblings: string;
  caste: string;
  religion: string;
  wantKids: string;
  openToRelocate: string;
  openToPets: string;
};

export default function CustomerCard({ customer }: { customer: Customer }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      {/* Normal Card */}
      <div className="border rounded p-4 shadow hover:shadow-md transition bg-white">
        <h2 className="text-lg font-semibold">
          {customer.firstName} {customer.lastName}
        </h2>
        <p className="text-sm">Gender: {customer.gender}</p>
        <p className="text-sm">City: {customer.city}</p>
        <p className="text-sm">Marital Status: {customer.maritalStatus}</p>
        <p className="text-sm">
          <span className="font-medium">Status:</span>
          <span className="ml-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
            {customer.statusTag}
          </span>
        </p>

        <button
          onClick={() => setShowDetails(true)}
          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          View Details
        </button>
      </div>

      {/* Overlay + Focused Card */}
      <AnimatePresence>
        {showDetails && (
          <>
            {/* Dim Background */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDetails(false)}
            />

            {/* Focused Card */}
            <motion.div
              className="fixed top-1/2 left-1/2 z-50 w-11/12 max-w-2xl -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-4">
                {customer.firstName} {customer.lastName}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <p><strong>DOB:</strong> {customer.dateOfBirth}</p>
                <p><strong>Country:</strong> {customer.country}</p>
                <p><strong>Height:</strong> {customer.height} cm</p>
                <p><strong>Email:</strong> {customer.email}</p>
                <p><strong>Phone:</strong> {customer.phoneNumber}</p>
                <p><strong>College:</strong> {customer.undergraduateCollege}</p>
                <p><strong>Degree:</strong> {customer.degree}</p>
                <p><strong>Income:</strong> ₹{customer.income.toLocaleString()}</p>
                <p><strong>Company:</strong> {customer.currentCompany}</p>
                <p><strong>Designation:</strong> {customer.designation}</p>
                <p><strong>Siblings:</strong> {customer.siblings}</p>
                <p><strong>Caste:</strong> {customer.caste}</p>
                <p><strong>Religion:</strong> {customer.religion}</p>
                <p><strong>Wants Kids:</strong> {customer.wantKids}</p>
                <p><strong>Open to Relocate:</strong> {customer.openToRelocate}</p>
                <p><strong>Open to Pets:</strong> {customer.openToPets}</p>
                <div className="col-span-full">
                  <p><strong>Languages Known:</strong> {customer.languagesKnown.join(', ')}</p>
                </div>
              </div>

              <button
                onClick={() => setShowDetails(false)}
                className="mt-5 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Close
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
