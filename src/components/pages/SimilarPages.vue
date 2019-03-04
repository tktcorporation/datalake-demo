<template>
    <div class="container" align="left">

      <div class="jumbotron mt-4">

        <h1 class="display-4">NLP Demo</h1>

        <p class="lead">Enter a short, sample sentence as a seed to generate the fake content using the</a></p>

          <div class="form-group">
            <label for="exampleInputEmail1">Text</label>
            <textarea 
                type="email" 
                @keyup.13="onSubmit()" 
                class="form-control" 
                id="exampleInputEmail1" 
                aria-describedby="emailHelp" 
                placeholder="Enter text" 
                :disabled="isLoading"
                rows=4
                v-model="seedText"></textarea>
            <small id="emailHelp" class="form-text text-muted">Use simple, short and non complex text.</small>
          </div>

          <div v-if="nlpInfo">
              <div class="mb-1">
                  <label>Entities</label>
                <span v-for="(topic, index) in nlpInfo.topics" :key="index" class="badge badge-primary">{{topic}}</span>
              </div>
              <div class="mb-1">
                  <label>Entities</label>
                <span v-for="(cat, index) in nlpInfo.categories" :key="index" class="badge badge-info">{{cat}}</span>
              </div>
              <div class="mb-1">
                  <label>Entities</label>
                <span v-for="(entity, index) in nlpInfo.entities" :key="index" class="badge badge-success">{{entities}}</span>
              </div>
          </div>
         
          <button :disabled="isLoading" type="submit" class="btn btn-primary btn-lg" @click="onSubmit()">Submit</button>

        <span v-if="isLoading" class="text-primary" style="font-size:24px">
          <i class="fas fa-cog fa-spin ml-2"></i>
        </span>

        <span v-if="isLoading" class="text-primary" style="font-size:24px">
          <i class="fas fa-robot fa-spin ml-2"></i>
        </span>

        <p v-if="error" class='text-danger mt-3'>{{error}}</p>

        <div v-if="pages" class="pt-0 mt-0 text-generated">
            <pre>{{pages}}</pre>
        </div>

    </div>
  </div>
</template>

<script>

import Vue from "vue"

export default {
    
    name: "similar",

    metaInfo: {
        title: "Similar"
    },

    components: {},

    data() {
        return {
            seedText: 'House Democrats sent more than 80 letters Monday demanding documents from family members, business associates, political confidants and others with connections to President Trump, opening a sprawling investigation of whether he and his administration have engaged in obstruction of justice, corruption and abuse of power.',
            error: null,
            isLoading: false,
            nlpInfo: null,
            pages: null
        };
    },

    computed: {},

    watch: {
        account: function(newVal) {}
    },

    methods: {
        onSubmit(){
            
            this.isLoading = true

            var path = 'http://127.0.0.1:5001/nlp/similar'

            if (window.location.hostname.search('localhost') == -1) {
                path = 'nlp/similar'
            }

            let body = {text: this.seedText}
            path = path + '?' + $.param(body);

            let successCallback = (response)=>{
                this.isLoading = false
                this.$log(response)
                
                try {
                    this.similar = response.body.similar
                    this.nlpInfo = response.body.nlp
                }
                catch(err){
                    this.error = err.toString()
                }
                
            }

            let errorCallback = (response) => {
                this.isLoading = false
                this.error = response.body
            }

            Vue.http.get(path, body).then(successCallback, errorCallback); 
        }
    },

    mounted() {}
};
</script>


<style lang="scss">
.text-generated {
    font-size:18px;
    color: #A8B2CD;
    font-weight: 500;
}
</style>
