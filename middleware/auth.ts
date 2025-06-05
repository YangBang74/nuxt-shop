import { useUserStore } from '~/stores/user';

export default defineNuxtRouteMiddleware(() => {
  const user = useUserStore();

  if (process.client && user.role !== 'admin') {
    return navigateTo('/');
  }
});
