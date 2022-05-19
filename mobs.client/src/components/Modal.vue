<template>

<div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
        <div class="modal-header">
            <slot class="modal-title"  name="header"></slot>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
      <slot name="body" class="modal-body" >

      </slot>
    </div>
  </div>
</div>

</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import "../assets/scss/main.scss";
  .modal-content{
    background-color: desaturate(lighten($warning, 38), 35%);;
    .modal-header{
      font-size: 18px;
      color: lighten($light, 20) !important;
      background-color: lighten($primary,5);
      @include baloo(600);
    }
   }
</style>
