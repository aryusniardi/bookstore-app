<template>
    <v-footer light height="auto">
        <v-flex xs12>
            <v-card text class="white--text text-xs-center">
                <!-- social media menu icon -->
                <v-card-text>
                    <v-btn v-for="icon in icons" :key="icon" class="mx-3 dark--text" icon>
                        <v-icon size="24px"> {{icon}} </v-icon>
                    </v-btn>
                </v-card-text>

                <v-layout justify-center row wrap>
                    <!-- aplication link page menu -->
                    <v-btn v-for="link in links" :key="link" color="dark" text rounded>
                        {{link}}
                    </v-btn>

                    <!-- copyright text -->
                    <v-flex py-3 dark--text xs12 light>
                        &copy;2020 - Bookstore powered by <strong>Vuetify</strong>
                    </v-flex>
                </v-layout>
            </v-card>
        </v-flex>
    </v-footer>
</template>

<script>
export default {
  data: () => ({
    // variable social media icons
    icons: [
      'fab fa-facebook',
      'fab fa-twitter',
      'fab fa-google-plus',
      'fab fa-linkedin',
      'fab fa-instagram'
    ],
    // variable link page
    links: [
      'Home',
      'About Us',
      'Team',
      'Services',
      'Blog',
      'Contact Us'
    ]
  })
}
</script>
