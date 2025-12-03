import React, { useEffect, useState } from "react";
import axios from "axios";
import ProfileTutor from "../ProfileTutor/ProfileTutor";
import ProfileWalker from "../ProfileWalker/ProfileWalker";
interface UserProfile {
  name: string;
  email: string;
  phone: string;
  type: string;
}

export default function Profile() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const token = localStorage.getItem("token");
      if (!token) return (window.location.href = "/login");

      const { data } = await axios.get("http://localhost:8000/api/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(data);
      setLoading(false);
    };

    load();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (!user) return <p>Erro ao carregar perfil.</p>;

  if (user.type === "tutor") return <ProfileTutor user={user} />;
  if (user.type === "passeador") return <ProfileWalker user={user} />;

  return <p>Tipo de usuário não reconhecido.</p>;
}
