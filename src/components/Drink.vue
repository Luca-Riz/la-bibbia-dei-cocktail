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

            <div class="card-text" :class="(checkListActive !== this.drink.idDrink) ? 'none' : ''">
              <ul>
                <!-- ingredienti -->
                <li v-if="infoCocktail.strIngredient1">{{infoCocktail.strIngredient1}}</li>
                <li v-if="infoCocktail.strIngredient2">{{infoCocktail.strIngredient2}}</li>
                <li v-if="infoCocktail.strIngredient3">{{infoCocktail.strIngredient3}}</li>
                <li v-if="infoCocktail.strIngredient4">{{infoCocktail.strIngredient4}}</li>
                <li v-if="infoCocktail.strIngredient5">{{infoCocktail.strIngredient5}}</li>
              </ul>
            </div>

            <!-- prezzo -->
            <p class="card-text"><small class="text-muted">Prezzo: {{drink.price}} € </small></p>
            <button @click='info' >Info</button>
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

</style>