'use client'

import { useEffect, useState } from "react";
import CustomerList from "@/components/CustomerList";
import { getCustomers } from "./actions/getCustomers";
import { createMaleIndex } from "./actions/create-male-index";
import { createFemaleIndex } from "./actions/create-female-index";
import { updateFemaleIndex } from "./actions/update-female-index";
import { updateMaleIndex } from "./actions/update-male-index";
import { getMaleCustomers } from "./actions/getAllMaleCustomers";
import { getFemaleCustomers } from "./actions/getAllFemaleCustomers";
import { doc, getDoc } from "firebase/firestore"; // Firestore imports
import { db, auth } from "../firebase"; // adjust path to your firebase config
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../app/context/AuthContext";


export default function HomePage() {
  const [customers, setCustomers] = useState([]);
  const [maleCustomers, setMaleCustomers] = useState([]);
  const [femaleCustomers, setFemaleCustomers] = useState([]);
  const [userGender, setUserGender] = useState<string | null>(null);

  const router = useRouter();
  const { user, loading } = useAuth();
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const result = await getCustomers();
        console.log("total customers: " + result)
        setCustomers(result);
      } catch {
        console.log("error in fetching");
      }
    };

    fetchCustomers();
  }, []);


  // fetch male customers

  useEffect(()=>{
    const fetchMaleCustomers = async() =>{
      try {
         const result = await getMaleCustomers();
         setMaleCustomers(result);
      } catch (error) {
        console.log("error in male customers fetcing: " + error)
      }
    }
    fetchMaleCustomers()
  },[]);


 // fetch female customers
  useEffect(()=>{
    const fetchMaleCustomers = async() =>{
      try {
         const result = await getFemaleCustomers();
         setFemaleCustomers(result);
      } catch (error) {
        console.log("error in male customers fetcing: " + error)
      }
    }
    fetchMaleCustomers()
  },[]);


  // Get logged-in user's gender from Firestore
  useEffect(() => {
    const fetchUserGender = async () => {
      const user = auth.currentUser;
      if (!user) return;
      try {
        const userRef = doc(db, "customers", user.uid);
        const snap = await getDoc(userRef);
        if (snap.exists()) {
          const gender = snap.data()?.gender;
          setUserGender(gender);
        }
      } catch (error) {
        console.error("Error fetching user gender:", error);
      }
    };

    fetchUserGender();
  }, []);
  

  // Set customers list based on opposite gender
  useEffect(() => {
    if (!userGender) return;

    if (userGender.toLowerCase() === "male") {
      setCustomers(femaleCustomers);
    } else if (userGender.toLowerCase() === "female") {
      setCustomers(maleCustomers);
    }
  }, [userGender, maleCustomers, femaleCustomers]);

  //   useEffect(() => {
  //   const setupIndex = async () => {
  //     await createMaleIndex();
  //     await updateMaleIndex();
  //   };
  //   setupIndex();
  // }, []);


  // useEffect(() => {
  //   const createIndex = async() => {
  //     await createFemaleIndex();
  //     await updateFemaleIndex();
  //   }
  //   createIndex();
  // },[]);


  return <CustomerList customers={customers} />;
}
