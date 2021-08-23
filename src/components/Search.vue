<template>
    <form v-on:submit.prevent>
        <div class="input-icon">
            <input class="input-search contrast_text" @input="search" type="text" name="search" placeholder="Cerca...">
            <i class="fas fa-search"></i>
        </div>
    </form>
</template>

<script>
export default {
  name: 'Search',
  methods: {
    search(event){
      this.$emit('keywords', event.target.value);
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/css/variables.scss';

.input-search{
  width: 100%;
  padding: 6px 6px 6px 40px;
  border-radius: 5px;
  border: 1px solid $text_color2;
  background: $background_color;
}

.input-icon{
  position: relative;

  & svg{
    position: absolute;
    left: 10px;
    top: 10px;
    font-size: 1.2rem;
    color: $text_color2;
  }
}
</style>