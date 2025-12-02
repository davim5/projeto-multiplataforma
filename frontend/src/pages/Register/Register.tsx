import React, { useState } from "react";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton, IonItem, IonLabel, IonList } from "@ionic/react";
import axios from "axios";

export default function Register () {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    type: "tutor"
  });

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/users", form);
      console.log("User created:", response.data);
      alert("Cadastro realizado com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar usuário", error);
      alert("Erro ao cadastrar usuário");
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
          <IonItem>
            <IonLabel position="floating">Nome</IonLabel>
            <IonInput value={form.name} onIonInput={(e) => handleChange("name", String(e.target.value))} />
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Email</IonLabel>
            <IonInput type="email" value={form.email} onIonInput={(e) => handleChange("email", String(e.target.value))} />
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Senha</IonLabel>
            <IonInput type="password" value={form.password} onIonInput={(e) => handleChange("password", String(e.target.value))} />
          </IonItem>

          <IonItem>
            <IonLabel position="floating">Telefone</IonLabel>
            <IonInput type="tel" value={form.phone} onIonInput={(e) => handleChange("phone", String(e.target.value))} />
          </IonItem>

          <IonItem>
            <IonLabel>Tipo</IonLabel>
            <select
              value={form.type}
              onChange={(e) => handleChange("type", e.target.value)}
              style={{ width: "100%", padding: "10px" }}
            >
              <option value="tutor">Tutor</option>
              <option value="passeador">Passeador</option>
            </select>
          </IonItem>

        <IonButton expand="full" onClick={handleSubmit} style={{ marginTop: "20px" }}>
          Cadastrar
        </IonButton>
      </IonContent>
    </IonPage>
  );
}