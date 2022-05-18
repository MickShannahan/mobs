<template>
  <div id="create-post">
    <h6>create a post for your supporters</h6>
    <form @submit.prevent="createPost">
      <input
        type="text"
        required
        placeholder="Post title"
        v-model="editable.title"
      />
      <textarea
        cols="30"
        rows="8"
        required
        placeholder="Say Something..."
        v-model="editable.body"
      ></textarea>
      <div>
        <input
          type="text"
          placeholder="post image url"
          v-model="editable.imgUrl"
        />
        <select v-model="editable.tierId" required>
          <option value="" disabled selected>Select a tier</option>
          <option v-for="t in tiers" :key="t.id" :value="t.id">
            {{ t.name }}
          </option>
        </select>
      </div>
      <div>
        <button>cancel</button>
        <button>create post!</button>
      </div>
    </form>
  </div>
</template>


<script>
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState';
import { postsService } from '../services/PostsService';
import Pop from '../utils/Pop';
export default {
  name: 'create-post',

  setup() {
    const editable = ref({ tierId: '' })
    const route = useRoute()
    return {
      editable,
      tiers: computed(() => AppState.tiers),
      async createPost() {
        try {
          editable.value.projectId = route.params.id
          await postsService.createPost(editable.value)
          Pop.toast('Post Created!', 'success')
          // reset form to as the page was when loaded
          editable.value = { tierId: '' }
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  }
};
</script>


<style lang="scss" scoped>
@import "../assets/scss/main.scss";
// $inputShadow:
#create-post {
  display: flex;
  flex-direction: column;
  border-radius: inherit;
  @include bigShadow($dark, 0.7);
  background: desaturate(lighten($warning, 38), 35%);
  padding: 1em 2em;
  width: 75%;
  margin: 3em auto;
  h6 {
    font-size: 16px;
    color: $secondary;
    text-align: left;
    margin: 0.5em 0;
  }
  form {
    display: flex;
    flex-direction: column;
    div {
      display: flex;
      justify-content: end;
    }
    input,
    textarea,
    select,
    button {
      border-radius: 5px;
      margin: 0.5em 0;
      padding: 0.5em;
      border: 0;
      color: $dark;
      background: lighten($warning, 40);
    }
    & > div > input {
      width: 70%;
    }
    input,
    textarea {
      box-shadow: inset 0px 2px 4px rgba(26, 26, 26, 0.26);
    }
    select {
      color: $dark;
      width: 30%;
      background: desaturate(lighten($secondary, 30), 50%);
      @include bigShadow(desaturate(lighten($secondary, 30), 50%));
      text-align: center;
      font-weight: 600;
      border: 0;
      option {
        background: $white;
      }
    }
    button {
      display: inline-block;
      width: 25%;
      padding: 0.75em 0.1em;
      border: 0;
      // cancel button
      &:nth-child(1) {
        margin-left: auto;
        background: transparent;
      }
      // create button
      &:nth-child(2) {
        @include bigShadow($secondary, 0.5);
        font-weight: 600;
        background: $secondary;
        color: $white;
        text-transform: capitalize;
      }
    }
  }
}
</style>
