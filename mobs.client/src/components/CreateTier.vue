<template>
  <form id="project-form" @submit.prevent="createTier">
    <label >Tier Name</label>
    <input v-model="editable.name" type="text" aria-describedby="helpId" required>
     <label >Cost</label>
    <input v-model="editable.cost" type="number" min="0" max="150" aria-describedby="helpId" required>
    <button type="button" data-bs-dismiss="modal">cancel</button>
    <button type="submit">Create!</button>
  </form>
</template>

<script>
import { ref } from "@vue/reactivity"
import { projectsService } from "../services/ProjectsService"
import Pop from "../utils/Pop"
import { tiersService } from "../services/TiersService"
import { useRoute } from "vue-router"
import { Modal } from "bootstrap"
export default {
  setup(){
    const editable = ref({})
    const route = useRoute()
    return{
      editable,
      async createTier(){
        try {
          editable.value.projectId = route.params.id
          await tiersService.createTier(editable.value)
          Pop.toast('Tier Created!')
          Modal.getOrCreateInstance(document.getElementById('create-tier')).hide()
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
#project-form{
  padding: 2em;
  // display: flex;
  // flex-direction: column;
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
  @include selectable();
  // cancel button
  &:nth-child(5) {
    margin-left: 50%;
    background: transparent;
  }
  // create button
  &:nth-child(6) {
    @include bigShadow($secondary, 0.5);
    font-weight: 600;
    background: $secondary;
    color: $white;
    text-transform: capitalize;
  }
}
}
</style>
