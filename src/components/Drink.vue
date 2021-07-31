<template>
  <div>
    
    <div class="card mb-3" style="max-width: 540px;">
      <div class="row g-0">
        <div class="col-4">
          <!-- src class in api "strImageSource"; alt name "strDrink"-->
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/09/Klassiche_Margarita.jpg" class="img-fluid rounded-start" alt="#"> 
        </div>
        <div class="col-8 fs08">
          <div class="card-body">
            <!-- name "strDrink"-->
            <h5 class="card-title">Margarita</h5>

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
}
</script>

<style lang="scss" scoped>

.fs08{
  font-size: 0.8rem;
}

</style>