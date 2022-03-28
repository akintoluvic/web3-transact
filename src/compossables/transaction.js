import { ref } from "vue";

const transactionDetails = ref(null);

export function useTransaction() {
  return {
    transactionDetails,
  };
}
