import { Auth0Provider } from '@bcwdev/auth0provider';
import { supportsService } from '../services/SupportsService';
import BasController from '../utils/BaseController';

export class SupportsController extends BasController{
    constructor(){
      super('api/supports')
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
    //     const supports = await supportsService.getAll(req.query)
    //     return res.send(supports)
    //   } catch (error) {
    //     next(error)
    //   }
    // }

    // async getById(req, res, next){
    //   try {
    //     const support = await supportsService.getById(req.params.id)
    //     return res.send(support)
    //   } catch (error) {
    //     next(error)
    //   }
    // }

    async create(req, res, next){
      try {
        // TODO only allow a person to create one
        req.body.accountId = req.userInfo.id
        const support = await supportsService.create(req.body)
        return res.send(support)
      } catch (error) {
        next(error)
      }
    }

    // TODO change tier level
    async update(req, res, next){
      try {
        req.body.accountId = req.userInfo.id
        const support = await supportsService.update(req.params.id, req.body)
        return res.send(support)
      } catch (error) {
        next(error)
      }
    }

    async delete(req, res, next){
      try {
        const message = await supportsService.delete(req.params.id, req.userInfo.id)
        return res.send(message)
      } catch (error) {
        next(error)
      }
    }
}
