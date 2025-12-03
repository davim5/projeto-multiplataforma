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
  IonModal,
  IonIcon,
  IonToast
} from "@ionic/react";
import { close } from "ionicons/icons";
import { parseAxiosError } from "../../utils/parseAxiosError";

interface UserProfile {
  _id?: string;
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

interface Walk {
  _id: string;
  pet_id: Pet;
  walker_id: { name: string };
  day: string;
  start_time: string;
  duration: number;
  status: string;
}

interface ProfileTutorProps {
  user: UserProfile;
}

export default function ProfileTutor({ user }: ProfileTutorProps) {
  const [pets, setPets] = useState<Pet[]>([]);
  const [walks, setWalks] = useState<Walk[]>([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

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
          setToastMessage("Usuário não autenticado.");
          setShowToast(true);
          return;
        }

        // Buscar pets
        const petsRes = await axios.get("http://localhost:8000/api/pets/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPets(petsRes.data);

        // Buscar passeios
        const walksRes = await axios.get("http://localhost:8000/api/walk/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setWalks(walksRes.data);
        
      } catch (err: unknown) {
         if (axios.isAxiosError(err)) {
          setToastMessage(parseAxiosError(err, "Erro ao cadastrar o pet"));
        } else {
          setToastMessage("Erro desconhecido ao carregar dados.");
        }
        setShowToast(true);
      } finally {
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

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Meu Perfil Tutor</IonTitle>
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

        {/* INFO DO USUARIO */}
        <IonList>
          <IonItem>
            <IonLabel><strong>Telefone:</strong> {user.phone}</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel><strong>Tipo:</strong> {user.type}</IonLabel>
          </IonItem>
        </IonList>

        <IonButton expand="block" onClick={() => window.location.href = "/profile/edit"}>Editar Perfil</IonButton>
        <IonButton expand="block" color="medium" onClick={() => window.location.href = "/profile/change-password"}>Trocar Senha</IonButton>

        <hr style={{ margin: "20px 0" }} />

        {/* PETS */}
        <h2 style={{ textAlign: "center" }}>Meus Pets</h2>

        {pets.length === 0 ? (
          <p style={{ textAlign: "center", marginTop: 20 }}>Nenhum pet cadastrado.</p>
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
              </IonCardContent>
            </IonCard>
          ))
        )}

        <IonButton expand="block" color="success" onClick={() => window.location.href = "/pets/new"}>
          + Cadastrar Pet
        </IonButton>

        {/* MODAL DO PET */}
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
                {selectedPet.breed && <p><strong>Raça:</strong> {selectedPet.breed}</p>}
                {selectedPet.age && <p><strong>Idade:</strong> {selectedPet.age}</p>}
                {selectedPet.size && <p><strong>Porte:</strong> {selectedPet.size}</p>}

                <h3 style={{ marginTop: 20 }}>Passeios Agendados</h3>

                {walks
                  .filter(w => w.pet_id._id === selectedPet._id)
                  .map((walk) => (
                    <IonCard key={walk._id}>
                      <IonCardContent>
                        <p><strong>Data:</strong> {new Date(walk.day).toLocaleDateString()}</p>
                        <p><strong>Hora:</strong> {walk.start_time}</p>
                        <p><strong>Duração:</strong> {walk.duration} min</p>
                        <p><strong>Status:</strong> {walk.status}</p>
                      </IonCardContent>
                    </IonCard>
                  ))
                }

                {walks.filter(w => w.pet_id._id === selectedPet._id).length === 0 && (
                  <p>Nenhum passeio agendado.</p>
                )}

                <IonButton expand="block" color="warning" onClick={() => window.location.href = `/pets/edit/${selectedPet._id}`}>Editar Pet</IonButton>
                <IonButton expand="block" color="medium" onClick={closeModal}>Fechar</IonButton>
              </>
            )}
          </IonContent>
        </IonModal>

        {/* PASSEIOS */}
        <h2 style={{ textAlign: "center", marginTop: 30 }}>Passeios Agendados</h2>

        {walks.length === 0 ? (
          <p style={{ textAlign: "center" }}>Nenhum passeio agendado.</p>
        ) : (
          walks.map((walk) => (
            <IonCard key={walk._id}>
              <IonCardHeader>
                <IonCardTitle>{walk.pet_id.name}</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <p><strong>Data:</strong> {new Date(walk.day).toLocaleDateString()}</p>
                <p><strong>Hora:</strong> {walk.start_time}</p>
                <p><strong>Duração:</strong> {walk.duration} min</p>
                <p><strong>Status:</strong> {walk.status}</p>
              </IonCardContent>
            </IonCard>
          ))
        )}

        <IonButton expand="block" color="primary" style={{ marginTop: 20 }} onClick={() => window.location.href = "/profile/findWalker"}>
          Agendar Passeador
        </IonButton>

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

      {/* TOAST GLOBAL */}
      <IonToast
        isOpen={showToast}
        message={toastMessage}
        duration={2000}
        color="danger"
        onDidDismiss={() => setShowToast(false)}
      />
    </IonPage>
  );
}
