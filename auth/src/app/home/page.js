"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      fetch("/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            localStorage.removeItem("token");
            router.push("/login");
          } else {
            setUser(data);
          }
        });
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="d-flex flex-column align-items-center mt-5">
      <h1 className="mt-5">Home Page</h1>
      <p className="mt-3">Welcome back</p>
      <button onClick={handleLogout} className="btn btn-primary mt-3">
        Logout
      </button>
    </div>
  );
}
