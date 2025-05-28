<script setup lang="ts">
definePageMeta({
  layout: 'default',
});
const route = useRoute();
const name = route.params.name;
const loading = ref<boolean>(true);
const snakers = ref([]);
const error = ref<string | null>(null);

async function fetchData() {
  try {
    loading.value = true;
    const response = await fetch(`https://175061237ca5525f.mokky.dev/snakers?brand=${name}`);
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
</script>
