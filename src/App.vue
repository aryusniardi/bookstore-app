<template>
  <v-app>
    <!-- header component -->
    <c-header />

    <!-- sidebar component -->
    <c-side-bar />

    <!-- main content -->
    <v-content>
      <v-slide-y-transition mode="out-in">
        <router-view></router-view>
      </v-slide-y-transition>
    </v-content>

    <!-- footer component -->
    <c-footer />

    <c-alert />

    <!-- <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialogbottom-transition">
      <Search />
    </v-dialog> -->
    <keep-alive>
      <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialogbottom-transition">
        <component :is="currentComponent"></component>
      </v-dialog>
    </keep-alive>
  </v-app>
</template>

<script>
import CHeader from '@/components/CHeader.vue'
import CFooter from '@/components/CFooter.vue'
import CSideBar from '@/components/CSideBar.vue'
import CAlert from '@/components/CAlert.vue'
import Search from '@/views/Search.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Cart from '@/views/Cart.vue'

import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    CHeader,
    CFooter,
    CSideBar,
    CAlert,
    Search,
    Cart,
    Login,
    Register,
  },
  methods: {
    ...mapActions({
      setStatusDialog: 'dialog/setStatus'
    }),
  },
  computed: {
    ...mapGetters({
      statusDialog: 'dialog/status',
      currentComponent: 'dialog/component'
    }),
    dialog: {
      get() {
        return this.statusDialog
      },
      set(value) {
        this.setStatusDialog(value)
      } 
    },
  }
}
</script>

<style>
.v-toolbar {
  flex: 0 !important;
}

.v-application .py-3 {
  text-align: center !important;
}

.v-card__text {
  text-align: center !important;
}

.dark--text {
  color: #323232 !important;
}

.v-subheader.theme--light {
  margin: 0px;
  padding: 0px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 2.25vh !important;
  font-weight: 700;
}

.v-subheader.theme--light a {
  bottom: 0;
  font-size: 1.75vh;
  font-weight: 400;
  text-decoration: none;
}


</style>
