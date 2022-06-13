import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"



class SupportsService{

  async getByProjectId(projectId){
    const res = await api.get(`api/projects/${projectId}/supports`)
    logger.log('-getProjectSupporters-', res.data)
    AppState.supporters = res.data
  }

  async createSupport(support){
    const res = await api.post('api/supports', support)
    logger.log('-createSupport-', res.data)
    AppState.supportedProjects.push(res.data)
    AppState.supporters.push(res.data)
  }

  async updateSupport(update){
    const res = await api.put('api/supports/'+update.id, update)
    logger.log( '-updateSupport-', res.data)
  }

  async deleteSupport(id){
    const res = await api.delete('api/supports/'+ id)
    logger.log('-deleteSupport-', res.data)
   AppState.supportedProjects = AppState.supportedProjects.filter(sp => sp.id != id)
  }
}

export const supportsService = new SupportsService()
