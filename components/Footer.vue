<template>
  <footer class="bg-blue-950 text-white">
    <div class="container mx-auto">
      <div class="flex justify-between items-center">
        <div>
          <p class="font-bold text-lg py-1">NuxtShop</p>
        </div>
        <nav class="flex gap-3 items-center">
          <NuxtLink to="https://github.com/yangbang74" class="hover:text-gray-500" target="_blank">
            <Icon name="mdi:github" size="20" />
          </NuxtLink>
          <NuxtLink to="https://t.me/itisyang" class="hover:text-blue-500" target="_blank">
            <Icon name="mdi:telegram" size="20" />
          </NuxtLink>
          <NuxtLink
            to="https://www.instagram.com/yangbang74/"
            class="hover:text-gray-500"
            target="_blank"
          >
            <Icon name="mdi:instagram" size="20" />
          </NuxtLink>
        </nav>
      </div>
    </div>
  </footer>
</template>
