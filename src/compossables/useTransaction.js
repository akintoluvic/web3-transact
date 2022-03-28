import { ref } from "vue";

const transactionDetails = ref(null);

export default function useTransaction() {
  return {
    transactionDetails,
  };
}
