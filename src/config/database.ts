import { PrismaClient } from "@prisma/client";
import ImageKit from "imagekit";

export let prisma: PrismaClient;
export let imagekit;

export function connectDb(): void {
  prisma = new PrismaClient();

  imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_ENDPOINT,
  });
}

export async function disconnectDB(): Promise<void> {
  await prisma?.$disconnect();
}
