'use client';

import { useAuth } from '../app/context/AuthContext';
import CustomerCard from '@/components/CustomerCard';
import LoginForm from '@/components/LoginForm';
import { usePathname, useRouter } from "next/navigation";

export default function CustomerList({ customers }: { customers: any[] }) {

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {customers.map((customer) => (
          <CustomerCard key={customer.id} customer={customer} />
        ))}
      </div>
    </main>
  );
}
