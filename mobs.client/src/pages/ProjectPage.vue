<template>
  <div class="project-page">
    <!-- PROJECT DETAILS -->
    <section id="project">
      <img :src="project.img" alt="" />
      <div>
        <h4>{{ project.name }}</h4>
        <p v-if="project.createdAt">
          funded since {{ formatDate(project.createdAt) }}
        </p>
        <button
          v-if="account.id == project.creatorId"
          data-bs-toggle="modal"
          data-bs-target="#edit-project"
        >
          <i class="mdi mdi-pencil"></i> edit
        </button>
      </div>
      <!-- Supporters offcanvas -->
      <Supporters />
      <!-- Edit project modal -->
      <Modal id="edit-project">
        <template #header>Edit {{ project.name }}</template>
        <template #body><ProjectForm :project="project" /></template>
      </Modal>
    </section>
    <!--  -->
    <section id="tiers-container">
      <h5>tiers</h5>
      <div class="tiers">
        <Tier v-for="t in tiers" :key="t.id" :tier="t" />
      </div>
    </section>
  </div>
</template>


<script>
import { computed, onMounted } from '@vue/runtime-core';
import { projectsService } from '../services/ProjectsService';
import { tiersService } from '../services/TiersService';
import { useRoute } from 'vue-router';
import Pop from '../utils/Pop';
import { AppState } from '../AppState';
import { supportsService } from '../services/SupportsService';

export default {
  setup() {
    const route = useRoute()
    onMounted(async () => {
      try {
        await projectsService.getById(route.params.id)
        await tiersService.getByProjectId(route.params.id)
        await supportsService.getByProjectId(route.params.id)
      } catch (error) {
        Pop.toast(error.message, 'error')
        logger.log(error)
      }
    })
    return {
      project: computed(() => AppState.activeProject),
      account: computed(() => AppState.account),
      tiers: computed(() => AppState.tiers),
      formatDate(rawDate) {
        let time = new Date(rawDate)
        let month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(time)
        let year = time.getUTCFullYear()
        return `${month} ${year}`
      }
    }
  }
};
</script>


<style lang="scss" scoped>
@import "../assets/scss/_projectPage.scss";
</style>
