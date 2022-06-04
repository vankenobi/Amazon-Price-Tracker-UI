<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal2"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Add New Tracking</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body ">
            <div class="mb-3">
                <img :src="newTrackingItem.image" width="50%" alt="" srcset="">
            </div>
            
            <div class="mb-2">
                <i class="fa fa-star rating-color" style="color: orange;" v-for="index in parseInt(newTrackingItem.rate)"></i>
                <i class="fa fa-star" style="margin-left: -4px;" v-for="index in (5 - parseInt(newTrackingItem.rate))"></i>
            </div>

            <div class="mb-2" style="font-size: larger; font-weight: bold;">
              {{
                new Intl.NumberFormat("tr-TR", {
                  style: "currency",
                  currency: "TRY"
                }).format(newTrackingItem.currentPrice)
              }}
            </div>
            <div class="row mb-2">
                <h5>{{ newTrackingItem.name }}</h5>
            </div>
            
            
            <div class="container ">
                <div class="row">
                    <label class="col-md-3" style="font-weight: 500;">Interval : </label>
                    <div class="col-md-6">
                        <input class="col-md-6 form-range" v-model="interval" min="20" max="60" step="5" type="range" id="customRange1">
                    </div>
                        <label class="col-md-2" style="font-weight: 500;"> {{ interval }} min</label>
                </div>
            </div>

            <div class="container ">
                <div class="row">
                    <label class="col-md-3" style="font-weight: 500;">Target Price: </label>
                    <div class="col-md-6">
                        <input class="col-md-6 form-range" v-model="targetPrice" min="1" :max="newTrackingItem.currentPrice" step="1" type="range" id="customRange2">
                    </div>
                        <label class="col-md-2" style="font-weight: 500;"> {{
                                                                                new Intl.NumberFormat("tr-TR", {
                                                                                style: "currency",
                                                                                currency: "TRY"
                                                                                }).format(targetPrice)
                                                                            }}</label>
                </div>
            </div>
            
            
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button @click="trackTheProduct" type="button" class="btn btn-primary" style="background-color: #1c2431;">Track the product</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { eventBus } from '../main';
import axios from 'axios';
export default {
    data() {
        return {
            newTrackingItem : {
                rate : null,
                id : null,
                image : null,
                currentPrice : null,
                name : null
            },
            interval : 20,
            targetPrice : 1
        }
    },
    methods: {
        trackTheProduct(){
        const config = { headers: { "Content-Type": "application/json" } };
        axios
            .post(
            "https://localhost:7176/api/TrackedProducts/AddProductTracking",
            {
                "productId": this.newTrackingItem.id,
                "interval": this.interval,
                "targetPrice": this.targetPrice
            },
            config
            )
            .then(response => {
            if (response.data.responseCode === 200) {
            console.log("Başarılı")
            }

            else if (response.data.responseCode === 400) {
                console.log("Zaten mevcut");
            }

            else{
                console.log("Hata");
            }
            })
            .catch(e => console.log(e));
            }
    },
    created() {
        eventBus.$on("AddNewTrackedItem",(item) => {
            this.newTrackingItem.rate = item.rate;
            this.newTrackingItem.id = item.id;
            this.newTrackingItem.image = item.image;
            this.newTrackingItem.currentPrice = item.currentPrice;
            this.newTrackingItem.name = item.name;
        })
    },
};
</script>
<style lang=""></style>
