import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonButton,
  IonToast,
} from "@ionic/react";
import React, { useState } from "react";
import axios from "axios";
import { useIonRouter } from "@ionic/react";

export default function RegisterPet() {
  const router = useIonRouter();

  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [size, setSize] = useState("");
  const [observations, setObservations] = useState("");

  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleCreatePet = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setErrorMsg("Usuário não autenticado.");
        setShowError(true);
        return;
      }

      const body = {
        name,
        breed,
        age,
        size,
        observations,
      };

      await axios.post("http://localhost:8000/api/pets", body, {
        headers: { Authorization: `Bearer ${token}` },
      });

      router.push("/profile", "forward");

    } catch (err: any) {
      setErrorMsg(err.response?.data?.error || "Erro ao cadastrar o pet");
      setShowError(true);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Cadastrar Pet</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonList>
          <IonItem>
            <IonLabel position="stacked">Nome</IonLabel>
            <IonInput
              value={name}
              onIonInput={(e: any) => setName(e.target.value)}
              placeholder="Ex: Rex"
              required
            />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Raça</IonLabel>
            <IonInput
              value={breed}
              onIonInput={(e: any) => setBreed(e.target.value)}
              placeholder="Ex: Golden Retriever"
            />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Idade</IonLabel>
            <IonInput
              value={age}
              onIonInput={(e: any) => setAge(e.target.value)}
              placeholder="Ex: 2 anos"
            />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Porte</IonLabel>
            <IonSelect
              interface="action-sheet"
              value={size}
              onIonChange={(e) => setSize(e.detail.value)}
            >
              <IonSelectOption value="pequeno">Pequeno</IonSelectOption>
              <IonSelectOption value="medio">Médio</IonSelectOption>
              <IonSelectOption value="grande">Grande</IonSelectOption>
            </IonSelect>
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Observações</IonLabel>
            <IonTextarea
              value={observations}
              onIonInput={(e: any) => setObservations(e.target.value)}
              rows={4}
            />
          </IonItem>
        </IonList>

        <div style={{ padding: 20 }}>
          <IonButton expand="block" onClick={handleCreatePet}>
            Salvar
          </IonButton>

          <IonButton
            expand="block"
            fill="outline"
            color="medium"
            onClick={() => router.back()}
            style={{ marginTop: 10 }}
          >
            Cancelar
          </IonButton>
        </div>

        <IonToast
          isOpen={showError}
          message={errorMsg}
          duration={2000}
          color="danger"
          onDidDismiss={() => setShowError(false)}
        />
      </IonContent>
    </IonPage>
  );
}
