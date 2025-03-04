<template>
  <section class="py-16 bg-light lg:py-24">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h2 class="font-headers text-3xl font-extrabold tracking-tight text-secondary sm:text-4xl">
          L'IA adaptée à votre réalité métier
        </h2>
        <p class="mx-auto mt-4 max-w-2xl text-xl text-secondary/70">
          Découvrez des solutions concrètes pour votre secteur d'activité.
        </p>
      </div>

      <!-- Sélecteur de secteur -->
      <div class="my-12">
        <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          <button
            v-for="sector in sectors"
            :key="sector.id"
            class="relative flex flex-col items-center justify-center rounded-lg p-4 transition-all duration-200 hover:bg-white hover:shadow-lg"
            :class="[
              activeSector === sector.id
                ? 'bg-white shadow-lg ring-2 ring-primary'
                : 'bg-light/50'
            ]"
            @click="activeSector = sector.id"
          >
            <component
              :is="sector.icon"
              class="h-8 w-8"
              :class="[
                activeSector === sector.id
                  ? 'text-primary'
                  : 'text-secondary/40'
              ]"
            />
            <span
              class="mt-2 text-sm font-medium"
              :class="[
                activeSector === sector.id
                  ? 'text-primary'
                  : 'text-secondary'
              ]"
            >
              {{ sector.name }}
            </span>
          </button>
        </div>
      </div>

      <!-- Contenu du secteur -->
      <Transition>
        <div
          :key="currentSector.id"
          class="grid grid-cols-1 gap-8 lg:grid-cols-3"
        >
          <!-- Cas d'usage -->
          <div class="lg:col-span-2">
            <h3 class="font-headers text-2xl font-bold text-secondary">
              Solutions pour {{ currentSector.name }}
            </h3>
            <div class="mt-8 grid gap-8 sm:grid-cols-2">
              <div
                v-for="useCase in currentSector.useCases"
                :key="useCase.id"
                class="relative rounded-lg bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-xl"
              >
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <component
                      :is="useCase.icon"
                      class="h-6 w-6 text-primary"
                    />
                  </div>
                  <h4 class="ml-4 font-headers text-lg font-medium text-secondary">
                    {{ useCase.title }}
                  </h4>
                </div>
                <p class="mt-2 text-base text-secondary/70">
                  {{ useCase.description }}
                </p>
                <div class="mt-4 flex items-baseline space-x-2">
                  <ArrowTrendingUpIcon class="h-5 w-5 text-tertiary" />
                  <span class="text-sm font-medium text-tertiary">
                    {{ useCase.result }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Étude de cas -->
          <div class="rounded-lg bg-white p-6 shadow-sm lg:p-8">
            <div class="flex items-center justify-between">
              <h4 class="font-headers text-lg font-medium text-secondary">
                Étude de cas
              </h4>
              <img
                :src="currentSector.caseStudy.logo"
                :alt="currentSector.caseStudy.company"
                class="h-8"
              />
            </div>
            <p class="mt-4 text-secondary/70">
              {{ currentSector.caseStudy.description }}
            </p>
            <div class="mt-6 grid grid-cols-2 gap-4">
              <div
                v-for="(stat, index) in currentSector.caseStudy.stats"
                :key="index"
                class="rounded-lg bg-light/50 p-4"
              >
                <p class="text-2xl font-bold text-primary">
                  {{ stat.value }}
                </p>
                <p class="mt-1 text-sm text-secondary/70">
                  {{ stat.label }}
                </p>
              </div>
            </div>
            <div class="mt-6">
              <div class="flex items-start">
                <img
                  :src="currentSector.caseStudy.testimonial.avatar"
                  :alt="currentSector.caseStudy.testimonial.name"
                  class="h-10 w-10 rounded-full ring-2 ring-primary"
                />
                <div class="ml-4">
                  <p class="text-sm italic text-secondary/70">
                    "{{ currentSector.caseStudy.testimonial.quote }}"
                  </p>
                  <div class="mt-1">
                    <p class="text-sm font-medium text-secondary">
                      {{ currentSector.caseStudy.testimonial.name }}
                    </p>
                    <p class="text-xs text-tertiary">
                      {{ currentSector.caseStudy.testimonial.role }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>

      <!-- CTAs -->
      <div class="mt-12 flex flex-col items-center space-y-4">
        <button
          class="inline-flex items-center rounded-md border-2 border-primary bg-primary px-6 py-3 text-base font-medium text-secondary shadow-sm transition-colors duration-200 hover:bg-primary-light hover:border-primary-light"
          @click="$emit('exploreSector', activeSector)"
        >
          Explorer nos solutions pour {{ currentSector.name }}
          <ArrowRightIcon class="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
        </button>
        <button
          class="text-sm text-secondary/70 transition-colors duration-200 hover:text-tertiary"
          @click="$emit('contact')"
        >
          Votre secteur n'est pas listé ? Contactez-nous
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {
  ArrowRightIcon,
  ArrowTrendingUpIcon,
  BriefcaseIcon,
  ChartBarIcon,
  ClockIcon,
  CogIcon,
  CurrencyEuroIcon,
  DocumentTextIcon,
  ShoppingBagIcon,
  UserGroupIcon
} from '@heroicons/vue/24/outline'
import { computed, ref } from 'vue'

const activeSector = ref('marketing')

const sectors = [
  {
    id: 'marketing',
    name: 'Marketing & Communication',
    icon: BriefcaseIcon,
    useCases: [
      {
        id: 1,
        icon: DocumentTextIcon,
        title: 'Création de contenu',
        description: 'Génération automatique de contenus marketing adaptés à votre marque.',
        result: '+60% de productivité'
      },
      {
        id: 2,
        icon: ChartBarIcon,
        title: 'Analyse de données',
        description: 'Insights automatisés sur vos campagnes marketing.',
        result: '+40% de ROI'
      },
      {
        id: 3,
        icon: ClockIcon,
        title: 'Automatisation emails',
        description: 'Personnalisation à grande échelle de vos communications.',
        result: '+35% de taux d\'ouverture'
      }
    ],
    caseStudy: {
      company: 'TechCorp',
      logo: 'https://tailwindui.com/img/logos/tuple-logo-gray-900.svg',
      description: 'TechCorp a transformé sa stratégie marketing grâce à l\'IA générative.',
      stats: [
        { value: '3x', label: 'Plus de contenu produit' },
        { value: '-40%', label: 'De coûts marketing' }
      ],
      testimonial: {
        quote: 'L\'IA nous a permis de multiplier notre production de contenu tout en maintenant une qualité constante.',
        name: 'Sophie Martin',
        role: 'Directrice Marketing, TechCorp',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      }
    }
  },
  {
    id: 'rh',
    name: 'Ressources Humaines',
    icon: UserGroupIcon,
    useCases: [
      {
        id: 1,
        icon: DocumentTextIcon,
        title: 'Recrutement intelligent',
        description: 'Présélection automatisée des candidats.',
        result: '-50% de temps de recrutement'
      },
      {
        id: 2,
        icon: ChartBarIcon,
        title: 'Formation personnalisée',
        description: 'Parcours d\'apprentissage adaptatifs.',
        result: '+45% d\'engagement'
      }
    ],
    caseStudy: {
      company: 'IndustriePlus',
      logo: 'https://tailwindui.com/img/logos/statickit-logo-gray-900.svg',
      description: 'IndustriePlus a optimisé ses processus RH avec l\'IA.',
      stats: [
        { value: '2x', label: 'Plus de candidats qualifiés' },
        { value: '-30%', label: 'De turnover' }
      ],
      testimonial: {
        quote: 'L\'IA nous aide à identifier les meilleurs talents plus rapidement.',
        name: 'Marc Lefevre',
        role: 'DRH, IndustriePlus',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      }
    }
  },
  {
    id: 'finance',
    name: 'Finance & Administration',
    icon: CurrencyEuroIcon,
    useCases: [
      {
        id: 1,
        icon: DocumentTextIcon,
        title: 'Traitement des factures',
        description: 'Automatisation de la saisie et validation.',
        result: '-75% de temps de traitement'
      }
    ],
    caseStudy: {
      company: 'LogiGroup',
      logo: 'https://tailwindui.com/img/logos/transistor-logo-gray-900.svg',
      description: 'LogiGroup a automatisé sa gestion financière.',
      stats: [
        { value: '4x', label: 'Plus rapide' },
        { value: '-60%', label: 'D\'erreurs' }
      ],
      testimonial: {
        quote: 'L\'automatisation nous a permis de nous concentrer sur l\'analyse stratégique.',
        name: 'Pierre Durand',
        role: 'DAF, LogiGroup',
        avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      }
    }
  },
  {
    id: 'vente',
    name: 'Vente & Relation Client',
    icon: ShoppingBagIcon,
    useCases: [
      {
        id: 1,
        icon: ChartBarIcon,
        title: 'Prédiction des ventes',
        description: 'Anticipation des tendances commerciales.',
        result: '+25% de précision'
      }
    ],
    caseStudy: {
      company: 'RetailPlus',
      logo: 'https://tailwindui.com/img/logos/workcation-logo-gray-900.svg',
      description: 'RetailPlus a optimisé sa force de vente avec l\'IA.',
      stats: [
        { value: '+30%', label: 'De ventes' },
        { value: '+45%', label: 'De satisfaction client' }
      ],
      testimonial: {
        quote: 'Nos vendeurs sont plus efficaces grâce aux insights IA.',
        name: 'Thomas Dubois',
        role: 'Directeur Commercial, RetailPlus',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      }
    }
  },
  {
    id: 'operations',
    name: 'Production & Opérations',
    icon: CogIcon,
    useCases: [
      {
        id: 1,
        icon: ChartBarIcon,
        title: 'Optimisation production',
        description: 'Prédiction et optimisation des processus.',
        result: '+20% de productivité'
      }
    ],
    caseStudy: {
      company: 'IndustrieNext',
      logo: 'https://tailwindui.com/img/logos/level-logo-gray-900.svg',
      description: 'IndustrieNext a optimisé sa production avec l\'IA.',
      stats: [
        { value: '-30%', label: 'De déchets' },
        { value: '+25%', label: 'D\'efficacité' }
      ],
      testimonial: {
        quote: 'L\'IA nous aide à optimiser chaque étape de notre production.',
        name: 'Jean Martin',
        role: 'Directeur Opérations, IndustrieNext',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      }
    }
  }
]

const currentSector = computed(() => {
  return sectors.find(s => s.id === activeSector.value) || sectors[0]
})
</script> 