<template>
  <div >
    <!-- Button trigger modal -->
    <button
    type="button"
    class="btn btn-success newProductButton col-md-2"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
    style="font-weight: 400; display: inline;"
    >
    Add New Product <i style="vertical-align: middle;" class="bx bx-plus-circle"></i>
    </button>
    <pulse-loader v-if="loading" style="display: inline; float: right;"   :color="color" :size="size"></pulse-loader>
    

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
              <small v-if="invalid" class="form-text text-muted">The url of product is required.</small>
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
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

export default {
  components : {
    PulseLoader
  },

  data() {
    return {
      url: null,
      loading : false,
    };
  },
  methods: {
    AddNewProduct() {
      this.loading = true;
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
            this.loading = false;
          }

          else if (response.data.responseCode === 400) {
            eventBus.$emit("notification",{ errorNotification: false,
                                            warningNotification: true,
                                            successNotification: false });
            this.loading = false;
          }

          else{
            eventBus.$emit("notification",{ errorNotification: true,
                                            warningNotification: false,
                                            successNotification: false });
            this.loading = false;
          }
        })
        .catch(e => console.log(e));
    }
  }
};
</script>


