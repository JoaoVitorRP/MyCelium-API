import { forbiddenError } from "../errors/forbidden-error";
import { CreatePostData } from "../protocols";
import { postsRepository, usersRepository } from "../repositories";

async function getPostsAndTrendings() {
  const posts = await postsRepository.findPosts();

  const trendings = await postsRepository.getTrendings();

  return { posts, trendings };
}

async function createPost(data: CreatePostData) {
  const user = await usersRepository.findUserById(data.user_id);

  if (!user) throw forbiddenError();

  const imageResponse = await postsRepository.uploadPostPicture(user.user, data.image);

  data.image = imageResponse.url;

  return postsRepository.createPost(data);
}

export const postsService = {
  getPostsAndTrendings,
  createPost,
};
