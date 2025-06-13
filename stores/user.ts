// stores/user.ts
import { defineStore } from 'pinia';
import { navigateTo } from '#app';

export type UserRole = 'admin' | 'user';

export const useUserStore = defineStore(
  'user',
  () => {
    const fullName = ref<string | null>(null);
    const email = ref<string | null>(null);
    const token = ref<string | null>(null);
    const role = ref<UserRole | null>(null);
    const id = ref<number | null>(null);
    function setUser(name: string, mail: string, jwt: string, userRole: UserRole, index: number) {
      fullName.value = name;
      email.value = mail;
      token.value = jwt;
      role.value = userRole;
      id.value = index;
    }

    function logout() {
      fullName.value = null;
      email.value = null;
      token.value = null;
      role.value = null;
      id.value = null;
      return navigateTo('/', { replace: true });
    }

    return { fullName, email, token, role, id, setUser, logout };
  },
  {
    persist: true,
  }
);
