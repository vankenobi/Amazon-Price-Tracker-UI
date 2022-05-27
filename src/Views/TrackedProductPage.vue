<template>
    <div class="bitcoin-price">
    <svg style="width:0; height:0; position:absolute;" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="btcFill" x1="1" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#f69119"></stop>
          <stop offset="100%" stop-color="#ffffff"></stop>
        </linearGradient>
      </defs>
    </svg>
    <trend-chart v-if="dataset.length" :datasets="[{data: dataset, fill: true, className: 'curve-btc'}]" :labels="labels" :min="0" :grid="grid" />
  </div>
</template>
<script>
export default {
    
}
</script>
<style>
    
</style>