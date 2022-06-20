<template>
  <div v-if="!initialized">Initializing...</div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { DBR, Options, ScanResult } from "capacitor-plugin-dynamsoft-barcode-reader";

const props = defineProps(['license','dceLicense','torchOn','runtimeSettings']);
const emit = defineEmits(['onScanned']);
const initialized = ref(false);
const torchOn = ref(props.torchOn);

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
    initialized.value = true;
    let frameReadListener = await DBR.addListener('onFrameRead', async (scanResult:ScanResult) => {
      emit("onScanned",scanResult);
    });
    let onPlayedListener = await DBR.addListener("onPlayed", (result:{resolution:string}) => {
      console.log("onPlayed");
    });

    if (props.runtimeSettings) {
      console.log("update runtime settings");
      console.log(props.runtimeSettings);
      await DBR.initRuntimeSettingsWithString({template:props.runtimeSettings});
    }

    let camerasResult = await DBR.getAllCameras();
    if (camerasResult.cameras) {
      for (let index = 0; index < camerasResult.cameras.length; index++) {
        const cameraID = camerasResult.cameras[index];
        if (cameraID.toLowerCase().indexOf("founder") != -1 ){
          console.log(cameraID)
          console.log("selct founder camera"); //the USB camera's name of the developer
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


watch(() => props.torchOn, (newVal, oldVal) => {
  if (newVal === true) {
    DBR.toggleTorch({on:true});
  }else{
    DBR.toggleTorch({on:false});
  }
});


</script>

<style scoped>

</style>
