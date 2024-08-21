import { TextResult } from "capacitor-plugin-dynamsoft-barcode-reader";
import { reactive } from "vue";

export const states = reactive({
  continuousScan: false,
  barcodeResults: [] as TextResult[],
});