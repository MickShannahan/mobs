<template>
  <div class="tier" :class="{ supported: hasTier }" @click="supportProject">
    <div>
      <h6>{{ tier.name }}</h6>
      <h5>${{ tier.cost }}</h5>
    </div>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam modi
      laborum minima maxime nobis reiciendis recusandae consequuntur.
    </p>
    <!-- <button v-if="tier.creatorId == account.id" @click.stop="deleteTier">
      <i class="mdi mdi-close"></i>
    </button> -->
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { supportsService } from '../services/SupportsService';
import Pop from '../utils/Pop';
import { useRoute } from 'vue-router';
import { tiersService } from "../services/TiersService";
import { logger } from '../utils/Logger';
export default {
  props: { tier: { type: Object, required: true } },
  setup(props) {
    const route = useRoute()
    return {
      account: computed(() => AppState.account),
      hasTier: computed(() => AppState.supportedProjects.find(s => s.tierId == props.tier.id)),
      async supportProject() {
        try {
          const currentSupport = AppState.supportedProjects.find(p => p.projectId == route.params.id)
          if (!currentSupport) {
            if (await Pop.confirm('do you want to support this project?', '', '', 'yes')) {
              let support = {
                projectId: route.params.id,
                tierId: props.tier.id
              }
              await supportsService.createSupport(support)
              Pop.toast('supported!', 'success')
            }
          } else {
            if (await Pop.confirm('change your support level?', '', 'question', 'yes')) {
              currentSupport.tierId = props.tier.id
              await supportsService.updateSupport(currentSupport)
              Pop.toast('support updated!', 'success')
            }
          }
        } catch (error) {
          Pop.error(error.message)
          logger.error(error)
        }
      }
    }
  }
};
</script>


<style lang="scss" scoped>
@import "../assets/scss/_tier.scss";
</style>
