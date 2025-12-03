import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonAvatar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonSpinner
} from "@ionic/react";

interface UserProfile {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  type: string;
}

interface Walk {
  _id: string;
  pet_id: {
    name: string;
    _id: string;
  };
  owner_id: {
    name: string;
  };
  day: string;
  start_time: string;
  duration: number;
  status: string;
}

interface ProfileWalkerProps {
  user: UserProfile;
}

export default function ProfileWalker({ user }: ProfileWalkerProps) {
  const [walks, setWalks] = useState<Walk[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWalks = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:8000/api/walk/walker", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setWalks(res.data);
      } catch (err) {
        console.error("Erro ao carregar passeios:", err);
      } finally {
        setLoading(false);
      }
    };

    loadWalks();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Meu Perfil</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">

        {/* FOTO / HEADER */}
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <IonAvatar style={{ margin: "0 auto", border: "4px solid white" }}>
            <img src="https://via.placeholder.com/120" alt="foto perfil" />
          </IonAvatar>

          <h2 style={{ marginTop: 10 }}>{user.name}</h2>
          <p>{user.email}</p>
        </div>

        {/* INFORMAÇÕES DO PASSEADOR */}
        <IonList>
          <IonItem>
            <IonLabel>
              <strong>Telefone:</strong> {user.phone}
            </IonLabel>
          </IonItem>

          <IonItem>
            <IonLabel>
              <strong>Tipo:</strong> {user.type}
            </IonLabel>
          </IonItem>
        </IonList>

        {/* BOTÕES */}
        <IonButton expand="block" onClick={() => window.location.href = "/profile/edit"}>
          Editar Perfil
        </IonButton>

        <IonButton
          expand="block"
          color="medium"
          onClick={() => window.location.href = "/profile/change-password"}
        >
          Trocar Senha
        </IonButton>

        <hr style={{ margin: "20px 0" }} />

        {/* LISTA DE PASSEIOS */}
        <h2 style={{ textAlign: "center" }}>Passeios Agendados</h2>

        {loading ? (
          <div style={{ textAlign: "center", marginTop: 20 }}>
            <IonSpinner name="crescent" />
            <p>Carregando passeios...</p>
          </div>
        ) : walks.length === 0 ? (
          <p style={{ textAlign: "center", marginTop: 10 }}>
            Nenhum passeio agendado.
          </p>
        ) : (
          walks.map((walk) => (
            <IonCard key={walk._id}>
              <IonCardHeader>
                <IonCardTitle>
                  🐾 {walk.pet_id?.name || "Pet não encontrado"}
                </IonCardTitle>
              </IonCardHeader>

              <IonCardContent>
                <p><strong>Tutor:</strong> {walk.owner_id?.name}</p>
                <p><strong>Data:</strong> {new Date(walk.day).toLocaleDateString()}</p>
                <p><strong>Hora:</strong> {walk.start_time}</p>
                <p><strong>Duração:</strong> {walk.duration} min</p>
                <p><strong>Status:</strong> {walk.status}</p>
              </IonCardContent>
            </IonCard>
          ))
        )}

        {/* BOTÃO SAIR */}
        <IonButton
          expand="block"
          color="danger"
          style={{ marginTop: 20 }}
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
        >
          Sair
        </IonButton>

      </IonContent>
    </IonPage>
  );
}
