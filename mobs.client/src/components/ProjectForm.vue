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
    <button type="button" @click="createProject">create</button>
  </form>
</template>

<script>
import { projectsService } from '../services/ProjectsService'
import { ref } from 'vue'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'

export default {
  setup() {
    const editable = ref({})
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
      }
    }
  }

}
</script>

<style lang="scss" scoped>
@import "../assets/scss/main.scss";
#project-form {
  padding: 2em;
  // display: flex;
  // flex-direction: column;
  color: $dark;
  input,
  textarea,
  select,
  button {
    border-radius: 5px;
    margin: 0.5em 0;
    padding: 0.5em;
    border: 0;
    color: $dark;
  }
  input,
  textarea {
    width: 100%;
    background: lighten($warning, 50);
    box-shadow: inset 0px 2px 4px rgba(26, 26, 26, 0.26);
  }
  textarea {
    min-height: 8rem;
  }
  button {
    display: inline-block;
    position: relative;
    width: 25%;
    padding: 0.75em 0.1em;
    border: 0;
    // cancel button
    &:nth-child(9) {
      margin-left: 50%;
      background: transparent;
    }
    // create button
    &:nth-child(10) {
      @include bigShadow($secondary, 0.5);
      font-weight: 600;
      background: $secondary;
      color: $white;
      text-transform: capitalize;
    }
  }
}
</style>
