import { imagekit, prisma } from "../config";
import { CreatePostData } from "../protocols";

function findPosts() {
  return prisma.posts.findMany({
    orderBy: {
      created_at: "asc",
    },
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

function getTrendings() {
  return prisma.posts.groupBy({
    by: ["species"],
    orderBy: {
      _count: {
        species: "desc",
      },
    },
    take: 10,
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
  getTrendings,
  uploadPostPicture,
  createPost,
};
