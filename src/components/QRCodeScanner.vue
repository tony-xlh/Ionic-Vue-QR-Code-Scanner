<template>
  <div v-if="!initialized">Initializing...</div>
  <div ref="container">
    <div class="dce-video-container"></div>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { DBR } from "capacitor-plugin-dynamsoft-barcode-reader";
import { CameraPreview } from "capacitor-plugin-camera";
import { Capacitor,PluginListenerHandle } from "@capacitor/core";

const props = defineProps(['license','torchOn']);
const emit = defineEmits(['onScanned','onPlayed']);
const initialized = ref(false);
const container = ref<HTMLDivElement|undefined>();
let onPlayedListener:PluginListenerHandle|undefined;
let interval:any;
let decoding = false;
const startDecoding = () => {
  stopDecoding();
  interval = setInterval(captureAndDecode,100);
}

const stopDecoding = () => {
  clearInterval(interval);
}

const captureAndDecode = async () => {
  if (decoding === true) {
    return;
  }
  let results = [];
  let dataURL;
  decoding = true;
  try {
    if (Capacitor.isNativePlatform()) {
      await CameraPreview.saveFrame();
      results = (await DBR.decodeBitmap({})).results;
    }else{
      let frame = await CameraPreview.takeSnapshot({quality:50});
      dataURL = "data:image/jpeg;base64,"+frame.base64;
      results = await readDataURL(dataURL);
    }
    console.log(results);
    emit("onScanned",results);
  } catch (error) {
    console.log(error);
  }
  decoding = false;
}

const readDataURL = async (dataURL:string) => {
  let response = await DBR.decode({source:dataURL});
  let results = response.results;
  return results;
}

onMounted(async () => {
  if (container.value && Capacitor.isNativePlatform() === false) {
    await CameraPreview.setElement(container.value);
  }
  await CameraPreview.initialize();
  await CameraPreview.requestCameraPermission();
  try {
    let licenseResult = await DBR.initLicense({license:props.license})
    if (licenseResult.success === false) {
      alert("License invalid");
    }
  } catch (error) {}
  let result = await DBR.initialize();
  
  console.log("QRCodeScanner mounted");
  if (result.success === true) {
    initialized.value = true;
    if (onPlayedListener) {
      onPlayedListener.remove();
    }
    onPlayedListener = await CameraPreview.addListener("onPlayed", async () => {
      startDecoding();
      const orientation = (await CameraPreview.getOrientation()).orientation;
      const resolution = (await CameraPreview.getResolution()).resolution;
      emit("onPlayed",{orientation:orientation,resolution:resolution});
    });
    await CameraPreview.startCamera();
  }
});

onBeforeUnmount(async () => {
  if (onPlayedListener) {
    onPlayedListener.remove();
  }
  stopDecoding();
  await CameraPreview.stopCamera();
  console.log("QRCodeScanner unmount");
});

watch(() => props.torchOn, (newVal, oldVal) => {
  if (newVal === true) {
    CameraPreview.toggleTorch({on:true});
  }else{
    CameraPreview.toggleTorch({on:false});
  }
});


</script>

<style scoped>

</style>