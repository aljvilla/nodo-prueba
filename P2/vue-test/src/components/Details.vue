<template>
  <div>
    <b-card
    >
      <b-card-img fluid top v-show="details.imageLink"  :src="getImagePath(details.imageLink)" >  </b-card-img>
      <p class="card-text" v-show="details.house" ><b>House:</b> {{details.house}}</p>
      <p class="card-text" v-show="details.books.length" ><b>Libros:</b> {{details.books.join(', ')}}</p>
      <p class="card-text" v-show="details.titles.length" ><b>Titulos:</b> {{details.titles.join(', ')}}</p>
      <p class="card-text" v-show="details.pageRank" ><b>PageRank:</b> {{details.pageRank}}</p>
      <p class="card-text"><b>Sexo: </b>{{details.male ? 'Hombre' : 'Mujer'}}</p>
    </b-card>
  </div>
</template>


<script>
  import { listsAllCharacters, getACharacter } from '../services/got.service.js'

  export default {
    name: 'details-component',
    props:['details'],
    methods:{
      getImagePath(imageLink){
        return `https://api.got.show/${imageLink}` || false
      }
    }
  }
</script>
