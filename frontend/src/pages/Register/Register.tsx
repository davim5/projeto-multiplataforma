import React, { useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonButton,
  IonItem,
  IonLabel,
  IonToast,
} from "@ionic/react";
import { parseAxiosError } from "../../utils/parseAxiosError"; // ajuste o caminho
import api from "../../services/api";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    type: "tutor",
  });

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState<"success" | "danger">("danger");

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async () => {
    try {
      await api.post("/users", form);

      setToastColor("success");
      setToastMessage("Cadastro realizado com sucesso!");
      setShowToast(true);

      setTimeout(() => {
        window.location.href = "/login";
      }, 500);

    } catch (err: unknown) {
      const msg = parseAxiosError(err, "Erro ao cadastrar usuário.");

      setToastColor("danger");
      setToastMessage(msg);
      setShowToast(true);
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
          <IonInput
            value={form.name}
            onIonInput={(e) => handleChange("name", String(e.target.value))}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Email</IonLabel>
          <IonInput
            type="email"
            value={form.email}
            onIonInput={(e) => handleChange("email", String(e.target.value))}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Senha</IonLabel>
          <IonInput
            type="password"
            value={form.password}
            onIonInput={(e) => handleChange("password", String(e.target.value))}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Telefone</IonLabel>
          <IonInput
            type="tel"
            value={form.phone}
            onIonInput={(e) => handleChange("phone", String(e.target.value))}
          />
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

        <IonButton
          expand="full"
          onClick={handleSubmit}
          style={{ marginTop: "20px" }}
        >
          Cadastrar
        </IonButton>

        <IonToast
          isOpen={showToast}
          message={toastMessage}
          duration={2000}
          color={toastColor}
          onDidDismiss={() => setShowToast(false)}
        />
      </IonContent>
    </IonPage>
  );
}
