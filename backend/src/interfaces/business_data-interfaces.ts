export interface permissionInterface {
  role_id: number;
  role: string;
  level: number;
  org_id: number;
  title: string;
  parent_id: number;
  ancient: number[];
}
export interface sessionInterface {
  sessionID: string;
  username: string;
  user_id: number;
  name: string;
  permission: permissionInterface;
}
export interface carparksInterface {
  car_park_no: string;
  address: string;
  x_coord: number;
  y_coord: number;
  car_park_type: string;
  type_of_parking_system: string;
  short_term_parking: string;
  free_parking: boolean;
  night_parking: boolean;
  car_park_decks: number;
  gantry_height: number;
  car_park_basement: boolean;
}
export interface availableInterface {
  available: string;
}
