import React, { useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import axios from 'axios';

export interface UserI {
  name: string;
}

const Home: React.FC = () => {
  const [users, setUsers] = useState<UserI[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/users");
        console.log(response.data);
        setUsers(response.data);   // Ou response.data.users dependendo do backend
      } catch (error) {
        console.log("Erro na requisição de usuários", error);
      }
    };
    fetchData();
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Usuários</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <ul>
          {users.map((user, i) => (
            <li key={i}>{user.name}</li>
          ))}
        </ul>
      </IonContent>
    </IonPage>
  );
};

export default Home;
