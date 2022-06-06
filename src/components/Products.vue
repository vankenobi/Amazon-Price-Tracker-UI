<template>
  <div
    class="container-fluid"
    style="margin-top:50px; margin-bottom: 150px; padding: 100px;">

    <div v-show="successNotification" class="alert alert-success">
        <strong>Success!</strong> New product added.
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>
    <div v-show="warningNotification" class="alert alert-warning">
        <strong>Warning!</strong> Product already exists.
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>
    <div v-show="errorNotification" class="alert alert-danger">
        <strong>Error!</strong> Error adding product.
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>
    <div v-show="successTrackedNotification" class="alert alert-success">
        <strong>Success!</strong> The product is being tracked successfully.
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>
    <div v-show="warningTrackedNotification" class="alert alert-warning">
        <strong>Warning!</strong> The product is already being tracked.
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>
    <div v-show="errorTrackedNotification" class="alert alert-danger">
        <strong>Error!</strong> The product cannot be tracked.
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>
    
    <!-- alert -->
    
    <TrackTheProductDialogVue></TrackTheProductDialogVue>
    <AddNewProductDialog></AddNewProductDialog>
    
    <div class="row">
      <ProductCard v-for="product in productList" :key="product.id">
        <div class="card-sl">
          <div style="min-height: 500px;">
            <div class="card-image text-center">
              <img :src="product.image" alt="" />
            </div>
            <a class="card-action" href="#"><i class="fa fa-heart"></i></a>
            <div class="card-heading">
              {{ product.name }}
            </div>
            <div class="card-text">
              {{ product.description }}
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
    AddNewProduct() {
      console.log(this.url);
      const config = { headers: { "Content-Type": "application/json" } };
      axios
        .post(
          "https://localhost:7176/api/Products/AddNewProductWithUrl",
          this.url,
          config
        )
        .then(response => {
          console.log(response);
        })
        .catch(e => console.log(e));
      this.GetAllProducts();
    },

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
