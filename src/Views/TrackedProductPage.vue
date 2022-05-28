<template>
   <div>
       <div class="container mt-5" >
        <div class="row">
            <div class="text-center">
                <img :src="trackedProductItem.image" alt=""> 
            </div>
        </div>
        <div class="row mt-3">
            <div class="text-center" style="color: rgb(9, 112, 9);">
                {{ trackedProductItem.stockState }}
            </div>
        </div>

        <div class="row">
            <div class="ratings text-center" >
                <i class="fa fa-star rating-color" style="color: orange;" v-for="index in parseInt(trackedProductItem.rate)"></i>
                <i class="fa fa-star" v-for="index in (5 - parseInt(trackedProductItem.rate))"></i>
            </div>
        </div>
        
        <div class="row">
            <div style="font-size: 3em;" class="text-center">
                <p>{{ trackedProductItem.currentPrice }} ₺</p>
            </div>
        </div>

        <div class="row mt-1 text-center">
            <div style="font-size: 2em;">
                <p>{{ trackedProductItem.productName }}</p>
            </div>
        </div>
        
        <div class="row">
            <div id="chart">
                <vueComponent type="area" height="350" :options="chartOptions" :series="series"></vueComponent>
            </div>
        </div>

        <div id="accordion">
            <div class="card">
                <div class="card-header" id="headingOne">
                <h5 class="mb-0">
                    <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Collapsible Group Item #1
                    </button>
                </h5>
                </div>

                <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                <div class="card-body">
                    <ul>
                        <li>Cras justo odio</li>
                        <li>Dapibus ac facilisis in</li>
                        <li>Morbi leo risus</li>
                        <li>Porta ac consectetur ac</li>
                        <li>Vestibulum at eros</li>
                    </ul>
                </div>
                </div>
            </div>
        </div>

        <div class="row mt-5">
            <div class="container col-sm-6">
                <p style="font-size: x-large;">Ürün Özellikleri</p>
                <ul v-for="item in trackedProductItem.technicalDetails">
                    <li>{{ item }}</li>
                </ul>
            </div>
        </div>

        {{ trackedProductItem.priceHistory }}

    </div>
    
    
   </div>
</template>

<script>
import axios from 'axios';
import { eventBus } from '../main';
import VueApexCharts from 'vue-apexcharts';

export default {
    components : {
        vueComponent : VueApexCharts
    },
    data() {
        return {
            trackedProductItem : {},
            
            series: [{
            name: 'series1',
            data: [31, 40, 28, 51, 42, 109, 100]
            }, {
            name: 'series2',
            data: [11, 32, 45, 32, 34, 52, 41]
            }],
            chartOptions: {
            chart: {
              height: 350,
              type: 'area'
            },
            dataLabels: {
              enabled: false
            },
            stroke: {
              curve: 'smooth'
            },
            xaxis: {
              type: 'datetime',
              categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
            },
            tooltip: {
              x: {
                format: 'dd/MM/yy HH:mm'
              },
            },
          },
          
      }
    },
     created() {
        eventBus.$on("item",(selectedTrackedItem) => {
        this.trackedProductItem = selectedTrackedItem });
        console.log(this.trackedProductItem);
     },
}
</script>

<style>

</style>