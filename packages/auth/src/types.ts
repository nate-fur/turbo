export interface User {
  id: string;
  name: string;
  email: string;
  logoURL?: string;
  roles?: string[];
  firstName?: string;
  lastName?: string;
  dob?: string;
  phone?: string;
  gender?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}
