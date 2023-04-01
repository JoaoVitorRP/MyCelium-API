import { prisma } from "../config";

function findPosts() {
  return prisma.posts.findMany({
    include: {
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

export const postsRepository = {
  findPosts,
};
