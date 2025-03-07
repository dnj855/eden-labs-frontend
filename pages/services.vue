<template>
  <div>
    <!-- Hero Section -->
    <OffresHeroComponent ref="heroSection" />

    <!-- Sections de services avec alternance de couleurs -->
    <div class="relative">
      <!-- Audit Flash Section -->
      <section class="bg-light py-16 sm:py-24">
        <AuditFlashComponent ref="auditSection" @open-booking="openBookingModal" />
      </section>

      <!-- Formation Section -->
      <section class="bg-secondary/5 py-16 sm:py-24">
        <FormationComponent ref="formationSection" @open-booking="openBookingModal" />
      </section>

      <!-- Ateliers Section -->
      <section class="bg-light py-16 sm:py-24">
        <AteliersComponent ref="ateliersSection" @open-booking="openBookingModal" />
      </section>

      <!-- Coaching Section -->
      <section class="bg-secondary/5 py-16 sm:py-24">
        <CoachingComponent ref="coachingSection" @open-booking="openBookingModal" />
      </section>

      <!-- Tableau Comparatif avec fond distinct -->
      <section class="bg-light py-16 sm:py-24">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
          <SolutionsComparisonComponent ref="comparisonSection" @open-booking="openBookingModal" />
        </div>
      </section>

      <!-- Évolution Section avec fond distinct -->
      <!-- <section class="bg-gradient-to-b from-light to-secondary/5 py-16 sm:py-24">
        <EvolutionSection ref="evolutionSection" @subscribe="subscribeNewsletter" />
      </section> -->
    </div>

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
        class="fixed bottom-6 right-6 z-40 p-3 bg-primary text-light rounded-full shadow-lg transition-all duration-300 hover:bg-primary-dark"
        aria-label="Retour en haut de page"
      >
        <ArrowUpIcon class="h-5 w-5" />
      </button>
    </transition>

    <!-- Modal de réservation -->
    <TransitionRoot as="template" :show="showBookingModal">
      <Dialog as="div" class="relative z-50" @close="showBookingModal = false" :initial-focus="bookingModalInitialFocus">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>

        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild
              as="template"
              enter="ease-out duration-300"
              enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leave-from="opacity-100 translate-y-0 sm:scale-100"
              leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div class="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    @click="showBookingModal = false"
                    ref="bookingModalInitialFocus"
                  >
                    <span class="sr-only">Fermer</span>
                    <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div class="sm:flex sm:items-start">
                  <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                    <DialogTitle as="h3" class="text-xl font-semibold leading-6 text-secondary">
                      Réserver une consultation
                    </DialogTitle>
                    <div class="mt-6">
                      <form class="space-y-4" @submit.prevent="submitBooking">
                        <div>
                          <label for="name" class="block text-sm font-medium text-secondary">Nom complet</label>
                          <div class="mt-1">
                            <input
                              type="text"
                              name="name"
                              id="name"
                              class="block w-full rounded-md border-secondary/20 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                              placeholder="Votre nom"
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <label for="email" class="block text-sm font-medium text-secondary">Email</label>
                          <div class="mt-1">
                            <input
                              type="email"
                              name="email"
                              id="email"
                              class="block w-full rounded-md border-secondary/20 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                              placeholder="votre@email.com"
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <label for="service" class="block text-sm font-medium text-secondary">Service souhaité</label>
                          <div class="mt-1">
                            <select
                              id="service"
                              name="service"
                              class="block w-full rounded-md border-secondary/20 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                              required
                            >
                              <option value="">Sélectionnez un service</option>
                              <option value="audit">Audit Flash & Diagnostic</option>
                              <option value="formation">Formation "Socle" IA & No-Code</option>
                              <option value="ateliers">Ateliers Thématiques</option>
                              <option value="coaching">Coaching Personnalisé</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <label for="message" class="block text-sm font-medium text-secondary">Message (optionnel)</label>
                          <div class="mt-1">
                            <textarea
                              id="message"
                              name="message"
                              rows="3"
                              class="block w-full rounded-md border-secondary/20 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                              placeholder="Précisez votre demande..."
                            ></textarea>
                          </div>
                        </div>
                        <div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                          <button
                            type="submit"
                            class="inline-flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:col-start-2"
                          >
                            Envoyer ma demande
                          </button>
                          <button
                            type="button"
                            class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-secondary shadow-sm ring-1 ring-inset ring-secondary/20 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                            @click="showBookingModal = false"
                          >
                            Annuler
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Navigation latérale -->
    <nav class="fixed left-8 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
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
  </div>
</template>

