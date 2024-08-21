<template>
  <ion-page id="scannerPage">
    <QRCodeScanner 
      :torchOn="torchOn"
      @onScanned="onScanned"
      @onPlayed="onPlayed"
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
    <svg
      :viewBox="viewBox"
      preserveAspectRatio="xMidYMid slice"
      class="overlay"
      v-if="sharedStates.continuousScan"
    >
      <polygon v-bind:key="'polygon'+index" v-for="(barcodeResult,index) in barcodeResults"
        :points="getPointsData(barcodeResult)"
        class="barcode-polygon"
      />
      <text v-bind:key="'text'+index" v-for="(barcodeResult,index) in barcodeResults"
        :x="barcodeResult.x1"
        :y="barcodeResult.y1"
        fill="red"
        font-size="25"
      >{{barcodeResult.barcodeText}}</text>
    </svg>
  </ion-page>
</template>
  
  <script lang="ts">
  import { IonPage, IonIcon, IonFab,IonFabButton,IonFabList, useIonRouter } from '@ionic/vue';
  import { defineComponent, onMounted, ref } from 'vue';
  import { states } from '../states'
  import QRCodeScanner from '../components/QRCodeScanner.vue'
  import { TextResult } from "capacitor-plugin-dynamsoft-barcode-reader";
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
      const viewBox = ref("0 0 1280 720");
      const barcodeResults = ref([] as TextResult[]);
      const sharedStates = states;
      
      const router = useIonRouter();
      let scanned = false;
  
      const onScanned = (results:TextResult[]) => {
        console.log("onScanned");
        if (results.length>0 && scanned === false && sharedStates.continuousScan === false) {
          scanned = true;
          sharedStates.barcodeResults = results;
          router.back();
        }else{
          barcodeResults.value = results;
        }
      }
  
      const onPlayed = (result:{orientation:"LANDSCAPE"|"PORTRAIT",resolution:string}) => {
        console.log(result);
        const width = result.resolution.split("x")[0];
        const height = result.resolution.split("x")[1];
        let frameWidth = parseInt(width);
        let frameHeight = parseInt(height);
        if (result.orientation === "PORTRAIT") {
          viewBox.value = "0 0 " + frameHeight + " " + frameWidth;
        }else{
          viewBox.value = "0 0 " + frameWidth  + " " + frameHeight;
        }
      }
   
      const getPointsData = (tr:TextResult) => {
        let pointsData = tr.x1 + "," + tr.y1 + " ";
        pointsData = pointsData + tr.x2+ "," + tr.y2 + " ";
        pointsData = pointsData + tr.x3+ "," + tr.y3 + " ";
        pointsData = pointsData + tr.x4+ "," + tr.y4;
        return pointsData;
      }
  
      const toggleFlash = () => {
        torchOn.value = !torchOn.value;
      }
  
      const close = () => {
        router.back();
      }
  
      onMounted(() => {
        console.log(sharedStates.continuousScan);
        console.log(sharedStates);
      });
      return {
        torchOn,
        toggleFlash,
        close,
        sharedStates,
        viewBox,
        barcodeResults,
        getPointsData,
        onScanned,
        onPlayed
      };
    },
  });
  </script>
  
  <style scoped>
  #scannerPage {
    background: transparent;
  }
  .barcode-polygon {
    fill:rgba(85,240,40,0.5);
    stroke:green;
    stroke-width:1;
  }
  .overlay {
     top: 0;
     left: 0;
     position: absolute;
     width: 100%;
     height: 100%;
     z-index: 998;
   }
  
  </style>