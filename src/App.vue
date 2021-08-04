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
          <div v-if="limitCocktail.length">
            <Drink v-for="cocktail in limitCocktail" :key="cocktail.idDrink" :drink="cocktail"/>
          </div>
          <div v-else-if="notFound">
            <h3>Nessun cocktail trovato, esegui una ricerca diversa</h3>
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
import axios from 'axios';

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
      cancelSource: null,
      notFound: false,
      limit: 10,
      busy: false
    }
  },
  async mounted(){
    try{
      let response = await axios.get('https://la-bibbia-dei-cocktail-api.herokuapp.com/?shop=1');
      this.listCocktail = response.data;
      console.log(response);
    }catch(error){
      console.log(error);
    }

    this.loadMore();
  },
  methods: {
    //caricamendo dinamico
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
    //Funzione per la ricerca dei cocktail
    async search(word){
      
      this.cancelSearch();
      this.cancelSource = axios.CancelToken.source();

      if(!word)
      {
        // settiamo le variabili
        this.notFound = false;
        this.statusSearch = false;
        this.searchCocktail = [];

      } else {
        //Ricerca attiva
        this.statusSearch = true;

        try{

          let response = await axios.get('https://la-bibbia-dei-cocktail-api.herokuapp.com/?shop=1&word=' + word, {
            cancelToken: this.cancelSource.token
          });
          this.searchCocktail = response.data;
          this.cancelSource = null;

          // impostiamo la variabile se la ricerca non ha trovato risultati
          if(this.searchCocktail.length){
            this.notFound = false;
          } else {
            this.notFound = true;
          }

        }catch(error){
          //console.log(error);
        }

      }
    
      this.limitCocktail = [];
      this.loadMore();

    },
    cancelSearch() {
      if (this.cancelSource) {
        this.cancelSource.cancel('Attendere che la richiesta finisca prima di processarne una nuova');
        //console.log('richiesta cancellata con successo');
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
