interface App {
  packageName: string;
  appName: string;
  icon: import('react-native').ImageSourcePropType;
  color?: string;
}

interface Hotel {
  id: number;
  name: string;
  branch: string;
  city: string;
  province: string;
  state: string;
  apiKey: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  deletedAt?: Date | string;
}

interface HotelProfile {
  id: number;
  hotelId: number;
  logoColor: string;
  logoWhite: string;
  logoBlack: string;
  primaryColor: string;
  description: string;
  mainPhoto: string;
  introVideo: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  deletedAt?: Date | string;
}

interface HotelProfileDetail {
  id: number;
  hotelId?: number;
  title?: string;
  description?: string;
  menu?: menus[];
  img: any;
}
interface menus {
  id: number;
  image: string;
  desc: string;
  
}

interface DanuDetail {
  id?: number;
  hotelId?: number;
  title?: string;
  description?: string;
  img?: any;
}
interface Galery {
  id: number;
  hotelId?: number;
  title?: string;
  description?: string;
  img?: any;
}
interface KappaInstants {
  id: number;
  hotelId?: number;
  title?: string;
  description?: string;
  img?: any;
  detail: details[];
}
interface details {
  id: number;
  title?: string;
  description?: string;
  img?: any;
}

interface Info {
  id: number;
  hotelId: number;
  runningText: string;
}

interface Room {
  id: number;
  hotelId: number;
  primaryColor: string;
  name: string;
  description: string;
  img: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  deletedAt?: Date | string;
}

interface Around {
  id: number;
  hotelId: number;
  name: string;
  description: string;
  img: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  deletedAt?: Date | string;
}

interface RoomInfo {
  roomId: number;
  no: string;
  guestName: string;
}

interface StreamURL {
  url: string;
  cctv: string;
}

interface HotelEvent {
  id: number;
  hotelId: number;
  name: string;
  description: string;
  img: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  deletedAt?: Date | string;
}

interface Facility {
  id: number;
  hotelId: number;
  name: string;
  description: string;
  img: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  deletedAt?: Date | string;
}

interface Promo {
  id: number;
  hotelId: number;
  name: string;
  description: string;
  img: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  deletedAt?: Date | string;
}

interface Policy {
  id: number;
  hotelId: number;
  name: string;
  description: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  deletedAt?: Date | string;
}

interface FoodCategory {
  id: number;
  hotelId: number;
  name: string;
  img: string | import('react-native').ImageSourcePropType;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  deletedAt?: Date | string;
}

interface listResortProfile {
  img: string;
}

interface Food {
  id: number;
  foodCategoryId: number;
  foodCategory?: FoodCategory;
  name: string;
  description: string;
  img: string;
  price: number;
  favorite: number;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  deletedAt?: Date | string;
}
