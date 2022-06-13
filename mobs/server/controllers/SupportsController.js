import { Auth0Provider } from '@bcwdev/auth0provider';
import { supportsService } from '../services/SupportsService';
import BasController from '../utils/BaseController';

export class SupportsController extends BasController{
    constructor(){
      super('api/supports')
      this.router
      // TODO [AUTH] create (only allow one), update, delete
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.update)
      .delete('/:id', this.remove)
    }

    async create(req, res, next){
      try {
        req.body.accountId = req.userInfo.id
        let support = await supportsService.create(req.body)
        return res.send(support)
      } catch (error) {
        next(error)
      }
    }

    async update(req, res, next){
      try {
        req.body.accountId = req.userInfo.id
        let support = await supportsService.update(req.body, req.params.id)
        return res.send(support)
      } catch (error) {
        next(error)
      }
    }

    async remove(req, res, next){
      try {
        let message = await supportsService.remove(req.params.id, req.userInfo.id)
        return res.send(message)
      } catch (error) {
        next(error)
      }
    }
}
