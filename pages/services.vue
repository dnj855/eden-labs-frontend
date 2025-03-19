<template>
  <div>
    <!-- Hero Section -->
    <OffresHeroComponent ref="heroSection" />

    <!-- Sections de services avec alternance de couleurs -->
    <div class="relative">
      <!-- Audit Flash Section -->
      <section class="bg-light py-10 sm:py-16 md:py-20 lg:py-24">
        <AuditFlashComponent ref="auditSection" @open-booking="openBookingModal" />
      </section>

      <!-- Formation Section -->
      <section class="bg-secondary/5 py-10 sm:py-16 md:py-20 lg:py-24">
        <FormationComponent ref="formationSection" @open-booking="openBookingModal" />
      </section>

      <!-- Ateliers Section -->
      <section class="bg-light py-10 sm:py-16 md:py-20 lg:py-24">
        <AteliersComponent ref="ateliersSection" @open-booking="openBookingModal" />
      </section>

      <!-- Coaching Section -->
      <section class="bg-secondary/5 py-10 sm:py-16 md:py-20 lg:py-24">
        <CoachingComponent ref="coachingSection" @open-booking="openBookingModal" />
      </section>

      <!-- Tableau Comparatif avec fond distinct -->
      <section class="bg-light py-10 sm:py-16 md:py-20 lg:py-24">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SolutionsComparisonComponent ref="comparisonSection" @open-booking="openBookingModal" />
        </div>
      </section>
    </div>

    <!-- Navigation latérale - version desktop -->
    <nav class="fixed left-8 top-1/2 transform -translate-y-1/2 z-40 hidden xl:block">
      <div class="space-y-6">
        <div v-for="section in sections" :key="section.id" class="group relative flex items-center">
          <button
            @click="scrollToSection(section.ref)"
            :class="[
              'w-3 h-3 rounded-full transition-all duration-300 border-2 relative z-10',
              activeSection === section.id 
                ? 'bg-primary border-primary' 
                : 'border-secondary/30 hover:border-primary'
            ]"
            :aria-label="`Aller à la section ${section.title}`"
          />
          <div class="flex items-center">
            <div class="w-8 h-[2px] scale-x-0 origin-left transition-transform duration-300 bg-primary group-hover:scale-x-100" />
            <span 
              class="absolute left-12 whitespace-nowrap px-3 py-1.5 text-sm text-secondary bg-white/90 rounded-md shadow-sm backdrop-blur-sm 
              opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
            >
              {{ section.title }}
            </span>
          </div>
        </div>
      </div>
    </nav>

    <!-- Modale de réservation -->
    <BookingModal 
      v-model="isBookingModalOpen"
      :is-submitting="isSubmitting"
      :notification="notification"
      @submit="handleBookingSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useBookingModal } from '~/composables/useBookingModal'

// Composants
import AteliersComponent from '~/components/services/Ateliers.vue'
import AuditFlashComponent from '~/components/services/AuditFlash.vue'
import CoachingComponent from '~/components/services/Coaching.vue'
import EvolutionSection from '~/components/services/EvolutionSection.vue'
import FormationComponent from '~/components/services/Formation.vue'
import OffresHeroComponent from '~/components/services/ServicesHero.vue'
import SolutionsComparisonComponent from '~/components/services/SolutionsComparison.vue'

// Enregistrement du plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

// Gestion de la modale de réservation
const { isBookingModalOpen, openBookingModal, handleBookingSubmit, isSubmitting, notification } = useBookingModal()

// Refs pour les sections
const heroSection = ref<InstanceType<typeof OffresHeroComponent> | null>(null)
const auditSection = ref<InstanceType<typeof AuditFlashComponent> | null>(null)
const formationSection = ref<InstanceType<typeof FormationComponent> | null>(null)
const ateliersSection = ref<InstanceType<typeof AteliersComponent> | null>(null)
const coachingSection = ref<InstanceType<typeof CoachingComponent> | null>(null)
const comparisonSection = ref<InstanceType<typeof SolutionsComparisonComponent> | null>(null)
const evolutionSection = ref<InstanceType<typeof EvolutionSection> | null>(null)

// État de la section active pour la navigation
const activeSection = ref<string>('hero')

// Détection réactive de l'appareil
const isMobile = ref(false)
const isTablet = ref(false)

