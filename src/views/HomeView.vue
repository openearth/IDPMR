<template>
  <main class="pa-4 home d-flex flex-column">
    <div>
      <h2 class="h2">Introduction</h2>

      <v-divider class="mt-4 mb-4" />
    </div>

    <div class="d-flex pt-4">
      <v-btn
        color="primary"
        dark
        class="ml-auto"
        :to="{ name: 'settings', params: { wizard: true } }"
        >Get started</v-btn
      >
    </div>
  </main>
</template>
