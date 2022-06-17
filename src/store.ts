import { reactive } from "vue";

export const store = {
  state: reactive({
    qrcodeOnly: false,
    continuousScan: false,
    barcodeResults: [] as any[],
  }),
}