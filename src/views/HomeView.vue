<script>
import { onMounted, ref } from "vue";
import Web3 from "web3";

export default {
  setup() {
    // eslint-disable-next-line prettier/prettier
    const ABI = ref([{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"standard","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_initialSupply","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}])
    const contractAddress = ref("0x86C12A724340f3F4F6142789808874d0A55Bd01f");
    const destinationAddress = ref("");
    const amount = ref("");
    const web3Available = ref(false);

    const loadWeb3 = async () => {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        console.log(window.web3);
        window.ethereum.enable();
        web3Available.value = true;
      } else {
        web3Available.value = false;
        console.log("No web3? You should consider trying MetaMask!");
      }
    };

    const load = async () => {
      await loadWeb3();
      window.contract = await loadContract();
      updateStatus("Ready!");
    };

    const updateStatus = async (status) => {
      // const statusEl = document.getElementById('status');
      // statusEl.innerHTML = status;
      console.log(status);
    };

    const loadContract = async () => {
      return await new window.web3.eth.Contract(
        ABI.value,
        contractAddress.value
      );
    };

    // 0x78536177b32FCcaF12b98EEb33e8e815D4DD1712

    const makeTransfer = async () => {
      const tx = await window.contract.methods
        .transfer(destinationAddress.value, amount.value)
        .send({ from: window.ethereum.selectedAddress });

      // transactionHash
      // status
      // to
      // gasUsed in GWEI
      // GWEI = 0.000000000806 ETH
      console.log(tx, tx.transactionHash);
      // updateStatus(`Transaction: ${tx.transactionHash}`);
    };

    onMounted(() => {
      load();
    });
    return {
      contractAddress,
      destinationAddress,
      amount,
      makeTransfer,
      web3Available,
    };
  },
};
</script>
<template>
  <main class="transaction-box">
    <h1>
      {{
        web3Available
          ? "Transfer Form"
          : "Install metamask extension to conduct transaction"
      }}
    </h1>
    <form>
      <label for="address">Address</label>
      <input type="text" name="address" v-model="destinationAddress" />
      <label for="amount">Amount</label>
      <input type="number" name="amount" v-model="amount" />
      <button
        type="submit"
        @click.prevent="makeTransfer"
        :disabled="!web3Available || destinationAddress === '' || amount === ''"
      >
        Submit
      </button>
    </form>
  </main>
</template>

<style scoped>
.transaction-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgb(39, 39, 39);
  padding: 150px 100px;
  border-radius: 25px;
}
form {
  width: 100%;
}
form > * {
  display: block;
  margin: 0.5rem 0;
  color: grey;
}
form > input {
  width: 340px;
  width: 100%;
  padding: 0.7rem;
  border: 1px solid grey;
  border-radius: 5px;
  background-color: beige;
}
form > button {
  padding: 0.8rem;
  border: 0px;
  border-radius: 5px;
  background-color: hsla(160, 100%, 37%, 1);
  color: white;
  width: 100%;
  margin-top: 20px;
}
form > button:hover {
  background-color: rgb(4, 160, 108);
}
form > button:disabled {
  background-color: grey;
  color: white;
}
</style>
