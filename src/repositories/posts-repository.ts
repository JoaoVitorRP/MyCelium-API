import { imagekit, prisma } from "../config";
import { CreatePostData } from "../protocols";

function findPosts() {
  return prisma.posts.findMany({
    orderBy: {
      created_at: "desc",
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

function getTrendings(limit: number) {
  return prisma.posts.groupBy({
    by: ["species"],
    orderBy: {
      _count: {
        species: "desc",
      },
    },
    _count: {
      species: true,
    },
    take: limit,
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
