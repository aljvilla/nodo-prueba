<template>
  <div>
    <h1 v-show="isLoading">Cargando personajes ...</h1>
    <b-modal hide-footer :title="details.name" ref="detailsModal">
      <v-details :details="details"></v-details>
    </b-modal>
    <b-table v-show="!isLoading" striped hover :items="items" :fields="fields">
      <template slot="show_details" slot-scope="row">
        <!-- we use @click.stop here to prevent emitting of a 'row-clicked' event  -->
        <b-button
          size="sm"
          v-show="!row.item.isLoadingDetails"
          @click.stop="goToDetail(row)"
          class="mr-2"
        >Ver detalle</b-button>
        <b-progress :value="100" v-show="row.item.isLoadingDetails" animated></b-progress>
        <!-- In some circumstances you may need to use @click.native.stop instead -->
        <!-- As `row.showDetails` is one-way, we call the toggleDetails function on @change -->
      </template>
    </b-table>
  </div>
</template>


<script>
  import { listsAllCharacters, getACharacter } from '../services/got.service.js'
  import Details from './Details';

  export default {
    name: 'list-component',
    components:{'v-details':Details},
    /**
     * @description the data block represents all the local variable of this component.
     */
    data () {
      return {
        characters: [],
        items:[],
        fields:['name', 'house', 'show_details'],
        isLoading: false,
        details:{}
      }
    },

    /**
     * @description the create function is the first one to be execute when the component is being created (see vue js lifecycle).
     */
    created () {
      this.isLoading = true
      listsAllCharacters()
        .then(res => {
          this.items = res.map(({_id,name, house})=>({name, house,_id, isLoadingDetails:false, details:null, showDetails:false }));
          this.isLoading = false
        })
    },

    /**
     * @description the methods block represents all the local methods of this component.
     */
    methods: {

      /**
       * @description get the detail of a character from the GoT API.
       * @param {string} id. the "_id" of the character that we are going to request.
       * @method goToDetail
       */
      goToDetail({item:{_id}, index}) {
        this.items[index].isLoadingDetails=true;
        getACharacter(_id)
        .then(res=>{
          this.items[index].isLoadingDetails=false;
          this.details=res.data;
          this.$refs.detailsModal.show();
        });
      }
    }
  }
</script>