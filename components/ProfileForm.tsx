"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../app/context/AuthContext";
import { saveCustomerProfile} from "@/app/actions/saveCustomerProfile"; // <-- Make sure this is defined
import { getCustomerProfile } from "@/app/actions/getCustomerById";

export default function ProfileForm() {
  const { user } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    country: "",
    city: "",
    height: "",
    email: user?.email || "",
    phoneNumber: "",
    undergraduateCollege: "",
    degree: "",
    income: "",
    currentCompany: "",
    designation: "",
    maritalStatus: "",
    languagesKnown: "",
    siblings: "",
    caste: "",
    religion: "",
    wantKids: "",
    openToRelocate: "",
    openToPets: "",
    statusTag: "Active",
  });

  // ✅ Fetch existing data from Firestore on load
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.uid) return;
      const existingProfile = await getCustomerProfile(user.uid);
      if (existingProfile) {
        setFormData((prev) => ({
          ...prev,
          ...existingProfile,
          languagesKnown: Array.isArray(existingProfile.languagesKnown)
            ? existingProfile.languagesKnown.join(", ")
            : "",
        }));
      }
    };

    fetchProfile();
  }, [user?.uid]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!user?.uid) return;

    const updatedData = {
      ...formData,
      height: parseInt(formData.height),
      income: parseInt(formData.income),
      languagesKnown: formData.languagesKnown
        .split(",")
        .map((l) => l.trim()),
    };

    await saveCustomerProfile(user.uid, updatedData);
    alert("Profile saved successfully!");
    router.push("/profile");
  };

  return (
  <form
    onSubmit={handleSubmit}
    className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 p-6 bg-white rounded shadow"
  >
    <h2 className="col-span-full text-2xl font-bold mb-2">Create / Update Profile</h2>

    {[
      "firstName", "lastName", "gender", "dateOfBirth", "country", "city",
      "height", "phoneNumber", "undergraduateCollege", "degree", "income",
      "currentCompany", "designation", "maritalStatus", "languagesKnown",
      "siblings", "caste", "religion", "wantKids", "openToRelocate", "openToPets"
    ].map((field) => (
      <div key={field} className="flex flex-col">
        <label htmlFor={field} className="text-sm font-medium mb-1 capitalize">
          {field.replace(/([A-Z])/g, " $1")}
        </label>
        <input
          id={field}
          type="text"
          name={field}
          placeholder={field.replace(/([A-Z])/g, " $1")}
          value={formData[field as keyof typeof formData]}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
      </div>
    ))}

    <button
      type="submit"
      className="col-span-full mt-4 bg-cyan-600 text-white py-2 rounded hover:bg-cyan-700"
    >
      Save Profile
    </button>
  </form>
);
}
