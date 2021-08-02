<template>
  <div id="app">
    <!-- inizio header -->
    <header class="py-2">
      <div class="container container-sm">
        <div class="row">
          <div class="col col-sm">
            <div class="back-nav">
              <span class="cursor-pointer"><i class="fas fa-arrow-left"></i></span>
            </div>
          </div>
          <div class="col col-sm">
            <h2 class="text-center sub-menu">Cocktail</h2>
          </div>
          <div class="col col-sm">
            <div class="text-end">
              <span class="filter cursor-pointer">Filtri</span>
            </div>
          </div>
        </div>
        <!-- inizio componente di ricerca -->
        <div class="row mt-2">
          <div class="col-12">
            <Search @keywords="search"/>
          </div>
        </div>
        <!-- fine componente di ricerca -->
      </div>
    </header>
    <!-- fine header -->
    <!-- inizio contenuto principale -->
    <main>
      
      <div class="container container-sm">
        <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="limit">
          <div v-if="searchCocktail !== null">
            <Drink v-for="(cocktail, index) in limitCocktail" :key="index" :drink="cocktail"/>
          </div>
          <div v-else>
            <h3>Nessun cocktail trovato, riprova.</h3>
          </div>
        </div>
      </div>

    </main>
    <!-- fine contenuto principale -->
    <!-- inizio piè di pagina -->
    <footer></footer>
    <!-- fine piè di pagina -->
  </div>
</template>

<script>
import Drink from './components/Drink.vue'
import Search from './components/Search.vue'
import axios from './axios.js';

export default {
  name: 'App',
  components: {
    Drink,
    Search
  },
  data(){
    return {
      listCocktail: [],
      limitCocktail: [],
      searchCocktail: [],
      statusSearch: false,
      limit: 10,
      busy: false
    }
  },
  async mounted(){
    let resultCocktail = await axios('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail');
    this.listCocktail = resultCocktail.drinks;

    this.loadMore();
  },
  methods: {
    loadMore(){
      let property = 'listCocktail';
      if(this.statusSearch){
        property = 'searchCocktail';
      } 
      this.busy = true;
      const append = this[property].slice(this.limitCocktail.length, this.limitCocktail.length + this.limit);
      this.limitCocktail = this.limitCocktail.concat(append);
      this.busy = false;
    },
    async search(word){
      let itemsSearch = [];
      if(word){
        itemsSearch = await axios('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + word);
        this.statusSearch = true;
      } else {
        itemsSearch = [];
        this.statusSearch = false;
      }
      this.searchCocktail = itemsSearch.drinks;
      this.limitCocktail = [];
      if(this.searchCocktail !== null){
        this.loadMore();
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/css/variables.scss';
@import '@/css/commons.scss';

// inizio content header
.filter,
.back-nav{
  font-size: 1rem;
  font-weight: 700;
  color: $primary-color;
}

.sub-menu{
  font-size: 1.3rem;
  font-weight: 700;
}

// fine content header
</style>
