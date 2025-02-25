export interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  profile: string;
  createdAt: string;
  updatedAt: string;
  customer: Customer
}


interface Customer {
  address: string;
  phone: string;
  departamento:string;
  country: string;
  zipcode:string;
}


export interface UserResponse {
  user: User,
  accessToken: string;
}
