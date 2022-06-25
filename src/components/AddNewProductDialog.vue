<template>
  <div >

    <!-- Button trigger modal -->
    <button
      type="button"
      class="btn btn-success newProductButton"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
      style="font-weight: 400;"
    >
      Add New Product <i style="vertical-align: middle;" class="bx bx-plus-circle"></i>
    </button>
    
    <!-- Modal -->

    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content container">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Add New Product</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body row">
            <div class="col-md-12">
              <input
                v-model="url"
                onfocus="url"
                type="url"
                class="form-control col-md-4"
                placeholder="Enter the Url"
              />
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
              @click="AddNewProduct()"
              data-bs-dismiss="modal"
              class="btn btn-success"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { eventBus } from "../main";
import ProductsVue from "./Products.vue";
export default {
  data() {
    return {
      url: null
    };
  },
  methods: {
    AddNewProduct() {
      console.log(this.url);
      const config = { headers: { "Content-Type": "application/json" } };
      axios
        .post(
          "https://localhost:7176/api/Products/AddNewProductWithUrlAsync",
          this.url,
          config
        )
        .then(response => {
          if (response.data.responseCode === 200) {
            eventBus.$emit("notification",{ errorNotification: false,
                                            warningNotification: false,
                                            successNotification: true });
          }

          else if (response.data.responseCode === 400) {
            eventBus.$emit("notification",{ errorNotification: false,
                                            warningNotification: true,
                                            successNotification: false });
          }

          else{
            eventBus.$emit("notification",{ errorNotification: true,
                                            warningNotification: false,
                                            successNotification: false });
          }
        })
        .catch(e => console.log(e));
    }
  }
};
</script>

<style lang=""></style>
