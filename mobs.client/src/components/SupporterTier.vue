<template>
  <div class="supporter-tier">
    <h5>{{ tier.name }}</h5>
    <div v-for="s in supporters" :key="s.id">
      <img :src="s.account.picture" alt="" />
      <p>{{ s.account.name }}</p>
    </div>
  </div>
</template>


<script>
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState';

export default {
  props: { tier: { type: Object, required: true } },
  setup(props) {
    return {
      supporters: computed(() => AppState.supporters.filter(s => s.tierId == props.tier.id))
    }
  }
};
</script>


<style lang="scss" scoped>
@import "../assets/scss/_supportTier.scss";
</style>
