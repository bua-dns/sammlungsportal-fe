export const useWording = () => {
  return useState('wording', () => {
    return {
      welcome: 'Willkommen',
      pageStart: 'Startseite',
      label: 'Name',
      current_keeper: 'Aktueller Halter',
      opening_hours: 'Öffnungszeiten',
      phone: 'Telefon',
      email: 'E-Mail',
      description: 'Beschreibung',
      homepage: 'Homepage',
      collection_portal: 'Sammlungsportal',
      address: 'Adresse',
    }
  })
}
