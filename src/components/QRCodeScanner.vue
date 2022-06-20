<template>
  <div>Initializing...</div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted } from 'vue';
import { DBR, Options, ScanResult } from "capacitor-plugin-dynamsoft-barcode-reader";
import { existsTypeAnnotation } from '@babel/types';


const props = defineProps(['license','dceLicense']);
const emit = defineEmits(['onScanned']);

onMounted(async () => {
  console.log(props);
  let options:Options = {};
  if (props.license) {
    options.license = props.license;
  }
  if (props.dceLicense) {
    options.dceLicense = props.dceLicense;
  }
  let result = await DBR.initialize(options); // To use your license: DBR.initialize({license: <your license>})
  console.log("QRCodeScanner mounted");
  if (result.success === true) {
    let frameReadListener = await DBR.addListener('onFrameRead', async (scanResult:ScanResult) => {
      emit("onScanned",scanResult);
    });
    let onPlayedListener = await DBR.addListener("onPlayed", (result:{resolution:string}) => {
      console.log("onPlayed");
    });

    let camerasResult = await DBR.getAllCameras();
    if (camerasResult.cameras){
      for (let index = 0; index < camerasResult.cameras.length; index++) {
        const cameraID = camerasResult.cameras[index];
        if (cameraID.indexOf("Founder") != -1 ){
          console.log(cameraID)
          console.log("selct founder camera");
          let selectionResult = await DBR.selectCamera({cameraID:cameraID});
          console.log(selectionResult);
          break;
        }
      }
    }

    await DBR.startScan();
   
   
  }
});
onBeforeUnmount(() => {
  DBR.stopScan();
  console.log("QRCodeScanner unmount");
});


</script>

<style scoped>

</style>
