import { reactive } from "vue";

export const states = reactive({
  QRCodeOnly: false,
  continuousScan: false,
  barcodeResults: [] as any[],
});
