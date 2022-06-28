<template>
 <!-- empthy commit  -->
  <div>
    <transition name="notify" @after-enter="afterEnter">
      <div
        v-show="successNotification"
        class="alert alert-success notification"
      >
        <strong>Success!</strong> New product added.
        <button
          @click="successNotification = false"
          style="float: right;"
          type="button"
          class="btn-close"
        ></button>
      </div>
    </transition>

    <transition name="notify" @after-enter="afterEnter">
      <div
        v-show="warningNotification"
        class="alert alert-warning notification"
      >
        <strong>Warning!</strong> Product already exists.
        <button
          @click="warningNotification = false"
          style="float: right;"
          type="button"
          class="btn-close"
        ></button>
      </div>
    </transition>

    <transition name="notify" @after-enter="afterEnter">
      <div v-show="errorNotification" class="alert alert-danger notification">
        <strong>Error!</strong> Error adding product.
        <button
          @click="errorNotification = false"
          style="float: right;"
          type="button"
          class="btn-close"
        ></button>
      </div>
    </transition>

    <transition name="notify" @after-enter="afterEnter">
      <div
        v-show="successTrackedNotification"
        class="alert alert-success notification"
      >
        <strong>Success!</strong> The product is being tracked successfully.
        <button
          @click="successTrackedNotification = false"
          style="float: right;"
          type="button"
          class="btn-close"
        ></button>
      </div>
    </transition>

    <transition name="notify" @after-enter="afterEnter">
      <div
        v-show="warningTrackedNotification"
        class="alert alert-warning notification"
      >
        <strong>Warning!</strong> The product is already being tracked.
        <button
          @click="warningTrackedNotification = false"
          style="float: right;"
          type="button"
          class="btn-close"
        ></button>
      </div>
    </transition>

    <transition name="notify" @after-enter="afterEnter">
      <div
        v-show="errorTrackedNotification"
        class="alert alert-danger notification"
      >
        <strong>Error!</strong> The product cannot be tracked.
        <button
          @click="errorTrackedNotification = false"
          style="float: right;"
          type="button"
          class="btn-close"
        ></button>
      </div>
    </transition>

    <transition name="notify" @after-enter="afterEnter">
      <div
        v-show="successDeleteNotification"
        class="alert alert-success notification"
      >
        <strong>Success!</strong> The product deleted successfully.
        <button
          @click="successDeleteNotification = false"
          style="float: right;"
          type="button"
          class="btn-close"
        ></button>
      </div>
    </transition>

    <transition name="notify" @after-enter="afterEnter">
      <div
        v-show="successUpdateIntervalAndTargetPriceNotification"
        class="alert alert-success notification"
      >
        <strong>Success!</strong> The tracking settings of product successfully.
        <button
          @click="successUpdateIntervalAndTargetPriceNotification = false"
          style="float: right;"
          type="button"
          class="btn-close"
        ></button>
      </div>
    </transition>

    <transition name="notify" @after-enter="afterEnter">
      <div
        v-show="errorUpdateIntervalAndTargetPriceNotification"
        class="alert alert-danger notification"
      >
        <strong>Error!</strong> Error on update tracking settings of product.
        <button
          @click="errorUpdateIntervalAndTargetPriceNotification = false"
          style="float: right;"
          type="button"
          class="btn-close"
        ></button>
      </div>
    </transition>

    <div class="container-fluid px-5" style=" padding: 100px 100px 0px 0px;">
      <TrackTheProductDialogVue></TrackTheProductDialogVue> 
      <div class="row" >
        <div class="col-md-6" style="text-align: left;">
          <AddNewProductDialog></AddNewProductDialog>
        </div>
        <div class="dropdown col-md-6" style="text-align: right;">
          <div style="display: inline-block;"> 
          
            <button
                class="btn dropdown-toggle orderByButton"
                type="button"
                id="dropdownMenuButtonFilter"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
              <button @click="disableFilter" class="disableButton" v-if="filterDisableButtonState"><i class='bx bxs-x-circle' ></i></button>
                Filter by
              </button>
            
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButtonFilter">
                <li><a href="#" class="dropdown-item" :class="{ dropdownItemSelected : filterByState === 'tracked'}"  @click="filterBy('tracked')">Tracked</a></li>
                <li><a href="#" class="dropdown-item" :class="{ dropdownItemSelected : filterByState === 'untracked'}" @click="filterBy('untracked')">Untracked</a></li>
                <li><a href="#" class="dropdown-item" :class="{ dropdownItemSelected : filterByState === 'favorite'}" @click="filterBy('favorite')">Favorite</a></li>
              </ul>
          </div>
            
          <div style="display: inline-block;">
              <button
                class="btn dropdown-toggle orderByButton"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <button @click="disableOrder" class="disableButton" v-if="orderDisableButtonState" ><i class='bx bxs-x-circle' ></i></button>
                Order by
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><a href="#" class="dropdown-item" :class="{ dropdownItemSelected : orderByState === 'lowToHigh'}"  @click="sortBy('lowToHigh')"><b>Price</b>: Low to high</a></li>
                <li><a href="#" class="dropdown-item" :class="{ dropdownItemSelected : orderByState === 'highToLow'}" @click="sortBy('highToLow')"><b>Price</b>: High to low</a></li>
                <li><a href="#" class="dropdown-item" :class="{ dropdownItemSelected : orderByState === 'topRated'}" @click="sortBy('topRated')">Top rated</a></li>
              </ul> 
          </div>
         
        </div>    
      </div>

    </div>

      

      <!-- waiting notification development -->

      <!-- Edit the tracking settings ? (Modal) -->

      <div
        class="modal fade"
        id="exampleModal4"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Add New Tracking
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body ">
              <div class="mb-4" style="max-height: 600px;">
                <img :src="selectedProduct.image" alt="" srcset="" />
              </div>

              <div class="mt-2 mb-2" v-if="selectedProduct.rate != null">
                <i
                  class="fa fa-star rating-color"
                  style="color: orange;"
                  v-for="index in parseInt(selectedProduct.rate)"
                ></i>
                <i
                  class="fa fa-star"
                  style="margin-left: -4px;"
                  v-for="index in 5 - parseInt(selectedProduct.rate)"
                ></i>
              </div>

              <div style="color: #007600;">
                <span v-if="selectedProduct.stockState != null">{{
                  selectedProduct.stockState
                }}</span>
              </div>

              <div class="mb-2" style="font-size: larger; font-weight: bold;">
                {{
                  new Intl.NumberFormat("tr-TR", {
                    style: "currency",
                    currency: "TRY"
                  }).format(selectedProduct.currentPrice)
                }}
              </div>
              <div class="row mb-2">
                <h5>{{ selectedProduct.name }}</h5>
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
                      @change="setOptions()"
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
                      @change="setOptions()"
                      v-model="targetPrice"
                      min="1"
                      :max="selectedProduct.currentPrice - 1"
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
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                data-bs-dismiss="modal"
                type="button"
                class="btn btn-primary"
                style="background-color: #1c2431;"
                @click="
                  UpdateTrackedProductIntervalAndTargetPrice(
                    parseInt(selectedProduct.id)
                  )
                "
              >
                Edit the Tracking Settings
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Are you sure for delete ? (Modal) -->
      <div
        class="modal fade"
        id="exampleModal3"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header">
              <h5
                style="font-weight: 600;"
                class="modal-title py-2"
                id="exampleModalLabel"
              >
                Are you sure you for delete ?
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                xd
              ></button>
            </div>

            <div class="modal-body ">
              <div class="row">
                <div class="col-6 my-3">
                  <img
                    style="width: 60%;"
                    :src="selectedProduct.image"
                    alt=""
                  />
                </div>
                <div class="col-6 my-3">
                  <div class="row">
                    <h5>{{ selectedProduct.name }}</h5>
                  </div>
                  <div class="row">
                    <div class="price-delete-modal">
                      {{
                        new Intl.NumberFormat("tr-TR", {
                          style: "currency",
                          currency: "TRY"
                        }).format(selectedProduct.currentPrice)
                      }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-11 mx-auto">
                <div
                  class="alert alert-warning alert-dismissible fade show"
                  role="alert"
                >
                  <strong>Warning!</strong> When you delete the product, it will
                  also be deleted from the tracking list.
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
              <button
                data-bs-dismiss="modal"
                type="button"
                class="btn btn-danger"
                @click="DeleteTheProduct(selectedProduct.id)"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="row p-5">
        <ProductCard
          v-model="productList"
          v-for="product in filteredAndSortedList"
          :key="product.id"
        >
          <div class="card-sl">
            <div style="min-height: 500px;">
              <div class="card-image text-center">
                <i
                  v-if="product.isFavorite == true"
                  title="This product is favorite"
                  class="fa-solid fa-heart track-icon"
                ></i>
                <i
                  v-if="product.isTracking == true"
                  class="fa-solid fa-eye track-icon"
                  title="This product is tracking by price tracker"
                ></i>
                <i
                  v-if="product.isTracking == false"
                  class="fa-solid fa-eye-slash track-icon"
                  title="This product is not tracking by price tracker"
                ></i>
                <img :src="product.image" alt="" />
              </div>
              <a @click="changeFavoriteState(product.id)" class="card-action"
                ><i
                  v-if="product.isFavorite == false"
                  class="fa fa-heart-circle-plus"
                ></i
                ><i
                  v-if="product.isFavorite == true"
                  class="fa-solid fa-heart-circle-xmark"
                ></i
              ></a>
              <a
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal3"
                @click="HandleSelectedProduct(product)"
                class="delete-action"
              >
                <i class="fa-solid fa-trash-can"></i
              ></a>
              <div class="card-heading">
                <div class="mt-2 mb-2" v-if="product.rate != null">
                  <i
                    class="fa fa-star rating-color"
                    style="color: orange;"
                    v-for="index in parseInt(product.rate)"
                  ></i>
                  <i
                    class="fa fa-star"
                    style="margin-left: -4px;"
                    v-for="index in 5 - parseInt(product.rate)"
                  ></i>
                </div>
                <div style="color: #007600;">
                  <span v-if="product.stockState != null">{{
                    product.stockState
                  }}</span>
                </div>
                {{ product.name }}
              </div>
              <div class="card-text">
                {{
                  new Intl.NumberFormat("tr-TR", {
                    style: "currency",
                    currency: "TRY"
                  }).format(product.currentPrice)
                }}
              </div>
            </div>

            <button
              v-if="product.isTracking == true"
              type="button"
              class="card-button-track"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal4"
              @click="HandleSelectedProduct(product)"
            >
              Edit The Tracking Settings
            </button>
            <button
              v-if="product.isTracking == false"
              type="button"
              class=" card-button-track"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal2"
              @click="HandleSelectItem(product)"
            >
              Track The Product
            </button>
            <a :href="product.url" target="_blank" class="card-button-product"
              >Go to the product</a
            >
          </div>
        </ProductCard>
      </div>
    </div>
  
</template>

<script>
import ProductCard from "./ProductCard";
import axios from "axios";
import AddNewProductDialog from "./AddNewProductDialog";
import { eventBus } from "../main";
import TrackTheProductDialogVue from "./TrackTheProductDialog.vue";

export default {
  components: {
    ProductCard,
    AddNewProductDialog,
    TrackTheProductDialogVue
  },
  data() {
    return {
      productList: [],
      filteredAndSortedList : [],
      url: "",
      selectedProduct: {},
      dialogState: false,
      successNotification: false,
      warningNotification: false,
      errorNotification: false,
      successTrackedNotification: false,
      warningTrackedNotification: false,
      errorTrackedNotification: false,
      successDeleteNotification: false,
      successUpdateIntervalAndTargetPriceNotification: false,
      errorUpdateIntervalAndTargetPriceNotification: false,
      areYouSure: false,
      interval: 20,
      targetPrice: 1,
      productTrackingSettings: {
        productId: null,
        targetPrice: null,
        interval: null
      },
      orderByState : null,
      filterByState : null,
      orderDisableButtonState : false,
      filterDisableButtonState : false
    };
  },
  methods: {
    afterEnter() {
      setTimeout(this.closeTheAllNotifications, 3000);
    },

    GetAllProducts() {
      this.productList.splice(0, this.productList.length);
      axios
        .get("https://localhost:7176/api/Products/GetAllProducts")
        .then(response => {
          let data = response.data.data;
          data.forEach(element => {
            this.productList.push(element);
            this.filteredAndSortedList.push(element);  
            console.log(this.productList);
          });
        })
        .catch(e => console.log(e));
        
    },

    setOptions() {
      this.productTrackingSettings.targetPrice = parseFloat(this.targetPrice);
      this.productTrackingSettings.interval = parseInt(this.interval);
    },

    UpdateTrackedProductIntervalAndTargetPrice(id) {
      const config = { headers: { "Content-Type": "application/json" } };
      console.log(this.productTrackingSettings);
      axios
        .post(
          "https://localhost:7176/api/TrackedProducts/UpdateTrackedProductIntervalAndTargetPrice",
          this.productTrackingSettings,
          config
        )
        .then(response => {
          console.log(response);
          if (response.status === 200) {
            this.successUpdateIntervalAndTargetPriceNotification = true;
          }
          this.GetAllProducts();
          this.targetPrice = 1;
        })
        .catch(e => console.log(e));
    },

    DeleteTheProduct(id) {
      const config = { headers: { "Content-Type": "application/json" } };
      axios
        .post(
          "https://localhost:7176/api/Products/DeleteProductAsync",
          parseInt(id),
          config
        )
        .then(response => {
          if (response.status === 200) {
            this.successDeleteNotification = true;
          }
          this.GetAllProducts();
        })
        .catch(e => console.log(e));
    },

    HandleSelectItem(item) {
      eventBus.$emit("AddNewTrackedItem", item);
    },

    HandleSelectedProduct(item) {
      this.getTrackedProductSingle(item);
      this.selectedProduct = item;
      this.productTrackingSettings.productId = item.id;
      this.targetPrice = this.productTrackingSettings.targetPrice;
      this.interval = this.productTrackingSettings.interval;
      this.productTrackingSettings.targetPrice = parseFloat(this.targetPrice);
      this.productTrackingSettings.interval = parseInt(this.interval);

      /*
      this.productTrackingSettings.interval = parseInt(this.interval);
      this.productTrackingSettings.targetPrice = parseFloat(this.selectedProduct.currentPrice) - 1;
      */
    },

    getTrackedProductSingle(item) {
      const config = { headers: { "Content-Type": "application/json" } };
      axios
        .post(
          "https://localhost:7176/api/TrackedProducts/GetTrackedProductByProductIdAsync",
          parseInt(item.id),
          config
        )
        .then(response => {
          if (response.status === 200) {
            this.targetPrice = parseFloat(response.data.data.targetPrice);
            this.interval = parseInt(response.data.data.interval);
          }
        });
    },

    changeFavoriteState(id) {
      const config = { headers: { "Content-Type": "application/json" } };
      axios
        .put(
          "https://localhost:7176/api/Products/EditFavoriteStateAsync",
          parseInt(id),
          config
        )
        .then(response => {
          if (response.status === 200) {
            console.log("ürün favori olarak eklendi.");
          }
          this.GetAllProducts();
        });
    },

    closeTheAllNotifications() {
      this.successNotification = false;
      this.warningNotification = false;
      this.errorNotification = false;
      this.successTrackedNotification = false;
      this.warningTrackedNotification = false;
      this.errorTrackedNotification = false;
      this.successDeleteNotification = false;
      this.successUpdateIntervalAndTargetPriceNotification = false;
      this.errorUpdateIntervalAndTargetPriceNotification = false;
    },

    sortBy(value){
      if(value === "lowToHigh"){
        this.filteredAndSortedList = this.filteredAndSortedList.sort((a, b) => a.currentPrice - b.currentPrice);
        this.orderByState = "lowToHigh";
        this.orderDisableButtonState = true;
      }
      else if(value === "highToLow"){
        this.filteredAndSortedList = this.filteredAndSortedList.sort((a, b) => b.currentPrice - a.currentPrice);
        this.orderByState = "highToLow";
        this.orderDisableButtonState = true;
      }
      else if(value === "topRated"){
        this.filteredAndSortedList = this.filteredAndSortedList.sort((a, b) => b.rate - a.rate);
        this.orderByState = "topRated";
        this.orderDisableButtonState = true;
      }
    },

    filterBy(value){
      if(value === "tracked"){
        this.filteredAndSortedList = this.filteredAndSortedList.filter(product => product.isTracking);
        this.filterByState = "tracked";
        this.filterDisableButtonState = true;
      }
      else if (value === "untracked"){
        this.filteredAndSortedList = this.filteredAndSortedList.filter(product => !product.isTracking);
        this.filterByState = "untracked";
        this.filterDisableButtonState = true;
      }
      else if(value === "favorite"){
        this.filteredAndSortedList = this.filteredAndSortedList.filter(product => product.isFavorite);
        this.filterByState = "favorite";
        this.filterDisableButtonState = true;
      }
    },

    disableFilter(){
      this.filterDisableButtonState = false;
      this.filteredAndSortedList = this.productList;
      this.filterByState = null;
    },

    disableOrder(){
      this.orderDisableButtonState = false;
      this.filteredAndSortedList = this.productList;
      this.orderByState = null;
    },

    showTheNewProductAlert(item) {
      this.successNotification = item.successNotification;
      this.warningNotification = item.warningNotification;
      this.errorNotification = item.errorNotification;
    },

    showTheNewtrackedAlert(item) {
      this.successTrackedNotification = item.successTrackedNotification;
      this.warningTrackedNotification = item.warningTrackedNotification;
      this.errorTrackedNotification = item.errorTrackedNotification;
    }
  },

  created() {
    this.sortBy();
    eventBus.$on("notification", item => {
      this.showTheNewProductAlert(item);
    });

    eventBus.$on("notificationForNewTracking", item => {
      this.showTheNewtrackedAlert(item);
    });
    this.GetAllProducts();
  }
};
</script>

<style>
.notify-enter-active {
  animation: slide-in 0.3s ease-out forwards;
}

.notify-leave-active {
  animation: slide-out 0.3s ease-out forwards;
}

@keyframes slide-in {
  from {
    transform: translateX(200px);
  }
  to {
    transform: translateX(0px);
  }
}

@keyframes slide-out {
  from {
    transform: translateX(0px);
  }
  to {
    transform: translateX(550px);
  }
}
</style>
