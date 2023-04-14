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

export type SignIn = {
  email: string;
  password: string;
};

export type CreatePostData = {
  user_id: number;
  description?: string;
  image: string;
  species: string;
};

export type CreatePostBody = Omit<CreatePostData, "user_id">;
