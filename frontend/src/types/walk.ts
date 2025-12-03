import { Pet } from "./pet";

export interface Walk {
  _id: string;
  pet_id: Pet;
  walker_id: { name: string };
  owner_id: { name: string };
  day: string;
  start_time: string;
  duration: number;
  status: string;
}