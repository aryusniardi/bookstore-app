<template>
    <v-container>
        <v-subheader>Shipping Address</v-subheader>
        <div>
            <v-card flat>
                <v-container>
                    <v-form ref="form" lazy-validation>
                        <v-text-field label="name" v-model="name" required append-icon="person"></v-text-field>
                        <v-textarea label="address" v-model="address" required auto-grow rows="3"></v-textarea>
                        <v-text-field label="phone" v-model="phone" required append-icon="phone"></v-text-field>
                        <v-select 
                            v-model="province_id" 
                            label="Province" 
                            :items="provinces" 
                            item-text="province" 
                            item-value="id" 
                            persistent-hint 
                            single-line
                        ></v-select>
                        <v-select label="city" v-model="city_id" v-if="province_id > 0" :items="citiesByProvince" item-text="city" item-value="id" persistent-hint single-line></v-select>
                    </v-form>
                    <v-subheader>Your Shopping Cart</v-subheader>
                    <div v-if="countCart">
                        <v-card flat>
                            <v-list three-line v-if="countCart > 0">
                                <template v-for="(item, index) in carts">
                                    <v-list-item :key="'cart' + index">
                                        <v-list-item-avatar>
                                            <v-img :src="getImage('/books/' + item.cover)"></v-img>
                                        </v-list-item-avatar>

                                        <v-list-item-content>
                                            <v-list-item-content>
                                                <v-list-item-title v-html="item.title"></v-list-item-title>
                                                <v-list-item-subtitle>
                                                    Rp. {{item.price.toLocaleString('id-ID')}}
                                                    ({{item.totalWeight}} kg)
                                                    <span style="float:right">
                                                        {{item.quantity}}
                                                    </span>
                                                </v-list-item-subtitle>
                                            </v-list-item-content>
                                        </v-list-item-content>
                                    </v-list-item>
                                </template>
                            </v-list>
                        </v-card>
                    </div>
                    <v-subheader>Courier</v-subheader>
                    <div>
                        <v-card flat>
                            <v-select
                                v-model="courier"
                                :items="couriers"
                                @change="getServices"
                                item-text="text"
                                item-value="id"
                                label="Courier"
                                persistent-hint
                                single-line></v-select>
                            <v-select
                                v-model="service"
                                v-if="courier"
                                :items="services"
                                @change="calculateBill"
                                item-text="resume"
                                item-value="service"
                                label="Courier Service"
                                persistent-hint
                                single-line></v-select>

                            <v-card-actions>
                                Subtotal
                                <v-spacer />
                                Rp. {{shippingCost.toLocaleString('id-ID')}}
                            </v-card-actions>
                        </v-card>
                    </div>

                    <v-subheader>Total</v-subheader>
                    <v-card>
                        <v-layout row wrap>
                            <v-flex xs6 text-center>
                                Total Bill ({{totalQuantity}} items)
                                <div class="title"> {{totalBill.toLocaleString('id-ID')}} </div>
                            </v-flex>
                            <v-flex xs6 text-center>
                                <v-btn color="orange">
                                    <v-icon light> attach_money </v-icon>
                                    Pay
                                </v-btn>
                            </v-flex>
                        </v-layout>
                    </v-card>
                </v-container>
                <v-card-actions>
                    <v-btn color="success" dark @click="saveShipping">
                        <v-icon> save</v-icon> &nbsp;
                        Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </div>
    </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    data() {
        return {
            name: '',
            address: '',
            phone: '',
            province_id: 0,
            city_id: 0,
            courier: '',
            couriers: [],
            service: '',
            services: [],
            shippingCost: 0,
            totalBill: 0,
        }
    },
    computed: {
        ...mapGetters({
            user: 'auth/user',
            provinces: 'region/provinces',
            cities: 'region/cities',
            carts: 'cart/carts',
            countCart: 'cart/count',
            totalPrice: 'cart/totalPrice',
            totalQuantity: 'cart/totalQuantity',
            totalWeight: 'cart/totalWeight'
        }),
        citiesByProvince() {
            let province_id = this.province_id
            return this.cities.filter(function(city) {
                if (city.province_id == province_id) return city
            })
        },
    },
    methods: {
        ...mapActions({
            setAlert: 'alert/set',
            setAuth: 'auth/set',
            setProvinces: 'region/setProvinces',
            setCities: 'region/setCities',
            setCart: 'cart/set'
        }),
        saveShipping() {
            console.log(this.user.api_token)
            console.log(this.name)
            console.log(this.address)
            console.log(this.phone)
            console.log(this.province_id)
            console.log(this.city_id)

            if (this.$refs.form.validate()) {
                let formData = {
                    'name': this.name,
                    'address': this.address,
                    'phone': this.phone,
                    'province_id': this.province_id,
                    'city_id': this.city_id
                }
                let config = {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + this.user.api_token
                    },
                }

                this.axios.post('/shipping', formData, config)
                .then((response) => {
                    this.setAuth(response.data.data)
                    this.setAlert({
                        status: true,
                        text: response.data.message,
                        type: 'success'
                    })
                    .catch((error) => {
                        let responses = error.response
                        this.setAlert({
                            status: true,
                            text: responses.data.error,
                            type: 'error'
                        })
                    })
                })
            }
        },
        getServices() {
            let courier = this.courier
            let encodedCart = JSON.stringify(this.carts)

            console.log(this.courier)

            let formData = new FormData()
            formData.set('courier', courier)
            formData.set('carts', encodedCart)

            let config = {
                headers: {
                    'Authorization' : 'Bearer ' + this.user.api_token,
                }
            }

            this.axios.post('services', formData, config)
            .then((response) => {
                let response_data = response.data
                // Jika tidak error maka data service dan cart akan di update
                if (response_data.status != 'error') {
                    this.services = response_data.data.services
                    this.setCart(response_data.data.safe_carts)
                }
                
                this.setAlert({
                    status: true,
                    text: response_data.message,
                    color: response_data.status
                })
            })
            .catch((error) => {
                let responses = error.response
                this.setAlert({
                    status: true,
                    text: responses.data.message,
                    type: 'error'
                })
            })
        },
        calculateBill() {
            let selectedService = this.services.find((service) => {
                return (service.service == this.service)
            })

            this.shippingCost = selectedService.cost
            this.totalBill = parseInt(this.totalPrice) + parseInt(this.shippingCost)
        }
    },
    created() {
        this.name = this.user.name
        this.address = this.user.address
        this.phone = this.user.phone
        this.city_id = this.user.city_id
        this.province_id = this.user.province_id

        if (this.provinces && this.provinces.length == 0) {
            this.axios.get('/provinces')
            .then((response) => {
                this.setProvinces(response.data.data)
            })
            this.axios.get('/cities')
            .then((response) => {
                this.setCities(response.data.data)
            })
            console.log(this.city)

        } 

        this.axios.get('/couriers')
        .then((response) => {
            this.couriers = response.data.data
        })
    }
}
</script>