<template>
    <v-snackbar v-model="alert" :color="type" top>
        {{text}}
        <template>
            <v-btn dark text @click="close">
                Close
            </v-btn>
        </template>
    </v-snackbar>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'

export default {
    name: 'c-alert',
    computed: {
        ...mapGetters({
            status: 'alert/status',
            text: 'alert/text',
            type: 'alert/type'
        }),
        alert: {
            get() {
                return this.status
            },
            set: () => {
                this.setAlert({
                    status: true,
                    text: 'text',
                    type: 'type'
                })
            }
        }
    },
    methods: {
        ...mapActions({
            setAlert: 'alert/set'
        }),
        close() {
            this.setAlert({
                status: false
            })
        }
    }
}
</script>