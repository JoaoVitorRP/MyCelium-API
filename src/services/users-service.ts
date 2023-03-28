import { conflictError } from "../errors";
import { SignUp } from "../protocols";
import { usersRepository } from "../repositories";
import { hashSync } from "bcrypt";

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

export const usersService = {
  validateUser,
  postUser,
};
