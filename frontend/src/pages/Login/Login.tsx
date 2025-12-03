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
  IonSpinner
} from "@ionic/react";
import axios from "axios";
import api from "../../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // 👈 estado do spinner

  const handleLogin = async () => {
    if (!email || !password) return;

    setLoading(true); // 🔥 ativa o spinner

    try {
      const response = await api.post("/login", { email, password });

      const token = response.data.token;

      if (!token) {
        throw new Error("Token não recebido");
      }

      localStorage.setItem("token", token);
      window.location.href = "/profile";

    } catch (error: unknown) {
      let msg = "Erro ao fazer login";

      if (axios.isAxiosError(error)) {
        msg = error.response?.data?.error || msg;
      } else if (error instanceof Error) {
        msg = error.message;
      }

      setMessage(msg);
      setShowError(true);

    } finally {
      setLoading(false); // 🔥 desativa o spinner
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
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion                  
            onIonChange={(e) => setEmail(e.detail.value!)}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Senha</IonLabel>
          <IonInput
            type="password"
            value={password}
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            onIonChange={(e) => setPassword(e.detail.value!)}
          />
        </IonItem>

        <IonButton
          expand="block"
          style={{ marginTop: 20 }}
          onClick={handleLogin}
          disabled={loading}      // ⛔ impede múltiplos cliques
        >
          {loading ? (
            <IonSpinner name="crescent" />
          ) : (
            "Entrar"
          )}
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
