import { Auth0Provider } from '@bcwdev/auth0provider';
import { projectsService } from '../services/ProjectsService';
import { tiersService } from '../services/TiersService';
import BasController from '../utils/BaseController';

export class ProjectsController extends BasController{
    constructor(){
      super('api/projects')
      this.router
      // TODO getAll, getOne, getTiers, getSupporters, [AUTH] getPosts, create, update, delete
      .get('', this.getAll)
      .get('/:id', this.getById)
      //TODO get tiers
      .get('/:id/tiers', this.getTiers)
      // TODO get supporters
      // TODO get posts
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.update)
      .delete('/:id', this.delete)
    }

    async getAll(req, res, next){
      try {
        let projects = await projectsService.getAll()
        return res.send(projects)
      } catch (error) {
        next(error)
      }
    }

    async getById(req,res, next){
      try {
        let project = await projectsService.getById(req.params.id)
        return res.send(project)
      } catch (error) {
        next(error)
      }
    }

    async getTiers(req, res, next){
      try {
        let tiers = await tiersService.getByProjectId(req.params.id)
        return res.send(tiers)
      } catch (error) {
        next(error)
      }
    }
    async create(req, res, next){
      try {
        req.body.creatorId = req.userInfo.id
        let project = await projectsService.create(req.body)
        return res.send(project)
      } catch (error) {
        next(error)
      }
    }
    async update(req,res,next){
      try {
        req.body.creatorId = req.userInfo.id
        let project = await projectsService.update(req.params.id, req.body)
        return res.send(project)
      } catch (error) {
        next(error)
      }
    }
    async delete(req, res, next){
      try {
        let message = await projectsService.delete(req.params.id, req.userInfo.id)
        return res.send(message)
      } catch (error) {
        next(error)
      }
    }

}
