<template>
  <section class="py-16 bg-white lg:py-24">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h2 class="font-headers text-3xl font-extrabold tracking-tight text-secondary sm:text-4xl">
          Nos dernières ressources
        </h2>
        <p class="mx-auto mt-4 max-w-2xl text-xl text-secondary/70">
          Découvrez nos guides pratiques, études de cas et webinaires pour maîtriser l'IA.
        </p>
      </div>

      <!-- Filtres -->
      <div class="mt-12">
        <div class="flex justify-center space-x-2">
          <button
            v-for="type in resourceTypes"
            :key="type.id"
            class="flex items-center rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200"
            :class="[
              activeType === type.id
                ? 'bg-gradient-secondary-tertiary text-light'
                : 'text-secondary hover:bg-light hover:text-tertiary'
            ]"
            @click="activeType = type.id"
          >
            <component
              :is="type.icon"
              class="mr-2 inline-block h-5 w-5"
            />
            {{ type.name }}
          </button>
        </div>
      </div>

      <!-- Grille de ressources -->
      <div class="mt-12">
        <TransitionGroup
          tag="div"
          class="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 transform translate-y-4"
          enter-to-class="opacity-100 transform translate-y-0"
          leave-active-class="transition-all duration-200 ease-in"
          leave-from-class="opacity-100 transform translate-y-0"
          leave-to-class="opacity-0 transform translate-y-4"
        >
          <div
            v-for="resource in filteredResources"
            :key="resource.id"
            class="flex flex-col overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl"
          >
            <!-- Image -->
            <div class="flex-shrink-0">
              <img
                :src="resource.image"
                :alt="resource.title"
                class="h-48 w-full object-cover"
              />
            </div>

            <!-- Contenu -->
            <div class="flex flex-1 flex-col justify-between bg-white p-6">
              <div class="flex-1">
                <p class="text-sm font-medium text-primary">
                  <span
                    class="inline-flex items-center rounded-full px-3 py-0.5 text-sm font-medium"
                    :class="{
                      'bg-secondary/10 text-secondary': resource.type === 'guide',
                      'bg-primary/10 text-primary': resource.type === 'webinar',
                      'bg-tertiary/10 text-tertiary': resource.type === 'case-study'
                    }"
                  >
                    {{ getResourceTypeName(resource.type) }}
                  </span>
                </p>
                <div class="mt-2 block">
                  <h3 class="font-headers text-xl font-semibold text-secondary">
                    {{ resource.title }}
                  </h3>
                  <p class="mt-3 text-base text-secondary/70">
                    {{ resource.description }}
                  </p>
                </div>
              </div>

              <!-- Métriques -->
              <div class="mt-6 flex items-center">
                <div class="flex space-x-4 text-sm text-secondary/50">
                  <span class="inline-flex items-center">
                    <ClockIcon class="mr-1 h-4 w-4" />
                    {{ resource.duration }}
                  </span>
                  <span class="inline-flex items-center">
                    <DocumentTextIcon class="mr-1 h-4 w-4" />
                    {{ resource.pages }}
                  </span>
                  <span class="inline-flex items-center">
                    <UserGroupIcon class="mr-1 h-4 w-4" />
                    {{ resource.downloads }}+ téléchargements
                  </span>
                </div>
              </div>

              <!-- CTA -->
              <div class="mt-6">
                <button
                  class="inline-flex w-full items-center justify-center rounded-md border-2 border-primary bg-primary px-4 py-2 text-sm font-medium text-secondary transition-colors duration-200 hover:bg-primary-light hover:border-primary-light"
                  @click="$emit('downloadResource', resource)"
                >
                  Télécharger gratuitement
                  <ArrowDownTrayIcon class="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </TransitionGroup>
      </div>

      <!-- CTA Newsletter -->
      <div class="mt-16 overflow-hidden rounded-lg bg-gradient-secondary-tertiary shadow-xl lg:grid lg:grid-cols-2 lg:gap-4">
        <div class="px-6 pt-10 pb-12 sm:px-16 sm:pt-16 lg:py-16 lg:pr-0 xl:px-20 xl:py-20">
          <div class="lg:self-center">
            <h2 class="font-headers text-3xl font-extrabold text-light sm:text-4xl">
              <span class="block">Restez informé</span>
              <span class="block">des dernières innovations IA</span>
            </h2>
            <p class="mt-4 text-lg leading-6 text-light/80">
              Recevez nos meilleures ressources et actualités IA directement dans votre boîte mail.
            </p>
            <div class="mt-8 flex">
              <input
                v-model="email"
                type="email"
                class="w-full rounded-md border-light px-5 py-3 placeholder-secondary/50 focus:border-primary focus:ring-2 focus:ring-primary sm:max-w-xs"
                placeholder="Votre email"
              />
              <button
                class="ml-3 flex-shrink-0 rounded-md border-2 border-primary bg-primary px-5 py-3 font-medium text-secondary transition-colors duration-200 hover:bg-primary-light hover:border-primary-light"
                @click="$emit('subscribe', email)"
              >
                S'abonner
              </button>
            </div>
          </div>
        </div>
        <div class="relative -mt-6 aspect-w-5 aspect-h-3 md:aspect-w-2 md:aspect-h-1">
          <img
            class="transform translate-x-6 translate-y-6 rounded-md object-cover object-left-top sm:translate-x-16 lg:translate-y-20"
            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80"
            alt="App screenshot"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {
    ArrowDownTrayIcon,
    BookOpenIcon,
    ChartBarIcon,
    ClockIcon,
    DocumentTextIcon,
    UserGroupIcon,
    VideoCameraIcon
} from '@heroicons/vue/24/outline'
import { computed, ref } from 'vue'

