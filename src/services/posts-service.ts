import { forbiddenError } from "../errors/forbidden-error";
import { CreatePostData } from "../protocols";
import { postsRepository, usersRepository } from "../repositories";

function getPosts() {
  return postsRepository.findPosts();
}

function getTrendings() {
  return postsRepository.getTrendings();
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
  getTrendings,
  createPost,
};
