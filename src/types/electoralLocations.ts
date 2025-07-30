// Base interface for creating an electoral location (without server-generated fields)
export interface CreateElectoralLocationType {
  fid: string;
  address: string;
  circumscription: {
    number: number;
    type: string;
    name: string;
  };
  code: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  district: string;
  electoralSeatId: string;
  name: string;
  zone: string;
  active: boolean;
}

// Interface for updating an electoral location (partial fields, excluding server-generated ones)
export interface UpdateElectoralLocationType {
  fid?: string;
  address?: string;
  circumscription?: {
    number: number;
    type: string;
    name: string;
  };
  code?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  district?: string;
  electoralSeatId?: string;
  name?: string;
  zone?: string;
  active?: boolean;
}

// Full interface for electoral location data from the server (with all server-generated fields)
export interface ElectoralLocationsType {
  _id: string;
  fid: string;
  __v: number;
  active: boolean;
  address: string;
  circumscription: {
    number: number;
    type: string;
    name: string;
  };
  code: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  createdAt: string;
  district: string;
  electoralSeatId: string;
  name: string;
  updatedAt: string;
  zone: string;
}
