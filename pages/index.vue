<template>
  <div>
    <!-- Hero -->
    <TheHeroComponent
      ref="heroSection"
      @open-booking="openBookingModal"
      @open-solutions="scrollToSolutions"
    />

    <!-- Problématiques & Solutions -->
    <ProblemsSolutionsComponent
      ref="problemsSection"
    />

    <!-- Parcours -->
    <JourneyTimelineComponent
      ref="journeySection""
    />

    <!-- Solutions par secteur -->
    <SectorSolutionsComponent
      ref="sectorsSection"
    />

    <!-- Démo IA
    <AiDemoComponent
      ref="aiDemoSection"
      @start-audit="openBookingModal"
    /> -->

    <!-- Témoignages
    <TestimonialsComponent
      ref="testimonialsSection"
      @start-audit="openBookingModal"
    /> -->

    <!-- Ressources
    <ResourcesComponent
      ref="resourcesSection"
      @download-resource="downloadResource"
    /> -->

  </div>
</template>

<script setup lang="ts">
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { onBeforeUnmount, onMounted, ref } from 'vue'

// Types pour les composants

// Composants
import AiDemoComponent from '~/components/home/AiDemo.vue'
import JourneyTimelineComponent from '~/components/home/JourneyTimeline.vue'
import ProblemsSolutionsComponent from '~/components/home/ProblemsSolutions.vue'
import ResourcesComponent from '~/components/home/Resources.vue'
import SectorSolutionsComponent from '~/components/home/SectorSolutions.vue'
import TestimonialsComponent from '~/components/home/Testimonials.vue'
import TheHeroComponent from '~/components/home/TheHero.vue'

// Enregistrement du plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

// Refs pour les sections
const solutionsSection = ref<InstanceType<typeof ProblemsSolutionsComponent> | null>(null)
const resourcesSection = ref<InstanceType<typeof ResourcesComponent> | null>(null)
const heroSection = ref<InstanceType<typeof TheHeroComponent> | null>(null)
const problemsSection = ref<InstanceType<typeof ProblemsSolutionsComponent> | null>(null)
const journeySection = ref<InstanceType<typeof JourneyTimelineComponent> | null>(null)
const sectorsSection = ref<InstanceType<typeof SectorSolutionsComponent> | null>(null)
const aiDemoSection = ref<InstanceType<typeof AiDemoComponent> | null>(null)
const testimonialsSection = ref<InstanceType<typeof TestimonialsComponent> | null>(null)

// État des modals
const showBookingModal = ref(false)
const bookingModalInitialFocus = ref<HTMLButtonElement | null>(null)

// État de la section active pour la navigation
const activeSection = ref<string>('hero')

// Animations
onMounted(() => {
  // Détection de la préférence de réduction des animations
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Vérification de la taille d'écran pour les animations
  const isMobile = window.innerWidth < 768

  // Animations moins intenses sur mobile
  const defaultDuration = isMobile ? 0.7 : 1
  const defaultDelay = isMobile ? 0.3 : 0.5
  const defaultDistance = isMobile ? 30 : 50

  // Animation Hero
  const heroEl = heroSection.value?.$el
  if (heroEl && !prefersReducedMotion) {
    const heroTitle = heroEl.querySelector('h1')
    const heroStats = heroEl.querySelector('.stats')
    
    if (heroTitle) {
      gsap.from(heroTitle, {
        y: defaultDistance,
        opacity: 0,
        duration: defaultDuration,
        ease: 'power3.out'
      })
    }

    if (heroStats) {
      gsap.from(heroStats, {
        y: defaultDistance * 0.6,
        opacity: 0,
        duration: defaultDuration,
        delay: defaultDelay,
        ease: 'power3.out'
      })
    }
  }

  // Animation des sections au scroll
  if (!prefersReducedMotion) {
    const sections = [
      problemsSection.value?.$el,
      journeySection.value?.$el,
      sectorsSection.value?.$el,
      aiDemoSection.value?.$el,
      testimonialsSection.value?.$el,
      resourcesSection.value?.$el,
    ].filter((section): section is HTMLElement => section !== undefined && section !== null)

    sections.forEach((section) => {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          end: 'top 15%',
          toggleActions: 'play none none none'
        },
        y: defaultDistance,
        opacity: 0,
        duration: defaultDuration,
        ease: 'power2.out'
      })
    })
  }
})

onBeforeUnmount(() => {
  // Tuer toutes les animations GSAP
  gsap.killTweensOf('*')
  
  // Nettoyer tous les ScrollTriggers
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
})

// Méthodes de navigation
function scrollToSection(ref: any) {
  if (!ref.value?.$el) return
  
  // Détection du support pour scrollBehavior
  if ('scrollBehavior' in document.documentElement.style) {
    ref.value.$el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  } else {
    // Fallback pour les navigateurs qui ne supportent pas scrollBehavior
    const targetPosition = ref.value.$el.getBoundingClientRect().top + window.pageYOffset
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    })
  }
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

function scrollToSolutions() {
  scrollToSection(problemsSection)
}

function scrollToResources() {
  scrollToSection(resourcesSection)
}

// Handlers
function openBookingModal() {
  showBookingModal.value = true
}

function exploreSector(sector: string) {
  // TODO: Implémenter la navigation vers la page du secteur
  console.log('Explorer le secteur:', sector)
}

function openQualificationModal() {
  // TODO: Implémenter le modal de qualification
  console.log('Ouvrir le modal de qualification')
}

function openContactModal() {
  // TODO: Implémenter le modal de contact
  console.log('Ouvrir le modal de contact')
}

function downloadResource(resource: any) {
  // TODO: Implémenter le téléchargement de ressource
  console.log('Télécharger la ressource:', resource)
}

// SEO
useHead({
  title: 'Eden Labs - Experts en IA générative pour entreprises',
  meta: [
    {
      name: 'description',
      content: 'Eden Labs accompagne les entreprises dans leur transformation numérique grâce à l\'IA générative. Formations, consulting et solutions sur mesure.'
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0, maximum-scale=5.0'
    }
  ]
})
</script>