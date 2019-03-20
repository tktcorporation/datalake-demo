<template>
    <div id="SimilarPages" class="container" align="left">

      <div class="jumbotron mt-4">

        <h1 class="display-4">NLP Demo</h1>

        <p class="lead">Enter a some text and hit submit to find pages from VOA News that match.</a></p>

          <div class="form-group">
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
          </div>

          <div v-if="nlpInfo" class="mb-4">
              <div class="mt-1" v-if="nlpInfo.topics.length > 0">
                  <h6 class="m-0">Topics</h6>
                <span v-for="(topic, index) in nlpInfo.topics" :key="index" class="badge badge-primary mr-1">{{topic.name}} <span class='text-percent'>({{topic.score | percent}})</span></span>
              </div>
              <div class="mt-2" v-if="nlpInfo.categories.length > 0">
                  <h6 class="m-0">Categories</h6>
                <span v-for="(cat, index) in nlpInfo.categories" :key="index" class="badge badge-info mr-1">{{cat.name}} <span class='text-percent'>({{cat.score | percent}})</span></span>
              </div>
              <div class="mt-2" v-if="nlpInfo.entities.length > 0">
                  <h6 class="m-0">Entities</h6>
                <span v-for="(entity, index) in nlpInfo.entities" :key="index" class="badge badge-success mr-1">{{entity.name}} <span class='text-percent'>({{entity.score | percent}})</span></span>
              </div>
          </div>
         
        <div class="row">
            <div class="col" align="left">
    
                <button :disabled="isLoading" type="button" class="btn btn-primary btn-lg" @click="onAnalyze()">Analyze</button>
                <!--<button v-if="nlpInfo" :disabled="isLoading" type="submit" class="btn btn-primary btn-lg ml-1" @click="onSubmit()">Get Similar Pages</button>-->
    
                <span v-if="isLoading" class="text-primary" style="font-size:24px">
                    <i class="fas fa-cog fa-spin ml-2"></i>
                </span>

                <span v-if="isLoading" class="text-primary" style="font-size:24px">
                <i class="fas fa-robot fa-spin ml-2"></i>
                </span>
            </div>
            <div class="col" align="right">
                <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Sensitivity: {{thresholdType}}
                    </button>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <span class="dropdown-item" @click="setThreshold('strict')">Strict</span>
                        <span class="dropdown-item" @click="setThreshold('medium')">Medium</span>
                        <span class="dropdown-item" @click="setThreshold('loose')">Loose</span>
                    </div>
                </div>
                </div>
        </div>






        <p v-if="error" class='text-danger mt-3'>{{error}}</p>
    </div>

    <div class="jumbotron mt-4">
        <div v-if="pages" class="pt-0 mt-0 text-generated">

            <ul class="list-unstyled" v-for="page in pages" :key="page.id">
                <li class="media">
                    
                    <a :href="page.url" target="_blank">
                    <img :src="getImage(page)" class="mr-3" alt="page image" style="height:100px">
                    </a>

                    <div class="media-body">
                        <h5 class="mt-0 mb-1"><span class="badge badge-primary">Score: {{page.score | number(2)}}</span> {{page.title}}</h5>
                        
                        {{page.extract}}

                        <div v-if="nlpInfo" class="mb-4">
                            <div class="">
                                <span v-for="(topic, index) in page.matchedTopics" :key="index" class="badge badge-primary mr-1">{{topic}}</span>
                            </div>
                            <div class="">
                                <span v-for="(cat, index) in page.matchedCategories" :key="index" class="badge badge-info mr-1">{{cat}}</span>
                            </div>
                            <div class="">
                                <span v-for="(entity, index) in page.matchedEntities" :key="index" class="badge badge-success mr-1">{{entity}}</span>
                            </div>
                        </div>

                    </div>

                    
                </li>
            </ul>

        </div>

    </div>
  </div>
</template>

<script>
import Vue from "vue";
import API from '../../api'

export default {
    name: "similar",

    metaInfo: {
        title: "Similar"
    },

    components: {},

    data() {
        return {
            seedText: "House Democrats sent more than 80 letters Monday demanding documents from family members, business associates, political confidants and others with connections to President Trump, opening a sprawling investigation of whether he and his administration have engaged in obstruction of justice, corruption and abuse of power.",
            error: null,
            isLoading: false,
            nlpInfo: null,
            pages: null,
            thresholdType: "medium",
            thresholds: {}
        };
    },

    computed: {},

    mounted() {
        this.setThreshold(this.thresholdType);
    },

    methods: {
        setThreshold(val) {
            this.thresholdType = val;

            if (val == "strict") {
                this.thresholds = {
                    topics: 0.6,
                    category: 0.6,
                    entities: 0.5
                };
            } else if (val == "medium") {
                this.thresholds = {
                    topics: 0.25,
                    category: 0.25,
                    entities: 0.3
                };
            } else if (val == "loose") {
                this.thresholds = {
                    topics: 0.01,
                    category: 0.01,
                    entities: 0.01
                };
            }

            this.$log("thresholds = ", this.thresholds);
        },

        getImage(page) {
            return page && page.image
                ? page.image
                : "http://via.placeholder.com/178x100";
            // "http://placeimg.com/178/100/nature"
        },

        async onAnalyze(){

            this.setThreshold(this.thresholdType);
            this.isLoading = true;

            let opts = {
                text: this.seedText,
                tc: this.thresholds.category,
                tt: this.thresholds.topics,
                te: this.thresholds.entities
            };

            try {            
                this.nlpInfo = await API.processText(opts)
                this.$log(this.nlpInfo)
            } 
            catch (err) {
                this.error = err.toString();
            }


            this.isLoading = false;
        },

        async onSubmit() {

            this.isLoading = true;
            this.page = null;

            try {

                var similarPages = await API.getSimilarPages(this.nlpInfo)
                
                this.pages = [];

                for (let i = 0; i < similarPages.length; i += 1) {
                    let page = similarPages[i];
                    if (page.score > 0 && page.image) {
                        this.pages.push(page);
                    }
                }

            } 
            catch (err) {
                this.error = err.toString();
            }
            
            this.isLoading = false;
        }
    },

    mounted() {}
};
</script>


<style lang="scss">
#SimilarPages {
    color: black;

    .text-generated {
        font-size: 18px;
        color: #a8b2cd;
        font-weight: 500;
    }

    .badge {
        font-size: 12px;
    }

    .text-percent {
        color: #ddd;
        font-weight: normal;
    }

    .badge-primary {
    }

    .badge-info {
    }

    .badge-primary {
    }
}
</style>
