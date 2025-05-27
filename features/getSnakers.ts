import { ref, onMounted } from 'vue';

const snakers = ref([]);
const loading = ref(true);
const error = ref<string | null>(null);

async function fetchData() {
  try {
    loading.value = true;
    const response = await fetch('https://175061237ca5525f.mokky.dev/snakers');
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }
    snakers.value = data;
    console.log(snakers);
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
}
onMounted(fetchData);
