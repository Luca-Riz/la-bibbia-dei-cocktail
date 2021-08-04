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

            <div class="card-text" v-for="(value, index) in infoCocktail" :key="index">
              <ul>
                <li v-if="value.strIngredient1 != null ">{{value.strIngredient1}}</li>  
                <li v-if="value.strIngredient2 != null ">{{value.strIngredient2}}</li>  
                <li v-if="value.strIngredient3 != null ">{{value.strIngredient3}}</li>  
                <li v-if="value.strIngredient4 != null ">{{value.strIngredient4}}</li>  
                <li v-if="value.strIngredient5 != null ">{{value.strIngredient5}}</li>  
              </ul>
            </div>

            <!-- '$pStrDrink' variabile da popolare noi su file prezzi-->
            <p class="card-text"><small class="text-muted">Prezzo: 8 € </small></p>
            <button @click='info' >Info</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Drink',
  props: {
    drink: Object
  },
  data(){
    return {
      loaded: false,
      urlInfo: '',
      infoCocktail: ''
    }
  },
  methods: {
    loading(){
      this.loaded = true;
    },
    info(){
      this.urlInfo = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + this.drink.idDrink;
      // console.log(this.urlInfo);
      this.infoCocktail = axios
                              .get(this.urlInfo)
                              .then(response => (this.infoCocktail = response.data.drinks[0]))
                              .catch(error => console.log(error));
      // console.log(this.infoCocktail);
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