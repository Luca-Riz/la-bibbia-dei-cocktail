<template>
  <div v-if="!notFound" class="infi-scroll-comp-root">
    <div class="scroll-container" ref="scrollContainer" v-if="!initialLoad">
      <div ref="listContainer">
        <div v-for="(item, index) in list" :key="index">
          <Drink :drink="item" :checkListActive="statusCheckInfo"/>
        </div>
      </div>
      <div class="sentinel" ref="sentinel"></div>

      <div v-if="canLoadMore" class="loadingMore contrast_text">CARICAMENTO .....</div>
    </div>
    <div class="initialLoad contrast_text" v-else>CARICAMENTO LISTA COKTAIL .....</div>
  </div>
  <div v-else>
    <h3 class="contrast_text">Nessun Cocktail trovato, fai una ricerca diversa</h3>
  </div>

</template>

<script>
import Drink from '@/components/Drink.vue';
import axios from 'axios';
import {eventBus} from '@/main.js';

export default {
  components: {
    Drink
  },
  props: {
    url: String,
    filter: String
  },
  created(){
    //Ritorno risposta event bus componente
    eventBus.$on('checkEmit', (id) => {
      this.statusCheckInfo = id;
    });
  },
  mounted() {
    //load first page
    this.fetchItemsAPI(0, this.pageCount).then((items) => {
      //console.log(items);
      this.list.push(...items);
      this.pageNumber++;
      this.initialLoad = false;
      //wait for initial list to render and then set up observer
      this.$nextTick().then(() => {
        this.setUpInterSectionObserver();
      });
    });
  },
  destroyed() {
    if (this.listEndObserver) {
      this.listEndObserver.disconnect();
    }
  },
  //mounted() {},
  data() {
    return {
      list: [],
      responseApi: [],
      notFound: false,
      statusCheckInfo: '',
      /**
       * if we extracted infinite-scroll to a generic component,
       * it would need just these props.loadingMore,canLoadMore and the list
       */

      isLoadingMore: false,
      canLoadMore: true, //list has to end at some point

      //extra stuff
      initialLoad: true, //initial load state ,if you want  to use a different BIGGER loading animation  etc
      pageNumber: 0, //canLoadMore is set to false when last page is reached
      pageCount: 10,
    };
  },
  methods: {
    setUpInterSectionObserver() {
      let options = {
        root: this.$refs["scrollContainer"],
        margin: "10px",
      };
      this.listEndObserver = new IntersectionObserver(
        this.handleIntersection,
        options
      );
      if( this.$refs["sentinel"] ){
        this.listEndObserver.observe(this.$refs["sentinel"]);
      }
    },
    handleIntersection([entry]) {
      if (entry.isIntersecting) {
        //console.log("sentinel intersecting");
      }
      if (entry.isIntersecting && this.canLoadMore && !this.isLoadingMore) {
        this.loadMore();
      }
    },
    async loadMore() {
      try {
        this.isLoadingMore = true;
        let items = await this.fetchItemsAPI(this.pageNumber, this.pageCount);
        //console.log("loaded page " + this.pageNumber);
        this.pageNumber++;
        this.list.push(...items);
      } catch (error) {
        //console.log("Reached end of page", error);
        this.canLoadMore = false;
      } finally {
        this.isLoadingMore = false;
      }
    },

    async fetchItemsAPI(pageNumber, pageCount) {
      if( !this.responseApi.length ){
        try{
          let response = await axios.get(this.url);
          this.responseApi = response.data;
          //console.log(this.responseApi);
          if( this.responseApi.length ){
            //Filtriamo l'array se il filtro contiene un valore
            switch (this.filter) {
              case 'min':
                this.responseApi = this.responseApi.sort((a, b) => a.price - b.price);
                break;
              case 'max':
                this.responseApi = this.responseApi.sort((a, b) => b.price - a.price);
                break;
            }
            this.notFound = false;
          } else {
            this.notFound = true;
            return [];
          }
        }catch(error){
          console.log(error);
        }
      }
      
      //assume 10 items per page
      return new Promise((res, rej) => {
        let data = [];
        data = this.responseApi.slice(this.list.length, this.list.length + pageCount);

        if (pageNumber < Math.ceil(this.responseApi.length / this.pageCount)) {
          res(data);
        } else {
          rej(new Error("No more items to load"));
        }
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.scroll-container {
  height: 100%;
  overflow-y: scroll;
}
.sentinel {
  height: 0px;
}

.loadingMore {
  text-align: center;
}
</style>