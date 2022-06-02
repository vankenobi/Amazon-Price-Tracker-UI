<template>
  <div
    class="container-fluid"
    style="margin-top:50px; margin-bottom: 150px; padding: 100px;">

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
          <a :href="product.url" class="card-button-track">Track the product</a>
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

export default {
  components: {
    ProductCard,
    AddNewProductDialog
  },
  data() {
    return {
      productList: [],
      url: "",
      dialogState: false
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
    }
  },

  created() {
    this.GetAllProducts();
  }
};
</script>
