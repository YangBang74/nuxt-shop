import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', () => {
  const fullName = ref('');
  const email = ref('');
  const token = ref('');

  function setUser(data: { fullName: string; email: string; token: string }) {
    fullName.value = data.fullName;
    email.value = data.email;
    token.value = data.token;
  }

  function logout() {
    fullName.value = '';
    email.value = '';
    token.value = '';
  }

  return { fullName, email, setUser, logout };
});
