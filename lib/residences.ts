export type Residence = {
  id: string
  name: string
  tagline: string
  location: string
  image: string
  facilities: string[]
  comingSoon?: boolean
}

export const residences: Residence[] = [
  {
    id: 'parkway',
    name: 'Parkway Residence',
    tagline: '',
    location: 'Jalan Wawasan',
    image: '/images/parkway-residence.png',
    facilities: ['Fully Furnished', 'Air Conditioned', 'Free Wi-Fi', 'Weekly Cleaning'],
  },
  {
    id: 'kingsway',
    name: 'Kingsway Residence',
    tagline: '',
    location: 'Jalan Wawasan',
    image: '/images/kingsway-residence.png',
    facilities: ['Fully Furnished', 'Air Conditioned', 'Free Wi-Fi', 'Weekly Cleaning'],
  },
  {
    id: 'norway',
    name: 'Norway Residence',
    tagline: '',
    location: 'Unicity',
    image: '/images/norway-residence.png',
    facilities: ['Fully Furnished', 'Air Conditioned', 'Free Wi-Fi', 'Weekly Cleaning'],
  },
  {
    id: 'steinway',
    name: 'Steinway Residence',
    tagline: '',
    location: 'Jalan Wawasan',
    image: '/images/steinway-residence.png',
    facilities: ['Fully Furnished', 'Air Conditioned', 'Free Wi-Fi', 'Weekly Cleaning'],
  },
  {
    id: 'velway',
    name: 'Velway Residence',
    tagline: '',
    location: 'Unicity',
    image: '/images/velway-residence.png',
    facilities: ['Fully Furnished', 'Air Conditioned', 'Free Wi-Fi', 'Weekly Cleaning'],
  },
]

export const navResidences = residences.filter((r) => !r.comingSoon)
