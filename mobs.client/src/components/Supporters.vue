<template>
  <div class="supporters">
    <!-- Button -->
    <button data-bs-toggle="offcanvas" data-bs-target="#supporters-canvas">
      see supporters
    </button>
    <!-- Offcanvas  copy first from BS5 DOCS (https://getbootstrap.com/docs/5.0/components/offcanvas/) change offcanvas-start to offcanvas-end -->
    <div
      class="offcanvas offcanvas-end"
      tabindex="-1"
      id="supporters-canvas"
      aria-labelledby="offcanvasLabel"
    >
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasLabel">Supporters</h5>
        <button
          type="button"
          class="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div class="offcanvas-body">
        <SupporterTier v-for="st in supportTiers" :key="st.id" :tier="st" />
      </div>
    </div>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import Pop from '../utils/Pop';
import { supportsService } from '../services/SupportsService';
import { useRoute } from 'vue-router';
export default {
  setup() {
    return {
      supportTiers: computed(() => AppState.tiers)
    }
  }
};
</script>


<style lang="scss" scoped>
@import "../assets/scss/_supporters.scss";
</style>
