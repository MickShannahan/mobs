<template>
  <div class="project-card" @click="selectProject">
    <!-- TODO PROJECT LAYOUT IMG + DIV> H5 + P -->
    <img :src="project.img" alt="" />
    <div>
      <h5>{{ project.name }}</h5>
      <p>{{ project.description }}</p>
    </div>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
export default {
  props: { project: { type: Object, required: true } },
  setup(props) {
    const router = useRouter()
    return {
      // TODO on click push to page for that one project
      selectProject() {
        router.push({ name: 'ProjectDetails', params: { id: props.project.id } })
      }
    }
  }
};
</script>


<style lang="scss" scoped>
@import "../assets/scss/main.scss";
.project-card {
  display: flex;
  position: relative;
  background: lighten($light, 30);
  @include bigShadow($dark, 0.7);
  border-radius: 8px;
  margin: 1em 0;
  img {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    min-width: 50%;
    max-height: 300px;
    object-position: center;
    object-fit: cover;
  }
  div {
    padding: 1em;
    h5 {
      font-size: 18px;
      font-weight: bold;
      color: $success;
    }
    p {
    }
  }
  transition: all 0.1s ease;
  &:hover {
    transform: translateY(-2px);
    outline: 1px solid $success;
    cursor: pointer;
    &:after {
      opacity: 0.1;
    }
  }
  &:after {
    border-radius: inherit;
    bottom: 0;
    color: inherit;
    content: "";
    left: 0;
    opacity: 0;
    pointer-events: none;
    position: absolute;
    right: 0;
    top: 0;
    transition: opacity 0.2s cubic-bezier(0.4, 0, 0.6, 1);
    background-color: currentColor;
  }
}
</style>
