<template>
  <div id="supported-project" @click="goTo">
    <!-- <img :src="support.project?.img" alt="" />
    <p>{{ support.project.name }}</p>
    <p>{{ formatDate(support.createdAt) }}</p>
    <p>{{ support.tier.name }}</p>
    <p>${{ support.tier.cost }}</p>
    <i
      class="mdi mdi-delete-forever-outline"
      @click.stop="deleteSupport"
      title="create project"
    ></i> -->
    <img :src="support.project.img" alt="" />
    <p>{{ support.project.name }}</p>
    <p>{{ support.project.createdAt }}</p>
    <p>{{ support.tier.name }}</p>
    <p>{{ support.tier.cost }}</p>
    <i
      class="mdi mdi-delete-forever-outline"
      title="cancel support"
      @click="deleteSupport"
    ></i>
  </div>
</template>

<script>
import Pop from '../utils/Pop'
import { supportsService } from '../services/SupportsService'
import { useRouter } from "vue-router"
import { logger } from '../utils/Logger'
export default {
  props: { support: { type: Object, required: true } },
  setup(props) {
    return {
      async deleteSupport() {
        try {
          await supportsService.deleteSupport(props.support.id)
        } catch (error) {
          Pop.toast(error.message)
          logger.error(error)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/_supportedProject.scss";
</style>
