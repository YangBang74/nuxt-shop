import { defineStore } from 'pinia';

export const useUserStore = defineStore(
  'user',
  () => {
    const fullName = ref('');
    const email = ref('');
    const token = ref('');

    function setUser(name: string, mail: string, jwt: string) {
      fullName.value = name;
      email.value = mail;
      token.value = jwt;
    }

    function logout() {
      fullName.value = '';
      email.value = '';
      token.value = '';
    }

    return { fullName, email, token, setUser, logout };
  },
  {
    persist: true,
  }
);
