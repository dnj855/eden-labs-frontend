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
      @open-qualification="openQualificationModal"
    />

    <!-- Parcours -->
    <JourneyTimelineComponent
      ref="journeySection"
      @start-audit="openBookingModal"
      @learn-more="scrollToResources"
    />

    <!-- Solutions par secteur -->
    <SectorSolutionsComponent
      ref="sectorsSection"
      @explore-sector="exploreSector"
      @contact="openContactModal"
    />

    <!-- Démo IA -->
    <AiDemoComponent
      ref="aiDemoSection"
      @start-audit="openBookingModal"
    />

    <!-- Témoignages -->
    <TestimonialsComponent
      ref="testimonialsSection"
      @start-audit="openBookingModal"
    />

    <!-- Ressources -->
    <ResourcesComponent
      ref="resourcesSection"
      @download-resource="downloadResource"
      @subscribe="subscribeNewsletter"
    />

    <!-- CTA Booking -->
    <BookingCTAComponent
      ref="bookingSection"
      @submit-booking="submitBooking"
    />

    <!-- Modals -->
    <!-- Modal de réservation -->
    <TransitionRoot appear :show="showBookingModal" as="template">
      <Dialog as="div" @close="showBookingModal = false" class="relative z-50" :initialFocus="bookingModalInitialFocus">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-4 sm:p-6 text-left align-middle shadow-xl transition-all">
                <div class="absolute top-0 right-0 pt-4 pr-4">
                  <button
                    type="button"
                    class="text-secondary/50 hover:text-secondary focus:outline-none focus:ring-2 focus:ring-primary"
                    @click="showBookingModal = false"
                  >
                    <span class="sr-only">Fermer</span>
                    <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                
                <DialogTitle as="h3" class="text-lg sm:text-xl font-headers font-medium leading-6 text-secondary">
                  Réservation confirmée
                </DialogTitle>
                <div class="mt-2">
                  <p class="text-sm sm:text-base text-secondary/70">
                    Merci pour votre intérêt ! Nous vous contacterons dans les 24h pour planifier votre audit.
                  </p>
                </div>

                <div class="mt-4 sm:mt-6">
                  <button
                    ref="bookingModalInitialFocus"
                    type="button"
                    class="inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm sm:text-base font-medium text-secondary hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    @click="showBookingModal = false"
                  >
                    Compris, merci !
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Bouton retour en haut -->
    <transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0 translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-4"
    >
      <button 
        v-show="showScrollTopButton" 
        @click="scrollToTop"
        class="fixed bottom-6 right-6 z-40 p-2 bg-secondary/80 hover:bg-secondary text-light rounded-full shadow-lg transition-all duration-300"
        aria-label="Retour en haut de page"
      >
        <ArrowUpIcon class="h-5 w-5" />
      </button>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { ArrowUpIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { onMounted, onBeforeUnmount, ref } from 'vue'

// Types pour les composants

// Composants
import AiDemoComponent from '~/components/home/AiDemo.vue'
import BookingCTAComponent from '~/components/home/BookingCTA.vue'
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
const bookingSection = ref<InstanceType<typeof BookingCTAComponent> | null>(null)

// État des modals
const showBookingModal = ref(false)
const bookingModalInitialFocus = ref<HTMLButtonElement | null>(null)

// État du bouton de retour en haut
const showScrollTopButton = ref(false)

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
      bookingSection.value?.$el
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

  // Gestionnaire de défilement pour le bouton de retour en haut
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  // Nettoyer les écouteurs d'événements
  window.removeEventListener('scroll', handleScroll)
  
  // Tuer toutes les animations GSAP
  gsap.killTweensOf('*')
  
  // Nettoyer tous les ScrollTriggers
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
})

// Gérer l'affichage du bouton de retour en haut
function handleScroll() {
  showScrollTopButton.value = window.scrollY > window.innerHeight
}

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

function subscribeNewsletter(email: string) {
  // TODO: Implémenter l'inscription à la newsletter
  console.log('Inscription à la newsletter:', email)
}

function submitBooking(formData: any) {
  // TODO: Implémenter la soumission du formulaire
  console.log('Soumission du formulaire:', formData)
  openBookingModal()
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