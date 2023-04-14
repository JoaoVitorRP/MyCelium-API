import { imagekit, prisma } from "../config";
import { SignUp } from "../protocols";

function findUserById(id: number) {
  return prisma.users.findUnique({
    where: { id },
  });
}

function findUserByUser(user: string) {
  return prisma.users.findUnique({
    where: { user },
  });
}

function findUserByEmail(email: string) {
  return prisma.users.findUnique({
    where: { email },
  });
}

function insertProfilePicture(user: string, base64image: string) {
  return imagekit.upload({
    file: base64image,
    fileName: `${user}_avatar.png`,
  });
}

function createUser(body: SignUp) {
  return prisma.users.create({
    data: body,
  });
}

export const usersRepository = {
  findUserById,
  findUserByUser,
  findUserByEmail,
  insertProfilePicture,
  createUser,
};
