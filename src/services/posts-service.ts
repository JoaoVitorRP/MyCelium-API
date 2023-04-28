import { forbiddenError } from "../errors/forbidden-error";
import { notFoundError } from "../errors/not-found-error";
import { CreatePostData } from "../protocols";
import { postsRepository, usersRepository } from "../repositories";

function getPosts() {
  return postsRepository.findPosts();
}

async function getPostsBySpecies(species: string) {
  const posts = await postsRepository.findPostsBySpecies(species);

  if (posts.length === 0) throw notFoundError();

  return posts;
}

function getTrendings(limit: number) {
  return postsRepository.getTrendings(limit);
}

async function createPost(data: CreatePostData) {
  const user = await usersRepository.findUserById(data.user_id);

  if (!user) throw forbiddenError();

  const imageResponse = await postsRepository.uploadPostPicture(user.user, data.image);

  data.image = imageResponse.url;

  return postsRepository.createPost(data);
}

export const postsService = {
  getPosts,
  getPostsBySpecies,
  getTrendings,
  createPost,
};
