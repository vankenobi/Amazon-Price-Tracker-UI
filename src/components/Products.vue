<template>
    <div class="container-fluid" style="margin-top:50px; margin-bottom: 150px; padding: 100px;">

        <div>
        <div class="row mb-3">
            <div class="col-md-4">
                <input v-model="url" type="text" class="form-control"  placeholder="Enter the Url">
            </div>
            <div class="col-md-1">
                <button @click="AddNewProduct()" class="btn btn-primary">Add New Product</button>
            </div>
        </div>

    </div>
        <div class="row">
            <ProductCard  v-for="product in productList" :key="product.id">
                    <div class="card-sl">
                    <div class="card-image text-center"><img :src="product.image" alt=""></div>
                    <a class="card-action" href="#"><i class='fa fa-heart' ></i></a>
                    <div class="card-heading">
                        {{ product.name }}
                    </div>
                    <div class="card-text">
                        {{ product.description }}
                    </div>
                    <div class="card-text">
                        {{ product.currentPrice }} ₺
                    </div>
                    <a :href="product.url" class="card-button">Purchase</a>
                    </div>
            </ProductCard>
        </div>
      </div>
</template>

<script>
import ProductCard from './ProductCard';
import axios from 'axios';
import AddNewProductDialog from './AddNewProductDialog';
export default {
    components : {
        ProductCard,
        AddNewProductDialog
    },
    data() {
        return {
            productList : [],
            url : "",
            dialogState : false
        }
    },
    methods: {

        AddNewProduct() {
            console.log(this.url);
            const config = { headers: {'Content-Type': 'application/json'} };
            axios.post("https://localhost:7176/api/Products/AddNewProductWithUrl",this.url,config)
            .then(response => {
                console.log(response);
            })
            .catch(e => console.log(e));
            this.GetAllProducts();
        },

        GetAllProducts(){
            this.productList.splice(0, this.productList.length);
            axios.get('https://localhost:7176/api/Products/GetAllProducts')
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
    
}
</script>
