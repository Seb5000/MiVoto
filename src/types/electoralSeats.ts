// Base interface for creating an electoral seat (without server-generated fields)
export interface CreateElectoralSeatType {
  idLoc: string;
  municipalityId: string;
  name: string;
  active: boolean;
}

// Interface for updating an electoral seat (partial fields, excluding server-generated ones)
export interface UpdateElectoralSeatType {
  idLoc?: string;
  municipalityId?: string;
  name?: string;
  active?: boolean;
}

// Full interface for electoral seat data from the server (with all server-generated fields)
export interface ElectoralSeatsType {
  _id: string;
  idLoc: string;
  municipalityId: string;
  __v: number;
  active: boolean;
  createdAt: string;
  name: string;
  updatedAt: string;
}
