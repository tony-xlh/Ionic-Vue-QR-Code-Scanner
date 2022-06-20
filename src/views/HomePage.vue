<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>QR Code Scanner</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content>
      <ion-button expand="full" v-on:click="gotoScannerPage">Scan Barcodes</ion-button>
      <ion-list>
        <ion-item>
          <ion-label>Continuous Scan</ion-label>
          <ion-checkbox slot="end" v-model="sharedStates.continuousScan"></ion-checkbox>
        </ion-item>
        <ion-item>
          <ion-label>Scan QR Codes Only</ion-label>
          <ion-checkbox slot="end" v-model="sharedStates.QRCodeOnly"></ion-checkbox>
        </ion-item>
        <ion-item v-bind:key="'result'+index" v-for="(result,index) in sharedStates.barcodeResults">
          <ion-label>{{result}}</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonList, IonLabel, IonCheckbox, IonItem, useIonRouter } from '@ionic/vue';
import { defineComponent } from 'vue';
import { states } from '../states'

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
    IonCheckbox,
    IonLabel,
    IonItem
  },

  setup() {
    const router = useIonRouter();
    const sharedStates = states;

    const gotoScannerPage = () => {
      router.push('/scanner');
    }

    return { 
      sharedStates,
      gotoScannerPage
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
