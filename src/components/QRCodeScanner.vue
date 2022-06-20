<template>
  <div>Initializing...</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted } from 'vue';

export default defineComponent({
  name: 'QRCodeScanner',
  setup(){
    onMounted(() => {
      console.log("QRCodeScanner mounted");
    });
    onBeforeUnmount(() => {
     console.log("QRCodeScanner unmount");
    });
  },
});

</script>

<style scoped>

</style>
