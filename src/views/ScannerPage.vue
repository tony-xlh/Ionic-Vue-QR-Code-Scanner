<template>

<ion-page>


    <QRCodeScanner 
      license="DLS2eyJoYW5kc2hha2VDb2RlIjoiMjAwMDAxLTE2NDk4Mjk3OTI2MzUiLCJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSIsInNlc3Npb25QYXNzd29yZCI6IndTcGR6Vm05WDJrcEQ5YUoifQ=="
      :torchOn="torchOn"
      :runtimeSettings="runtimeSettings"
      @onScanned="onScanned"
    ></QRCodeScanner>
    <ion-fab vertical="bottom" horizontal="start" slot="fixed">
      <ion-fab-button>
        <ion-icon name="ellipsis-horizontal-outline"></ion-icon>
      </ion-fab-button>
      <ion-fab-list side="top">
        <ion-fab-button @click="toggleFlash">
          <ion-icon name="flashlight-outline"></ion-icon>
        </ion-fab-button>
        <ion-fab-button @click="close">
          <ion-icon name="close-outline"></ion-icon>
        </ion-fab-button>
      </ion-fab-list>
    </ion-fab>

</ion-page>
  
</template>

<script lang="ts">
import { IonPage, IonIcon, IonFab,IonFabButton,IonFabList, useIonRouter } from '@ionic/vue';
import { defineComponent, onMounted, ref } from 'vue';
import { states } from '../states'
import QRCodeScanner from '../components/QRCodeScanner.vue'
import { ScanResult } from "capacitor-plugin-dynamsoft-barcode-reader";
import { addIcons } from 'ionicons';
import { closeOutline, ellipsisHorizontalOutline, flashlightOutline } from 'ionicons/icons';

export default defineComponent({
  name: 'HomePage',
  components: {
    IonPage,
    IonIcon,
    IonFab,
    IonFabList,
    IonFabButton,
    QRCodeScanner,
  },
  setup() {
    addIcons({
      'ellipsis-horizontal-outline': ellipsisHorizontalOutline,
      'flashlight-outline': flashlightOutline,
      'close-outline': closeOutline,
    });
    const torchOn = ref(false);
    const sharedStates = states;
    const runtimeSettings = ref('');
    if (sharedStates.QRCodeOnly) {
      runtimeSettings.value = "{\"ImageParameter\":{\"BarcodeFormatIds\":[\"BF_QR_CODE\"],\"Description\":\"\",\"Name\":\"Settings\"},\"Version\":\"3.0\"}";
    }else{
      runtimeSettings.value = "{\"ImageParameter\":{\"BarcodeFormatIds\":[\"BF_ALL\"],\"Description\":\"\",\"Name\":\"Settings\"},\"Version\":\"3.0\"}";
    }
    
    const router = useIonRouter();
    let scanned = false;

    const onScanned = (result:ScanResult) => {
      console.log("onScanned");
      console.log(result);
      if (result.results.length>0 && scanned === false && sharedStates.continuousScan === false) {
        scanned = true;
        sharedStates.barcodeResults = result.results;
        router.back();
      }
    }

    const toggleFlash = () => {
      torchOn.value = !torchOn.value;
      console.log("toggleFlash");
      console.log(torchOn.value);
    }

    const close = () => {
      router.back();
    }

    onMounted(() => {
      console.log(sharedStates.QRCodeOnly);
      console.log(sharedStates.continuousScan);
      console.log(sharedStates);
      //setTimeout(goBack,2000);
    });
    return {
      torchOn,
      toggleFlash,
      close,
      runtimeSettings,
      onScanned
    };
  },
});
</script>

<style scoped>
</style>
