<script>
import { onMounted, ref } from "vue";
import Web3 from "web3";
import { useRouter } from "vue-router";
import { useTransaction } from "@/compossables/transaction.js";

export default {
  setup() {
    // eslint-disable-next-line prettier/prettier
    const ABI = ref([{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"standard","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_initialSupply","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}])
    const contractAddress = ref("0x86C12A724340f3F4F6142789808874d0A55Bd01f");
    const destinationAddress = ref("");
    const amount = ref("");
    const web3Available = ref(false);
    const router = useRouter();
    const { transactionDetails } = useTransaction();
    const loadingTransaction = ref(false);

    const loadWeb3 = async () => {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        window.ethereum.enable();
        web3Available.value = true;
      } else {
        web3Available.value = false;
      }
    };

    // Initiate web3 connection
    const initiateWeb3 = async () => {
      await loadWeb3();
      window.contract = await loadContract();
    };

    const loadContract = async () => {
      return await new window.web3.eth.Contract(
        ABI.value,
        contractAddress.value
      );
    };

    const makeTransfer = async () => {
      loadingTransaction.value = true;
      const response = await window.contract.methods
        .transfer(destinationAddress.value, amount.value)
        .send({ from: window.ethereum.selectedAddress });

      const { transactionHash, status, to, gasUsed } = response;

      // Set values to transactionDetails
      transactionDetails.value = {
        transactionHash,
        status,
        to,
        gasUsed,
      };

      if (response.status !== false) {
        loadingTransaction.value = false;
        router.push("/transaction-details");
      } else {
        loadingTransaction.value = false;
        alert("Transaction failed");
      }
    };

    onMounted(() => {
      initiateWeb3();
    });
    return {
      contractAddress,
      destinationAddress,
      amount,
      makeTransfer,
      web3Available,
      loadingTransaction,
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
    <h3>Send 0 Ether, for successful tx</h3>
    <form>
      <label for="address">Address</label>
      <input type="text" name="address" v-model="destinationAddress" />
      <span class="address-info"
        >Address should be on Ropsten Test Network</span
      >
      <label for="amount">Amount</label>
      <input type="number" name="amount" v-model="amount" />
      <button
        type="submit"
        @click.prevent="makeTransfer"
        :disabled="!web3Available || destinationAddress === '' || amount === ''"
      >
        {{ loadingTransaction ? "Loading..." : "Submit" }}
      </button>
    </form>
  </main>
</template>

<style scoped>
.address-info {
  font-size: 0.8rem;
  color: #999;
}
</style>
