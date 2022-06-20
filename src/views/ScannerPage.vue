<template>
<ion-page><QRCodeScanner></QRCodeScanner></ion-page>
  
</template>

<script lang="ts">
import { IonPage, useIonRouter } from '@ionic/vue';
import { defineComponent, onMounted } from 'vue';
import { states } from '../states'
import QRCodeScanner from '../components/QRCodeScanner.vue'

export default defineComponent({
  name: 'HomePage',
  components: {
    IonPage,
    QRCodeScanner,
  },
  setup() {
    const sharedStates = states;
    const router = useIonRouter();
    const goBack = () => {
      sharedStates.barcodeResults = ["1","2","3"];
      router.back();
    }
    onMounted(() => {
      console.log(sharedStates.QRCodeOnly);
      console.log(sharedStates.continuousScan);
      console.log(sharedStates);
      setTimeout(goBack,2000);
    });
  },
});
</script>

<style scoped>
</style>
