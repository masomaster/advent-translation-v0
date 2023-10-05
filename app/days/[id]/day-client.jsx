"use client";

import { useEffect } from "react";
import { useAuthContext } from "../../../context/AuthContext";
import firebase_app from "../../../firebase/config";
import { getAuth } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { setWholeProfile } from "../../../redux/profileSlice";

export default async function DayClient({ dayData }) {
  const dispatch = useDispatch();
  const auth = getAuth(firebase_app);
  const { user } = useAuthContext();
  const profileData = useSelector((state) => state.profile);

  useEffect(() => {
    if (profileData.firstName === null) {
      (async function getProfile() {
        const profileDoc = await getDocument("profiles", user.uid);
        dispatch(setWholeProfile(profileDoc));
      })();
    }
  });

  if (!dayData) {
    return <div>Loading...</div>;
  }
  const { dayNumber, hebrew, hebrewVerse, greek, greekVerse } = dayData;

  return (
    <div>
      <h1>Day {dayData.dayNumber}</h1>
      <p>
        Hebrew: <span className="hebrew">{dayData.hebrew}</span> from{" "}
        {dayData.hebrewVerse}
      </p>
      <p>
        Your translation:{" "}
        {/* {(translations && translations.hebrew) || "Give it a shot!"} */}
      </p>
      <p>
        Greek: <span className="greek">{dayData.greek}</span> from{" "}
        {dayData.greekVerse}
      </p>
      <p>
        Your translation:{" "}
        {/* {(translations && translations.greek) || "Give it a shot!"} */}
      </p>
    </div>
  );
}
