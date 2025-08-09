'use client'

import React, { useEffect, useState } from 'react'
import { getCustomerProfile } from '../actions/getCustomerById';
import { doc, getDoc } from "firebase/firestore"; // Firestore imports
import { db, auth } from "../../firebase"; // adjust path to your firebase config
import { getFemaleRecommendation } from '../actions/query-female-index';
import { getMaleRecommendation } from '../actions/query-male-index';
import CustomerList from '@/components/CustomerList';
import { useRouter } from "next/navigation";
import { useAuth } from "../../app/context/AuthContext";


export default function ProfileMatch() {
    const [currentUserProfile, setCurrentUserProfile] = useState({});
    const [recommendedProfile, setRecommendedProfile] = useState<any[]>([]);
    const [userGender, setUserGender] = useState<string | null>(null);

    const router = useRouter();
      const { user, loading } = useAuth();
      useEffect(() => {
        if (!loading && !user) {
          router.push("/login");
        }
      }, [loading, user, router]);

    //fetch the current user profile
    useEffect(() =>{
        const fetchProfile = async()=>{
            if(!user?.uid) return;
            const profile = await getCustomerProfile(user.uid);
            if(profile){
                setCurrentUserProfile(profile);
            }
        }
        fetchProfile();
    },[user?.uid]);

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

      // as per the use case get the recommendation for male -> female and vice versa

      useEffect(() => {
        const fetchRecommendation = async () => {
            if (!userGender || !currentUserProfile || Object.keys(currentUserProfile).length === 0) {
            return; // wait until we have all data
            }

            let recommendation;
            if (userGender.toLowerCase() === "male") {
            recommendation = await getFemaleRecommendation(currentUserProfile);
            } else if (userGender.toLowerCase() === "female") {
            recommendation = await getMaleRecommendation(currentUserProfile);
            }

            if (recommendation) {
            setRecommendedProfile(recommendation);
            }
        };

        fetchRecommendation();
     }, [userGender, currentUserProfile]); // trigger when both change


  return <CustomerList customers={recommendedProfile}></CustomerList>
}
