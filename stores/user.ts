import { defineStore } from 'pinia';

export const useUserStore = defineStore(
  'user',
  () => {
    const fullName = ref<string | null>(null);
    const email = ref<string | null>(null);
    const token = ref<string | null>(null);

    function setUser(name: string, mail: string, jwt: string) {
      fullName.value = name;
      email.value = mail;
      token.value = jwt;
    }

    function logout() {
      fullName.value = null;
      email.value = null;
      token.value = null;
      navigateTo('/');
    }

    return { fullName, email, token, setUser, logout };
  },
  {
    persist: true,
  }
);
