<template>
  <div class="bg-transparent">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <!-- En-tête -->
      <div class="mx-auto max-w-2xl lg:text-center mb-12">
        
        <h2 class="text-base font-semibold leading-7 text-secondary">Quelle solution vous convient ?</h2>
        <p class="mt-2 text-3xl font-bold tracking-tight text-secondary sm:text-4xl">
          Choisissez selon votre besoin
        </p>
        <div class="w-20 h-1 bg-primary/30 mx-auto mt-6"></div>
      </div>

      <!-- Tableau comparatif version mobile -->
      <div class="lg:hidden space-y-6">
        <div v-for="(solution, index) in solutions" :key="index" class="bg-white/50 rounded-xl p-6 shadow-sm">
          <div class="flex items-center mb-4">
            <div class="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mr-3">
              <component :is="solution.icon" class="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 class="text-base font-semibold text-secondary">{{ solution.name }}</h3>
              <p class="text-xs text-secondary/70">{{ solution.situation }}</p>
            </div>
          </div>
          
          <div class="space-y-3 mt-4">
            <div class="flex items-start">
              <CheckIcon class="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
              <span class="text-sm text-secondary/80">{{ solution.result }}</span>
            </div>
            <div class="flex items-start">
              <ClockIcon class="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
              <span class="text-sm text-secondary/80">{{ solution.duration }}</span>
            </div>
            <div class="flex items-start">
              <UserGroupIcon class="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
              <span class="text-sm text-secondary/80">{{ solution.audience }}</span>
            </div>
          </div>
          
          <div class="mt-6">
            <button
              type="button"
              class="w-full rounded-md bg-primary/10 px-3 py-2 text-sm font-medium text-primary hover:bg-primary/20 transition-colors"
              @click="$emit('open-booking')"
            >
              En savoir plus
            </button>
          </div>
        </div>
      </div>

      <!-- Tableau comparatif version desktop -->
      <div class="hidden lg:block">
        <div class="overflow-hidden bg-white/50 shadow-sm ring-1 ring-secondary/10 sm:rounded-lg">
          <table class="min-w-full divide-y divide-secondary/10">
            <thead>
              <tr>
                <th scope="col" class="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-secondary bg-primary/5">Solution</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-secondary bg-primary/5">Pour qui ?</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-secondary bg-primary/5">Résultat attendu</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-secondary bg-primary/5">Durée</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-secondary bg-primary/5">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-secondary/10">
              <tr v-for="(solution, index) in solutions" :key="index" class="hover:bg-primary/5 transition-colors">
                <td class="whitespace-nowrap py-4 pl-6 pr-3">
                  <div class="flex items-center">
                    <div class="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center mr-3">
                      <component :is="solution.icon" class="h-4 w-4 text-primary" />
                    </div>
                    <span class="text-sm font-medium text-secondary">{{ solution.name }}</span>
                  </div>
                </td>
                <td class="px-3 py-4">
                  <span class="text-sm text-secondary/80">{{ solution.situation }}</span>
                </td>
                <td class="px-3 py-4">
                  <span class="text-sm text-secondary/80">{{ solution.result }}</span>
                </td>
                <td class="px-3 py-4">
                  <span class="text-sm text-secondary/80">{{ solution.duration }}</span>
                </td>
                <td class="px-3 py-4">
                  <button
                    type="button"
                    class="rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary hover:bg-primary/20 transition-colors"
                    @click="$emit('open-booking')"
                  >
                    Choisir
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Note explicative -->
      <div class="mt-8 text-center">
        <p class="text-sm text-secondary/70 italic">
          Besoin d'aide pour choisir ? <button @click="$emit('open-booking')" class="text-primary hover:underline">Contactez-nous</button> pour un conseil personnalisé.
        </p>
      </div>

      <!-- Section Packs -->
      <div class="mt-16">
        <div class="text-center">
          <h3 class="text-2xl font-bold text-secondary">Nos Packs Avantageux</h3>
          <p class="mt-3 text-secondary/70">Combinez nos solutions pour un accompagnement optimal et économique</p>
        </div>

        <div class="mt-8 grid gap-6 lg:grid-cols-2">
          <!-- Pack Essentiel -->
          <div class="relative rounded-2xl border border-secondary/10 bg-white/50 p-6 flex flex-col">
            <div class="absolute -top-3 left-4">
              <span class="bg-primary text-white text-xs px-3 py-1 rounded-full font-medium">10% de réduction</span>
            </div>
            <div class="flex items-center gap-4">
              <div class="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <RocketLaunchIcon class="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 class="text-lg font-semibold text-secondary">Pack Essentiel</h4>
                <p class="text-sm text-secondary/70">Formation complète + Atelier sur mesure</p>
              </div>
            </div>
            <ul class="mt-6 space-y-3 flex-grow">
              <li class="flex items-start gap-2">
                <CheckIcon class="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span class="text-sm text-secondary/80">Audit Flash & Diagnostic personnalisé</span>
              </li>
              <li class="flex items-start gap-2">
                <CheckIcon class="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span class="text-sm text-secondary/80">Formation "Socle" IA & No-Code (2 jours)</span>
              </li>
              <li class="flex items-start gap-2">
                <CheckIcon class="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span class="text-sm text-secondary/80">1 atelier thématique personnalisé (0,5 jour)</span>
              </li>
            </ul>
            <button @click="$emit('open-booking')" class="mt-6 w-full rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90">
              Réserver ce pack
            </button>
          </div>

          <!-- Pack Accélération -->
          <div class="relative rounded-2xl border border-primary bg-white/50 p-6 flex flex-col">
            <div class="absolute -top-3 left-4">
              <span class="bg-primary text-white text-xs px-3 py-1 rounded-full font-medium">15% de réduction</span>
            </div>
            <div class="absolute -top-3 right-4">
              <span class="bg-secondary text-white text-xs px-3 py-1 rounded-full">Le plus complet</span>
            </div>
            <div class="flex items-center gap-4">
              <div class="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <SparklesIcon class="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 class="text-lg font-semibold text-secondary">Pack Accélération IA</h4>
                <p class="text-sm text-secondary/70">Accompagnement complet sur 3 mois</p>
              </div>
            </div>
            <ul class="mt-6 space-y-3 flex-grow">
              <li class="flex items-start gap-2">
                <CheckIcon class="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span class="text-sm text-secondary/80">Audit Flash & Diagnostic personnalisé</span>
              </li>
              <li class="flex items-start gap-2">
                <CheckIcon class="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span class="text-sm text-secondary/80">Formation "Socle" IA & No-Code (2 jours)</span>
              </li>
              <li class="flex items-start gap-2">
                <CheckIcon class="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span class="text-sm text-secondary/80">2 ateliers thématiques personnalisés (1 jour)</span>
              </li>
              <li class="flex items-start gap-2">
                <CheckIcon class="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span class="text-sm text-secondary/80">1 mois de coaching personnalisé (5h)</span>
              </li>
            </ul>
            <button @click="$emit('open-booking')" class="mt-6 w-full rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90">
              Découvrir ce pack
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { 
  ScaleIcon, 
  CheckIcon, 
  ClockIcon, 
  UserGroupIcon, 
  LightBulbIcon, 
  AcademicCapIcon, 
  BeakerIcon, 
  SparklesIcon,
  RocketLaunchIcon,
  TagIcon
} from '@heroicons/vue/24/outline'

