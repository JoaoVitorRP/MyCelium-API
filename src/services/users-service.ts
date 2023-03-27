import { conflictError } from "../errors";
import { SignUp } from "../protocols";
import { usersRepository } from "../repositories";
import { hashSync } from "bcrypt";

async function postUser(body: SignUp) {
  const repeatedUser = await usersRepository.findUserByUser(body.user);

  if (repeatedUser) throw conflictError("Invalid user");

  const repeatedEmail = await usersRepository.findUserByEmail(body.email);

  if (repeatedEmail) throw conflictError("Invalid email");

  if (body.picture) {
    const imageResponse = await usersRepository.insertProfilePicture(body.user, body.picture);

    body.picture = imageResponse.url;
  }

  body.password = hashSync(body.password, 10);

  return usersRepository.createUser(body);
}

export const usersService = {
  postUser,
};
