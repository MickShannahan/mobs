import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class ProjectsService{
  async createProject(body){
    const res = await api.post('api/projects', body)
    logger.log('created project', res.data)
    AppState.accountProjects.push(res.data)
  }


}

export const projectsService = new ProjectsService()
