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
              aria-label="Close" xd
            ></button>
          </div>
          <div class="modal-body ">
            <div class="mb-4" style="max-height: 600px;">
              <img :src="newTrackingItem.image" alt="" srcset="" />
            </div>

            <div style="color: #007600;">
              <span v-if="newTrackingItem.stockState != null">{{
                newTrackingItem.stockState
              }}</span>
            </div>

            <div v-if="newTrackingItem.rate != null" class="mb-2">
              <i
                class="fa fa-star rating-color"
                style="color: orange;"
                v-for="index in parseInt(newTrackingItem.rate)"
              ></i>
              <i
                class="fa fa-star"
                style="margin-left: -3px;"
                v-for="index in 5 - parseInt(newTrackingItem.rate)"
              ></i>
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
                <label class="col-md-3" style="font-weight: 500;"
                  >Interval :
                </label>
                <div class="col-md-6">
                  <input
                    class="col-md-6 form-range"
                    v-model="interval"
                    min="20"
                    max="60"
                    step="5"
                    type="range"
                    id="customRange1"
                  />
                </div>
                <label class="col-md-2" style="font-weight: 500;">
                  {{ interval }} min</label
                >
              </div>
            </div>
          
            <div class="container ">
              <div class="row">
                <label class="col-md-3" style="font-weight: 500;"
                  >Target Price:
                </label>
                <div class="col-md-6">
                  <input
                    class="col-md-6 form-range"
                    v-model="targetPrice"
                    min="1"
                    :max="newTrackingItem.currentPrice"
                    step="1"
                    type="range"
                    id="customRange2"
                  />
                </div>
                <label class="col-md-2" style="font-weight: 500;">
                  {{
                    new Intl.NumberFormat("tr-TR", {
                      style: "currency",
                      currency: "TRY"
                    }).format(targetPrice)
                  }}</label
                >
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-danger text-align-left"
              data-bs-dismiss="modal"
              style="float: left;"
            >
              Close
            </button>
            <button
              @click=""
              data-bs-dismiss="modal"
              type="button"
              class="btn btn-primary"
              style="background-color: #EE5007;  border: 0px;"
            >
              Leave Tracking
            </button>
            <button
              @click="trackTheProduct"
              data-bs-dismiss="modal"
              type="button"
              class="btn btn-primary "
              style="background-color: #242f41; border: 0px;"
            >
              Track the product
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { eventBus } from "../main";
import axios from "axios";
export default {
  data() {
    return {
      newTrackingItem: {
        rate: null,
        id: null,
        image: null,
        currentPrice: null,
        name: null,
        stockState: null
      },
      interval: 20,
      targetPrice: 1
    };
  },
  methods: {
    leaveTracking(){
      const config = { headers: { "Content-Type": "application/json" } };
       axios
        .post(
          "https://localhost:7176/api/TrackedProducts/DeleteTrackingOfProduct",
          this.newTrackingItem.id,
          config
        )
        .then(response => {
          if (response.data.responseCode === 200) {
            eventBus.$emit("notificationForNewTracking", {
              errorTrackedNotification: false,
              warningTrackedNotification: false,
              successTrackedNotification: true
            });
          } else if (response.data.responseCode === 400) {
            eventBus.$emit("notificationForNewTracking", {
              errorTrackedNotification: false,
              warningTrackedNotification: true,
              successTrackedNotification: false
            });
          } else {
            eventBus.$emit("notificationForNewTracking", {
              errorTrackedNotification: true,
              warningTrackedNotification: false,
              successTrackedNotification: false
            });
          }
        })
        .catch(e => console.log(e));
    },
    trackTheProduct() {
      const config = { headers: { "Content-Type": "application/json" } };
      axios
        .post(
          "https://localhost:7176/api/TrackedProducts/AddProductTracking",
          {
            productId: this.newTrackingItem.id,
            interval: this.interval,
            targetPrice: this.targetPrice
          },
          config
        )
        .then(response => {
          if (response.data.responseCode === 200) {
            eventBus.$emit("notificationForNewTracking", {
              errorTrackedNotification: false,
              warningTrackedNotification: false,
              successTrackedNotification: true
            });
          } else if (response.data.responseCode === 400) {
            eventBus.$emit("notificationForNewTracking", {
              errorTrackedNotification: false,
              warningTrackedNotification: true,
              successTrackedNotification: false
            });
          } else {
            eventBus.$emit("notificationForNewTracking", {
              errorTrackedNotification: true,
              warningTrackedNotification: false,
              successTrackedNotification: false
            });
          }
        })
        .catch(e => console.log(e));
    }
  },
  created() {
    eventBus.$on("AddNewTrackedItem", item => {
      console.log(item);
      this.newTrackingItem.rate = item.rate;
      this.newTrackingItem.id = item.id;
      this.newTrackingItem.image = item.image;
      this.newTrackingItem.currentPrice = item.currentPrice;
      this.newTrackingItem.name = item.name;
      this.newTrackingItem.stockState = item.stockState;
    });
  }
};
</script>
<style lang=""></style>
