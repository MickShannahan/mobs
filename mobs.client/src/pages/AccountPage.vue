<template>
  <div class="account-page">
    <section id="account-details">
      <div>
        <p>{{ account.name }}</p>
        <p>{{ account.email }}</p>
      </div>
      <img :src="account.picture" alt="" />
    </section>
    <section id="account-projects">
      <h5>Your Projects</h5>
      <div id="projects-container">
        <div v-for="p in projects" :key="p.id">
          {{ p.name }}
        </div>
      </div>
      <button><i class="mdi mdi-plus"></i></button>
    </section>
    <section id="supported-projects">
      <h5>Projects you support</h5>
      <div id="supports-container">
        <!-- FIXME does it need to be a component? -->
        <div v-for="s in supportedProjects" :key="s.id">
          <img :src="s.project.img" alt="" />
          <p>{{ s.project.name }}</p>
          <p>{{ s.createdAt }}</p>
          <p>{{ s.tier.name }}</p>
          <p>${{ s.tier.cost }}</p>
          <i
            class="mdi mdi-delete-forever-outline"
            @click="deleteSupport(s.id)"
          ></i>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { projectsService } from '../services/ProjectsService'
import { supportsService } from '../services/SupportsService'
import Pop from '../utils/Pop'
export default {
  name: 'Account',
  setup() {
    onMounted(async () => {
      await projectsService.getProjects('?creatorId=' + AppState.account.id)
    })
    return {
      account: computed(() => AppState.account),
      projects: computed(() => AppState.projects),
      // reuse from auth service
      supportedProjects: computed(() => AppState.supportedProjects),
      async deleteSupport(id) {
        try {
          if (await Pop.confirm('Cancel Support?', 'are you sure you want to stop supporting this project?', 'info', 'yes cancel it')) {
            await supportsService.deleteSupport(id)
          }
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
.account-page {
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

#account-details {
  display: flex;
  width: 100%;
  justify-content: end;
  padding: 2em 5em 0em 5vw;
  margin-right: 5em;
  & > div {
    font-size: 18px;
    text-align: right;
    font-weight: 500;
    margin-right: 1em;
    padding-top: 5em;
  }
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
}
#account-projects {
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
    color: $secondary;
    margin-bottom: 1em;
  }
  #projects-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    // project
    div {
      background: $secondary;
      color: lighten($light, 20);
      padding: 1em 2.5em;
      border-radius: 12px;
      margin: 1em;
      @include bigShadow($secondary, 0.5);
      transition: all 0.1s ease;
      @include selectable();
    }
  }
  // add project button
  button {
    position: absolute !important;
    top: 1rem;
    right: 1rem;
    height: 50px;
    width: 50px;
    background: $secondary;
    color: lighten($light, 20);
    font-size: 20px;
    border: 0px;
    border-radius: 50em;
    @include bigShadow($secondary, 0.6);
    @include selectable();
  }
}
#supported-projects {
  display: flex;
  flex-direction: column;
  width: 75%;
  margin: 3rem auto;
  border-radius: 12px;
  @include bigShadow($dark, 0.7);
  background: desaturate(lighten($warning, 38), 35%);
  h5 {
    background: $secondary;
    border-top-right-radius: inherit;
    border-top-left-radius: inherit;
    text-align: center;
    padding: 1.75rem;
    @include baloo(500);
    color: lighten($light, 20);
  }

  #supports-container {
    display: flex;
    flex-direction: column;
    padding: 1em;
    // Support item
    div {
      background: lighten($light, 40);
      border-radius: inherit;
      margin: 0.6em 0;
      border-radius: 8px;
      @include bigShadow($dark, 0.9);
      img {
        float: left;
        height: 7.5em;
        width: 11em;
        margin-right: 0.5em;
        object-fit: cover;
        border-radius: inherit;
      }
      // project name
      p:nth-child(2) {
        margin-top: 1.7em;
        margin-bottom: 0.4em;
        font-weight: 700;
        display: block;
      }
      // time stamp
      p:nth-child(3) {
        color: lighten($dark, 30);
        display: inline-block;
        width: 25%;
      }
      // tier name
      p:nth-child(4) {
        font-weight: 500;
        color: $info;
        display: inline-block;
        width: 30%;
        transform: translateY(-0.6em);
      }
      // cost
      p:nth-child(5) {
        color: $primary;
        @include baloo(700);
        display: inline-block;
        width: 20%;
        transform: translateY(-0.6em);
      }
      i {
      }
      // icon
      .mdi.mdi-delete-forever-outline {
        &::before {
          font-size: 20px;
          width: auto;
          transform: translateY(-0.6rem);
          transition: all 0.1s ease;
        }
        &:hover::before {
          cursor: pointer;
          color: $danger;
          transform: translateY(-0.55em) scale(1.5);
        }
      }
    }
  }
}
</style>
