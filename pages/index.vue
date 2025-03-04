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
    <TransitionRoot appear :show="showBookingModal" as="template">
      <Dialog as="div" @close="showBookingModal = false" class="relative z-50">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black bg-opacity-25" />
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
              <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                  Réservation confirmée
                </DialogTitle>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    Merci pour votre intérêt ! Nous vous contacterons dans les 24h pour planifier votre audit.
                  </p>
                </div>

                <div class="mt-4">
                  <button
                    type="button"
                    class="inline-flex justify-center rounded-md border border-transparent bg-eden-100 px-4 py-2 text-sm font-medium text-eden-900 hover:bg-eden-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-eden-500 focus-visible:ring-offset-2"
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
  </div>
</template>

<script setup lang="ts">
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { onMounted, ref } from 'vue'

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

// Animations
onMounted(() => {
  // Animation Hero
  const heroEl = heroSection.value?.$el
  if (heroEl) {
    const heroTitle = heroEl.querySelector('h1')
    const heroStats = heroEl.querySelector('.stats')
    
    if (heroTitle) {
      gsap.from(heroTitle, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      })
    }

    if (heroStats) {
      gsap.from(heroStats, {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: 'power3.out'
      })
    }
  }

  // Animation des sections au scroll
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
        start: 'top 80%',
        end: 'top 20%',
        toggleActions: 'play none none reverse'
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    })
  })
})

// Méthodes de navigation
function scrollToSection(ref: any) {
  ref.value?.$el.scrollIntoView({ behavior: 'smooth' })
}

function scrollToSolutions() {
  scrollToSection(solutionsSection)
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
    }
  ]
})
</script> 