<template>
  <nav class="bg-light shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="flex-shrink-0 flex items-center">
            <NuxtLink to="/" class="text-primary font-headers font-bold text-xl">
              Eden Labs
            </NuxtLink>
          </div>
          <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
            <NuxtLink 
              v-for="item in navigationItems" 
              :key="item.path"
              :to="item.path"
              class="inline-flex items-center px-1 pt-1 border-b-2 font-body"
              :class="[
                $route.path === item.path
                  ? 'border-primary text-secondary'
                  : 'border-transparent text-secondary/70 hover:border-tertiary hover:text-tertiary'
              ]"
            >
              {{ item.name }}
            </NuxtLink>
          </div>
        </div>
        <div class="hidden sm:ml-6 sm:flex sm:items-center">
          <button
            class="bg-gradient-to-r from-secondary to-tertiary text-primary px-4 py-2 rounded-md text-sm font-headers font-medium hover:from-secondary/90 hover:to-tertiary/90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
          >
            Contactez-nous
          </button>
        </div>
        <div class="-mr-2 flex items-center sm:hidden">
          <button
            @click="isOpen = !isOpen"
            class="inline-flex items-center justify-center p-2 rounded-md text-secondary/50 hover:text-secondary hover:bg-light focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
          >
            <span class="sr-only">Ouvrir le menu</span>
            <svg
              class="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                v-if="!isOpen"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div
      v-show="isOpen"
      class="sm:hidden"
    >
      <div class="pt-2 pb-3 space-y-1">
        <NuxtLink
          v-for="item in navigationItems"
          :key="item.path"
          :to="item.path"
          class="block pl-3 pr-4 py-2 border-l-4 text-base font-body font-medium"
          :class="[
            $route.path === item.path
              ? 'bg-light border-primary text-primary'
              : 'border-transparent text-secondary/70 hover:bg-light hover:border-tertiary hover:text-tertiary'
          ]"
        >
          {{ item.name }}
        </NuxtLink>
      </div>
      <div class="pt-4 pb-3 border-t border-secondary/10">
        <div class="mt-3 space-y-1">
          <button
            class="w-full text-left block px-4 py-2 text-base font-headers font-medium bg-gradient-to-r from-secondary to-tertiary text-primary hover:from-secondary/90 hover:to-tertiary/90 transition-colors duration-200"
          >
            Contactez-nous
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isOpen = ref(false)

const navigationItems = [
  { name: 'Accueil', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'À propos', path: '/about' },
  { name: 'Ressources', path: '/resources' },
  { name: 'Blog', path: '/blog' },
]
</script> 