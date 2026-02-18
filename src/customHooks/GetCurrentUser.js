
"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setUserData } from "@/redux/userSlice";

const GetCurrentUser = () => {
       const dispatch = useDispatch();

       useEffect(() => {
              const fetchUser = async() => {
                     try {
                            const res = await axios.get("/api/currentUser");
                            if (res.data.success) {
                                   dispatch(setUserData(res.data.data));
                            }
                     } catch (error) {
                            console.log("get current-user error:", error);
                     }
              };

              fetchUser();
       }, [dispatch]);
};

export default GetCurrentUser;


