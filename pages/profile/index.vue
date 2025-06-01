<template>
  <div class="flex justify-between items-start">
    <p>{{ user.fullName }}</p>
    <button @click="user.logout()">Выйти</button>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user';

const user = useUserStore();
</script>
