<template>
  <div class="bg-transparent">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <!-- En-tête avec badge -->
      <div class="mx-auto max-w-2xl lg:text-center">
        <h2 class="text-base font-semibold leading-7 text-secondary">Ateliers Thématiques</h2>
        <p class="mt-2 text-3xl font-bold tracking-tight text-secondary sm:text-4xl">
          Approfondissez vos compétences
        </p>
        <div class="w-20 h-1 bg-primary/30 mx-auto mt-6"></div>
      </div>

      <!-- Filtres par catégorie -->
      <div class="mx-auto mt-12 max-w-2xl lg:mt-16 lg:max-w-none">
        <div class="flex flex-wrap justify-center gap-4">
          <button
            v-for="category in categories"
            :key="category.id"
            @click="activeCategory = category.id"
            :class="[
              'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
              activeCategory === category.id
                ? 'bg-secondary text-white'
                : 'bg-white/50 text-secondary/70 hover:bg-secondary/10 hover:text-secondary'
            ]"
          >
            {{ category.name }}
          </button>
        </div>
      </div>

      <!-- Liste des ateliers -->
      <div class="mx-auto mt-12 max-w-2xl lg:mt-16 lg:max-w-none">
        <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="atelier in filteredAteliers"
            :key="atelier.title"
            class="relative flex flex-col h-full bg-white/50 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
          >
            <!-- Badge de niveau -->
            <span :class="[
              'absolute top-4 right-4 px-2.5 py-1 rounded-full text-xs font-medium',
              {
                'bg-green-100 text-green-800': atelier.level === 'débutant',
                'bg-yellow-100 text-yellow-800': atelier.level === 'intermédiaire',
                'bg-blue-100 text-blue-800': atelier.level === 'avancé',
                'bg-gray-100 text-gray-800': atelier.level === 'tous niveaux'
              }
            ]">
              {{ atelier.level }}
            </span>

            <!-- En-tête de la card -->
            <div class="flex-none">
              <div class="text-4xl mb-4">{{ atelier.icon }}</div>
              <h3 class="text-lg font-semibold text-secondary">{{ atelier.title }}</h3>
            </div>

            <!-- Corps de la card -->
            <div class="flex-grow mt-4">
              <p class="text-sm text-secondary/70 mb-4">{{ atelier.description }}</p>
              <div class="space-y-2">
                <div class="flex items-center text-sm text-secondary/70">
                  <ClockIcon class="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>{{ atelier.duration }}</span>
                </div>
                <div class="flex items-center text-sm text-secondary/70">
                  <UserGroupIcon class="h-4 w-4 mr-2 flex-shrink-0" />
                  <span>{{ atelier.format }}</span>
                </div>
              </div>
            </div>

            <!-- Pied de la card -->
            <div class="flex-none mt-4 pt-4 border-t border-secondary/20">
              <div class="flex items-center justify-between">
                <span class="text-sm font-medium text-tertiary">{{ atelier.category }}</span>
                <button
                  type="button"
                  class="text-sm font-medium text-secondary hover:text-tertiary"
                  @click="$emit('open-booking')"
                >
                  En savoir plus →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Informations complémentaires -->
      <div class="mx-auto mt-16 max-w-2xl lg:mt-20 lg:max-w-none">
        <div class="bg-white/50 rounded-xl p-6 shadow-sm">
          <h3 class="text-lg font-semibold text-secondary mb-4">Informations pratiques</h3>
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <h4 class="text-sm font-medium text-secondary flex items-center">
                <UserGroupIcon class="h-5 w-5 text-tertiary mr-2" />
                Participants
              </h4>
              <p class="mt-2 text-sm text-secondary/70">4 à 8 personnes par atelier pour garantir un suivi personnalisé</p>
            </div>
            <div>
              <h4 class="text-sm font-medium text-secondary flex items-center">
                <CurrencyEuroIcon class="h-5 w-5 text-tertiary mr-2" />
                Tarifs
              </h4>
              <p class="mt-2 text-sm text-secondary/70">À partir de 490€ HT par personne, tarifs dégressifs pour les groupes</p>
            </div>
            <div>
              <h4 class="text-sm font-medium text-secondary flex items-center">
                <AdjustmentsVerticalIcon class="h-5 w-5 text-tertiary mr-2" />
                Sur mesure
              </h4>
              <p class="mt-2 text-sm text-secondary/70">D'autres ateliers peuvent être organisés en fonction de vos besoins</p>
            </div>
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
            Réserver un atelier
          </span>
          <span class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            Voir le calendrier →
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { BeakerIcon, CheckIcon, UserGroupIcon, CurrencyEuroIcon, ClockIcon, AcademicCapIcon, AdjustmentsVerticalIcon } from '@heroicons/vue/24/outline'

