export type ApplicationError = {
  name: string;
  message: string;
};

//Requisition types
export type SignUp = {
  user: string;
  email: string;
  password: string;
  name: string;
  picture?: string;
};

export type ValidateUser = Omit<SignUp, "password" | "name" | "picture">;
