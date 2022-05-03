import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import { supportsService } from '../services/SupportsService'
import BaseController from '../utils/BaseController'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/supports', this.getSupportingProjects)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  // TODO GET PROJECT/TIER DETAILS IM SUPPORTING
  async getSupportingProjects (req, res, next){
    try {
      const userInfo = req.userInfo
      const supports = await supportsService.getMySupports(userInfo.id)
      return res.send(supports)
    } catch (error) {
      next(error)
    }
  }
}
