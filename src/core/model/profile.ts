export interface ProfileModel {
  id: string
  name: string;
  email: string;
  role: string;
  photo: string | null;
  isMentor: boolean
}
