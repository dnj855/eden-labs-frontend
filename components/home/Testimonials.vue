<template>
  <section class="py-16 bg-light lg:py-24">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h2 class="font-headers text-3xl font-extrabold tracking-tight text-secondary sm:text-4xl">
          Ils nous font confiance
        </h2>
        <p class="mx-auto mt-4 max-w-2xl text-xl text-secondary/70">
          Découvrez comment nos clients transforment leur entreprise avec l'IA.
        </p>
      </div>

      <!-- Statistiques -->
      <div class="mt-16">
        <dl class="grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl sm:p-6"
          >
            <dt class="truncate text-sm font-medium text-secondary/70">
              {{ stat.label }}
            </dt>
            <dd class="mt-1 font-headers text-3xl font-semibold text-primary">
              {{ stat.value }}
            </dd>
            <p class="mt-2 text-sm text-secondary/70">
              {{ stat.description }}
            </p>
          </div>
        </dl>
      </div>

      <!-- Logos clients -->
      <div class="mt-16">
        <div class="grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-6">
          <div
            v-for="client in clients"
            :key="client.name"
            class="col-span-1 flex items-center justify-center grayscale transition-all duration-300 hover:grayscale-0"
          >
            <img
              :src="client.logo"
              :alt="client.name"
              class="h-12"
            />
          </div>
        </div>
      </div>

      <!-- Témoignages -->
      <div class="mt-16">
        <div class="grid gap-8 lg:grid-cols-3">
          <div
            v-for="testimonial in testimonials"
            :key="testimonial.name"
            class="rounded-lg bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl"
          >
            <div class="mb-4 flex items-center">
              <img
                :src="testimonial.avatar"
                :alt="testimonial.name"
                class="h-12 w-12 rounded-full ring-2 ring-primary"
              />
              <div class="ml-4">
                <h4 class="font-headers text-lg font-medium text-secondary">
                  {{ testimonial.name }}
                </h4>
                <p class="text-sm text-tertiary">
                  {{ testimonial.role }}, {{ testimonial.company }}
                </p>
              </div>
            </div>
            <div class="relative">
              <ChatBubbleLeftIcon class="absolute -translate-x-4 -translate-y-4 transform text-primary/20 h-8 w-8" />
              <p class="relative z-10 text-secondary/70">
                "{{ testimonial.quote }}"
              </p>
            </div>
            <div class="mt-4 flex items-center">
              <div class="flex">
                <StarIcon
                  v-for="i in 5"
                  :key="i"
                  class="h-5 w-5 text-primary"
                />
              </div>
              <span class="ml-2 text-sm text-secondary/50">
                {{ testimonial.date }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="mt-16 text-center">
        <button
          class="inline-flex items-center rounded-md border-2 border-primary bg-primary px-6 py-3 text-base font-medium text-secondary shadow-sm transition-colors duration-200 hover:bg-primary-light hover:border-primary-light"
          @click="$emit('startAudit')"
        >
          Rejoignez nos clients satisfaits
          <ArrowRightIcon class="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
        </button>
        <p class="mt-4 text-sm text-secondary/70">
          Plus de 50 entreprises nous font déjà confiance
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ChatBubbleLeftIcon } from '@heroicons/vue/24/outline'
import {
    ArrowRightIcon,
    StarIcon
} from '@heroicons/vue/24/solid'

const stats = [
  {
    label: 'Entreprises accompagnées',
    value: '50+',
    description: 'De la PME au grand groupe'
  },
  {
    label: 'Gain de productivité',
    value: '+45%',
    description: 'En moyenne après 6 mois'
  },
  {
    label: 'ROI moyen',
    value: '4.2x',
    description: 'Retour sur investissement'
  },
  {
    label: 'Satisfaction client',
    value: '96%',
    description: 'Recommandent Eden Labs'
  }
]

const clients = [
  { name: 'TechCorp', logo: 'https://tailwindui.com/img/logos/tuple-logo-gray-900.svg' },
  { name: 'IndustriePlus', logo: 'https://tailwindui.com/img/logos/statickit-logo-gray-900.svg' },
  { name: 'LogiGroup', logo: 'https://tailwindui.com/img/logos/transistor-logo-gray-900.svg' },
  { name: 'RetailPlus', logo: 'https://tailwindui.com/img/logos/workcation-logo-gray-900.svg' },
  { name: 'IndustrieNext', logo: 'https://tailwindui.com/img/logos/level-logo-gray-900.svg' },
  { name: 'ConseilPlus', logo: 'https://tailwindui.com/img/logos/reform-logo-gray-900.svg' }
]

const testimonials = [
  {
    name: 'Sophie Martin',
    role: 'Directrice Marketing',
    company: 'TechCorp',
    quote: 'Eden Labs nous a permis de multiplier notre production de contenu par 3 tout en maintenant une qualité constante. L\'accompagnement a été clé dans notre transformation.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    date: 'Il y a 2 mois'
  },
  {
    name: 'Marc Lefevre',
    role: 'DRH',
    company: 'IndustriePlus',
    quote: 'L\'IA a révolutionné notre processus de recrutement. Nous identifions les meilleurs talents en deux fois moins de temps qu\'avant.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    date: 'Il y a 1 mois'
  },
  {
    name: 'Marie Lambert',
    role: 'Directrice Générale',
    company: 'PME+',
    quote: 'L\'approche pragmatique d\'Eden Labs nous a permis d\'intégrer l\'IA sans bouleverser notre organisation. Les résultats sont au-delà de nos espérances.',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    date: 'Il y a 3 mois'
  }
]
</script> 