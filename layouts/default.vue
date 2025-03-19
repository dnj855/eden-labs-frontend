<template>
  <div class="min-h-screen bg-gray-50">
    <TheNavbar />
    <main>
      <NuxtPage />
    </main>
    <CTANewsletter v-if="!isLegalMentionsPage" />
    <BookingCTA
      v-if="!isLegalMentionsPage"
      ref="bookingSection"
      @submit-booking="submitBooking"
    />
    <footer class="bg-light">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div class="col-span-1 md:col-span-2">
            <h3 class="text-primary font-headers font-bold text-xl">Eden Labs</h3>
            <p class="mt-2 text-secondary/70 font-body">
              Nous accompagnons les PME/ETI dans leur transformation numérique avec l'IA générative.
            </p>
          </div>
          <div>
            <h4 class="font-headers font-semibold text-secondary">Navigation</h4>
            <ul class="mt-4 space-y-2">
              <li v-for="item in navigationItems" :key="item.path">
                <NuxtLink 
                  :to="item.path"
                  class="text-secondary/70 hover:text-primary transition-colors duration-200 font-body"
                >
                  {{ item.name }}
                </NuxtLink>
              </li>
            </ul>
          </div>
          <div>
            <h4 class="font-headers font-semibold text-secondary">Contact</h4>
            <ul class="mt-4 space-y-2">
              <li>
                <a href="mailto:contact@eden-labs.fr" class="text-secondary/70 hover:text-primary transition-colors duration-200 font-body">
                  contact@eden-labs.fr
                </a>
              </li>
              <li>
                <a href="tel:+33688144084" class="text-secondary/70 hover:text-primary transition-colors duration-200 font-body">
                  +33 6 88 14 40 84
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="mt-8 pt-8 border-t border-secondary/10">
          <p class="text-center text-secondary/40 text-sm font-body">
            © {{ new Date().getFullYear() }} Eden Labs. Tous droits réservés. - <NuxtLink to="/legal-mentions" class="text-secondary hover:text-tertiary transition-colors duration-200 font-body">Mentions légales</NuxtLink>
          </p>
        </div>
      </div>
    </footer>
  </div>

  <!-- Bouton retour en haut - Taille adaptée pour mobile -->
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
      class="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 p-2.5 sm:p-3 bg-primary text-light rounded-full shadow-lg transition-all duration-300 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      aria-label="Retour en haut de page"
    >
      <ArrowUpIcon class="h-4 w-4 sm:h-5 sm:w-5" />
    </button>
  </transition>

  <BookingModal v-model="isBookingModalOpen" />
</template>

<script setup lang="ts">
import { ArrowUpIcon } from '@heroicons/vue/24/outline';
import { useRoute } from 'vue-router';
import { useBookingModal } from '../composables/useBookingModal';

const route = useRoute()
const isLegalMentionsPage = computed(() => route.path === '/legal-mentions')

interface NavigationItem {
  name: string;
  path: string;
}

interface NavigationResponse {
  data: {
    data: NavigationItem[];
  };
}

const baseUrl = useRuntimeConfig().public.strapiUrl;
const { $api } = useNuxtApp();
const { data } = await $api.fetch(baseUrl + '/api/Navigation-Item');
const navigationItems = computed(() => (data.value as NavigationResponse)?.data?.data || []);

const { isBookingModalOpen, openBookingModal } = useBookingModal()

// Fonction pour gérer la soumission de la réservation
const submitBooking = () => {
  openBookingModal()
}

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

const showScrollTopButton = ref(false)

// État de la section active pour la navigation
const activeSection = ref<string>('hero')

// Configuration des observateurs d'intersection pour la navigation
function setupIntersectionObservers() {
  const sections = document.querySelectorAll('section[id]')
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        activeSection.value = entry.target.id
      }
    })
  }, { threshold: 0.5 })
  
  sections.forEach(section => {
    observer.observe(section)
  })
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  const scrollHandler = () => {
    showScrollTopButton.value = window.scrollY > 100
  }
  window.addEventListener('scroll', scrollHandler)
  
  // Configuration des observateurs pour détecter la section active
  setupIntersectionObservers()
  
  onBeforeUnmount(() => {
    window.removeEventListener('scroll', scrollHandler)
  })
})

</script> 