const email = ref('')
const activeType = ref('all')

const resourceTypes = [
  { id: 'all', name: 'Tout', icon: BookOpenIcon },
  { id: 'guide', name: 'Guides', icon: DocumentTextIcon },
  { id: 'webinar', name: 'Webinaires', icon: VideoCameraIcon },
  { id: 'case-study', name: 'Études de cas', icon: ChartBarIcon }
]

const resources = [
  {
    id: 1,
    type: 'guide',
    title: 'Guide complet de l\'IA générative pour les entreprises',
    description: 'Découvrez comment implémenter l\'IA dans vos processus métier sans expertise technique.',
    image: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80',
    duration: '20 min',
    pages: '25 pages',
    downloads: '1250'
  },
  {
    id: 2,
    type: 'webinar',
    title: 'Comment multiplier par 3 votre productivité avec l\'IA',
    description: 'Webinaire pratique avec démonstrations et cas d\'usage concrets.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80',
    duration: '45 min',
    pages: 'Replay + slides',
    downloads: '850'
  },
  {
    id: 3,
    type: 'case-study',
    title: 'Comment TechCorp a transformé son marketing avec l\'IA',
    description: 'Étude de cas détaillée avec résultats et méthodologie.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80',
    duration: '15 min',
    pages: '12 pages',
    downloads: '720'
  },
  {
    id: 4,
    type: 'guide',
    title: '10 use cases d\'IA pour les PME',
    description: 'Guide pratique pour identifier et implémenter les cas d\'usage IA les plus pertinents.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80',
    duration: '15 min',
    pages: '18 pages',
    downloads: '950'
  },
  {
    id: 5,
    type: 'webinar',
    title: 'L\'IA dans les RH : automatiser pour mieux recruter',
    description: 'Découvrez comment optimiser vos processus RH avec l\'IA.',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80',
    duration: '60 min',
    pages: 'Replay + support',
    downloads: '680'
  },
  {
    id: 6,
    type: 'case-study',
    title: 'IndustriePlus : -30% de coûts grâce à l\'IA',
    description: 'Comment l\'IA a optimisé la production et réduit les coûts.',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80',
    duration: '10 min',
    pages: '8 pages',
    downloads: '590'
  }
]

const filteredResources = computed(() => {
  if (activeType.value === 'all') return resources
  return resources.filter(resource => resource.type === activeType.value)
})

function getResourceTypeName(type: string): string {
  switch (type) {
    case 'guide':
      return 'Guide'
    case 'webinar':
      return 'Webinaire'
    case 'case-study':
      return 'Étude de cas'
    default:
      return type
  }
}
</script> 