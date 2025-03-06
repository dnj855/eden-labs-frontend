<template>
  <div class="bg-transparent">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <!-- En-tête avec badge -->
      <div class="mx-auto max-w-2xl lg:text-center">
        <h2 class="text-base font-semibold leading-7 text-secondary">Coaching Personnalisé</h2>
        <p class="mt-2 text-3xl font-bold tracking-tight text-secondary sm:text-4xl">
          Transformez votre productivité
        </p>
        <div class="w-20 h-1 bg-primary/30 mx-auto mt-6"></div>
      </div>

      <!-- Parcours de coaching -->
      <div class="mx-auto mt-12 max-w-2xl lg:mt-16 lg:max-w-none">
          <!-- Étapes du parcours -->
          <div class="space-y-16">
            <div v-for="(step, index) in coachingSteps" :key="index" class="relative">
              <div class="flex flex-col md:flex-row gap-8">
                <!-- Numéro d'étape avec cercle -->
                <div class="flex md:flex-col items-center md:w-28">
                  <div class="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary z-10">
                    <span class="text-2xl font-bold">{{ index + 1 }}</span>
                  </div>
                  <div class="ml-4 md:ml-0 md:mt-4 flex-grow md:text-center">
                    <h3 class="text-lg font-semibold text-secondary">{{ step.title }}</h3>
                  </div>
                </div>
                
                <!-- Contenu de l'étape -->
                <div class="bg-white/50 rounded-xl p-6 shadow-sm flex-grow md:ml-4">
                  <p class="text-sm text-secondary/80 mb-4">{{ step.description }}</p>
                  <ul class="space-y-2">
                    <li v-for="(point, i) in step.points" :key="i" class="flex items-start">
                      <CheckIcon class="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                      <span class="text-sm text-secondary/70">{{ point }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
      </div>

      <!-- Points clés -->
      <div class="mx-auto mt-12 max-w-2xl lg:mt-16 lg:max-w-none">
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div v-for="(point, index) in keyPoints" :key="index" class="flex gap-x-3">
            <CheckIcon class="h-6 w-5 flex-none text-tertiary" aria-hidden="true" />
            <span class="text-sm leading-6 text-secondary/80">{{ point }}</span>
          </div>
        </div>
      </div>

      <!-- Formules de coaching -->
      <div class="mx-auto mt-16 max-w-2xl lg:mt-20 lg:max-w-none">
        <h3 class="text-xl font-semibold text-secondary text-center mb-8">Nos formules de coaching</h3>
        
        <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div v-for="(formula, index) in coachingFormulas" :key="index" 
               :class="[
                 'bg-white/50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col',
                 formula.title === 'Premium' ? 'ring-2 ring-primary scale-105 relative' : ''
               ]">
            <!-- En-tête de la formule -->
            <div :class="[
              'p-6',
              formula.title === 'Premium' ? 'bg-primary/20' : 'bg-primary/5'
            ]">
              <div class="flex justify-between items-start">
                <div>
                  <h4 class="text-lg font-semibold text-secondary">{{ formula.title }}</h4>
                  <p class="text-sm text-secondary/70 mt-1">{{ formula.subtitle }}</p>
                </div>
                <div v-if="formula.title === 'Premium'" class="bg-primary text-white text-xs px-2 py-1 rounded-full">
                  Recommandé
                </div>
              </div>
            </div>
            
            <!-- Contenu de la formule -->
            <div class="p-6 flex flex-col flex-grow">
              <div class="mb-4">
                <div v-if="formula.price">
                  <span class="text-2xl font-bold text-secondary">{{ formula.price }}</span>
                  <span class="text-sm text-secondary/70"> HT</span>
                </div>
                <div v-else>
                  <span class="text-2xl font-bold text-secondary">Sur demande</span>
                </div>
              </div>
              
              <ul class="space-y-3 mb-6">
                <li v-for="(feature, i) in formula.features" :key="i" class="flex items-start">
                  <CheckIcon class="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                  <span class="text-sm text-secondary/70">{{ feature }}</span>
                </li>
              </ul>
              
              <button
                type="button"
                class="w-full rounded-md bg-primary/10 px-3 py-2 text-sm font-medium text-primary hover:bg-primary/20 transition-colors mt-auto"
                @click="$emit('open-booking')"
              >
                {{ formula.cta }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Témoignages -->
      <!-- <div class="mx-auto mt-16 max-w-2xl lg:mt-20 lg:max-w-none">
        <div class="bg-white/50 rounded-xl p-6 shadow-sm">
          <h3 class="text-lg font-semibold text-secondary mb-6 text-center">Ce qu'en disent nos clients</h3>
          
          <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div v-for="(testimonial, index) in testimonials" :key="index" class="relative">
              <div class="absolute -top-2 -left-2 text-tertiary/20 text-4xl">"</div>
              <div class="pt-4 pl-4">
                <p class="text-sm italic text-secondary/80 mb-4">{{ testimonial.quote }}</p>
                <div class="flex items-center">
                  <div class="h-8 w-8 rounded-full bg-tertiary/20 flex items-center justify-center mr-3">
                    <UserCircleIcon class="h-6 w-6 text-tertiary" />
                  </div>
                  <div>
                    <p class="text-xs font-medium text-secondary">{{ testimonial.author }}</p>
                    <p class="text-xs text-secondary/70">{{ testimonial.position }}</p>
                  </div>
                </div>
              </div>
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
            Réserver un appel découverte
          </span>
          <span class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            Discuter de mon projet →
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SparklesIcon, CheckIcon, UserCircleIcon, UserGroupIcon } from '@heroicons/vue/24/outline'

