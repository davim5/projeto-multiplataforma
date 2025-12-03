export interface UserProfile {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  type: string;
}

export interface ProfileWalkerProps {
  user: UserProfile;
}
export interface ProfileTutorProps {
  user: UserProfile;
}

