<template>
  <TransitionRoot appear :show="modelValue" as="template">
    <Dialog as="div" @close="$emit('update:modelValue', false)" class="relative z-50">
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
            <DialogPanel class="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
              <div class="grid grid-cols-1 lg:grid-cols-2">
                <!-- Partie gauche avec les informations -->
                <div class="px-5 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-12">
                  <DialogTitle as="h3" class="text-xl sm:text-2xl lg:text-3xl font-headers font-extrabold text-secondary">
                    Réserver une consultation
                  </DialogTitle>
                  <p class="mt-4 sm:mt-6 text-sm sm:text-base font-body text-secondary/80">
                    En 45 minutes, nous identifierons ensemble :
                  </p>
                  <div class="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
                    <div class="flex items-start sm:items-center">
                      <CheckCircleIcon class="h-5 w-5 mt-0.5 sm:mt-0 flex-shrink-0 text-primary" />
                      <span class="ml-3 text-sm sm:text-base font-body text-secondary/80">
                        Les opportunités d'IA dans votre entreprise
                      </span>
                    </div>
                    <div class="flex items-start sm:items-center">
                      <CheckCircleIcon class="h-5 w-5 mt-0.5 sm:mt-0 flex-shrink-0 text-primary" />
                      <span class="ml-3 text-sm sm:text-base font-body text-secondary/80">
                        Les gains potentiels en productivité et ROI
                      </span>
                    </div>
                    <div class="flex items-start sm:items-center">
                      <CheckCircleIcon class="h-5 w-5 mt-0.5 sm:mt-0 flex-shrink-0 text-primary" />
                      <span class="ml-3 text-sm sm:text-base font-body text-secondary/80">
                        Une feuille de route personnalisée
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Partie droite avec le formulaire -->
                <div class="px-5 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-12 bg-light lg:border-l border-secondary/10">
                  <div class="absolute top-0 right-0 pt-4 pr-4">
                    <button
                      type="button"
                      class="text-secondary/50 hover:text-secondary focus:outline-none focus:ring-2 focus:ring-primary"
                      @click="$emit('update:modelValue', false)"
                    >
                      <span class="sr-only">Fermer</span>
                      <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  <form @submit.prevent="handleSubmit" class="space-y-4">
                    <!-- Messages de notification -->
                    <div v-if="notification" :class="[
                      'p-4 rounded-md text-sm font-body',
                      notification.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                    ]">
                      {{ notification.message }}
                    </div>

                    <!-- Nom -->
                    <div>
                      <label for="name" class="block text-sm font-headers font-medium text-secondary">
                        Nom complet
                      </label>
                      <div class="mt-1">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          v-model="formData.name"
                          :disabled="isSubmitting"
                          class="block w-full rounded-md border-secondary/20 shadow-sm focus:border-primary focus:ring-primary font-body text-sm p-2.5 sm:p-2 disabled:opacity-50 disabled:cursor-not-allowed"
                          required
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
                          type="email"
                          name="email"
                          id="email"
                          v-model="formData.email"
                          :disabled="isSubmitting"
                          class="block w-full rounded-md border-secondary/20 shadow-sm focus:border-primary focus:ring-primary font-body text-sm p-2.5 sm:p-2 disabled:opacity-50 disabled:cursor-not-allowed"
                          required
                        />
                      </div>
                    </div>

                    <!-- Grille 2 colonnes sur tablette et plus -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <!-- Entreprise -->
                      <div>
                        <label for="company" class="block text-sm font-headers font-medium text-secondary">
                          Entreprise
                        </label>
                        <div class="mt-1">
                          <input
                            type="text"
                            name="company"
                            id="company"
                            v-model="formData.company"
                            :disabled="isSubmitting"
                            class="block w-full rounded-md border-secondary/20 shadow-sm focus:border-primary focus:ring-primary font-body text-sm p-2.5 sm:p-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            required
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
                            id="sector"
                            name="sector"
                            v-model="formData.sector"
                            :disabled="isSubmitting"
                            class="block w-full rounded-md border-secondary/20 shadow-sm focus:border-primary focus:ring-primary font-body text-sm p-2.5 sm:p-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            required
                          >
                            <option value="">Sélectionnez</option>
                            <option v-for="sector in sectors" :key="sector" :value="sector">
                              {{ sector }}
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <!-- Message -->
                    <div>
                      <label for="message" class="block text-sm font-headers font-medium text-secondary">
                        Votre projet/besoin en quelques mots
                      </label>
                      <div class="mt-1">
                        <textarea
                          id="message"
                          name="message"
                          rows="3"
                          v-model="formData.message"
                          :disabled="isSubmitting"
                          class="block w-full rounded-md border-secondary/20 shadow-sm focus:border-primary focus:ring-primary font-body text-sm p-2.5 sm:p-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        ></textarea>
                      </div>
                    </div>

                    <!-- Submit -->
                    <div>
                      <button
                        type="submit"
                        :disabled="isSubmitting"
                        class="w-full flex justify-center items-center bg-gradient-to-r from-secondary to-tertiary text-primary px-3 py-2 md:px-4 md:py-4 rounded-md text-sm font-headers font-medium hover:from-secondary/90 hover:to-tertiary/90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <svg v-if="isSubmitting" class="animate-spin -ml-1 mr-3 h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {{ isSubmitting ? 'Envoi en cours...' : 'Réserver mon audit flash' }}
                      </button>
                      <p class="mt-2 sm:mt-3 text-xs sm:text-sm font-body text-secondary/60 text-center">
                        Réponse garantie sous 24h
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';
import { CheckCircleIcon, XMarkIcon } from '@heroicons/vue/24/outline';
import { ref, watch } from 'vue';

interface FormData {
  name: string;
  email: string;
  company: string;
  sector: string;
  message: string;
}

const sectors = [
  'Marketing & Communication',
  'Ressources Humaines',
  'Finance & Administration',
  'Vente & Relation Client',
  'Production & Opérations',
  'IT & Digital',
  'Autre'
];

const formData = ref<FormData>({
  name: '',
  email: '',
  company: '',
  sector: '',
  message: ''
});

const resetForm = () => {
  formData.value = {
    name: '',
    email: '',
    company: '',
    sector: '',
    message: ''
  };
};

const props = defineProps<{
  modelValue: boolean;
  isSubmitting?: boolean;
  notification?: { type: 'success' | 'error'; message: string } | null;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'submit': [data: FormData]
}>();

const handleSubmit = () => {
  emit('submit', formData.value);
};

// Réinitialiser le formulaire quand la modale est fermée
watch(() => props.modelValue, (newValue) => {
  if (!newValue) {
    resetForm();
  }
});

// Réinitialiser le formulaire après une soumission réussie
watch(() => props.notification, (newValue) => {
  if (newValue?.type === 'success') {
    resetForm();
  }
});
</script> 