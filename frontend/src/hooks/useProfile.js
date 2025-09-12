import { useState, useEffect } from "react";
import { getProfile } from "../lib/api";

export function useProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await getProfile();
      setProfile(res.data.data || res.data);
      setError(null);
    } catch (err) {
      setError(err?.response?.data?.message || err.message);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return { profile, setProfile, fetchProfile, loading, error };
}
