<template>
  <form id="project-form">
    <label for="">Project name</label>
    <input type="text" placeholder="project name" v-model="editable.name" />
    <label for="">Description</label>
    <textarea
      v-model="editable.description"
      placeholder="tell us about your project..."
      cols="30"
      rows="10"
    ></textarea>
    <label for=""> project image</label>
    <input v-model="editable.img" type="text" placeholder="image for project" />
    <button type="button">cancel</button>
    <button v-if="!project.id" type="button" @click="createProject">
      create
    </button>
    <button v-else type="button" @click="updateProject">update</button>
  </form>
</template>

<script>
import { projectsService } from '../services/ProjectsService'
import { ref, watchEffect } from 'vue'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'

export default {
  props: { project: { type: Object, default: {} } },
  setup(props) {
    const editable = ref({})
    watchEffect(() => editable.value = props.project)
    return {
      editable,
      async createProject() {
        try {
          await projectsService.createProject(editable.value)
          Pop.toast('Project created', 'success')
          editable.value = {}
        } catch (error) {
          Pop.toast(error.message, 'error')
          logger.log(error)
        }
      },
      async updateProject() {
        try {
          await projectsService.updateProject(editable.value)
          Pop.toast('Project updated', 'success')
        } catch (error) {
          Pop.toast(error.message, 'error')
          logger.log(error)
        }
      }
    }
  }

}
</script>

<style lang="scss" scoped>
@import "../assets/scss/_projectForm.scss";
</style>
