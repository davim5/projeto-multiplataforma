import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonButton,
  IonModal,
  IonList,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonDatetime,
  IonInput,
  IonSpinner,
} from "@ionic/react";

interface Walker {
  _id: string;
  name: string;
  email: string;
  phone: string;
  type: string;
}

interface Pet {
  _id: string;
  name: string;
}

export default function FindWalker() {
  const [walkers, setWalkers] = useState<Walker[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal States
  const [showModal, setShowModal] = useState(false);
  const [selectedWalker, setSelectedWalker] = useState<Walker | null>(null);
  const [pets, setPets] = useState<Pet[]>([]);

  // Form fields
  const [date, setDate] = useState("") as any;
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState("");
  const [selectedPet, setSelectedPet] = useState("");

  // Carrega passeadores
  useEffect(() => {
    const fetchWalkers = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8000/api/users?type=passeador"
        );
        setWalkers(data);
      } catch (error) {
        console.error("Erro ao carregar passeadores:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWalkers();
  }, []);

  // Carrega pets do usuário
  const loadPets = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const { data } = await axios.get("http://localhost:8000/api/pets/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPets(data);
    } catch (err) {
      console.error("Erro ao carregar pets:", err);
    }
  };

  const openModal = async (walker: Walker) => {
    setSelectedWalker(walker);
    setShowModal(true);
    await loadPets();
  };

  const searchWalkers = async () => {
    if (!selectedWalker || !date || !time || !duration || !selectedPet) {
      alert("Preencha todos os campos!");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await axios.post(
        "http://localhost:8000/api/walk", 
        {
          walker_id: selectedWalker._id,
          pet_id: selectedPet,
          day: date, 
          start_time: time,
          duration: Number(duration),
          obs: "",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Passeio solicitado com sucesso!");
      setShowModal(false);
      setSelectedPet("");
      setDate("");
      setTime("");
      setDuration("");
    } catch (err: unknown) {
      // Type-safe para axios
      if (axios.isAxiosError(err)) {
        console.error("Erro ao solicitar passeio:", err.response?.data || err.message);
      } else {
        console.error("Erro ao solicitar passeio:", err);
      }
      alert("Erro ao solicitar passeio");
    }
  };

  if (loading)
    return (
      <p style={{ textAlign: "center", marginTop: 40 }}>
        <IonSpinner /> Carregando passeadores...
      </p>
    );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Buscar Passeadores</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {walkers.length === 0 && <p>Nenhum passeador encontrado.</p>}

        {walkers.map((walker) => (
          <IonCard key={walker._id} style={{ padding: 16 }}>
            <h2>{walker.name}</h2>
            <p><strong>Email:</strong> {walker.email}</p>
            <p><strong>Telefone:</strong> {walker.phone}</p>
            <p><strong>Tipo:</strong> {walker.type}</p>

            <IonButton expand="block" onClick={() => openModal(walker)}>
              Solicitar Passeio
            </IonButton>
          </IonCard>
        ))}

        {/* MODAL */}
        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          <IonContent className="ion-padding">
            <h2 style={{ textAlign: "center" }}>
              Solicitar passeio com {selectedWalker?.name}
            </h2>

            <IonList>
              <IonItem>
                <IonLabel>Selecione o Pet</IonLabel>
                <IonSelect
                  placeholder="Escolha um pet"
                  value={selectedPet}
                  onIonChange={(e) => setSelectedPet(e.detail.value)}
                >
                  {pets.map((pet) => (
                    <IonSelectOption key={pet._id} value={pet._id}>
                      {pet.name}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>

              <IonItem>
                <IonLabel>Dia</IonLabel>
                <IonDatetime
                  presentation="date"
                  value={date}
                  onIonChange={(e) => setDate(e.detail.value!)}
                />
              </IonItem>

              <IonItem>
                <IonLabel>Hora</IonLabel>
                <IonInput
                  type="time"
                  value={time}
                  onIonChange={(e) => setTime(e.detail.value!)}
                />
              </IonItem>

              <IonItem>
                <IonLabel>Duração (minutos)</IonLabel>
                <IonInput
                  type="number"
                  value={duration}
                  onIonChange={(e) => setDuration(e.detail.value!)}
                  placeholder="Ex: 30"
                />
              </IonItem>
            </IonList>

            <IonButton expand="block" color="success" onClick={searchWalkers}>
              Confirmar Solicitação
            </IonButton>

            <IonButton expand="block" color="medium" onClick={() => setShowModal(false)}>
              Cancelar
            </IonButton>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
}
