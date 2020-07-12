<template>
    <div>
        <!-- Bagian pertama = Category -->
        <v-container grid-list-md>
            <v-subheader>
              Random Category
                <v-spacer></v-spacer>
                <!-- link to categories route that will defined the route and its component -->
                <router-link to="/categories">See All</router-link>
            </v-subheader>
            <v-layout row wrap>
                <!-- Categories variable will be filled by data from category end-point -->
                <v-flex v-for="category in categories" lg4 xs4 :key="category.id">
                    <v-card light :to="'/category/' + category.slug">
                        <!-- load image -->
                        <v-img :src="getImage('/categories/' + category.image)" height="20vh">
                          <v-container fill-height fluid pa-2>
                                <v-layout fill-height>
                                    <v-flex xs12 align-end flexbox>
                                        <!-- Show category name -->
                                        <span class="title dark--text text-block" v-text="category.name"></span>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-img>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>

        <v-container grid-list-md>
            <v-subheader>
                Top Books
                <v-spacer></v-spacer>
                <!-- link to categories route that will defined the route and its component -->
                <router-link to="/books">See All</router-link>
            </v-subheader>
            <v-layout row wrap>
                <!-- Categories variable will be filled by data from category end-point -->
                <v-col
                  v-for="(book, index) in books"
                  :key="index"
                  cols="12"
                >
                  <v-card :to="'/book/' + book.slug" >
                    <div class="d-flex flex-no-wrap justify-space-between">
                      <div>
                        <v-card-title
                          class="headline"
                          v-text="book.title"
                        ></v-card-title>

                        <v-card-subtitle v-text="book.author"></v-card-subtitle>
                        <v-spacer></v-spacer>
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
                      </div>

                      <v-avatar
                        class="ma-3"
                        height="15vh"
                        min-width="25vw"
                        tile
                      >
                        <v-img :src="getImage('/books/' + book.cover)"></v-img>
                      </v-avatar>
                    </div>
                  </v-card>
                </v-col>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
export default {
  data: () => ({
    categories: [],
    books: []
  }),
  metxhods: {
    getImage (image) {
      if (image != null && image.length > 0) {
        return process.env.VUE_APP_BACKEND_URL + '/images' + image
      }
      return 'images/unavailable.png'
    }
  },
  created () {
    let count = 3
    // Request to random category endpoint with param count = 4
    this.axios.get('/categories/random/' + count)
      .then((response) => {
        const categories = response.data.data
        // WHen get its data, input value to categories
        this.categories = categories
      })
      .catch((error) => {
        const responses = error.response
        console.log(responses)
      })
    count = 8
    // reqeust to top book endpoint with param count = 8
    this.axios.get('/books/top/' + count)
      .then((response) => {
        const books = response.data.data
        this.books = books
      })
      .catch((error) => {
        const responses = error.response
        console.log(responses)
      })
  }
}
</script>

<style >
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
