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
    image: '/images/Parkway Residence.jpeg',
    facilities: ['Fully Furnished', 'Equipped with AC', 'Free Wi-Fi'],
  },
  {
    id: 'kingsway',
    name: 'Kingsway Residence',
    tagline: '',
    location: 'Jalan Wawasan',
    image: '/images/Kingsway Residence.png',
    facilities: ['Fully Furnished', 'Equipped with AC', 'Free Wi-Fi'],
  },
  {
    id: 'norway',
    name: 'Norway Residence',
    tagline: '',
    location: 'Unicity',
    image: '/images/Norway Residence.png',
    facilities: ['Fully Furnished', 'Equipped with AC', 'Free Wi-Fi'],
  },
  {
    id: 'steinway',
    name: 'Steinway Residence',
    tagline: '',
    location: 'Jalan Wawasan',
    image: '/images/Steinway Residence.jpg',
    facilities: ['Fully Furnished', 'Equipped with AC', 'Free Wi-Fi'],
  },
  {
    id: 'velway',
    name: 'Velway Residence',
    tagline: '',
    location: 'Unicity',
    image: '/images/Velway Residence.png',
    facilities: ['Fully Furnished', 'Equipped with AC', 'Free Wi-Fi'],
  },
]

export const navResidences = residences.filter((r) => !r.comingSoon)
