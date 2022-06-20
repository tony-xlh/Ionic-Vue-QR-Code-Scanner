<template>
<ion-page>
  <QRCodeScanner 
    license="DLS2eyJoYW5kc2hha2VDb2RlIjoiMjAwMDAxLTE2NDk4Mjk3OTI2MzUiLCJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSIsInNlc3Npb25QYXNzd29yZCI6IndTcGR6Vm05WDJrcEQ5YUoifQ=="
    @onScanned="onScanned"
  ></QRCodeScanner>
</ion-page>
  
</template>

<script lang="ts">
import { IonPage, useIonRouter } from '@ionic/vue';
import { defineComponent, onMounted, ref } from 'vue';
import { states } from '../states'
import QRCodeScanner from '../components/QRCodeScanner.vue'
import { ScanResult } from "capacitor-plugin-dynamsoft-barcode-reader";

export default defineComponent({
  name: 'HomePage',
  components: {
    IonPage,
    QRCodeScanner,
  },
  setup() {
    const sharedStates = states;
    const router = useIonRouter();
    let scanned = false;

    const onScanned = (result:ScanResult) => {
      console.log("onScanned");
      console.log(result);
      if (result.results.length>0 && scanned === false) {
        scanned = true;
        sharedStates.barcodeResults = result.results;
        router.back();
      }
    }
    onMounted(() => {
      console.log(sharedStates.QRCodeOnly);
      console.log(sharedStates.continuousScan);
      console.log(sharedStates);
      //setTimeout(goBack,2000);
    });
    return {onScanned};
  },
});
</script>

<style scoped>
</style>
