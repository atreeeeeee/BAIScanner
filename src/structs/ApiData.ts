// TypeScript interfaces describing data returned by API.

export interface AttendanceEvent {
  isValidRequest: boolean;
  savedSuccessfully: boolean;
  message: string;
  signIn: boolean;
  signOut: boolean;
}

export interface AttendanceData {
  id: number
  studentId: string;
  enteredAt: string;
  signIn: boolean;
  signOut: boolean
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  isActive: boolean;
}

export interface Member {
  id: number;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  isActive: boolean;
  studentId: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  photo: string;
  studentIdNumber: string;
  srtTeacher: string;
  srtRoomNumber: string;
  canvasUsername: string;
  counselor: string;
  locker: string;
  lockerLocation: string;
  shirtSize: string;
  ethnicity: string;
  gender: string;
  pronouns: string;
  extraActivities: string;
  division: string;
  agree: boolean;
  seniority: string;
  graduationYear: number;
  email: string;
  phone: string
}

export interface TokenData {
  message: string;
  isAuthenticated: boolean;
  clientId: string;
  token: string;
  refreshToken: string;
  refreshTokenExpiration: string
}