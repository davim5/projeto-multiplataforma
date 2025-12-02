import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonIcon
} from "@ionic/react";
import { close } from "ionicons/icons";

interface PetDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  pet: any;
}

const PetDetailsModal: React.FC<PetDetailsModalProps> = ({ isOpen, onClose, pet }) => {
  if (!pet) return null;

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Detalhes do Pet</IonTitle>
          <IonButton slot="end" fill="clear" onClick={onClose}>
            <IonIcon icon={close} />
          </IonButton>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <h2>{pet.name}</h2>
        <p><strong>Raça:</strong> {pet.breed}</p>
        <p><strong>Idade:</strong> {pet.age}</p>
        <p><strong>Peso:</strong> {pet.weight}</p>
        <p><strong>Observações:</strong> {pet.notes}</p>
      </IonContent>
    </IonModal>
  );
};

export default PetDetailsModal;
