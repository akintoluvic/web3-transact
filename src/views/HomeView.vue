<script>
import { onMounted } from "vue";
import Web3 from "web3";

export default {
  setup() {
    const loadWeb3 = async () => {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        window.ethereum.enable();
      }
    };

    const load = async () => {
      await loadWeb3();
      updateStatus("Ready!");
    };

    const updateStatus = async (status) => {
      // const statusEl = document.getElementById('status');
      // statusEl.innerHTML = status;
      console.log(status);
    };

    onMounted(() => {
      load();
    });
  },
};
</script>
<template>
  <main>
    <h1>This is an Home Page</h1>
  </main>
</template>
