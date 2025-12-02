import React, { useEffect, useState } from "react";
import { useIonRouter } from "@ionic/react";


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
  IonModal,
  IonIcon
} from "@ionic/react";

import { close } from "ionicons/icons";

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

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);

  const openModal = (pet: Pet) => {
    setSelectedPet(pet);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedPet(null);
  };

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
          <IonAvatar style={{ margin: "0 auto", border:"4px solid white"}}>
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

        {pets.length === 0 ? (
          <p style={{ textAlign: "center", marginTop: 20 }}>
            Você ainda não cadastrou nenhum pet.
          </p>
        ) : (
          pets.map((pet) => (
            <IonCard key={pet._id} onClick={() => openModal(pet)}>
              <IonCardHeader>
                <IonCardTitle>{pet.name}</IonCardTitle>
              </IonCardHeader>

              <IonCardContent>
                {pet.breed && <p><strong>Raça:</strong> {pet.breed}</p>}
                {pet.age && <p><strong>Idade:</strong> {pet.age}</p>}
                {pet.size && <p><strong>Porte:</strong> {pet.size}</p>}

                <IonButton expand="block" color="primary">
                  Ver detalhes
                </IonButton>
              </IonCardContent>
            </IonCard>
          ))
        )}
         <IonButton
          expand="block"
          color="success"
          onClick={() => (window.location.href = "/pets/new")}
        >
          + Cadastrar Pet
        </IonButton>
        {/* MODAL DE DETALHES DO PET */}
        <IonModal isOpen={modalOpen} onDidDismiss={closeModal}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Detalhes do Pet</IonTitle>
              <IonButton slot="end" fill="clear" onClick={closeModal}>
                <IonIcon icon={close} />
              </IonButton>
            </IonToolbar>
          </IonHeader>

          <IonContent className="ion-padding">
            {selectedPet && (
              <>
                <h2>{selectedPet.name}</h2>

                {selectedPet.breed && (
                  <p><strong>Raça:</strong> {selectedPet.breed}</p>
                )}

                {selectedPet.age && (
                  <p><strong>Idade:</strong> {selectedPet.age}</p>
                )}

                {selectedPet.size && (
                  <p><strong>Porte:</strong> {selectedPet.size}</p>
                )}

                <IonButton
                  expand="block"
                  color="warning"
                  onClick={() => {
                    window.location.href = `/pets/edit/${selectedPet._id}`;
                  }}
                >
                  Editar Pet
                </IonButton>

                <IonButton
                  expand="block"
                  color="medium"
                  onClick={closeModal}
                >
                  Fechar
                </IonButton>
              </>
            )}
          </IonContent>
        </IonModal>

        
        <IonButton
          expand="block"
          color="primary"
          style={{ marginTop: 20 }}
          onClick={() => {
            localStorage.setItem("userPets", JSON.stringify(pets));
            window.location.href = "/profile/findWalker";          }}
        >
          Agentar Passeador
        </IonButton>

        {/* BOTÃO SAIR */}
        <IonButton
          expand="block"
          color="danger"
          style={{ marginTop: 20 }}
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("userPets");
            window.location.href = "/login";
          }}
        >
          Sair
        </IonButton>
      </IonContent>
    </IonPage>
  );
}
