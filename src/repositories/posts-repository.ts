import { imagekit, prisma } from "../config";
import { CreatePostData } from "../protocols";

function findPosts() {
  return prisma.posts.findMany({
    select: {
      description: true,
      image: true,
      species: true,
      users: {
        select: {
          id: true,
          user: true,
          name: true,
          picture: true,
        },
      },
    },
  });
}

function uploadPostPicture(user: string, base64image: string) {
  return imagekit.upload({
    file: base64image,
    fileName: `${user}_post.png`,
  });
}

function createPost(data: CreatePostData) {
  return prisma.posts.create({
    data: data,
  });
}

export const postsRepository = {
  findPosts,
  uploadPostPicture,
  createPost,
};
