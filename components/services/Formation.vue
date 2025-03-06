<template>
  <div class="bg-transparent">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <!-- En-tête avec badge -->
      <div class="mx-auto max-w-2xl lg:text-center">
        <span class="inline-flex items-center rounded-md bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
          <AcademicCapIcon class="h-4 w-4 mr-1" />
          Formation complète
        </span>
        <h2 class="text-base font-semibold leading-7 text-secondary">Formation "Socle" IA & No-Code</h2>
        <p class="mt-2 text-3xl font-bold tracking-tight text-secondary sm:text-4xl">
          Maîtrisez l'IA générative en 2 jours
        </p>
        <div class="w-20 h-1 bg-primary/30 mx-auto mt-6"></div>
      </div>

      <!-- Programme en onglets -->
      <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:max-w-none">
        <div class="flex border-b border-secondary/20 mb-8">
          <button 
            @click="activeTab = 'day1'" 
            :class="[
              'py-2 px-4 text-sm font-medium border-b-2 -mb-px',
              activeTab === 'day1' 
                ? 'border-tertiary text-tertiary' 
                : 'border-transparent text-secondary/70 hover:text-secondary hover:border-secondary/30'
            ]"
          >
            Jour 1 - Fondamentaux
          </button>
          <button 
            @click="activeTab = 'day2'" 
            :class="[
              'py-2 px-4 text-sm font-medium border-b-2 -mb-px',
              activeTab === 'day2' 
                ? 'border-tertiary text-tertiary' 
                : 'border-transparent text-secondary/70 hover:text-secondary hover:border-secondary/30'
            ]"
          >
            Jour 2 - Automatisation
          </button>
        </div>

        <!-- Contenu des onglets -->
        <div v-if="activeTab === 'day1'" class="space-y-6">
          <div v-for="(item, index) in day1Content" :key="index" class="flex gap-x-3">
            <CheckCircleIcon class="h-6 w-5 flex-none text-tertiary" aria-hidden="true" />
            <span class="text-sm leading-6 text-secondary/80">{{ item }}</span>
          </div>
        </div>

        <div v-if="activeTab === 'day2'" class="space-y-6">
          <div v-for="(item, index) in day2Content" :key="index" class="flex gap-x-3">
            <CheckCircleIcon class="h-6 w-5 flex-none text-tertiary" aria-hidden="true" />
            <span class="text-sm leading-6 text-secondary/80">{{ item }}</span>
          </div>
        </div>
      </div>

      <!-- Bénéfices -->
      <div class="mx-auto mt-16 max-w-2xl lg:mt-20 lg:max-w-none">
        <div class="bg-white/50 rounded-xl p-6 shadow-sm">
          <h3 class="text-lg font-semibold text-secondary mb-6 text-center">Ce que vous obtenez</h3>
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div v-for="(benefit, index) in benefits" :key="index" class="flex gap-x-3">
              <CheckCircleIcon class="h-6 w-5 flex-none text-secondary" aria-hidden="true" />
              <span class="text-sm leading-6 text-secondary/80">{{ benefit }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Informations pratiques -->
      <div class="mx-auto mt-12 max-w-2xl lg:mt-16 lg:max-w-none">
        <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div class="bg-white/50 p-6 rounded-xl shadow-sm">
            <div class="flex items-center mb-4">
              <UsersIcon class="h-6 w-6 text-primary mr-2" />
              <h3 class="text-base font-semibold text-secondary">Pour qui ?</h3>
            </div>
            <ul class="space-y-2 text-sm text-secondary/70">
              <li>• Managers et équipes opérationnelles</li>
              <li>• Tous secteurs et fonctions</li>
              <li>• Aucun prérequis technique</li>
            </ul>
          </div>
          
          <div class="bg-white/50 p-6 rounded-xl shadow-sm">
            <div class="flex items-center mb-4">
              <ClockIcon class="h-6 w-6 text-primary mr-2" />
              <h3 class="text-base font-semibold text-secondary">Format</h3>
            </div>
            <ul class="space-y-2 text-sm text-secondary/70">
              <li>• 2 jours (14h) en présentiel ou distanciel</li>
              <li>• Possibilité de 4 demi-journées</li>
              <li>• 6 à 12 participants maximum</li>
            </ul>
          </div>
          
          <div class="bg-white/50 p-6 rounded-xl shadow-sm">
            <div class="flex items-center mb-4">
              <CurrencyEuroIcon class="h-6 w-6 text-primary mr-2" />
              <h3 class="text-base font-semibold text-secondary">Contenu</h3>
            </div>
            <ul class="space-y-2 text-sm text-secondary/70">
              <li>• Maîtrise du prompt engineering</li>
              <li>• Intégration de l'IA dans vos outils métiers</li>
              <li>• Mise en pratique sur des cas d'usage concrets</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Témoignage -->
      <!-- <div class="mx-auto mt-12 max-w-2xl lg:mt-16 lg:max-w-none">
        <div class="bg-white/50 p-6 rounded-xl shadow-sm">
          <div class="flex items-start">
            <div class="flex-shrink-0 mr-4">
              <div class="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                <UserCircleIcon class="h-8 w-8 text-primary" />
              </div>
            </div>
            <div>
              <p class="text-sm italic text-secondary/80 mb-2">
                "Cette formation a transformé notre façon de travailler. Nous avons gagné un temps considérable sur nos tâches quotidiennes et nos équipes sont beaucoup plus autonomes avec l'IA."
              </p>
              <p class="text-xs font-medium text-secondary">Marie L. - Directrice Marketing, Secteur Retail</p>
            </div>
          </div>
        </div>
      </div> -->

      <!-- CTA -->
      <div class="mt-12 flex justify-center">
        <button
          type="button"
          class="group relative rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-secondary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
          @click="$emit('open-booking')"
        >
          <span class="block transition-opacity duration-300 group-hover:opacity-0">
            Réserver ma formation
          </span>
          <span class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            Demander un devis →
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { CheckCircleIcon, AcademicCapIcon, UsersIcon, ClockIcon, CurrencyEuroIcon, UserCircleIcon } from '@heroicons/vue/24/outline'

defineEmits<{
  (e: 'open-booking'): void
}>()

// État de l'onglet actif
const activeTab = ref('day1')

// Contenu jour 1
const day1Content = [
  'Fonctionnement et limites de ChatGPT et autres IA',
  'Techniques de prompt engineering pour obtenir des résultats précis',
  'Ateliers pratiques sur des cas d\'usage adaptés à votre métier',
  'Création de votre bibliothèque de prompts personnalisés'
]

// Contenu jour 2
const day2Content = [
  'Intégration de l\'IA dans vos workflows existants',
  'Création d\'automatisations sans code avec Zapier, Make, etc.',
  'Connexion de vos outils métiers avec l\'IA générative',
  'Construction de votre premier workflow automatisé'
]

// Bénéfices
const benefits = [
  'Support de formation complet et fiches pratiques',
  'Bibliothèque de prompts prêts à l\'emploi',
  '3 mois de support post-formation',
  'Certification "IA Générative & No-Code"',
  'Suivi personnalisé de mise en pratique'
]
</script> 