<template>
    <div>
        <AddNewProductDialog v-if="true"></AddNewProductDialog>
    </div>
</template>
<script>
import AddNewProductDialog from './AddNewProductDialog';
export default {
    components : {
        AddNewProductDialog
    }
}
</script>
