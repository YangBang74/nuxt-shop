export interface Sign {
  data: {
    fullName: string;
    email: string;
    role: string | null;
    id: number;
  };
  token: string;
}
