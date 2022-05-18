<template>
  <div class="home container">
    <div class="row hero-banner rounded mt-3">
      <div class="col-12 text-center">
        <h5>
          “It is literally true that you can succeed best and quickest by
          helping others to succeed.”
        </h5>
        <p>-Napoleon Hill</p>
      </div>
    </div>
    <div class="row ps-3 baloo">find what inspires you</div>
    <!-- TODO add projects -->

    <div class="row projects-row">
      <div v-for="p in projects" :key="p.id" class="col-12">
        <Project :project="p" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { projectsService } from '../services/ProjectsService'
import Pop from '../utils/Pop'
import { AppState } from '../AppState'
export default {
  name: 'Home',
  setup() {
    onMounted(async () => {
      try {
        await projectsService.getProjects()
      } catch (error) {
        Pop.error(error)
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
