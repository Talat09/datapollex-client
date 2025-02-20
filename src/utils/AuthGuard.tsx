import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const getUserData = () => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      return { ...JSON.parse(user), token }; // Merge user data with token
    }
  }
  return null;
};

interface AuthGuardProps {
  children: ReactNode;
  allowedRoles?: string[];
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const router = useRouter();
  const [user, setUser] = useState<{
    _id: string;
    name: string;
    email: string;
    token: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = getUserData();
    setUser(userData);
    setLoading(false);

    if (!userData?.token) {
      router.push("/signin");
    }
  }, [router]);

  if (loading) return <p>Loading...</p>;

  return user ? <>{children}</> : null;
};

export default AuthGuard;
