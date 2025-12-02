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
  IonToast
} from "@ionic/react";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        email,
        password,
      });

      const token = response.data.token;

      if (!token) {
        throw new Error("Token não recebido");
      }

      // Salvar token
      localStorage.setItem("token", token);

      // Redirecionar para o Profile
      window.location.href = "/profile";

    } catch (error: any) {
      console.error("Erro no login:", error);

      setMessage(error.response?.data?.error || "Erro ao fazer login");
      setShowError(true);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">

        <IonItem>
          <IonLabel position="floating">E-mail</IonLabel>
          <IonInput
            type="email"
            value={email}
            onIonChange={(e) => setEmail(e.detail.value!)}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Senha</IonLabel>
          <IonInput
            type="password"
            value={password}
            onIonChange={(e) => setPassword(e.detail.value!)}
          />
        </IonItem>

        <IonButton
          expand="block"
          style={{ marginTop: 20 }}
          onClick={handleLogin}
        >
          Entrar
        </IonButton>

        <IonButton
          fill="clear"
          expand="block"
          onClick={() => (window.location.href = "/register")}
        >
          Criar conta
        </IonButton>

        <IonToast
          isOpen={showError}
          message={message}
          duration={2000}
          color="danger"
          onDidDismiss={() => setShowError(false)}
        />

      </IonContent>
    </IonPage>
  );
}
