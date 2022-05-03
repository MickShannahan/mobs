import { Auth0Provider } from '@bcwdev/auth0provider';
import { tiersService } from '../services/TiersService';
import BasController from '../utils/BaseController';

export class TiersController extends BasController{
    constructor(){
      super('api/tiers')
      this.router
      // .get('', this.getAll)
      // .get('/:id', this.getById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('', this.update)
      .delete('', this.delete)
    }

    // async getAll(req, res, next){
    //   try {
    //     const tiers = await tiersService.getAll(req.query)
    //     return res.send(tiers)
    //   } catch (error) {
    //     next(error)
    //   }
    // }

    // async getById(req, res, next){
    //   try {
    //     const tier = await tiersService.getById(req.params.id)
    //     return res.send(tier)
    //   } catch (error) {
    //     next(error)
    //   }
    // }

    async create(req, res, next){
      try {
        req.body.creatorId = req.userInfo.id
        const tier = await tiersService.create(req.body)
        return res.send(tier)
      } catch (error) {
        next(error)
      }
    }

    async update(req, res, next){
      try {
        req.body.creatorId = req.userInfo.id
        const tier = await tiersService.update(req.params.id, req.body)
        return res.send(tier)
      } catch (error) {
        next(error)
      }
    }

    async delete(req, res, next){
      try {
        const message = await tiersService.delete(req.params.id, req.userInfo.id)
        return res.send(message)
      } catch (error) {
        next(error)
      }
    }
}
