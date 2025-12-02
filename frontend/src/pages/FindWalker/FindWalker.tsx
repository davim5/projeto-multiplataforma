import React, { useEffect, useState } from "react";
import axios from "axios";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonButton } from "@ionic/react";

interface Walker {
  _id: string;
  name: string;
  email: string;
  phone: string;
  type: string;
}

export default function FindWalker() {
  const [walkers, setWalkers] = useState<Walker[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWalkers = async () => {
      try {
        const { data } = await axios.get("http://localhost:8000/api/users?type=passeador");
        setWalkers(data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao carregar passeadores:", error);
      }
    };

    fetchWalkers();
  }, []);

  if (loading) return <p>Carregando passeadores...</p>;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Buscar Passeadores</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent style={{ padding: 16 }}>
        {walkers.length === 0 && <p>Nenhum passeador encontrado.</p>}

        {walkers.map((walker) => (
          <IonCard key={walker._id} style={{ padding: 16 }}>
            <h2>{walker.name}</h2>
            <p><strong>Email:</strong> {walker.email}</p>
            <p><strong>Telefone:</strong> {walker.phone}</p>
            <p><strong>Tipo:</strong> {walker.type}</p>

            <IonButton
              expand="block"
              onClick={() => window.location.href = `/solicitar/${walker._id}`}
            >
              Solicitar Passeio
            </IonButton>
          </IonCard>
        ))}
      </IonContent>
    </IonPage>
  );
}
