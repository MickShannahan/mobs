import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class TiersService{
  async getTiersByProject(projectId){
    const res = await api.get('api/projects/'+projectId+'/tiers')
    logger.log('get Tiers', res.data)
    AppState.tiers = res.data
  }
}

export const tiersService = new TiersService()
