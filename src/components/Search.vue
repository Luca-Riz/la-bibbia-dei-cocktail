<template>
    <form v-on:submit.prevent>
        <div class="input-icon">
            <input class="input-search" @input="search" type="text" name="search" placeholder="Cerca...">
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
.input-search{
  width: 100%;
  padding: 6px 6px 6px 40px;
  border-radius: 5px;
  border: 1px solid gray;
  background: rgb(240, 238, 238);
}

.input-icon{
  position: relative;

  & svg{
    position: absolute;
    left: 10px;
    top: 10px;
    font-size: 1.2rem;
    color: gray;
  }
}
</style>