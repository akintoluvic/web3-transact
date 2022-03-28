<template>
  <div class="transaction-box">
    <h1>Transaction Details</h1>
    <span aria-label="Transaction Hash">
      <strong class="green">Transaction Hash:</strong>
      <br />
    </span>
    <span>
      <textarea :value="transactionDetails.transactionHash" />
    </span>
    <span aria-label="Transaction Status">
      <strong class="green">Transaction Status:</strong>
      {{ transactionDetails.status }}
    </span>
    <span aria-label="Address sent to">
      <strong class="green">Address Sent:</strong>
    </span>
    <span>
      <textarea :value="transactionDetails.to" />
    </span>
    <span aria-label="Transaction Fee">
      <strong class="green">Transaction Fee:</strong>
      {{ transactionDetails.gasUsed }} GWEI
    </span>
    <RouterLink to="/">Return to Home</RouterLink>
  </div>
</template>

<script>
import { useTransaction } from "@/compossables/transaction.js";
export default {
  setup() {
    const { transactionDetails } = useTransaction();
    return {
      transactionDetails,
    };
  },
};
</script>

<style>
.transaction-box span {
  margin-bottom: 12px;
  word-wrap: break-word;
  width: 100%;
}
.transaction-box a {
  margin-top: 40px;
  width: 100%;
  padding: 8px;
  border: 0;
  background-color: hsla(160, 100%, 37%, 1);
  color: white;
  text-align: center;
  border-radius: 8px;
}

.transaction-box h1 {
  margin-bottom: 20px;
}
.transaction-box span textarea {
  padding: 12px;
  width: 100%;
}
</style>
