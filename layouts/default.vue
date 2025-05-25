<template>
  <div class="layout">
    <header>
      <div class="container">
        <NuvLink to="/">Home</NuvLink>
        <NuvLink to="/about">About</NuvLink>
      </div>      
    </header>
    <main>
      <slot></slot>
    </main>
    <footer>
      <p>Footer content goes here</p>
    </footer>
  </div>  
</template>
<style scoped></style>