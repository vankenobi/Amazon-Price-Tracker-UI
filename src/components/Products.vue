<template>
  <div>
    
     <transition name="notify">
      <div v-show="successNotification" class="alert alert-success notification">
        <strong>Success!</strong> New product added.
        <button style="float: right;" type="button" class="btn-close" data-bs-dismiss="alert"></button>
      </div>
    </transition>

    <transition name="notify">
      <div v-show="warningNotification" class="alert alert-warning notification">
        <strong>Warning!</strong> Product already exists.
        <button style="float: right;" type="button" class="btn-close" data-bs-dismiss="alert"></button>
      </div>
    </transition>
    
    <transition name="notify">
      <div v-show="errorNotification" class="alert alert-danger notification">
        <strong>Error!</strong> Error adding product.
        <button style="float: right;" type="button" class="btn-close" data-bs-dismiss="alert"></button>
      </div>
    </transition>
      
    <transition name="notify">
      <div v-show="successTrackedNotification" class="alert alert-success notification">
        <strong>Success!</strong> The product is being tracked successfully.
        <button style="float: right;" type="button" class="btn-close" data-bs-dismiss="alert"></button>
      </div>  
    </transition>
    
    <transition name="notify">
      <div v-show="warningTrackedNotification" class="alert alert-warning notification">
        <strong>Warning!</strong> The product is already being tracked.
        <button style="float: right;" type="button" class="btn-close" data-bs-dismiss="alert"></button>
      </div>
    </transition>
    
    <transition name="notify">
      <div v-show="errorTrackedNotification" class="alert alert-danger notification">
        <strong>Error!</strong> The product cannot be tracked.
        <button style="float: right;" type="button" class="btn-close" data-bs-dismiss="alert"></button>
      </div>
    </transition>

    <div
    class="container-fluid"
    style=" margin-bottom: 150px; padding: 100px;">

    <TrackTheProductDialogVue></TrackTheProductDialogVue>
    <AddNewProductDialog></AddNewProductDialog>
    
    <div class="row">
      <ProductCard v-model="productList" v-for="product in productList" :key="product.id">
        <div class="card-sl">
          <div style="min-height: 500px;">
            <div class="card-image text-center">
              <i v-if="product.isTracking == true" class="fa-solid fa-eye track-icon" title="This product is tracking by price tracker"></i>
              <img :src="product.image" alt="" />
            </div>
            <a class="card-action" href="#"><i class="fa fa-heart"></i></a>
            <a @click="DeleteTheProduct(product.id)" class="delete-action"><i class="fa-solid fa-trash-can"></i></a>
            <div class="card-heading" >
            <div class="mt-2 mb-2" v-if="product.rate != null">
              <i class="fa fa-star rating-color" style="color: orange;" v-for="index in parseInt(product.rate)"></i>
              <i class="fa fa-star" style="margin-left: -4px;" v-for="index in (5 - parseInt(product.rate))"></i>
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
            type="button"
            class=" card-button-track"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal2"
            @click="HandleSelectItem(product)"
          >
            Track The Product
          </button>
          <a :href="product.url" class="card-button-product"
            >Go to the product</a
          >
        </div>
      </ProductCard>
    </div>
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
      url: "",
      dialogState: false,
      successNotification : false,
      warningNotification : false,
      errorNotification : false,
      successTrackedNotification : false,
      warningTrackedNotification : false,
      errorTrackedNotification : false,
    };
  },
  methods: {
    
    GetAllProducts() {
      this.productList.splice(0, this.productList.length);
      axios
        .get("https://localhost:7176/api/Products/GetAllProducts")
        .then(response => {
          let data = response.data.data;
          data.forEach(element => {
            this.productList.push(element);
          });
        })
        .catch(e => console.log(e));
    },

    DeleteTheProduct(id){
      const config = { headers: { "Content-Type": "application/json" } };
      axios
        .post(
          "https://localhost:7176/api/Products/DeleteProductAsync",
          parseInt(id),
          config
        )
        .then(response => {
          console.log(response);
          this.GetAllProducts();
        })
        .catch(e => console.log(e));
        
    },

    HandleSelectItem(item){
      eventBus.$emit("AddNewTrackedItem",item);
    },

    closeTheAllNotifications (){
      this.successNotification = false;
      this.warningNotification = false;
      this.errorNotification = false;
      this.successTrackedNotification = false;
      this.warningTrackedNotification = false;
      this.errorTrackedNotification = false;
    },

    showTheNewProductAlert(item){
      this.successNotification = item.successNotification;;
      this.warningNotification = item.warningNotification;
      this.errorNotification = item.errorNotification;
    },

    showTheNewtrackedAlert(item){
      this.successTrackedNotification = item.successTrackedNotification;;
      this.warningTrackedNotification = item.warningTrackedNotification;
      this.errorTrackedNotification = item.errorTrackedNotification;

    },
  
  },

  created() {
    eventBus.$on("notification",(item) => {
      this.showTheNewProductAlert(item);
    });

    eventBus.$on("notificationForNewTracking",(item) => {
      this.showTheNewtrackedAlert(item);
    });
    this.GetAllProducts();
  }
};
</script>

<style>


  .notify-enter-active {
      animation: slide-in 0.5s ease-out forwards;
  }


  @keyframes slide-in {
    from {
      transform: translateX(200px);
    }
    to {
      transform: translateX(0px);
    }
  }


</style>