enum Status {
  ACTIVE = "Active",
  INACTIVE = "Inactive",
}

export const StatusKeys = Object.keys(Status) as string[];
export const StatusValues = Object.keys(Status) as Status[];

enum IndoorOutdoor {
  INDOOR = "Indoor",
  OUTDOOR = "Outdoor",
}

export const IndoorOutdoorKeys = Object.keys(IndoorOutdoor) as string[];
export const IndoorOutdoorValues = Object.values(
  IndoorOutdoor
) as IndoorOutdoor[];

interface IRating {
  rate: number;
  count: number;
}

export interface IProductFromAPI {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: IRating;
}

export interface IProduct extends IProductFromAPI {
  status: Status;
  indoorOrOutdoor?: IndoorOutdoor;
}
