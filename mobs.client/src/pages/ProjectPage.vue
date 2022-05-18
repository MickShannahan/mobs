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
      </div>
      <Supporters />
    </section>
    <!-- TIERS CONTAINER -->
    <section id="tiers-container">
      <h5>tiers</h5>
      <div class="tiers">
        <Tier v-for="t in tiers" :key="t.id" :tier="t" />
      </div>
    </section>
    <!-- POSTS CONTAINER -->
    <section id="posts-container">
      <div v-if="project.creatorId == account.id" class="tier-filter">
        <div>filter posts by:</div>
        <button v-for="t in tiers" :key="t.id">{{ t.name }}</button>
      </div>
      <!-- CREATE POST -->
      <CreatePost v-else />
      <div v-if="isSupporter" id="posts">
        <Post v-for="p in posts" :key="p.id" :post="p" />
        <div v-if="posts.length <= 0">This Project has no posts yet</div>
      </div>
      <div v-else>
        please support this creator to see their posts
        <i class="mdi mdi-lock"></i>
      </div>
    </section>
  </div>
</template>


<script>
import { computed, onMounted, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState';
import { postsService } from '../services/PostsService';
import { projectsService } from '../services/ProjectsService';
import { tiersService } from '../services/TiersService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
export default {
  setup() {
    const route = useRoute()
    watchEffect(async () => {
      try {
        if (route.name == 'ProjectDetails') {
          // this is to re-run gets if you support a project
          AppState.supportedProjects.length
          await projectsService.getProject(route.params.id)
          await tiersService.getTiersByProject(route.params.id)
          await postsService.getPostsByProject(route.params.id)
        }
      } catch (error) {
        Pop.error(error)
      }
    })
    return {
      project: computed(() => AppState.activeProject),
      tiers: computed(() => AppState.tiers),
      posts: computed(() => AppState.posts),
      isSupporter: computed(() => AppState.supportedProjects.find(p => AppState.activeProject.id == p.projectId)),
      account: computed(() => AppState.account),
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
@import "../assets/scss/main.scss";
.project-page {
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  #project {
    padding: 2em 5em 0em 5vw;
    margin-left: 5em;
    position: relative;
    display: flex;
    width: 100%;
    img {
      transform: translateY(2em);
      position: relative;
      z-index: 100;
      width: 200px;
      height: 200px;
      object-position: center;
      object-fit: cover;
      border-radius: 12px;
      @include bigShadow($dark, 0.7);
    }
    div {
      padding-top: 5em;
      padding-left: 1.5em;
      color: lighten($light, 5);
      h4 {
        font-weight: bold;
      }
      p {
        font-size: 16px;
      }
    }
  }
  #tiers-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
    border-radius: 12px;
    text-align: center;
    @include bigShadow($dark, 0.7);
    position: relative;
    background: lighten($warning, 42);
    min-height: 5vh;
    padding: 1em 2em 2em 2em;
    margin: 0em 3em;
    h5 {
      @include baloo(700);
      color: $success;
      margin-bottom: 1em;
    }
    .tiers {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-around;
      width: 100%;
    }
  }
  #posts-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
    border-radius: 12px;
    text-align: center;
    position: relative;
    min-height: 5vh;
    margin: 0em 3em;
    .tier-filter {
      display: flex;
      justify-content: start;
      align-items: center;
      background: $info;
      @include bigShadow($info, 0.5);
      border-radius: inherit;
      padding: 1em 2em;
      margin: 0.8em 0;
      div {
        font-size: 18px;
        @include baloo(600);
        color: $light;
        margin-right: 1em;
      }
      button {
        border: 1px solid $light;
        padding: 0.5em 1em;
        margin: 0 0.5em;
        background: $info;
        color: $light;
        border-radius: inherit;
        transition: all 0.1s ease;
        &:hover {
          background: $light;
          color: $info;
        }
        &:disabled {
          border: 1px dashed lighten($info, 20);
          background: lighten($info, 5);
          color: lighten($info, 30);
        }
      }
    }
    #posts {
      flex-direction: column;
      border-radius: inherit;
      @include bigShadow($dark, 0.7);
      background: desaturate(lighten($warning, 38), 35%);
      padding: 2em;
      display: flex;
      width: 75%;
      margin: 0 auto;
    }
    .tier-filter + div {
      color: lighten($dark, 15);
      @include baloo(500);
      font-size: 20px;
      flex-direction: column;
      border-radius: inherit;
      @include bigShadow($dark, 0.7);
      background: lighten($warning, 38);
      padding: 0.8em 1em;
      display: flex;
      i {
        font-size: 28px;
      }
    }
  }
}
</style>
