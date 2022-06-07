<template>
  <div class="home container">
    <div>some sort of header</div>
    <div class="row">
      projects
      <div v-for="p in projects" :key="p.id" class="col-12">
        <Project :project="p" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import Pop from '../utils/Pop'
import { logger } from '../utils/Logger'
import { projectsService } from '../services/ProjectsService'
import { AppState } from '../AppState'

export default {
  name: 'Home',
  setup() {
    onMounted(async () => {
      try {
        await projectsService.getAll()
      } catch (error) {
        Pop.toast(error.message)
        logger.log(error)
      }
    })
    return {
      projects: computed(() => AppState.projects)
    }
  }
}
</script>

<style scoped lang="scss">
@import "../assets/scss/main.scss";
.home {
}

.hero-banner {
  position: relative;
  @include baloo(600);
  @include bigShadow($warning);
  background: $warning;
  padding: 3em 5em;
  margin-bottom: 4.5em;
  p {
    color: darken($warning, 30);
    position: absolute;
    bottom: -0.5em;
    right: 1.5em;
  }
}

.projects-row {
  background: lighten($warning, 35);
  @include bigShadow($dark, 0.8);
  padding: 1em;
  border-radius: 8px;
}
</style>