defineEmits<{
  (e: 'open-booking'): void
}>()

// État de la catégorie active
const activeCategory = ref('all')

// Définition des catégories
const categories = [
  { id: 'all', name: 'Tous les ateliers' },
  { id: 'marketing', name: 'Marketing' },
  { id: 'rh', name: 'Ressources Humaines' },
  { id: 'creation', name: 'Création' },
  { id: 'automatisation', name: 'Automatisation' }
]

// Données des ateliers
const ateliers = [
  {
    title: 'IA pour le marketing digital',
    icon: '🖋️',
    duration: '0,5 à 1 jour',
    format: 'présentiel ou distanciel',
    level: 'tous niveaux',
    category: 'marketing',
    description: 'Optimisez votre stratégie marketing avec l\'IA générative.',
    keyPoints: [
      'SEO et contenu optimisé pour les moteurs de recherche',
      'Campagnes publicitaires automatisées',
      'Analyse prédictive des tendances marketing'
    ]
  },
  {
    title: 'IA pour les ressources humaines',
    icon: '👥',
    duration: '0,5 jour',
    format: 'présentiel ou distanciel',
    level: 'débutant',
    category: 'rh',
    description: 'Transformez vos processus RH grâce à l\'IA.',
    keyPoints: [
      'Automatisation du tri de CV',
      'Rédaction d\'offres d\'emploi optimisées',
      'Optimisation des processus d\'onboarding'
    ]
  },
  {
    title: 'Midjourney & Création visuelle',
    icon: '🎨',
    duration: '0,5 jour',
    format: 'présentiel ou distanciel',
    level: 'tous niveaux',
    category: 'creation',
    description: 'Maîtrisez la génération d\'images IA pour votre communication.',
    keyPoints: [
      'Techniques de prompt pour images de qualité',
      'Création d\'identité visuelle cohérente',
      'Édition et retouche des images générées'
    ]
  },
  {
    title: 'Automatisation No-Code',
    icon: '⚙️',
    duration: '1 jour',
    format: 'présentiel ou distanciel',
    level: 'intermédiaire',
    category: 'automatisation',
    description: 'Créez des workflows automatisés complexes sans coder.',
    keyPoints: [
      'Intégration multi-plateformes (Zapier, Make, etc.)',
      'Automatisation des processus métier',
      'Création de tableaux de bord personnalisés'
    ]
  },
  {
    title: 'Copywriting avec l\'IA',
    icon: '📝',
    duration: '0,5 jour',
    format: 'présentiel ou distanciel',
    level: 'débutant',
    category: 'marketing',
    description: 'Rédigez des textes persuasifs et engageants avec l\'IA.',
    keyPoints: [
      'Techniques de storytelling assisté par IA',
      'Adaptation du ton et du style à votre audience',
      'Optimisation des textes pour la conversion'
    ]
  },
  {
    title: 'Analyse de données avec l\'IA',
    icon: '📊',
    duration: '1 jour',
    format: 'présentiel ou distanciel',
    level: 'avancé',
    category: 'automatisation',
    description: 'Exploitez vos données business avec l\'IA sans compétences techniques.',
    keyPoints: [
      'Visualisation de données simplifiée',
      'Détection de tendances et insights',
      'Création de rapports automatisés'
    ]
  }
]

// Filtrage des ateliers par catégorie
const filteredAteliers = computed(() => {
  if (activeCategory.value === 'all') {
    return ateliers
  }
  return ateliers.filter(atelier => atelier.category === activeCategory.value)
})
</script> 