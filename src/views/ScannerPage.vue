<template>
  <ion-page>
  </ion-page>
</template>

<script lang="ts">
import {  IonPage, useIonRouter } from '@ionic/vue';
import { defineComponent } from 'vue';
import { states } from '../states'

export default defineComponent({
  name: 'HomePage',
  components: {
    IonPage,
  },
  data() {
    return {
      sharedStates: states
    }
  },
  setup() {
    const router = useIonRouter();
    return { router };
  },
  mounted(){
    console.log(this.sharedStates);
    setTimeout(this.goBack,2000);
  },
  methods: {
    goBack() {
      this.sharedStates.barcodeResults = ["1","2","3"];
      this.router.back();
    }
  }
});
</script>

<style scoped>
</style>
