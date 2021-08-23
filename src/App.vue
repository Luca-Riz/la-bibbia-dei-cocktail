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
            <h2 class="text-center sub-menu contrast_text">Cocktail</h2>
          </div>
          <div class="col col-sm">
            <div class="text-end">
              <span @click='filter' class="filter cursor-pointer">Filtri</span>
              <ul class="contrast_text2" :class="(filterDisplay == false) ? 'none' : ''">
                <li class="cursor-pointer">Minimo</li>
                <li class="cursor-pointer">Massimo</li>
              </ul>
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
        <InfiniteScroll v-if="!statusSearch" class="infi-scroll" :url="'https://la-bibbia-dei-cocktail-api.herokuapp.com/?shop=' + shopId"/>
        <InfiniteScroll v-else class="infi-scroll" :url="'https://la-bibbia-dei-cocktail-api.herokuapp.com/?shop=' + shopId + '&word=' + keywords" :key="index"/>
      </div>
    </main>
    <!-- fine contenuto principale -->
    <!-- inizio piè di pagina -->
    <footer></footer>
    <!-- fine piè di pagina -->
  </div>
</template>

<script>
import Search from './components/Search.vue';
import InfiniteScroll from "./components/InfiniteScroll";

export default {
  name: 'App',
  components: {
    Search,
    InfiniteScroll
  },
  data(){
    return {
      keywords: '',
      index: 0,
      statusSearch: false,
      statusCheckInfo: '',
      shopId: null,
      filterDisplay: false
    }
  },
  created(){
    const urlString = window.location.href;
    const url = new URL(urlString);
    this.shopId = url.searchParams.get('shop');
  },
  methods: {
    //Funzione per la ricerca dei cocktail
    search(word){

      if(!word)
      {
        // Ricerca inattiva, settiamo le variabili
        this.index = 0;
        this.statusSearch = false;

      } else {
        //Ricerca attiva
        this.keywords = word;
        this.index++;
        this.statusSearch = true;
      }
    },

    filter(){
      if (this.filterDisplay == false){
        this.filterDisplay = true
      } else {
        this.filterDisplay = false
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/css/variables.scss';
@import '@/css/commons.scss';

#app{
  background-color: $background_color;
}

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

main .container {
  height: 70vh;

  .infi-scroll {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    height: 100%;
  }
}
</style>
