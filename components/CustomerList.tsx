'use client';

import { useState } from 'react';
import CustomerCard from '@/components/CustomerCard';

export default function CustomerList({ customers }: { customers: any[] }) {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [maritalStatus, setMaritalStatus] = useState<string>('all');

  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const ageDiff = Date.now() - birthDate.getTime();
    return new Date(ageDiff).getUTCFullYear() - 1970;
  };

  const filteredCustomers = customers.filter((customer) => {
    if (maritalStatus !== 'all') {
      return customer.maritalStatus.toLowerCase() === maritalStatus.toLowerCase();
    }
    return true;
  });

  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    const ageA = calculateAge(a.dateOfBirth);
    const ageB = calculateAge(b.dateOfBirth);
    return sortOrder === 'asc' ? ageA - ageB : ageB - ageA;
  });

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Dashboard</h1>

      {/* Filters Section */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm mb-6">
        <h2 className="text-lg font-semibold mb-4">Filters</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Age Sort */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium">Age</label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="asc">Increasing</option>
              <option value="desc">Decreasing</option>
            </select>
          </div>

          {/* Marital Status Filter */}
          <div className="flex flex-col">
            <label className="mb-1 text-sm font-medium">Marital Status</label>
            <select
              value={maritalStatus}
              onChange={(e) => setMaritalStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All</option>
              <option value="Never Married">Never Married</option>
              <option value="Married">Married</option>
              <option value="Widowed">Widowed</option>
              <option value="Divorced">Divorced</option>
            </select>
          </div>
        </div>
      </div>

      {/* Customer Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {sortedCustomers.map((customer) => (
          <CustomerCard key={customer.id} customer={customer} />
        ))}
      </div>
    </main>
  );
}
