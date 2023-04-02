import { conflictError, unauthorizedError } from "../errors";
import { SignIn, SignUp } from "../protocols";
import { usersRepository } from "../repositories";
import { compareSync, hashSync } from "bcrypt";
import { sign } from "jsonwebtoken";

async function validateUser(email: string, user: string) {
  const repeatedEmail = await usersRepository.findUserByEmail(email);

  if (repeatedEmail) throw conflictError("Invalid email");

  const repeatedUser = await usersRepository.findUserByUser(user);

  if (repeatedUser) throw conflictError("Invalid user");

  return;
}

async function postUser(body: SignUp) {
  await validateUser(body.email, body.user);

  if (body.picture) {
    const imageResponse = await usersRepository.insertProfilePicture(body.user, body.picture);

    body.picture = imageResponse.url;
  }

  body.password = hashSync(body.password, 10);

  return usersRepository.createUser(body);
}

async function signIn({ email, password }: SignIn) {
  const user = await usersRepository.findUserByEmail(email);

  if (!user) throw unauthorizedError();

  const isPasswordValid = compareSync(password, user.password);

  if (!isPasswordValid) throw unauthorizedError();

  const token = sign({ userId: user.id }, process.env.JWT_SECRET);

  return {
    user: {
      name: user.name,
      user: user.user,
      picture: user.picture,
    },
    token,
  };
}

export const usersService = {
  validateUser,
  postUser,
  signIn,
};
