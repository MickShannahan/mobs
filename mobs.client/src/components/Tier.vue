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
    <button v-if="tier.creatorId == account.id" @click.stop="deleteTier">
      <i class="mdi mdi-close"></i>
    </button>
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
      hasTier: computed(() => AppState.supportedProjects.find(p => p.tierId == props.tier.id)),
      async supportProject() {
        try {
          // are you a supporter already
          let support = AppState.supportedProjects.find(s => s.projectId == route.params.id)
          if (!support) {
            if (await Pop.confirm('Do want to support this creator?', '$ ' + props.tier.cost, 'question', 'yes support!')) {
              let support = {
                projectId: route.params.id,
                accountId: AppState.account.id,
                tierId: props.tier.id
              }
              await supportsService.create(support)
              Pop.toast('Project supported!', 'success')
            }
          } else {
            if (await Pop.confirm(`Update your support level from ${support.tier.name} : $${support.tier.cost}\n <i class="mdi mdi-arrow-down"></i> \n ${props.tier.name} : $${props.tier.cost}`, '', 'question', 'yes update!')) {
              support.tierId = props.tier.id
              await supportsService.update(support)
              Pop.toast('Support updated!', 'success')
            }
          }
        } catch (error) {
          Pop.error(error)
        }
      },
      async deleteTier() {
        try {
          if (await Pop.confirm()) {
            await tiersService.deleteTier(props.tier.id)
          }
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
.tier.supported {
  // border: 4px dashed $light;
  background: lighten($success, 35);
  color: darken($success, 10);
  @include bigShadow($secondary, 0.8);
  &:before {
    content: "Your Tier";
    @include baloo(500);
    width: 50%;
    height: 1.5em;
    top: -0.9em;
    right: 25%;
    background: $success;
    color: $light;
    border-radius: inherit;
    position: absolute;
    z-index: 100;
  }
  h5 {
    background: $success;
    color: $light;
  }
}
.tier {
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 0.5em;
  background: $success;
  color: $light;
  border-radius: 12px;
  padding: 1em 1.25em 1.25em 1.25em;
  width: 22em;
  flex: 1 0 auto;
  max-width: 45%;
  @include bigShadow($success, 0.5);
  @include selectable($light, 1, -2px);
  transition: all 0.1s ease;
  div {
    display: flex;
    justify-content: space-between;
    // cost
    h5 {
      font-size: 16px;
      font-weight: 500;
      border-radius: 50px;
      background: $light;
      color: $success;
      padding: 0.25em 1em;
    }
    // name
    h6 {
      font-size: 17px;
      @include baloo(700);
    }
  }
  p {
    text-align: left;
  }
  // delete button
  button {
    height: 30px;
    width: 30px;
    position: absolute !important;
    bottom: -15px;
    left: calc(44% + 1vw);
    text-align: center;
    border-radius: 50em;
    background: $success;
    border: 0;
    color: lighten($light, 10);
    transition: all 0.1s ease-in;
    transform: translateY(-30px);
    opacity: 0;
    &:hover {
      background: $danger;
    }
  }
}
</style>
