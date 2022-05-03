import { Auth0Provider } from '@bcwdev/auth0provider';
import { supportsService } from '../services/SupportsService';
import BasController from '../utils/BaseController';

export class SupportsController extends BasController{
    constructor(){
      super('api/supports')
      this.router

      .use(Auth0Provider.getAuthorizedUserInfo)
      // TODO CREATE SUPPORT
      .post('', this.create)
      // TODO EDIT TIER OF SUPPORT
      .put('/:id', this.update)
      .delete('/:id', this.delete)
    }


    // TODO CREATE SUPPORT BUT ONLY ALLOW ONE
    async create(req, res, next){
      try {
        req.body.accountId = req.userInfo.id
        const support = await supportsService.create(req.body)
        return res.send(support)
      } catch (error) {
        next(error)
      }
    }

    // TODO CHANGE TIER LEVEL OF SUPPORT
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