defineEmits<{
  (e: 'open-booking'): void
}>()

// Données des solutions
const solutions = [
  {
    name: 'Audit Flash & Diagnostic',
    icon: LightBulbIcon,
    situation: 'Vous débutez et souhaitez identifier vos opportunités',
    result: 'Identification de 3-5 cas d\'usage concrets pour votre entreprise',
    duration: '45 minutes d\'entretien + 30 minutes de restitution',
    audience: 'Tous secteurs et fonctions'
  },
  {
    name: 'Formation "Socle" IA & No-Code',
    icon: AcademicCapIcon,
    situation: 'Vous voulez acquérir les compétences fondamentales',
    result: 'Autonomie complète sur l\'IA et l\'automatisation',
    duration: '2 jours (14h)',
    audience: 'Managers et équipes opérationnelles'
  },
  {
    name: 'Ateliers Thématiques',
    icon: BeakerIcon,
    situation: 'Vous avez des besoins spécifiques et ciblés',
    result: 'Maîtrise approfondie sur un cas d\'usage précis',
    duration: '0,5 à 1 jour par atelier',
    audience: 'Équipes avec des besoins spécifiques'
  },
  {
    name: 'Coaching Personnalisé',
    icon: SparklesIcon,
    situation: 'Vous souhaitez un accompagnement sur mesure',
    result: 'Implémentation concrète et mesurable dans votre quotidien',
    duration: 'Forfaits de 5 à 10 heures',
    audience: 'Individus ou équipes en transformation'
  }
]
</script> 