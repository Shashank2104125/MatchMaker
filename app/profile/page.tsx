// app/profile/page.tsx
'use client'

import dynamic from "next/dynamic";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../../app/context/AuthContext";
import { useEffect } from "react";

const ProfileForm = dynamic(() => import("@/components/ProfileForm"), { ssr: false });

export default function ProfilePage() {

  const router = useRouter();
        const { user, loading } = useAuth();
        useEffect(() => {
          if (!loading && !user) {
            router.push("/login");
          }
        }, [loading, user, router]);
        
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <ProfileForm />
    </main>
  );
}
