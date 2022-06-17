<template>
  <ion-page>
  </ion-page>
</template>

<script lang="ts">
import {  IonPage, useIonRouter } from '@ionic/vue';
import { defineComponent } from 'vue';
import { store } from '../store'

export default defineComponent({
  name: 'HomePage',
  components: {
    IonPage,
  },
  data() {
    return {
      sharedState: store.state
    }
  },
  setup() {
    const router = useIonRouter();
    return { router };
  },
  mounted(){
    console.log(this.sharedState);
    setTimeout(this.goBack,2000);
  },
  methods: {
    goBack() {
      this.sharedState.barcodeResults = ["1","2","3"];
      this.router.back();
    }
  }
});
</script>

<style scoped>
</style>
