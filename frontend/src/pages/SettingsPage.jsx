import React, { useEffect, useState } from "react";
import api from "../lib/axios.js";
import toast from "react-hot-toast";

const SettingsPage = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const res = await api.get("/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        toast.error("Couldn't fetch settings");
        console.error("Error fetching settings", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);
  return (
    <div className="flex items-center justify-center bg-neutral-950 min-h-screen pt-20">
      {loading && (
        <div className="text-white text-xl flex flex-row gap-x-5 items-center justify-center mt-52">
          <Spinner />
          Loading profile...
        </div>
      )}
      <p className="text-white">Settings</p>
    </div>
  );
};

export default SettingsPage;
