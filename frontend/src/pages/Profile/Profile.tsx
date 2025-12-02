import React, { useEffect, useState } from "react";
import axios from "axios";

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
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.log("Nenhum token encontrado! Redirecionando...");
          window.location.href = "/login";
          return;
        }

        const { data } = await axios.get("http://localhost:8000/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Dados recebidos:", data);

        setUser(data); // SE NECESSÁRIO: setUser(data.user);
        setLoading(false);

      } catch (err: any) {
        console.error("Erro ao carregar perfil:", err.response?.data || err);
        setLoading(false); // <= IMPORTANTE!
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p>Carregando...</p>;

  if (!user) return <p>Erro ao carregar dados do perfil.</p>;

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", textAlign: "center" }}>
      <h1>Meu Perfil</h1>

      <img
        src="https://via.placeholder.com/120"
        alt="Foto do usuário"
        style={{ borderRadius: "50%", marginBottom: 20 }}
      />

      <div style={{ textAlign: "left", marginTop: 20 }}>
        <p><strong>Nome:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Telefone:</strong> {user.phone}</p>
        <p><strong>Tipo:</strong> {user.type}</p>
      </div>

      <button
        onClick={() => (window.location.href = "/profile/edit")}
        style={{ marginTop: 20, width: "100%" }}
      >
        Editar Perfil
      </button>

      <button
        onClick={() => (window.location.href = "/profile/change-password")}
        style={{ marginTop: 10, width: "100%" }}
      >
        Trocar Senha
      </button>

      <button
        style={{ marginTop: 30, width: "100%", backgroundColor: "red", color: "white" }}
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }}
      >
        Sair
      </button>
    </div>
  );
}
