<template>
    <div>
        <v-container grid-list-md>
            <v-subheader>{{category.name}}</v-subheader>
            <v-img v-if="category.image" :src="getImage('/categories/' + category.image)" height="150px"></v-img>
            <v-subheader>Books by "{{category.name}}" category</v-subheader>
            <v-layout row wrap>
                <!-- shows books data related -->
                <v-flex v-for="book in books" xs6 :key="book.id">
                    <v-card :to="'/book/' + book.slug">
                        <v-img v-if="book.cover" :src="getImage('/books/' + book.cover)" height="150px">
                            <v-container fill-height fluid pa-2>
                                <v-layout full-height>
                                    <v-flex xs12 align-end flexbox>
                                        <span class="title dark--text text-block" v-text="book.title"></span>
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
            <template>
                <div class="text-xs-center">
                    <v-pagination v-model="page" @input="go" :length="lengthPage" :total-visible="4"></v-pagination>
                </div>
            </template>
        </v-container>
    </div>
</template>

<script>
export default {
    data() {
        return{
            category: {}, // menampung satu objek category
            books: [],
            page: 0,
            lengthPage: 0
        }
    },
    methods: {
        go() {
            let slug = this.$route.params.slug
            let url = '/categories/slug/' + slug
            if(this.page > 0) url + '?page=' + this.page
                url = encodeURI(url)
                this.axios.get(url)
                .then((response) => {
                    let response_date = response.data
                    let category = response_date.data
                    this.category = category
                    this.books = category.books.data
                    this.lengthPage = category.books.last_page
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