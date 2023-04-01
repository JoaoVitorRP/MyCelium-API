import { postsRepository } from "../repositories";

function getPosts() {
  return postsRepository.findPosts();
}

export const postsService = {
  getPosts,
};
