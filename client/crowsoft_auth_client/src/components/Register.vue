<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 mt-5 mx-auto">
        <form v-on:submit.prevent="register">
          <div class="form-group">
            <input type="text" v-model="first_name" class="form-control" name="first_name" placeholder="First name *">
          </div>
          <div class="form-group">
            <input type="text" v-model="last_name" class="form-control" name="last_name" placeholder="Last name *">
          </div>
          <div class="form-group">
            <vue-autosuggest
                v-model="zip"
                ref="zip_autosuggest"
                :suggestions="zip_suggestions"
                :input-props="{id:'zip_autosuggest__input', placeholder:'ZIP *', class:'form-control'}"
                @focus="onZipFocus"
                @input="onZipInputChange"
                @selected="onZipSelected"
                :get-suggestion-value="getZipSuggestionValue"
            >  
                <template slot-scope="{suggestion}">
                    <span class="my-suggestion-item">{{suggestion.item.zip}}</span>
                </template>
            </vue-autosuggest>
          </div>
          <div class="form-group">
            <vue-autosuggest
                v-model="city"
                ref="city_autosuggest"
                :suggestions="city_suggestions"
                :input-props="{id:'city_autosuggest__input', placeholder:'City *', class:'form-control'}"
                @focus="onCityFocus"
                @click="onCityClick"
                @input="onCityInputChange"
                @selected="onCitySelected"
                :get-suggestion-value="getCitySuggestionValue"
            >  
                <template slot-scope="{suggestion}">
                    <span class="my-suggestion-item">{{suggestion.item.city}}</span>
                </template>
            </vue-autosuggest>
          </div>
          <div class="form-group">
            <vue-autosuggest
                v-model="street"
                ref="street_autosuggest"
                :suggestions="street_suggestions"
                :input-props="{id:'street_autosuggest__input', placeholder:'Street *', class:'form-control'}"
                @focus="onStreetFocus"
                @input="onStreetInputChange"
                @selected="onStreetSelected"
                :get-suggestion-value="getStreetSuggestionValue"
            >  
                <template slot-scope="{suggestion}">
                    <span class="my-suggestion-item">{{suggestion.item.street}}</span>
                </template>
            </vue-autosuggest>
          </div>
          <div class="form-group">
            <input type="text" v-model="street_no" class="form-control" name="street_no" placeholder="Street number *">
          </div>
          <div class="form-group">
            <input type="email" v-model="email" class="form-control" name="email" placeholder="Email *">
          </div>
          <button type="submit" class="btn btn-next"></button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

import "../styles/_register.scss"
import axios from 'axios'
import router from '../router'
import { VueAutosuggest } from 'vue-autosuggest'

const RESOURCE_NAME = '/addresses';

export default {
  components: {
      VueAutosuggest
  },

  data () {
    return {
      first_name: '',
      last_name: '',
      zip: '',
      city: '',
      street: '',
      street_no: '',
      email: '',
      zip_suggestions: [{ data: []}],
      city_suggestions: [{ data: []}],
      street_suggestions: [{ data: []}]
    }
  },

  methods: {
    register () {
      axios.post('/users/register',
        {
          first_name: this.first_name,
          last_name: this.last_name,
          zip: this.zip,
          city: this.city,
          street: this.street,
          street_no: this.street_no,
          email: this.email
        }
      ).then((res) => {
        router.push({ name: 'Login' })
        console.log(res)
      }).catch((err) => {
        console.log(err)
      })
    },
    prepareQueryParams() {
        let queryParams = {}
        if (this.zip) {
            queryParams.zip = this.zip
        }
        if (this.city) {
            queryParams.city = this.city
        }
        if (this.street) {
            queryParams.street = this.street
        }
        return queryParams
    },
    loadCitySuggestions(queryParams) {

        axios.get(`${RESOURCE_NAME}/city`, {
            params: queryParams
        }).then((res) => {
            
            const city_autosuggest_ref = this.$refs['city_autosuggest']
            if (res.data.length == 1) {
                console.log("Set suggestions");
                /* 
                * In order to set value of the autosuggest component inside itself,
                * we have to set the 'currentIndex' property to 0 as we want to select the first item
                * and then to call the 'setChangeItem' method with the current item object
                * 
                */ 
                
                city_autosuggest_ref.currentIndex = 0;
                city_autosuggest_ref.setChangeItem({ item: res.data[0] });
                
            } else {
                console.log("Show suggestions");
                /* 
                * HACK
                * In order to open the autosuggest list I had to set the 'loading' property to false, 
                * because this is one of the restrictions responsible for displaying the suggestions list.
                * 
                * In my opinion that property has to be already set to false in that moment...
                */ 
                console.log("Show suggestions city_autosuggest_ref.loading -> " , city_autosuggest_ref.loading);
                city_autosuggest_ref.loading = false;
                console.log("Show suggestions city_autosuggest_ref.loading -> " , city_autosuggest_ref.loading);
            }
            this.city_suggestions = [ { data: res.data } ]

        }).catch((err) => {
            console.log(err)
        })
    },

     focusOnCityField() {
      // Once we select a zip code, we call focus() on the city field in order to force the user to select a city
      this.$nextTick( () => {
        /* 
         * Calling the focus method on the input autocomplete element
         */
        this.$refs['city_autosuggest'].$el.firstChild.focus();
      });
    },
    
    /**
     * Zip field suggestion events
     */
    onZipSelected(item) {
      this.focusOnCityField();
    },
    onZipFocus(e) {
      console.log('onZipFocus', e);
    },
    onZipInputChange(text) {
      // event fired when the input changes
      axios.get(`${RESOURCE_NAME}/zip/${text}`).then((res) => {
        this.zip_suggestions = [ { data: res.data } ]
      }).catch((err) => {
        console.log(err)
      })
    },
    getZipSuggestionValue(suggestion) {
      console.log('Suggestions -> ', suggestion)
      this.zip = suggestion.item.zip;
      return this.zip;
    },

    /**
     * City field suggestion events
     */
    onCitySelected(item) {
      //this.city = item.item;
    },
    onCityClick(e) {
      console.log('onCityClick', e);
    },
    onCityFocus(e) {
      console.log('onCityFocus', e);

      let queryParams = this.prepareQueryParams()
      console.log(Object.keys(queryParams).length);
      if ( Object.keys(queryParams).length > 0 ) {
        this.loadCitySuggestions(queryParams)
      }
    },
    onCityInputChange(text) {
      // event fired when the input changes
      axios.get(`${RESOURCE_NAME}/city/${text}`).then((res) => {
        this.city_suggestions = [ { data: res.data } ]
      }).catch((err) => {
        console.log(err)
      })
    },
    getCitySuggestionValue(suggestion) {
      console.log('Suggestions -> ', suggestion)
      this.city = suggestion.item.city;
      return this.city;
    },

    /**
     * Street field suggestion events
     */

    onStreetSelected(item) {
      this.focusOnCityField();
    },
    onStreetFocus(e) {
      console.log('onStreetFocus', e);
    },
    onStreetInputChange(text) {
      // event fired when the input changes
      axios.get(`${RESOURCE_NAME}/street/${text}`, {
          params: this.prepareQueryParams()
      }).then((res) => {
        this.street_suggestions = [ { data: res.data } ]
      }).catch((err) => {
        console.log(err)
      })
    },
    getStreetSuggestionValue(suggestion) {
      console.log('Suggestions -> ', suggestion)
      this.street = suggestion.item.street;
      return this.street
    },    
  }
}
</script>
