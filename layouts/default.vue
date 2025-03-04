<template>
  <div class="min-h-screen bg-gray-50">
    <TheNavbar />
    <main>
      <NuxtPage />
    </main>
    <footer class="bg-light">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div class="col-span-1 md:col-span-2">
            <h3 class="text-primary font-headers font-bold text-xl">Eden Labs</h3>
            <p class="mt-2 text-secondary/70 font-body">
              Nous accompagnons les PME/ETI dans leur transformation numérique avec l'IA générative.
            </p>
          </div>
          <div>
            <h4 class="font-headers font-semibold text-secondary">Navigation</h4>
            <ul class="mt-4 space-y-2">
              <li v-for="item in navigationItems" :key="item.path">
                <NuxtLink 
                  :to="item.path"
                  class="text-secondary/70 hover:text-primary transition-colors duration-200 font-body"
                >
                  {{ item.name }}
                </NuxtLink>
              </li>
            </ul>
          </div>
          <div>
            <h4 class="font-headers font-semibold text-secondary">Contact</h4>
            <ul class="mt-4 space-y-2">
              <li>
                <a href="mailto:contact@edenlabs.fr" class="text-secondary/70 hover:text-primary transition-colors duration-200 font-body">
                  contact@edenlabs.fr
                </a>
              </li>
              <li>
                <a href="tel:+33100000000" class="text-secondary/70 hover:text-primary transition-colors duration-200 font-body">
                  +33 1 00 00 00 00
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="mt-8 pt-8 border-t border-secondary/10">
          <p class="text-center text-secondary/40 text-sm font-body">
            © {{ new Date().getFullYear() }} Eden Labs. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const navigationItems = [
  { name: 'Accueil', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'À propos', path: '/about' },
  { name: 'Ressources', path: '/resources' },
  { name: 'Blog', path: '/blog' },
]
</script> 