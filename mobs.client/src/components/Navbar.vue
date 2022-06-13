<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-transparent px-4">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex flex-column align-items-center">
        <h2>Mobs</h2>
      </div>
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>
    <div
      class="collapse navbar-collapse d-flex justify-content-end"
      id="navbarText"
    >
      <button
        v-if="account.id"
        data-bs-toggle="modal"
        data-bs-target="#create-project"
      >
        create Project
      </button>
      <Modal id="create-project">
        <template #body><ProjectForm /> </template>
      </Modal>
      <!-- LOGIN COMPONENT HERE -->
      <Login />
    </div>
  </nav>
</template>

<script>
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState';
export default {
  setup() {
    return {
      account: computed(() => AppState.account)
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/_navbar.scss";
</style>
