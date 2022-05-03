import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";


class PostsService{

  // TODO get users tier level, only get posts of that or lower
  async getProjectPosts(projectId){
    const posts = await dbContext.Posts.find({projectId})
    return posts
  }
  async create(body) {
    let post = await dbContext.Posts.create(body)
    await post.populate('creator', 'name picture')
    return post
  }
  async update(id, update) {
    const original = await dbContext.Posts.findById(id).populate('creator', 'name picture')
    if(original.creatorId.toString() != update.creatorId){
      throw new BadRequest("you don't have permission to edit that post")
    }
    original.title = update.title ? update.title : original.title
    original.body = update.body ? update.body : original.body
    original.imgUrl = update.imgUrl ? update.imgUrl : original.imgUrl
    original.tierId = update.tierId ? update.tierId : original.tierId
    original.save()
    return update
  }
  async delete(id, userId) {
    const post = await dbContext.Posts.findById(id)
    if(post.creatorId.toString() != userId){
      throw new BadRequest("you don't have permission to delete that post")
    }
    return `deleted post ${post.name}`
  }

}

export const postsService = new PostsService();
