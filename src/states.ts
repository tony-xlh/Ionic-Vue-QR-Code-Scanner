import { TextResult } from "capacitor-plugin-dynamsoft-barcode-reader";
import { reactive } from "vue";

export const states = reactive({
  QRCodeOnly: false,
  continuousScan: false,
  barcodeResults: [] as TextResult[],
});
