<template>
    <div>
        <v-container grid-list-md>
            <v-subheader>
                All Category
            </v-subheader>
            <v-layout row wrap>
                <!-- Looping pada properties categories -->
                <v-flex v-for="category in categories" xs6 :key="category.id">
                    <v-card :to="'/category/' + category.slug">
                        <v-img v-if="category.image" :src="getImage('/categories/' + category.image)" height="150px">
                            <v-container fill-height fluid pa-2>
                                <v-layout full-height>
                                    <v-flex xs12 align-end flexbox>
                                        <span class="title dark--text text-block" v-text="category.name"></span>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-img>
                        <v-card-actions>
                            <v-btn icon>
                                <v-icon color="red">favorite</v-icon>
                            </v-btn>
                            <v-btn icon>
                                <v-icon>bookmark</v-icon>
                            </v-btn>
                            <v-btn icon>
                                <v-icon>share</v-icon>
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
        <template>
            <div class="text-xs-center">
                <v-pagination v-model="page" @input="go" :length="lengthPage" :total-visible="4"></v-pagination>
            </div>
        </template>
    </div>
</template>

<script>
export default {
    data() {
        return {
            categories: [],
            page: 0,
            lengthPage: 0
        }
    },
    methods: {
        go() {
            let url = '/categories';
            if(this.page > 0) url = '/categories?page=' + this.page;
                this.axios.get(url)
                .then((response) => {
                    let response_data = response.data
                    let categories = response_data.data
                    this.lengthPage = response_data.meta.last_page
                    this.categories = categories
                })
                .catch((error) => {
                    console.log(error.response)
                })
        }
    },
    created() {
        this.go()
    }    
}
</script>

<style scoped>
    .text-block {
        position: absolute;
        bottom: 0px;
        left: 0px;
        background: linear-gradient(to bottom, #32323200, #323232AA);
        color: #f1f1f1 !important;
        width: 100%;
        padding-left: 15px;
        padding-right: 15px;
        widows: 100%;
    }
</style>