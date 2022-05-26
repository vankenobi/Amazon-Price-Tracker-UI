<template>

    <div class="container-fluid" style="margin-top:50px; margin-bottom: 150px; padding: 100px;">
    <div>
        <div class="form-group col-md-6">
        <input v-model="url" type="url" class="form-control"  placeholder="Enter the Url">
        <button @click="AddNewProduct()" class="btn btn-primary col-md-4">Add New Product</button>
        </div>
    </div>
        <div class="row">
            <Product  v-for="product in productList">
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
            </Product>
        </div>
      </div>
</template>

<script>
import Product from './Product';
import axios from 'axios';
import AddNewProductDialog from './AddNewProductDialog';
export default {
    components : {
        Product,
        AddNewProductDialog
    },
    data() {
        return {
            productList : [],
            url : ""
        }
    },
    methods: {
        AddNewProduct() {
            axios.put("https://localhost:7176/api/Products/AddNewProductWithUrl",this.data)
            .then(response => {
                console.log(response);
            })
            .catch(e => console.log(e));
        }
    },
    created() {
        axios.get('https://localhost:7176/api/Products/GetAllProducts')
        .then(response => {
             let data = response.data.data;
             data.forEach(element => {
                 this.productList.push(element);
             });
        })
        .catch(e => console.log(e))
    },
}
</script>
