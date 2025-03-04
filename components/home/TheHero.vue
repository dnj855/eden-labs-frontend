<template>
  <section class="relative overflow-hidden bg-gradient-to-br from-secondary via-secondary to-tertiary py-16 lg:py-24">
    <!-- Fond décoratif -->
    <!-- <div class="absolute inset-0 opacity-10">
      <div class="absolute inset-0 bg-gradient-to-r from-light to-transparent"></div>
    </div> -->

    <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="lg:grid lg:grid-cols-12 lg:gap-8 lg:items-center">
        <!-- Contenu textuel -->
        <div class="px-4 sm:px-6 sm:text-center md:mx-auto md:max-w-2xl lg:col-span-6 lg:flex lg:items-center lg:text-left">
          <div>
            <div class="inline-flex items-center space-x-3">
              <span class="rounded bg-primary px-2.5 py-1 text-xs font-semibold tracking-wide text-secondary uppercase">
                Spécialiste IA pour non-techniciens
              </span>
            </div>
            <h1 class="font-accent mt-4 text-4xl font-extrabold text-light sm:mt-5 sm:text-6xl lg:mt-6">
              <span>Transformez votre</span>
              <span class="text-primary"> entreprise avec l'IA</span>
              <span class="font-accent block mt-2 text-2xl font-semibold text-tertiary sm:text-4xl tracking-tight">sans expertise technique</span>
            </h1>
            <p class="mt-3 text-base text-light/80 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
              Accompagnement sur mesure pour PME/ETI : formations, ateliers et consulting pour intégrer l'IA dans vos processus quotidiens
            </p>
            
            <!-- Statistiques de confiance -->
            <div class="mt-8 space-y-4 sm:flex sm:space-x-8 sm:space-y-0 stats">
              <div>
                <p class="text-3xl font-bold text-primary">+45%</p>
                <p class="mt-1 text-sm text-light/70">Gain de productivité moyen</p>
              </div>
              <div>
                <p class="text-3xl font-bold text-primary">50+</p>
                <p class="mt-1 text-sm text-light/70">Entreprises accompagnées</p>
              </div>
            </div>

            <!-- CTAs -->
            <div class="mt-10 space-y-4 sm:flex sm:justify-center sm:space-x-4 sm:space-y-0 lg:justify-start">
              <button
                class="w-full flex items-center justify-center rounded-md border-2 border-primary bg-primary px-8 py-3 text-base font-medium text-secondary hover:bg-primary-light hover:border-primary-light transition-colors duration-200 md:py-4 md:text-lg md:px-10 sm:w-auto"
                @click="$emit('openBooking')"
              >
                Réserver mon audit flash gratuit
              </button>
              <button
                class="w-full flex items-center justify-center rounded-md border-2 border-light bg-transparent px-8 py-3 text-base font-medium text-light hover:bg-light hover:text-secondary transition-colors duration-200 md:py-4 md:text-lg md:px-10 sm:w-auto"
                @click="$emit('openSolutions')"
              >
                Découvrir nos solutions
              </button>
            </div>

            <!-- Démo vidéo -->
            <div class="mt-8">
              <button
                class="inline-flex items-center text-primary hover:text-primary-light transition-colors duration-200"
                @click="showVideo = true"
              >
                <PlayCircleIcon class="h-6 w-6 mr-2" />
                <span>Voir la démo en 45 secondes</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Image/Vidéo -->
        <div class="mt-16 sm:mt-24 lg:mt-8 lg:col-span-6">
          <div class="relative sm:mx-auto sm:max-w-3xl lg:max-w-none p-4 sm:p-6 lg:p-8">
            <div class="relative mx-auto w-full rounded-lg shadow-xl lg:max-w-md overflow-hidden">
              <button
                type="button"
                class="relative block w-full bg-white rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                @click="showVideo = true"
              >
                <img
                  class="w-full"
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
                  alt="Démonstration d'utilisation de l'IA générative"
                />
                <div class="absolute inset-0 w-full h-full flex items-center justify-center">
                  <svg
                    class="h-20 w-20 text-primary"
                    fill="currentColor"
                    viewBox="0 0 84 84"
                  >
                    <circle opacity="0.9" cx="42" cy="42" r="42" fill="white" />
                    <path d="M55.5 41.5L36.75 53.344V29.656L55.5 41.5Z" />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Vidéo -->
    <TransitionRoot appear :show="showVideo" as="template">
      <Dialog as="div" @close="showVideo = false" class="relative z-50">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black bg-opacity-75" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel class="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                <div class="relative aspect-video">
                  <iframe
                    class="absolute inset-0 w-full h-full"
                    src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1"
                    title="Démonstration Eden Labs"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Indicateur de scroll -->
    <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
      <ChevronDownIcon class="h-6 w-6 text-light/70" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { ChevronDownIcon, PlayCircleIcon } from '@heroicons/vue/24/outline'
import { ref } from 'vue'

const showVideo = ref(false)
</script> 