defineEmits<{
  (e: 'open-booking'): void
}>()

// Données des étapes de coaching
const coachingSteps = [
  {
    title: 'Définition d\'objectifs',
    description: 'Nous commençons par identifier précisément vos priorités et besoins spécifiques.',
    points: [
      'Analyse de vos processus actuels et identification des opportunités',
      'Définition d\'objectifs mesurables et d\'un calendrier',
      'Création d\'une feuille de route personnalisée'
    ]
  },
  {
    title: 'Sessions d\'accompagnement',
    description: 'Un suivi régulier pour vous aider à implémenter l\'IA dans votre quotidien.',
    points: [
      'Aide à la rédaction et optimisation de prompts',
      'Configuration d\'automatisations adaptées à vos outils',
      'Résolution des blocages techniques et méthodologiques'
    ]
  },
  {
    title: 'Suivi et ajustements',
    description: 'Nous mesurons les résultats et affinons l\'approche pour maximiser les bénéfices.',
    points: [
      'Évaluation régulière des gains de productivité',
      'Ajustements basés sur vos retours d\'expérience',
      'Documentation des processus optimisés pour pérenniser les acquis'
    ]
  }
]

// Données des formules de coaching
const coachingFormulas = [
  {
    title: 'Essentiel',
    subtitle: 'Pour démarrer efficacement',
    price: '590€',
    features: [
      '5 heures d\'accompagnement',
      'Valable 2 mois',
      'Sessions en visioconférence',
      'Support par email entre les sessions'
    ],
    cta: 'Choisir cette formule'
  },
  {
    title: 'Premium',
    subtitle: 'Notre formule la plus populaire',
    price: '990€',
    features: [
      '10 heures d\'accompagnement',
      'Valable 3 mois',
      'Sessions en présentiel ou visio',
      'Support prioritaire',
      'Accès à notre bibliothèque de ressources'
    ],
    cta: 'Choisir cette formule'
  },
  {
    title: 'Entreprise',
    subtitle: 'Pour les équipes',
    features: [
      'Accompagnement d\'équipe',
      'Durée personnalisable',
      'Sessions collectives et individuelles',
      'Suivi de projet complet',
      'Reporting et mesure d\'impact'
    ],
    cta: 'Demander un devis'
  }
]

// Données des témoignages
const testimonials = [
  {
    quote: "Le coaching m'a permis de gagner un temps considérable. J'ai pu automatiser des tâches qui me prenaient des heures chaque semaine.",
    author: "Thomas M.",
    position: "Responsable Marketing, Secteur Tech"
  },
  {
    quote: "L'approche personnalisée a fait toute la différence. Les solutions proposées étaient parfaitement adaptées à nos outils et à notre façon de travailler.",
    author: "Sophie L.",
    position: "Directrice Communication, PME"
  }
]
</script> 