<template>
  <form id="project-form">
    <label>Project Name</label>
    <input
      v-model="editable.name"
      type="text"
      aria-describedby="helpId"
      required
    />
    <label>Category</label>
    <input
      v-model="editable.category"
      type="text"
      aria-describedby="helpId"
      required
    />
    <label>Cover Image</label>
    <input
      v-model="editable.img"
      type="text"
      aria-describedby="helpId"
      required
    />
    <label>Description</label>
    <textarea v-model="editable.description" required />
    <button type="button" data-bs-dismiss="modal">cancel</button>
    <button v-if="!project" type="button" @click="createProject">
      Create!
    </button>
    <button v-else type="button" @click="editProject">Save!</button>
  </form>
</template>

<script>
import { ref } from "@vue/reactivity"
import { projectsService } from "../services/ProjectsService"
import Pop from "../utils/Pop"
import { Modal } from "bootstrap"
import { onMounted, watchEffect } from '@vue/runtime-core'
export default {
  props: { project: { type: Object, required: false } },
  setup(props) {
    const editable = ref({})
    watchEffect(() => {
      editable.value = { ...props.project }
    })
    return {
      editable,
      async createProject() {
        try {
          await projectsService.createProject(editable.value)
          Pop.toast('Project Created!')
          Modal.getOrCreateInstance(document.getElementById('create-project')).hide()
        } catch (error) {
          Pop.error(error)
        }
      },
      async editProject() {
        try {
          await projectsService.editProject(editable.value)
          Pop.toast('Project updated!')
          Modal.getOrCreateInstance(document.getElementById('edit-project')).hide()
        } catch (error) {
          Pop.error(error)
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
