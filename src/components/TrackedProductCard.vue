<template>
    <div class="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-4 col-xxxl-4 my-3 ">
        <slot></slot>
    </div>
</template>
<script>
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import Products from '../components/Products';

export default {
    components: {
        SideBar,
        Header,
        Products
  }
}
</script>
