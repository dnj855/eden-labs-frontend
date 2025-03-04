<template>
  <section class="py-16 bg-light overflow-hidden lg:py-24">
    <div class="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
      <div class="relative">
        <h2 class="text-center text-3xl leading-8 font-headers font-extrabold tracking-tight text-secondary sm:text-4xl">
          L'IA peut transformer votre entreprise, mais par où commencer?
        </h2>
        <p class="mt-4 max-w-3xl mx-auto text-center text-xl text-secondary/70">
          Découvrez comment nous répondons aux défis courants de la transformation numérique.
        </p>
      </div>

      <!-- Sélecteur de secteur -->
      <div class="mt-12">
        <div class="flex justify-center space-x-1">
          <template v-for="(sector, index) in sectors" :key="sector.id">
            <button
              class="px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200"
              :class="{
                'bg-gradient-secondary-tertiary text-light': activeSector === sector.id,
                'text-secondary hover:text-tertiary hover:bg-light': activeSector !== sector.id,
                'rounded-l-lg': index === 0,
                'rounded-r-lg': index === sectors.length - 1
              }"
              @click="activeSector = sector.id"
            >
              {{ sector.name }}
            </button>
          </template>
        </div>
      </div>

      <!-- Problématiques et solutions -->
      <div class="mt-12 space-y-10 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-x-8 sm:gap-y-10">
        <TransitionGroup
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="opacity-0 translate-y-4"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 translate-y-4"
        >
          <div
            v-for="problem in currentProblems"
            :key="problem.id"
            class="relative bg-white p-6 rounded-lg shadow-sm hover:shadow-xl transition-all duration-300"
          >
            <!-- Icône -->
            <div class="absolute -top-4 -right-4 w-24 h-24 bg-primary rounded-full opacity-20"></div>
            <div>
              <div class="flex items-center justify-center h-12 w-12 rounded-md bg-gradient-secondary-tertiary text-light">
                <component :is="problem.icon" class="h-6 w-6" aria-hidden="true" />
              </div>
              <div class="mt-5">
                <h3 class="text-lg leading-6 font-headers font-medium text-secondary">{{ problem.title }}</h3>
                <p class="mt-2 text-base text-secondary/70">{{ problem.description }}</p>
              </div>
            </div>

            <!-- Solution -->
            <div class="mt-4 border-t border-light pt-4">
              <h4 class="text-sm font-accent font-semibold text-tertiary">Notre solution :</h4>
              <p class="mt-2 text-sm text-secondary/70">{{ problem.solution }}</p>
            </div>

            <!-- Témoignage -->
            <div class="mt-6 border-t border-light pt-4">
              <div class="flex items-start">
                <div class="flex-shrink-0">
                  <img
                    class="h-10 w-10 rounded-full ring-2 ring-primary"
                    :src="problem.testimonial.avatar"
                    :alt="problem.testimonial.name"
                  />
                </div>
                <div class="ml-3">
                  <p class="text-sm text-secondary/70 italic">
                    "{{ problem.testimonial.quote }}"
                  </p>
                  <div class="mt-1">
                    <p class="text-sm font-medium text-secondary">{{ problem.testimonial.name }}</p>
                    <p class="text-xs text-tertiary">{{ problem.testimonial.role }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TransitionGroup>
      </div>

      <!-- CTA -->
      <div class="mt-12 text-center">
        <button
          class="inline-flex items-center px-6 py-3 border-2 border-primary bg-primary text-base font-medium rounded-md shadow-sm text-secondary hover:bg-primary-light hover:border-primary-light transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          @click="$emit('openQualification')"
        >
          Comment Eden Labs peut résoudre vos défis spécifiques
          <ArrowRightIcon class="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {
    ArrowRightIcon,
    ChartBarIcon,
    ClockIcon,
    CurrencyEuroIcon,
    LightBulbIcon,
    UserGroupIcon
} from '@heroicons/vue/24/outline'
import { computed, ref } from 'vue'

const sectors = [
  { id: 'marketing', name: 'Marketing' },
  { id: 'rh', name: 'RH' },
  { id: 'finance', name: 'Finance' },
  { id: 'vente', name: 'Vente' },
  { id: 'operations', name: 'Opérations' }
]

const activeSector = ref('marketing')

const problems = {
  marketing: [
    {
      id: 1,
      icon: LightBulbIcon,
      title: 'Manque de temps pour la création de contenu',
      description: 'La production régulière de contenu marketing de qualité est chronophage et coûteuse.',
      solution: 'Automatisation de la génération de contenu avec des outils IA adaptés à votre ton et votre marque.',
      testimonial: {
        quote: 'Nous avons réduit de 60% le temps de création de nos newsletters.',
        name: 'Sophie Martin',
        role: 'Directrice Marketing, TechCorp',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      }
    },
    {
      id: 2,
      icon: ChartBarIcon,
      title: 'Difficulté à personnaliser les campagnes',
      description: 'La personnalisation à grande échelle semble impossible avec les ressources actuelles.',
      solution: 'Utilisation de l\'IA pour segmenter et personnaliser automatiquement vos communications.',
      testimonial: {
        quote: 'Notre taux de conversion a augmenté de 35% grâce à la personnalisation IA.',
        name: 'Thomas Dubois',
        role: 'CMO, RetailPlus',
        avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      }
    },
    {
      id: 3,
      icon: ClockIcon,
      title: 'Analyse des données marketing',
      description: 'Trop de données, pas assez d\'insights actionnables.',
      solution: 'IA pour analyser vos données et générer des recommandations concrètes.',
      testimonial: {
        quote: 'Nous identifions maintenant nos meilleures opportunités en quelques clics.',
        name: 'Julie Leroux',
        role: 'Digital Manager, E-Shop',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      }
    }
  ],
  rh: [
    {
      id: 4,
      icon: UserGroupIcon,
      title: 'Recrutement chronophage',
      description: 'Le tri des CV et la présélection des candidats prennent trop de temps.',
      solution: 'IA pour présélectionner les candidats et automatiser les premiers échanges.',
      testimonial: {
        quote: 'Notre temps de recrutement a été divisé par deux.',
        name: 'Marc Lefevre',
        role: 'DRH, IndustriePlus',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      }
    },
    // Ajoutez d'autres problèmes RH...
  ],
  finance: [
    {
      id: 7,
      icon: CurrencyEuroIcon,
      title: 'Gestion des factures manuelle',
      description: 'Le traitement et la validation des factures sont sources d\'erreurs et de retards.',
      solution: 'Automatisation du traitement des factures avec reconnaissance IA.',
      testimonial: {
        quote: 'Nous avons réduit nos délais de traitement de 75%.',
        name: 'Pierre Durand',
        role: 'DAF, LogiGroup',
        avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      }
    },
    // Ajoutez d'autres problèmes Finance...
  ]
  // Ajoutez d'autres secteurs...
}

const currentProblems = computed(() => problems[activeSector.value] || [])
</script> 