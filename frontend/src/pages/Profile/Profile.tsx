import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonSpinner,
  IonAvatar,
} from "@ionic/react";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  type: string;
}

interface Pet {
  _id: string;
  name: string;
  breed?: string;
  age?: string;
  size?: string;
}

export default function Profile() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          window.location.href = "/login";
          return;
        }

        // Buscar perfil
        const profileRes = await axios.get("http://localhost:8000/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(profileRes.data);

        // Buscar pets do tutor
        const petsRes = await axios.get("http://localhost:8000/api/pets/user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setPets(petsRes.data);

        setLoading(false);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading)
    return (
      <IonPage>
        <IonContent className="ion-padding" fullscreen>
          <div style={{ textAlign: "center", marginTop: 50 }}>
            <IonSpinner name="crescent" />
            <p>Carregando...</p>
          </div>
        </IonContent>
      </IonPage>
    );

  if (!user)
    return (
      <IonPage>
        <IonContent className="ion-padding">
          <p>Erro ao carregar perfil.</p>
        </IonContent>
      </IonPage>
    );

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
          <IonAvatar style={{ margin: "0 auto" }}>
            <img src="https://via.placeholder.com/120" alt="foto perfil" />
          </IonAvatar>

          <h2 style={{ marginTop: 10 }}>{user.name}</h2>
          <p>{user.email}</p>
        </div>

        {/* INFORMAÇÕES DO USUÁRIO */}
        <IonList>
          <IonItem>
            <IonLabel><strong>Telefone:</strong> {user.phone}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel><strong>Tipo:</strong> {user.type}</IonLabel>
          </IonItem>
        </IonList>

        {/* BOTÕES DO PERFIL */}
        <IonButton
          expand="block"
          onClick={() => (window.location.href = "/profile/edit")}
        >
          Editar Perfil
        </IonButton>

        <IonButton
          expand="block"
          color="medium"
          onClick={() => (window.location.href = "/profile/change-password")}
        >
          Trocar Senha
        </IonButton>

        <hr style={{ margin: "20px 0" }} />

        {/* PETS */}
        <h2 style={{ textAlign: "center" }}>Meus Pets</h2>

        <IonButton
          expand="block"
          color="success"
          onClick={() => (window.location.href = "/pets/new")}
        >
          + Cadastrar Pet
        </IonButton>
        {pets.length === 0 ? (
          <p style={{ textAlign: "center", marginTop: 20 }}>
            Você ainda não cadastrou nenhum pet.
          </p>
        ) : (
          pets.map((pet) => (
            <IonCard key={pet._id}>
              <IonCardHeader>
                <IonCardTitle>{pet.name}</IonCardTitle>
              </IonCardHeader>

              <IonCardContent>
                {pet.breed && <p><strong>Raça:</strong> {pet.breed}</p>}
                {pet.age && <p><strong>Idade:</strong> {pet.age}</p>}
                {pet.size && <p><strong>Porte:</strong> {pet.size}</p>}

                <IonButton
                  expand="block"
                  color="primary"
                  onClick={() => (window.location.href = `/pets/${pet._id}`)}
                >
                  Ver detalhes
                </IonButton>
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
