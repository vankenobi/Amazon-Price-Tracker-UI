<template>
    <div class="container-fluid" style="margin-top:50px; margin-bottom: 150px; padding: 100px;">
            <div class="row">
                <TrackedProductCard v-for="trackedProduct in trackedProductList" :key="trackedProduct.productTrackedId">
                    <div class="card-sl" @click="HandleSelectItem(trackedProduct)">     
                    <div style="height: 500px;">
                        <router-link to="/trackedproducts/trackedproduct"> 
                            <div class="card-image text-center"><img :src="trackedProduct.image" alt=""></div>
                            <a class="card-action" href="#"><i class='fa fa-heart' ></i></a>
                            <div class="card-heading" >
                                {{ trackedProduct.name }}
                            </div>
                            <div class="card-text">
                                {{ trackedProduct.description }}
                            </div>
                            <div class="card-text">
                                {{ new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(trackedProduct.currentPrice) }} 
                            </div>
                        </router-link>
                    </div>
                        <a target="_blank" :href="trackedProduct.url" class="card-button-product">Purchase</a>
                    </div>
                </TrackedProductCard>
            </div>
        </div>
</template>

<script>
import TrackedProductCard from './TrackedProductCard';
import axios from 'axios';
import { eventBus } from '../main';
import PrimeVue from 'primevue/config';


export default  {
    components : {
        TrackedProductCard
    },
    data() {
        return {
            trackedProductList : []
        }
    },
    methods: {
        GetAllTrackedProducts(){    
            this.trackedProductList.splice(0, this.trackedProductList.length);
            const config = { headers: { "Content-Type": "application/json" , "Access-Control-Allow-Origin" : "http://44.204.241.92" } };
            axios.get('http://44.204.241.92:8080/api/TrackedProducts/GetAllTrackedProduct',config, { withCredentials: false })
            .then(response => {
                let data = response.data.data;
                data.forEach(element => {
                this.trackedProductList.push(element);
             });
        })
        .catch(e => console.log(e));
        },
        
        HandleSelectItem(item){
            eventBus.$emit("item",item);
        }
    },
    
    created() {
        this.GetAllTrackedProducts();
        eventBus.$on("notification",(item) => {
            console.log(item);
        })
    },
}
</script>