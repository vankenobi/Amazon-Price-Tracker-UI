<template>
    <div class="l-navbar" id="nav-bar">
        <nav class="nav">
            <div>
               <a href="#" class="nav_logo"><img class="logo" src="../assets/logo.png" alt="" srcset=""></a>
                <div class="nav_list"> 
                <router-link to="/"> <a class="nav_link active"> <i class='bx bx-basket nav_icon'></i><span class="nav_name">Products</span></a>  </router-link>
                <router-link to="/trackedproducts"><a class="nav_link"> <i class='bx bx-timer nav_icon' ></i> <span class="nav_name">Tracked Products</span> </a></router-link> 
                <router-link to="/mail"><a class="nav_link"> <i class='bx bx-mail-send nav_icon' ></i> <span class="nav_name">Mail</span> </a> </router-link>
                <router-link to="/Stats"><a class="nav_link"> <i class='bx bx-line-chart nav_icon'></i> <span class="nav_name">Stats</span> </a></router-link>
                </div>
            </div>
        </nav>
    </div>
</template>
<script>
export default {
    
}
</script>

<style>
    .logo {
        width: 25%; 
        padding: 0.5rem;
    }
</style>