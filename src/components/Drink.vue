<template>
  <div>
    <div class="card rounded-0" style="max-width: 540px;">
      <div class="row g-0">
        <div class="col-4 position-relative">
          <!-- src class in api "strImageSource"; alt name "strDrink"-->
          <div v-show="!loaded" class="lds-dual-ring loaded-center"></div>
          <img v-show="loaded" :src="drink.strDrinkThumb" class="img-fluid" :alt="drink.strDrink" @load="loading">
        </div>
        <div class="col-8 fs08">
          <div class="card-body clearfix">
            <!-- name "strDrink"-->
            <h6 class="card-title"><strong>{{drink.strDrink}}</strong></h6>

            <!-- prezzo -->
            <!-- vecchio formato <p class="card-text left"><small class="text-muted">Prezzo: {{drink.price}} € </small></p> -->
            <h6 class="card-text left"><strong class="text-muted">Prezzo: {{drink.price}} € </strong></h6>
            <button @click='info' type="button" class="btn btn-outline-danger">
              <i class="fas fa-info"></i>
            </button>

            <div class="card-text left ingredients" :class="(checkListActive !== drink.idDrink) ? 'none' : ''">
              <div v-if="infoCocktail.strIngredient1"><em>Ingredienti:</em></div>
              <ul>
                <!-- ingredienti -->
                <li v-if="infoCocktail.strIngredient1">- {{infoCocktail.strIngredient1}}</li>
                <li v-if="infoCocktail.strIngredient2">- {{infoCocktail.strIngredient2}}</li>
                <li v-if="infoCocktail.strIngredient3">- {{infoCocktail.strIngredient3}}</li>
                <li v-if="infoCocktail.strIngredient4">- {{infoCocktail.strIngredient4}}</li>
                <li v-if="infoCocktail.strIngredient5">- {{infoCocktail.strIngredient5}}</li>
                <li v-if="infoCocktail.strIngredient6">- {{infoCocktail.strIngredient6}}</li>
              </ul>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import {eventBus} from '@/main.js';

export default {
  name: 'Drink',
  props: {
    drink: Object,
    checkListActive: String
  },
  data(){
    return {
      loaded: false,
      infoCocktail: '',
    }
  },
  methods: {
    loading(){
      this.loaded = true;
    },

    info(){
      if(this.checkListActive === this.drink.idDrink){
        eventBus.$emit('checkEmit', '');
        return;
      }
      //Request call axios
      const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + this.drink.idDrink;
        this.infoCocktail = axios
          .get(url)
          .then(response => (this.infoCocktail = response.data.drinks[0]))
          .catch(error => console.log(error));

      //Event emit
      eventBus.$emit('checkEmit', this.drink.idDrink);
    }
  }
}
</script>

<style lang="scss" scoped>

.card{
  border: transparent;
  border-bottom: 1px solid lightgrey;
  padding-top: 5px;
  padding-bottom: 5px;
}

.card-body{
  padding-bottom: 0;
}

.fs08{
  font-size: 0.8rem;
}

.loaded-center{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.none {
  display: none;
}

button {
  float: right;
}

.left {
  float: left;
}

ul, li {list-style-type: none;}

ul, li {text-indent: -2em;}

.ingredients {
  width: calc(100% - 38px);
}

</style>