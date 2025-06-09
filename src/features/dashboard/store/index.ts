import { atom } from "jotai";
import { SubmissionStatus } from "../components/modules/detail-modules/DetailModuleContent";

export const CourseLevelList = [
  {
    label: "Beginner",
    value: "BEGINNER",
  },
  {
    label: "Intermediate",
    value: "INTERMEDIATE",
  },
  {
    label: "Expert",
    value: "EXPERT",
  },
];

interface DrawerState {
  show: boolean
  data?: {
    id: string;
    name: string;
  }
}

export const DrawerStateSession = atom<DrawerState>({
  show: false,
})

export const StatusRecord: Record<SubmissionStatus, 'success' | 'warning' | 'danger'> = {
  APPROVE: 'success',
  REJECT: 'danger',
  REVIEW: 'warning'
}