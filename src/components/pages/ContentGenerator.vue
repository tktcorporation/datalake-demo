<template>
    <div class="container" align="left">
        <div class="jumbotron mt-4">
            <h1 class="display-4">Content Generator</h1>

            <p class="lead">
                Enter a short, sample sentence as a seed to generate the fake content using the
                <a
                    target="_blank"
                    href="https://blog.openai.com/better-language-models/"
                >GPT-2 algorithm from OpenAI</a>
            </p>

            <div class="form-group">
                <label for="exampleInputEmail1">Seed Text</label>
                <textarea
                    type="email"
                    @keyup.13="onSubmit()"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter text"
                    :disabled="isLoading"
                    rows="4"
                    v-model="seedText"
                ></textarea>
                <small
                    id="emailHelp"
                    class="form-text text-muted"
                >Use simple, short and non complex text.</small>
            </div>

            <button
                :disabled="isLoading"
                type="submit"
                class="btn btn-primary btn-lg"
                @click="onSubmit()"
            >Submit</button>

            <span v-if="isLoading" class="text-primary" style="font-size:24px">
                <i class="fas fa-cog fa-spin ml-2"></i>
            </span>

            <span v-if="isLoading" class="text-primary" style="font-size:24px">
                <i class="fas fa-robot fa-spin ml-2"></i>
            </span>

            <p v-if="error" class="text-danger mt-3">{{error}}</p>

            <div v-if="generatedText" class="pt-0 mt-0 text-generated" v-html="generatedText"></div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';

export default {
    name: 'content-generator',

    metaInfo: {
        title: 'Content'
    },

    components: {},

    data() {
        return {
            seedText:
                'The man who once derived his identity from making President Trump’s problems go away turned on his former boss in stunning fashion Wednesday, alleging to Congress that Trump manipulated financial records, paid to cover up extramarital affairs and reacted with glee upon learning the WikiLeaks anti-secrecy organization would release emails damaging to his political opponent.',
            error: null,
            generatedText: null,
            isLoading: false
        };
    },

    computed: {},

    methods: {
        onSubmit() {
            this.isLoading = true;

            var path = 'http://127.0.0.1:5100/content/generate';

            if (window.location.hostname.search('localhost') == -1) {
                path = 'content/generate';
            }

            let body = { text: this.seedText };

            let successCallback = response => {
                this.isLoading = false;
                this.$log(response);
                try {
                    let str = response.body.generated.replace(
                        /(?:\r\n|\r|\n)/g,
                        '<br>'
                    );
                    this.generatedText = str;
                } catch (err) {
                    this.error = err.toString();
                }
            };

            let errorCallback = response => {
                this.isLoading = false;
                this.error = response.body;
            };

            Vue.http.post(path, body).then(successCallback, errorCallback);
        }
    },

    mounted() {}
};
</script>


<style lang="scss">
.text-generated {
    font-size: 18px;
    color: #a8b2cd;
    font-weight: 500;
}
</style>
