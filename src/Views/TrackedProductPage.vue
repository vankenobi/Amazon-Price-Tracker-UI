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
                <p>{{ new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(trackedProductItem.currentPrice)  }}</p>
            </div>
        </div>

        <div class="row mt-1 text-center">
            <div style="font-size: 2em;">
                <p>{{ trackedProductItem.productName }}</p>
            </div>
        </div>

        <div class="row mt-3">
                <ul class="list-group mx-auto ">
                    <li v-for="item in trackedProductItem.technicalDetails" class="list-group-item p-3" style="background-color: #f8efed; border-color: #242f41;"> {{ item }} </li>
                </ul>     
        </div>

        <div class="row mt-3">
            <div id="chart">
                <vueComponent type="area" height="500" :options="chartOptions" :series="series"></vueComponent>
            </div>
        </div>
        
        
        </div>
            
    </div>
</template>

<script>
import axios from 'axios';
import { eventBus } from '../main';
import VueApexCharts from 'vue-apexcharts';
import ProductTechnicalDetails from '../components/ProductTechnicalDetails';

var moment = require('moment');


export default {
    components : {
        vueComponent : VueApexCharts,
    },
    data() {
        return {
            moment:moment,

            trackedProductItem : {},
            
            series: [{
            name: 'Price',
            data: []
            },],
            chartOptions: {
            chart: {
              height: 350,
              type: 'area'
            },
            dataLabels: {
              enabled: true
            },
            stroke: {
              curve: 'stepline',

            },
            xaxis: {
              type: 'datetime',
              categories: [],
              labels:  {
                
              }
            },
            annotations: {
            yaxis: [
                {
                y: null,
                borderColor: 'red',
                label: {
                    borderColor: 'red',
                    style: {
                    color: '#fff',
                    background: 'red'
                    },
                    text: null
                }
                }
            ]
            }
            
          },
          
      }
    },
     created() {
        eventBus.$on("item",(selectedTrackedItem) => {
        this.trackedProductItem = selectedTrackedItem
        this.priceHistoryParser(selectedTrackedItem.priceHistory)
        
        this.chartOptions.annotations.yaxis[0].y = this.trackedProductItem.targetPrice
        this.chartOptions.annotations.yaxis[0].label.text = 'Target Price: ' + this.trackedProductItem.targetPrice.toString()
        });
        
     },
     methods: {
         priceHistoryParser(priceHistory){  
             priceHistory.forEach(element => {
                var date = element.split('-')[0]; // get date in string

                this.chartOptions.xaxis.categories.push(moment(date,'DD.MM.YYYY hh:mm:ss').toISOString());
                this.series[0].data.push(element.split('-')[1].replaceAll('.','/'));
             });

         }
     },
} 
</script>

<style>

</style>