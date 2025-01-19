export interface AttendanceModel {
    id: string;
    user: {
      name: string;
      nim: string
      email: string;
    };
    location: string;
    image: string;
    point: number;
    createdAt: Date;
  }
  