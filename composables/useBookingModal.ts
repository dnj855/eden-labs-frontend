import { ref } from 'vue';

interface BookingFormData {
  name: string;
  email: string;
  company: string;
  sector: string;
  message: string;
}

interface Notification {
  type: 'success' | 'error';
  message: string;
}

const WEBHOOK_URL = 'https://n8n.eden-labs.fr/webhook-test/cdbb67c0-410a-482e-b9d8-c593c9498ff1'

export const useBookingModal = () => {
  const isBookingModalOpen = ref(false)
  const isSubmitting = ref(false)
  const notification = ref<Notification | null>(null)

  const openBookingModal = () => {
    isBookingModalOpen.value = true
    notification.value = null
  }

  const closeBookingModal = () => {
    isBookingModalOpen.value = false
    notification.value = null
  }

  const showNotification = (type: 'success' | 'error', message: string) => {
    notification.value = { type, message }
    if (type === 'success') {
      // Fermer la modale après 2 secondes en cas de succès
      setTimeout(() => {
        closeBookingModal()
      }, 2000)
    }
  }

  const handleBookingSubmit = async (formData: BookingFormData) => {
    isSubmitting.value = true
    notification.value = null

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Origin': window.location.origin
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          source: 'website_booking'
        })
      })

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`)
      }

      showNotification('success', 'Votre demande a été envoyée avec succès ! Nous vous répondrons dans les plus brefs délais.')
    } catch (err) {
      showNotification('error', "Une erreur est survenue lors de l'envoi de votre demande. Veuillez réessayer.")
      console.error('Erreur lors de la soumission:', err)
    } finally {
      isSubmitting.value = false
    }
  }

  return {
    isBookingModalOpen,
    isSubmitting,
    notification,
    openBookingModal,
    closeBookingModal,
    handleBookingSubmit
  }
} 