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
            <form>
              <div class="input-icon">
                <input class="input-search" type="text" name="search" placeholder="Cerca...">
                <i class="fas fa-search"></i>
              </div>
            </form>
          </div>
        </div>
        <!-- fine componente di ricerca -->
      </div>
    </header>
    <!-- fine header -->
    <!-- inizio contenuto principale -->
    <main>

      <Drink />

    </main>
    <!-- fine contenuto principale -->
    <!-- inizio piè di pagina -->
    <footer></footer>
    <!-- fine piè di pagina -->
  </div>
</template>

<script>
import Drink from './components/Drink.vue'

export default {
  name: 'App',
  components: {
    Drink
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

// start campo input di ricerca
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

// fine campo input di ricerca

// fine content header
</style>
