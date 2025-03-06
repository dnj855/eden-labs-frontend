<template>
  <div class="bg-transparent">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <!-- En-tête avec badge -->
      <div class="mx-auto max-w-2xl lg:text-center">
        <span class="inline-flex items-center rounded-md bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
          <ClockIcon class="h-4 w-4 mr-1" />
          Rapide et efficace
        </span>
        <h2 class="text-base font-semibold leading-7 text-secondary">Audit Flash & Diagnostic Initial</h2>
        <p class="mt-2 text-3xl font-bold tracking-tight text-secondary sm:text-4xl">
          Identifiez vos opportunités d'optimisation
        </p>
        <div class="w-20 h-1 bg-primary/30 mx-auto mt-6"></div>
      </div>

      <!-- Étapes simplifiées -->
      <div class="mx-auto mt-12 max-w-2xl lg:mt-16 lg:max-w-none">
        <dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3">
          <div class="relative flex flex-col bg-white/50 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
            <div class="absolute -top-5 left-6 flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white">
              <span class="text-lg font-bold">1</span>
            </div>
            <dt class="flex items-center gap-x-3 text-base font-semibold leading-7 text-secondary mt-4">
              <span>Analyse de vos process</span>
            </dt>
            <dd class="mt-2 text-sm leading-6 text-secondary/70">
              <p>45 minutes d'entretien - Cartographie de vos tâches chronophages</p>
            </dd>
          </div>
          
          <div class="relative flex flex-col bg-white/50 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
            <div class="absolute -top-5 left-6 flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white">
              <span class="text-lg font-bold">2</span>
            </div>
            <dt class="flex items-center gap-x-3 text-base font-semibold leading-7 text-secondary mt-4">
              <span>Diagnostic d'opportunités</span>
            </dt>
            <dd class="mt-2 text-sm leading-6 text-secondary/70">
              <p>2-3 jours - Identification des points d'optimisation</p>
            </dd>
          </div>
          
          <div class="relative flex flex-col bg-white/50 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
            <div class="absolute -top-5 left-6 flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white">
              <span class="text-lg font-bold">3</span>
            </div>
            <dt class="flex items-center gap-x-3 text-base font-semibold leading-7 text-secondary mt-4">
              <span>Présentation des résultats</span>
            </dt>
            <dd class="mt-2 text-sm leading-6 text-secondary/70">
              <p>30 minutes de restitution - Plan d'action concret et applicable</p>
            </dd>
          </div>
        </dl>
      </div>

      <!-- Contenu en onglets -->
      <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:max-w-none">
        <div class="flex border-b border-secondary/20 mb-8">
          <button 
            @click="activeTab = 'benefits'" 
            :class="[
              'py-2 px-4 text-sm font-medium border-b-2 -mb-px',
              activeTab === 'benefits' 
                ? 'border-tertiary text-tertiary' 
                : 'border-transparent text-secondary/70 hover:text-secondary hover:border-secondary/30'
            ]"
          >
            Ce que vous obtenez
          </button>
          <button 
            @click="activeTab = 'faq'" 
            :class="[
              'py-2 px-4 text-sm font-medium border-b-2 -mb-px',
              activeTab === 'faq' 
                ? 'border-tertiary text-tertiary' 
                : 'border-transparent text-secondary/70 hover:text-secondary hover:border-secondary/30'
            ]"
          >
            Questions fréquentes
          </button>
        </div>

        <!-- Contenu des onglets -->
        <div v-if="activeTab === 'benefits'" class="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div v-for="(benefit, index) in benefits" :key="index" class="flex gap-x-3">
            <CheckCircleIcon class="h-6 w-5 flex-none text-tertiary" aria-hidden="true" />
            <span class="text-sm leading-6 text-secondary/80">{{ benefit }}</span>
          </div>
          <div class="sm:col-span-2 mt-2">
            <p class="text-xs text-secondary/70 italic">
              Le contenu exact de votre diagnostic sera adapté à vos enjeux spécifiques et à la réalité de votre entreprise.
            </p>
          </div>
        </div>

        <div v-if="activeTab === 'faq'" class="space-y-6">
          <div v-for="(item, index) in faq" :key="index" class="bg-white/50 p-4 rounded-lg">
            <dt class="text-sm font-semibold leading-7 text-secondary">{{ item.question }}</dt>
            <dd class="mt-2 text-sm leading-6 text-secondary/70">{{ item.answer }}</dd>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="mt-12 flex justify-center">
        <button
          type="button"
          class="group relative rounded-full bg-tertiary px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-tertiary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tertiary"
          @click="$emit('open-booking')"
        >
          <span class="block transition-opacity duration-300 group-hover:opacity-0">
            Réserver mon audit flash
          </span>
          <span class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            Commencer maintenant →
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ClockIcon, CheckCircleIcon } from '@heroicons/vue/24/outline'

defineEmits<{
  (e: 'open-booking'): void
}>()

// État de l'onglet actif
const activeTab = ref('benefits')

// Données des bénéfices
const benefits = [
  'Mini-rapport de diagnostic personnalisé listant 3-5 cas d\'usage concrets pour votre entreprise',
  'Plan de formation et recommandations adaptés à vos besoins spécifiques',
  'Cartographie visuelle des processus optimisables',
  'Estimation précise des gains de temps et de l\'amélioration de productivité attendus'
]

// Données FAQ
const faq = [
  {
    question: 'Combien de temps dois-je y consacrer personnellement ?',
    answer: 'Moins de 2h de votre temps (45 minutes d\'entretien initial et 30 minutes de restitution).'
  },
  {
    question: 'Dois-je déjà utiliser l\'IA pour bénéficier de l\'audit ?',
    answer: 'Absolument pas ! L\'audit est justement conçu pour vous guider depuis le point de départ.'
  },
  {
    question: 'Cet audit m\'engage-t-il pour d\'autres services ?',
    answer: 'Non, l\'audit est totalement indépendant. Vous restez libre de mettre en œuvre les recommandations par vous-même.'
  }
]
</script> 