// Configuration des sections pour la navigation
const sections = [
  { id: 'hero', title: 'Accueil', ref: heroSection },
  { id: 'audit', title: 'Audit Flash', ref: auditSection },
  { id: 'formation', title: 'Formation', ref: formationSection },
  { id: 'ateliers', title: 'Ateliers', ref: ateliersSection },
  { id: 'coaching', title: 'Coaching', ref: coachingSection },
  { id: 'comparison', title: 'Comparaison', ref: comparisonSection }
]

// Mise à jour des détecteurs d'appareil
function updateDeviceDetection() {
  isMobile.value = window.innerWidth < 640 // sm breakpoint
  isTablet.value = window.innerWidth >= 640 && window.innerWidth < 1024 // entre sm et lg
}

// Animations
onMounted(() => {
  // Mettre à jour les détecteurs d'appareil
  updateDeviceDetection()
  window.addEventListener('resize', updateDeviceDetection)

  // Détection de la préférence de réduction des animations
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Ajustement des paramètres d'animation en fonction de l'appareil
  const getAnimationParams = () => {
    if (isMobile.value) {
      return {
        duration: 0.6,
        delay: 0.2,
        distance: 20
      }
    } else if (isTablet.value) {
      return {
        duration: 0.8,
        delay: 0.3,
        distance: 35
      }
    } else {
      return {
        duration: 1,
        delay: 0.5,
        distance: 50
      }
    }
  }

  const { duration, delay, distance } = getAnimationParams()

  // Animation Hero
  const heroEl = heroSection.value?.$el
  if (heroEl && !prefersReducedMotion) {
    const heroTitle = heroEl.querySelector('h1')
    const heroContent = heroEl.querySelector('.hero-content')
    
    if (heroTitle) {
      gsap.from(heroTitle, {
        y: distance,
        opacity: 0,
        duration,
        ease: 'power3.out'
      })
    }

    if (heroContent) {
      gsap.from(heroContent, {
        y: distance * 0.6,
        opacity: 0,
        duration,
        delay,
        ease: 'power3.out'
      })
    }
  }

  // Animation des sections au scroll avec effet de parallaxe
  if (!prefersReducedMotion) {
    const sections = [
      auditSection.value?.$el,
      formationSection.value?.$el,
      ateliersSection.value?.$el,
      coachingSection.value?.$el,
      comparisonSection.value?.$el,
      evolutionSection.value?.$el
    ].filter((section): section is HTMLElement => section !== undefined && section !== null)

    sections.forEach((section) => {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          end: 'top 15%',
          toggleActions: 'play none none none'
        },
        y: distance,
        opacity: 0,
        duration,
        ease: 'power2.out'
      })
    })
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateDeviceDetection)
  
  // Tuer toutes les animations GSAP
  gsap.killTweensOf('*')
  
  // Nettoyer tous les ScrollTriggers
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
})

// Méthodes de navigation
function scrollToSection(ref: any) {
  if (!ref.value?.$el) return
  
  // Calcul de la position avec offset ajusté en fonction de l'appareil
  // Sur mobile, compenser la hauteur de la navigation
  const offset = isMobile.value ? 70 : isTablet.value ? 48 : 32
  const targetPosition = ref.value.$el.getBoundingClientRect().top + window.pageYOffset - offset
  
  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
  })
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

function subscribeNewsletter(email: string) {
  // TODO: Implémenter l'inscription à la newsletter
  console.log('Inscription à la newsletter:', email)
}

// SEO
useHead({
  title: 'Nos Solutions d\'IA Générative pour Entreprises | Eden Labs',
  meta: [
    {
      name: 'description',
      content: 'Découvrez nos solutions d\'accompagnement IA pour entreprises : audit flash, formation, ateliers thématiques et coaching personnalisé. Transformez votre productivité sans expertise technique.'
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0, maximum-scale=5.0'
    }
  ]
})
</script>

<style scoped>
/* Effet de transition entre les sections */
section {
  position: relative;
  overflow: hidden;
}

section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  opacity: 0.03;
  pointer-events: none;
}

/* Masquage du parallaxe sur mobile */
@media (max-width: 640px) {
  section::before {
    display: none;
  }
}

/* Effet de surbrillance pour la navigation */
nav button.active {
  width: 5px;
  height: 5px;
  background-color: var(--color-primary);
}

/* Ajustements pour la navigation mobile */
@media (max-width: 1023px) {
  /* Ajouter du padding au bas de la page pour compenser la navigation fixe */
  body {
    padding-bottom: 3rem;
  }
}
</style>