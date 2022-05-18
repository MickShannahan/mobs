import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"



class SupportsService{
  async create(newSupport){
    const res = await api.post('api/supports', newSupport)
    logger.log('create support', res.data)
    AppState.supportedProjects.push(res.data)
  }

  async getProjectSupporters(projectId){
    const res = await api.get('api/projects/' + projectId + '/supports')
    logger.log('project supporters',res.data)
    AppState.supporters = res.data
  }

  async deleteSupport(id){
    const res = await api.delete('api/supports/' + id)
    logger.log('deleting support', res.data)
    AppState.supportedProjects = AppState.supportedProjects.filter(p => p.id != id)
  }

}

export const supportsService = new SupportsService()