<script setup lang="ts">
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { ArrowUpIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { onBeforeUnmount, onMounted, ref } from 'vue'

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

// Refs pour les sections
const heroSection = ref<InstanceType<typeof OffresHeroComponent> | null>(null)
const auditSection = ref<InstanceType<typeof AuditFlashComponent> | null>(null)
const formationSection = ref<InstanceType<typeof FormationComponent> | null>(null)
const ateliersSection = ref<InstanceType<typeof AteliersComponent> | null>(null)
const coachingSection = ref<InstanceType<typeof CoachingComponent> | null>(null)
const comparisonSection = ref<InstanceType<typeof SolutionsComparisonComponent> | null>(null)
const evolutionSection = ref<InstanceType<typeof EvolutionSection> | null>(null)

// État des modals
const showBookingModal = ref(false)
const bookingModalInitialFocus = ref<HTMLButtonElement | null>(null)

// État du bouton de retour en haut
const showScrollTopButton = ref(false)

// État de la section active pour la navigation
const activeSection = ref<string>('hero')

// Configuration des sections pour la navigation
const sections = [
  { id: 'hero', title: 'Accueil', ref: heroSection },
  { id: 'audit', title: 'Audit Flash', ref: auditSection },
  { id: 'formation', title: 'Formation', ref: formationSection },
  { id: 'ateliers', title: 'Ateliers', ref: ateliersSection },
  { id: 'coaching', title: 'Coaching', ref: coachingSection },
  { id: 'comparison', title: 'Comparaison', ref: comparisonSection }
]

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
    const heroContent = heroEl.querySelector('.hero-content')
    
    if (heroTitle) {
      gsap.from(heroTitle, {
        y: defaultDistance,
        opacity: 0,
        duration: defaultDuration,
        ease: 'power3.out'
      })
    }

    if (heroContent) {
      gsap.from(heroContent, {
        y: defaultDistance * 0.6,
        opacity: 0,
        duration: defaultDuration,
        delay: defaultDelay,
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

    sections.forEach((section, index) => {
      // Animation d'entrée avec léger décalage entre les éléments
      const sectionTitle = section.querySelector('h2, h3')
      const sectionContent = section.querySelectorAll('p, ul, dl')
      
      if (sectionTitle) {
        gsap.from(sectionTitle, {
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
      }
      
      if (sectionContent.length) {
        gsap.from(sectionContent, {
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 10%',
            toggleActions: 'play none none none'
          },
          y: defaultDistance * 0.8,
          opacity: 0,
          duration: defaultDuration,
          delay: defaultDelay * 0.8,
          stagger: 0.1,
          ease: 'power2.out'
        })
      }
      
      // Effet de parallaxe subtil
      if (index % 2 === 0) {
        gsap.to(section, {
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          },
          backgroundPosition: `center ${isMobile ? -20 : -40}px`,
          ease: 'none'
        })
      }
    })
  }

  // Gestionnaire de défilement pour le bouton de retour en haut
  window.addEventListener('scroll', handleScroll)
  
  // Configuration des observateurs pour détecter la section active
  setupIntersectionObservers()
})

onBeforeUnmount(() => {
  // Nettoyer les écouteurs d'événements
  window.removeEventListener('scroll', handleScroll)
  
  // Tuer toutes les animations GSAP
  gsap.killTweensOf('*')
  
  // Nettoyer tous les ScrollTriggers
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
})

// Configuration des observateurs d'intersection pour la navigation
function setupIntersectionObservers() {
  const sections = [
    { ref: heroSection, id: 'hero' },
    { ref: auditSection, id: 'audit' },
    { ref: formationSection, id: 'formation' },
    { ref: ateliersSection, id: 'ateliers' },
    { ref: coachingSection, id: 'coaching' },
    { ref: comparisonSection, id: 'comparison' },
    { ref: evolutionSection, id: 'evolution' }
  ]
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.getAttribute('data-section-id')
        if (sectionId) activeSection.value = sectionId
      }
    })
  }, { threshold: 0.3 })
  
  sections.forEach(section => {
    if (section.ref.value?.$el) {
      section.ref.value.$el.setAttribute('data-section-id', section.id)
      observer.observe(section.ref.value.$el)
    }
  })
}

// Gérer l'affichage du bouton de retour en haut
function handleScroll() {
  showScrollTopButton.value = window.scrollY > window.innerHeight
}

// Méthodes de navigation
function scrollToSection(ref: any) {
  if (!ref.value?.$el) return
  
  // Calcul de la position avec un petit offset pour la navigation fixe
  const offset = 32 // Ajustez cette valeur selon vos besoins
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

// Handlers
function openBookingModal() {
  showBookingModal.value = true
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

/* Effet de surbrillance pour la navigation */
nav button.active {
  width: 5px;
  height: 5px;
  background-color: var(--color-primary);
}
</style> 