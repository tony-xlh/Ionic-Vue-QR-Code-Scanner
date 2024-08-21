<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>QR Code Scanner</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content>
      <ion-button expand="full" v-on:click="gotoScannerPage">{{licenseInitialized ? "Scan Barcodes" : "Initializing"}}</ion-button>
      <ion-list>
        <ion-item>
          <ion-label>Continuous Scan</ion-label>
          <ion-checkbox slot="end" v-model="sharedStates.continuousScan"></ion-checkbox>
        </ion-item>
        <ion-list-header v-if="sharedStates.barcodeResults.length>0">
          <ion-label>Results:</ion-label>
        </ion-list-header>
        <ion-item v-bind:key="'result'+index" v-for="(result,index) in sharedStates.barcodeResults">
          <ion-label>{{result.barcodeFormat+": "+result.barcodeText}}</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonList, IonLabel, IonListHeader, IonCheckbox, IonItem, useIonRouter } from '@ionic/vue';
import { defineComponent, onMounted, ref } from 'vue';
import { states } from '../states'
import { DBR } from 'capacitor-plugin-dynamsoft-barcode-reader';

export default defineComponent({
  name: 'HomePage',
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButton,
    IonList,
    IonListHeader,
    IonCheckbox,
    IonLabel,
    IonItem
  },

  setup() {
    const licenseInitialized = ref(false);
    const router = useIonRouter();
    const sharedStates = states;

    const gotoScannerPage = () => {
      if (licenseInitialized.value === true) {
        router.push('/scanner');
      }
    }

    onMounted(async ()=>{
      if (states.licenseInitialized === false) {
        try {
          await DBR.initLicense({license:"DLS2eyJoYW5kc2hha2VDb2RlIjoiMjAwMDAxLTE2NDk4Mjk3OTI2MzUiLCJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSIsInNlc3Npb25QYXNzd29yZCI6IndTcGR6Vm05WDJrcEQ5YUoifQ=="});
        } catch (error) {
          alert("License invalid");
          return;
        }
      }
      licenseInitialized.value = true;
    })

    return { 
      sharedStates,
      gotoScannerPage,
      licenseInitialized
    };
  },

});

</script>

<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  
  color: #8c8c8c;
  
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
