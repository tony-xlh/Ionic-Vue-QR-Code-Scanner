<template>
  <div>Initializing...</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'QRCodeScanner',

  mounted(){
    console.log("QRCodeScanner mounted");
  },
});

</script>

<style scoped>

</style>
