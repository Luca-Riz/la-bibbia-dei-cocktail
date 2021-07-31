<template>
  <div>
    <div class="card mb-3" style="max-width: 540px;">
      <div class="row g-0">
        <div class="col-4 position-relative">
          <!-- src class in api "strImageSource"; alt name "strDrink"-->
          <div v-show="!loaded" class="lds-dual-ring loaded-center"></div>
          <img v-show="loaded" :src="drink.strDrinkThumb" class="img-fluid rounded-start" :alt="drink.strDrink" @load="loading">
        </div>
        <div class="col-8 fs08">
          <div class="card-body">
            <!-- name "strDrink"-->
            <h5 class="card-title">{{drink.strDrink}}</h5>

            <!-- classi ingredienti api scritte direttamente come testo -->
            <p class="card-text">
              "strIngredient1": "Tequila", <br>
            "strIngredient2": "Lime Juice", <br>
            "strIngredient3": "Agave syrup",
            </p>

            <!-- '$pStrDrink' variabile da popolare noi su file prezzi-->
            <p class="card-text"><small class="text-muted">Prezzo: 8 € </small></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Drink',
  props: {
    drink: Object
  },
  data(){
    return {
      loaded: false,
    }
  },
  methods: {
    loading(){
      this.loaded = true;
    }
  }
}
</script>

<style lang="scss" scoped>

.fs08{
  font-size: 0.8rem;
}

.loaded-center{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

</style>