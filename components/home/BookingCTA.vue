<template>
  <section class="py-16 bg-secondary lg:py-24">
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Fond décoratif -->
      <div class="absolute inset-0 opacity-20">
        <div class="absolute transform -translate-x-1/2 -translate-y-1/2" style="left: 10%; top: 30%">
          <div class="h-64 w-64 rounded-full bg-tertiary filter blur-3xl"></div>
        </div>
        <div class="absolute transform -translate-x-1/2 -translate-y-1/2" style="left: 90%; top: 70%">
          <div class="h-64 w-64 rounded-full bg-primary filter blur-3xl"></div>
        </div>
      </div>

      <div class="relative">
        <div class="text-center">
          <h2 class="text-3xl font-headers font-extrabold text-light sm:text-4xl">
            Prêt à transformer votre entreprise avec l'IA ?
          </h2>
          <p class="mt-4 text-xl font-body text-light/80">
            Réservez votre audit flash gratuit de 45 minutes et découvrez votre potentiel d'IA.
          </p>
        </div>

        <!-- Formulaire -->
        <div class="mt-12 max-w-lg mx-auto bg-light rounded-lg shadow-xl overflow-hidden lg:max-w-none lg:grid lg:grid-cols-2">
          <div class="px-6 py-8 lg:p-12">
            <h3 class="text-2xl font-headers font-extrabold text-secondary sm:text-3xl">
              Audit flash gratuit
            </h3>
            <p class="mt-6 text-base font-body text-secondary/80">
              En 45 minutes, nous identifierons ensemble :
            </p>
            <div class="mt-8 space-y-4">
              <div class="flex items-center">
                <CheckCircleIcon class="h-5 w-5 text-primary" />
                <span class="ml-3 text-base font-body text-secondary/80">
                  Les opportunités d'IA dans votre entreprise
                </span>
              </div>
              <div class="flex items-center">
                <CheckCircleIcon class="h-5 w-5 text-primary" />
                <span class="ml-3 text-base font-body text-secondary/80">
                  Les gains potentiels en productivité et ROI
                </span>
              </div>
              <div class="flex items-center">
                <CheckCircleIcon class="h-5 w-5 text-primary" />
                <span class="ml-3 text-base font-body text-secondary/80">
                  Une feuille de route personnalisée
                </span>
              </div>
            </div>

            <!-- Témoignage -->
            <div class="mt-8 border-t border-secondary/10 pt-8">
              <blockquote>
                <div class="relative text-lg text-secondary/80">
                  <ChatBubbleLeftIcon class="absolute top-0 left-0 transform -translate-x-3 -translate-y-2 h-8 w-8 text-secondary/20" />
                  <p class="relative font-body">
                    L'audit nous a permis d'identifier rapidement les opportunités d'IA les plus pertinentes pour notre entreprise.
                  </p>
                </div>
                <footer class="mt-4">
                  <div class="flex items-center">
                    <div class="flex-shrink-0">
                      <img
                        class="h-10 w-10 rounded-full"
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </div>
                    <div class="ml-4">
                      <div class="text-base font-headers font-medium text-secondary">
                        Marie Lambert
                      </div>
                      <div class="text-sm font-body text-secondary/60">
                        Directrice Générale, PME+
                      </div>
                    </div>
                  </div>
                </footer>
              </blockquote>
            </div>
          </div>

          <div class="py-8 px-6 bg-light lg:p-12">
            <form @submit.prevent="submitForm" class="space-y-6">
              <!-- Nom -->
              <div>
                <label for="name" class="block text-sm font-headers font-medium text-secondary">
                  Nom complet
                </label>
                <div class="mt-1">
                  <input
                    v-model="form.name"
                    type="text"
                    name="name"
                    id="name"
                    required
                    class="block w-full rounded-md border-secondary/20 shadow-sm focus:border-primary focus:ring-primary font-body sm:text-sm"
                  />
                </div>
              </div>

              <!-- Email -->
              <div>
                <label for="email" class="block text-sm font-headers font-medium text-secondary">
                  Email professionnel
                </label>
                <div class="mt-1">
                  <input
                    v-model="form.email"
                    type="email"
                    name="email"
                    id="email"
                    required
                    class="block w-full rounded-md border-secondary/20 shadow-sm focus:border-primary focus:ring-primary font-body sm:text-sm"
                  />
                </div>
              </div>

              <!-- Entreprise -->
              <div>
                <label for="company" class="block text-sm font-headers font-medium text-secondary">
                  Entreprise
                </label>
                <div class="mt-1">
                  <input
                    v-model="form.company"
                    type="text"
                    name="company"
                    id="company"
                    required
                    class="block w-full rounded-md border-secondary/20 shadow-sm focus:border-primary focus:ring-primary font-body sm:text-sm"
                  />
                </div>
              </div>

              <!-- Secteur -->
              <div>
                <label for="sector" class="block text-sm font-headers font-medium text-secondary">
                  Secteur d'activité
                </label>
                <div class="mt-1">
                  <select
                    v-model="form.sector"
                    id="sector"
                    name="sector"
                    required
                    class="block w-full rounded-md border-secondary/20 shadow-sm focus:border-primary focus:ring-primary font-body sm:text-sm"
                  >
                    <option value="">Sélectionnez un secteur</option>
                    <option v-for="sector in sectors" :key="sector" :value="sector">
                      {{ sector }}
                    </option>
                  </select>
                </div>
              </div>

              <!-- Message -->
              <div>
                <label for="message" class="block text-sm font-headers font-medium text-secondary">
                  Votre projet/besoin en quelques mots
                </label>
                <div class="mt-1">
                  <textarea
                    v-model="form.message"
                    id="message"
                    name="message"
                    rows="4"
                    class="block w-full rounded-md border-secondary/20 shadow-sm focus:border-primary focus:ring-primary font-body sm:text-sm"
                  ></textarea>
                </div>
              </div>

              <!-- Submit -->
              <div>
                <button
                  type="submit"
                  class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-headers font-medium text-light bg-gradient-to-r from-primary to-tertiary hover:from-primary/90 hover:to-tertiary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Réserver mon audit gratuit
                </button>
                <p class="mt-3 text-sm font-body text-secondary/60 text-center">
                  Réponse garantie sous 24h
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ChatBubbleLeftIcon, CheckCircleIcon } from '@heroicons/vue/24/outline'
import { ref } from 'vue'

const sectors = [
  'Marketing & Communication',
  'Ressources Humaines',
  'Finance & Administration',
  'Vente & Relation Client',
  'Production & Opérations',
  'IT & Digital',
  'Autre'
]

const form = ref({
  name: '',
  email: '',
  company: '',
  sector: '',
  message: ''
})

function submitForm() {
  // Émettre l'événement avec les données du formulaire
  emit('submitBooking', form.value)
}

const emit = defineEmits(['submitBooking'])
</script> 