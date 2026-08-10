export type AmenityGrid = {
  propertyType: string[]
  propertyLayout: string[]
  roomType: string[]
  occupancyType: string[]
  bathroomFacilities: string[]
  sharedAmenities: string[]
  deposit: string[]
  utilities: string[]
}

export type FloorArea = {
  name: string
  image: string
}

export type FloorRoom = {
  name: string  // 👈 你想叫它什么名字，前台就原封不动显示什么名字
  image: string
}

export type FloorPlan = {
  label: string
  commonAreas: FloorArea[]
  rooms: FloorRoom[]
}

export type TourScene = {
  id: string       // 唯一标识，如 'exterior', 'lobby'
  label: string    // 缩略图以及左上角显示的场景名字
  image: string    // 对应 Pannellum 渲染的本地全景图路径
}

export type ResidenceDetail = {
  /** Core selling-point tags — champagne gold styling only */
  highlightTags: string[]
  heroImages: string[]
  amenityGrid: AmenityGrid
  floors: FloorPlan[]
  mapImage: string

  mapImageMobile?: string
  googleMapsUrl?: string // 真实 Google Map 外跳链接
  virtualTourUrl?: string // 360 全景嵌入链接（如 Kuula 或 Pannellum）
  virtualTourScenes?: TourScene[] 
}


export const residenceDetails: Record<string, ResidenceDetail> = {
  parkway: {
    highlightTags: ['Fully Furnished', 'Air Conditioned', 'Free Wi-Fi', 'Water Included', 'Weekly Cleaning'],
    heroImages: ['/images/residence-exterior/parkway-residence.png'],
    // 🌟 完美对齐 8 大硬核租赁指标
    amenityGrid: {
      propertyType: ['Shoplot - Fully furnished hostel-style accommodation'],
      propertyLayout: ['First floor - 7 rooms', 'Second floor - 7 rooms'],
      
      roomType: [
        '5 Single window',
        '2 Single skylight',
        '4 Double window',
        '3 Double skylight'
      ],
      
      occupancyType: ['Mixed-gender floors'],
      bathroomFacilities: ['2 shared toilets per floor'],
      
      sharedAmenities: [
        'Fridge', 
        'Washing machine', 
        'Microwave', 
        'Induction cooker',
        'Shower heater'
      ],
      
      deposit: ['One and a half month'],
      utilities: ['Wi-Fi', 'Room electricity paid by tenant'],
    },
    floors: [
      {
        label: 'FIRST FLOOR',
        commonAreas:[
          { name: 'Dining', image: '/images/parkway/1st-floor/p1-common-space/p1-dining-room.webp' },
          { name: 'Kitchen', image: '/images/parkway/1st-floor/p1-common-space/p1-kitchen.webp' },
          { name: 'Bathroom', image: '/images/parkway/1st-floor/p1-common-space/p1-bathroom.webp' },
        ],
        rooms: [
          { name: 'Room P1A', image: '/images/parkway/1st-floor/p1-room/p1a-double-window.webp' },
          { name: 'Room P1B', image: '/images/parkway/1st-floor/p1-room/p1b-single-window.webp' },
          { name: 'Room P1C', image: '/images/parkway/1st-floor/p1-room/p1c-single-window.webp' },
          { name: 'Room P1D', image: '/images/parkway/1st-floor/p1-room/p1d-single-room.webp' },
          { name: 'Room P1E', image: '/images/parkway/1st-floor/p1-room/p1e-double-room.webp' },
          { name: 'Room P1F', image: '/images/parkway/1st-floor/p1-room/p1f-single-window.webp' },
          { name: 'Room P1G', image: '/images/parkway/1st-floor/p1-room/p1g-double-window.webp' },
        ],
      },
      {
        label: 'SECOND FLOOR',
        commonAreas: [
          { name: 'Dining', image: '/images/parkway/2nd-floor/p2-common-space/p2-dining-area.webp' },
          { name: 'Kitchen', image: '/images/parkway/2nd-floor/p2-common-space/p2-kitchen.webp' },
          { name: 'Bathroom', image: '/images/parkway/2nd-floor/p2-common-space/p2-bathroom.webp' },
          { name: 'Wash Area', image: '/images/parkway/2nd-floor/p2-common-space/p2-wash-area.webp' },
          { name: 'Corridor', image: '/images/parkway/2nd-floor/p2-common-space/p2-corridor.webp' }, // 👈 想要多加的 shared space 示范
        ],
        rooms: [
          { name: 'Room P2A', image: '/images/parkway/2nd-floor/p2-room/p2a-single-window.webp' },
          { name: 'Room P2B', image: '/images/parkway/2nd-floor/p2-room/p2b-double-skylight.webp' },
          { name: 'Room P2C', image: '/images/parkway/2nd-floor/p2-room/p2c-double-window.webp' },
          { name: 'Room P2D', image: '/images/parkway/2nd-floor/p2-room/p2d-double-skylight.webp' },
          { name: 'Room P2E', image: '/images/parkway/2nd-floor/p2-room/p2e-single-window.webp' },
          { name: 'Room P2F', image: '/images/parkway/2nd-floor/p2-room/p2f-single-skylight.webp' },
          { name: 'Room P2G', image: '/images/parkway/2nd-floor/p2-room/p2g-double-window.webp' },
        ],
      },
    ],
    mapImage: '/images/map/parkwaymap.png',
    mapImageMobile: '/images/map/mobile/parkwaymap.png',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=2.343477,%20111.835596',
    virtualTourUrl: '/360/parkway-bathroom.jpg', 
    virtualTourScenes: [
          { 
            id: 'bathroom', 
            label: 'BATHROOM', 
            // 👑 绝对正确写法：忽略 E:\gh\resident\public，直接从 /360 开始写！
            image: '/360/parkway-bathroom.jpg' 
          },
          // 如果还有别的图，比如 E:\gh\resident\public\360\parkway-kitchen.jpg
          { 
            id: 'kitchen', 
            label: 'KITCHEN', 
            image: '/360/parkway-kitchen.jpg' 
          }
      ]
  },
  
  kingsway: {
    highlightTags: ['Fully Furnished', 'Air Conditioned', 'Free Wi-Fi', 'Water Included', 'Weekly Cleaning'],
    heroImages: ['/images/residence-exterior/kingsway-residence.png'],

    amenityGrid: {
      propertyType: ['Shoplot - Fully furnished hostel-style accommodation'],
      propertyLayout: ['First floor - 7 rooms', 'Second floor - 7 rooms'],
      
      roomType: [
        '9 Single window',
        '2 Single skylight',
        '4 Double window',
        '1 Double skylight'
      ],
      
      occupancyType: ['Mixed-gender floors'],
      bathroomFacilities: ['2 Shared toilets per floor'],
      
      sharedAmenities: [
        'Fridge', 
        'Washing machine', 
        'Microwave', 
        'Induction cooker',
        'Shower heater'
      ],
      
      deposit: ['One and a half month'],
      utilities: ['Wi-Fi', 'Room electricity paid by tenant'],
    },
    floors: [
      {
        label: 'FIRST FLOOR',
        commonAreas: [
          { name: 'Dining', image: '/images/kingsway/1st-floor/k1-common-space/k1-dining-area.webp' },
          { name: 'Kitchen', image: '/images/kingsway/1st-floor/k1-common-space/k1-kitchen.webp' },
          { name: 'Foyer', image: '/images/kingsway/1st-floor/k1-common-space/k1-foyer.webp' },
          { name: 'Bathroom', image: '/images/kingsway/1st-floor/k1-common-space/k1-bathroom.webp' },
          { name: 'Corridor', image: '/images/kingsway/1st-floor/k1-common-space/k1-corridor.webp' }, // 👈 想要多加的 shared space 示范
        ],
        rooms: [
          { name: 'Room K1A', image: '/images/kingsway/1st-floor/k1-room/k1a-single-window.webp' },
          { name: 'Room K1B', image: '/images/kingsway/1st-floor/k1-room/k1b-single-window.webp' },
          { name: 'Room K1C', image: '/images/kingsway/1st-floor/k1-room/k1c-double-skylight.webp' },
          { name: 'Room K1D', image: '/images/kingsway/1st-floor/k1-room/k1d-single-window.webp' },
          { name: 'Room K1E', image: '/images/kingsway/1st-floor/k1-room/k1e-single-skylight.webp' },
          { name: 'Room K1F', image: '/images/kingsway/1st-floor/k1-room/k1f-single-window.webp' },
          { name: 'Room K1G', image: '/images/kingsway/1st-floor/k1-room/k1g-single-window.webp' },
        ],
      },
      {
        label: 'SECOND FLOOR',
        commonAreas: [
          { name: 'Dining', image: '/images/kingsway/2nd-floor/k2-common-space/k2-dining-area.webp' },
          { name: 'Kitchen', image: '/images/kingsway/2nd-floor/k2-common-space/k2-kitchen.webp' },
          { name: 'Bathroom', image: '/images/kingsway/2nd-floor/k2-common-space/k2-bathroom.webp' },
          { name: 'Corridor', image: '/images/kingsway/2nd-floor/k2-common-space/k2-corridor.webp' },
          { name: 'Entrance', image: '/images/kingsway/2nd-floor/k2-common-space/k2-entrance.webp' }, // 👈 想要多加的 shared space 示范
        ],
        rooms: [
          { name: 'Room K2A', image: '/images/kingsway/2nd-floor/k2-room/k2a-single-skylight.webp' },
          { name: 'Room K2B', image: '/images/kingsway/2nd-floor/k2-room/k2b-single-window.webp' },
          { name: 'Room K2C', image: '/images/kingsway/2nd-floor/k2-room/k2c-double-window.webp' },
          { name: 'Room K2D', image: '/images/kingsway/2nd-floor/k2-room/k2d-single-window.webp' },
          { name: 'Room K2E', image: '/images/kingsway/2nd-floor/k2-room/k2e-single-skylight.webp' },
          { name: 'Room K2F', image: '/images/kingsway/2nd-floor/k2-room/k2f-double-window.webp' },
          { name: 'Room K2G', image: '/images/kingsway/2nd-floor/k2-room/k2g-single-window.webp' },
        ],
      },
    ],
    mapImage: '/images/map/kingswaymap.png',
    mapImageMobile: '/images/map/mobile/kingswaymap.png',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=2.343695,%20111.835609',
    virtualTourUrl: ''
  },
  
  norway: {
    highlightTags: ['Fully Furnished', 'Air Conditioned', 'Free Wi-Fi', 'Water Included', 'Weekly Cleaning'],
    heroImages: ['/images/residence-exterior/norway-residence.png'],

    amenityGrid: {
      propertyType: ['Shoplot - Fully furnished hostel-style accommodation'],
      propertyLayout: ['Second floor - 9 rooms', 'Third floor - 9 rooms'],
      
      roomType: [
        '10 Single window',
        '4 Single skylight',
        '4 Double window ',
      ],
      
      occupancyType: ['Mixed-gender floors'],
      bathroomFacilities: ['2 Shared toilets per floor'],
      
      sharedAmenities: [
        'Fridge', 
        'Washing machine', 
        'Microwave', 
        'Induction cooker',
        'Shower heater'
      ],
      
      deposit: ['Two months'],
      utilities: ['Wi-Fi', 'Room electricity paid by tenant'],
    },
    floors: [
      {
        label: 'Second Floor',
        commonAreas: [
          { name: 'Dining', image: '/images/norway/2nd-floor/n2-common-space/n2-dining-area.webp' },
          { name: 'Kitchen', image: '/images/norway/2nd-floor/n2-common-space/n2-kitchen.webp' },
          { name: 'Bathroom', image: '/images/norway/2nd-floor/n2-common-space/n2-bathroom.webp' },
          { name: 'Corridor', image: '/images/norway/2nd-floor/n2-common-space/n2-corridor.webp' },
          { name: 'Entrance', image: '/images/norway/2nd-floor/n2-common-space/n2-entrance.webp' }, // 👈 想要多加的 shared space 示范
        ],
        rooms: [
          { name: 'Room N2A', image: '/images/norway/2nd-floor/n2-room/n2a-single-window.webp' },
          { name: 'Room N2B', image: '/images/norway/2nd-floor/n2-room/n2b-double-window.webp' },
          { name: 'Room N2C', image: '/images/norway/2nd-floor/n2-room/n2c-single-window.webp' },
          { name: 'Room N2D', image: '/images/norway/2nd-floor/n2-room/n2d-single-skylight.webp' },
          { name: 'Room N2E', image: '/images/norway/2nd-floor/n2-room/n2e-single-window.webp' },
          { name: 'Room N2F', image: '/images/norway/2nd-floor/n2-room/n2f-single-skylight.webp' },
          { name: 'Room N2G', image: '/images/norway/2nd-floor/n2-room/n2g-single-window.webp' },
          { name: 'Room N2H', image: '/images/norway/2nd-floor/n2-room/n2h-single-window.webp' },
          { name: 'Room N2I', image: '/images/norway/2nd-floor/n2-room/n2i-double-window.webp' },
        ],
      },
      {
        label: 'Third Floor',
        commonAreas: [
          { name: 'Dining', image: '/images/norway/3rd-floor/n3-common-space/n3-dining-area.webp' },
          { name: 'Kitchen', image: '/images/norway/3rd-floor/n3-common-space/n3-kitchen.webp' },
          { name: 'Bathroom', image: '/images/norway/3rd-floor/n3-common-space/n3-bathroom.webp' },
          { name: 'Corridor', image: '/images/norway/3rd-floor/n3-common-space/n3-corridor.webp' },
          { name: 'Entrance', image: '/images/norway/3rd-floor/n3-common-space/n3-entrance.webp' }, // 👈 想要多加的 shared space 示范
        ],
        rooms: [
          { name: 'Room N3A', image: '/images/norway/3rd-floor/n3-room/n3a-single-window.webp' },
          { name: 'Room N3B', image: '/images/norway/3rd-floor/n3-room/n3b-double-window.webp' },
          { name: 'Room N3C', image: '/images/norway/3rd-floor/n3-room/n3c-single-window.webp' },
          { name: 'Room N3D', image: '/images/norway/3rd-floor/n3-room/n3d-single-skylight.webp' },
          { name: 'Room N3E', image: '/images/norway/3rd-floor/n3-room/n3e-single-window.webp' },
          { name: 'Room N3F', image: '/images/norway/3rd-floor/n3-room/n3f-single-skylight.webp' },
          { name: 'Room N3G', image: '/images/norway/3rd-floor/n3-room/n3g-single-window.webp' },
          { name: 'Room N3H', image: '/images/norway/3rd-floor/n3-room/n3h-single-window.webp' },
          { name: 'Room N3I', image: '/images/norway/3rd-floor/n3-room/n3i-double-window.webp' },
        ],
      },
    ],
    mapImage: '/images/map/norwaymap.png',
    mapImageMobile: '/images/map/mobile/norwaymap.png',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=2.342797,%20111.831039',
    virtualTourUrl: ''
  },
  
  steinway: {
    highlightTags: ['Fully Furnished', 'Air Conditioned', 'Free Wi-Fi', 'Water Included', 'Weekly Cleaning'],
    heroImages: ['/images/residence-exterior/steinway-residence.png'],

    amenityGrid: {
      propertyType: ['Shoplot - Fully furnished hostel-style accommodation'],
      propertyLayout: ['First floor (Male) - 8 rooms', 'Second floor (Female) - 9 rooms'],
      
      roomType: [
        '12 Single window',
        '4 Single skylight ',
        '1 Double window ',
      ],
      
      occupancyType: ['Male-only / Female-only floors'],
      bathroomFacilities: ['2 Shared toilets per floor'],
      
      sharedAmenities: [
        'Fridge', 
        'Washing machine', 
        'Microwave', 
        'Induction cooker',
        'Shower heater'
      ],
      
      deposit: ['Two months'],
      utilities: ['Wi-Fi', 'Room electricity paid by tenant'],
    },
    floors: [
      {
        label: 'FIRST FLOOR',
        commonAreas: [
          { name: 'Dining', image: '/images/steinway/1st-floor/s1-common-space/s1-dining-area.webp' },
          { name: 'Kitchen', image: '/images/steinway/1st-floor/s1-common-space/s1-kitchen.webp' },
          { name: 'Bathroom', image: '/images/steinway/1st-floor/s1-common-space/s1-bathroom.webp' },
          { name: 'Corridor', image: '/images/steinway/1st-floor/s1-common-space/s1-corridor.webp' },
          { name: 'Dry-Yard', image: '/images/steinway/1st-floor/s1-common-space/s1-dry-yard.webp' }, // 👈 想要多加的 shared space 示范
        ],
        rooms: [
          { name: 'Room S1A', image: '/images/steinway/1st-floor/s1-room/s1a-single-window-male.webp' },
          { name: 'Room S1B', image: '/images/steinway/1st-floor/s1-room/s1b-single-window-male.webp' },
          { name: 'Room S1C', image: '/images/steinway/1st-floor/s1-room/s1c-single-skylight-male.webp' },
          { name: 'Room S1D', image: '/images/steinway/1st-floor/s1-room/s1d-single-window-male.webp' },
          { name: 'Room S1E', image: '/images/steinway/1st-floor/s1-room/s1e-single-skylight-male.webp' },
          { name: 'Room S1F', image: '/images/steinway/1st-floor/s1-room/s1f-single-window-male.webp' },
          { name: 'Room S1G', image: '/images/steinway/1st-floor/s1-room/s1g-single-window-male.webp' },
          { name: 'Room S1H', image: '/images/steinway/1st-floor/s1-room/s1h-single-window-male.webp' },
          { name: 'Room S1I', image: '/images/steinway/1st-floor/s1-room/s1i-single-window-male.webp' },
        ],
      },
      {
        label: 'SECOND FLOOR',
        commonAreas: [
          { name: 'Dining', image: '/images/steinway/2nd-floor/s2-common-space/s2-dining-area.webp' },
          { name: 'Kitchen', image: '/images/steinway/2nd-floor/s2-common-space/s2-kitchen.webp' },
          { name: 'Bathroom', image: '/images/steinway/2nd-floor/s2-common-space/s2-bathroom.webp' },
          { name: 'Corridor', image: '/images/steinway/2nd-floor/s2-common-space/s2-corridor.webp' },
          { name: 'Dry-Yard', image: '/images/steinway/2nd-floor/s2-common-space/s2-dry-yard.webp' }, 
        ],
        rooms: [
          { name: 'Room S2A', image: '/images/steinway/2nd-floor/s2-room/s2a-single-window-female.webp' },
          { name: 'Room S2B', image: '/images/steinway/2nd-floor/s2-room/s2b-double-window-female.webp' },
          { name: 'Room S2C', image: '/images/steinway/2nd-floor/s2-room/s2c-single-skylight-female.webp' },
          { name: 'Room S2D', image: '/images/steinway/2nd-floor/s2-room/s2d-single-window-female.webp' },
          { name: 'Room S2E', image: '/images/steinway/2nd-floor/s2-room/s2e-single-skylight-female.webp' },
          { name: 'Room S2F', image: '/images/steinway/2nd-floor/s2-room/s2f-single-window-female.webp' },
          { name: 'Room S2G', image: '/images/steinway/2nd-floor/s2-room/s2g-single-window-female.webp' },
          { name: 'Room S2H', image: '/images/steinway/2nd-floor/s2-room/s2h-single-window-female.webp' },
        ],
      },
    ],
    mapImage: '/images/map/steinwaymap.png',
    mapImageMobile: '/images/map/mobile/steinwaymap.png',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=2.343988,%20111.835600',
    virtualTourUrl: ''
  },
  
  velway: {
    highlightTags: ['Fully Furnished', 'Air Conditioned', 'Free Wi-Fi', 'Water Included', 'Weekly Cleaning'],
    heroImages: ['/images/residence-exterior/velway-residence.png'],

    amenityGrid: {
      propertyType: ['Shoplot - Fully furnished hostel-style accommodation'],
      propertyLayout: ['First floor (Male) - 10 rooms', 'Second floor (Female) - 11 rooms'],
      
      roomType: [
        '12 Single window',
        '5 Single skylight ',
        '4 Double window ',
      ],
      
      occupancyType: ['Male-only / Female-only floors'],
      bathroomFacilities: ['2 Shared toilets per floor'],
      
      sharedAmenities: [
        'Fridge', 
        'Washing machine', 
        'Dryer', 
        'Microwave', 
        'Induction cooker',
        'Shower heater'
      ],
      
      deposit: ['Two months'],
      utilities: ['Wi-Fi', 'Room electricity paid by tenant'],
    },
    floors: [
      {
        label: 'FIRST FLOOR',
        commonAreas: [
          { name: 'Dining', image: '/images/velway/1st-floor/coming-soon.jpg' },
          { name: 'Kitchen', image: '/images/velway/1st-floor/coming-soon.jpg' },
          { name: 'Bathroom', image: '/images/velway/1st-floor/coming-soon.jpg' },
          { name: 'Corridor', image: '/images/velway/1st-floor/coming-soon.jpg' },
          { name: 'Dry-Yard', image: '/images/velway/1st-floor/coming-soon.jpg' }, // 👈 想要多加的 shared space 示范
        ],
        rooms: [
          { name: 'Room V1A', image: '/images/velway/1st-floor/coming-soon.jpg' },
          { name: 'Room V1B', image: '/images/velway/1st-floor/coming-soon.jpg' },
          { name: 'Room V1C', image: '/images/velway/1st-floor/coming-soon.jpg' },
          { name: 'Room V1D', image: '/images/velway/1st-floor/coming-soon.jpg' },
          { name: 'Room V1E', image: '/images/velway/1st-floor/coming-soon.jpg' },
          { name: 'Room V1F', image: '/images/velway/1st-floor/coming-soon.jpg' },
          { name: 'Room V1G', image: '/images/velway/1st-floor/coming-soon.jpg' },
          { name: 'Room V1H', image: '/images/velway/1st-floor/coming-soon.jpg' },
          { name: 'Room V1I', image: '/images/velway/1st-floor/coming-soon.jpg' },
          { name: 'Room V1J', image: '/images/velway/1st-floor/coming-soon.jpg' },
        ],
      },
      {
        label: 'SECOND FLOOR',
        commonAreas: [
          { name: 'Kitchen', image: '/images/velway/2nd-floor/v2-common-space/v2-kitchen.webp' },
          { name: 'Bathroom', image: '/images/velway/2nd-floor/v2-common-space/v2-bathroom.webp' },
          { name: 'Corridor', image: '/images/velway/2nd-floor/v2-common-space/v2-corridor.webp' },
          { name: 'Entrance', image: '/images/velway/2nd-floor/v2-common-space/coming-soon.jpg' },
          { name: 'Dry-Yard', image: '/images/velway/2nd-floor/v2-common-space/v2-dry-yard.webp' }, // 👈 想要多加的 shared space 示范
        ],
        rooms: [
          { name: 'Room V2A', image: '/images/velway/2nd-floor/v2-room/v2a-double-window-female.webp' },
          { name: 'Room V2B', image: '/images/velway/2nd-floor/v2-room/v2b-double-window-female.webp' },
          { name: 'Room V2C', image: '/images/velway/2nd-floor/v2-room/v2c-single-window-female.webp' },
          { name: 'Room V2D', image: '/images/velway/2nd-floor/v2-room/v2d-single-skylight-female.webp' },
          { name: 'Room V2E', image: '/images/velway/2nd-floor/v2-room/v2e-single-window-female.webp' },
          { name: 'Room V2F', image: '/images/velway/2nd-floor/v2-room/v2f-single-skylight-female.webp' },
          { name: 'Room V2G', image: '/images/velway/2nd-floor/v2-room/v2g-single-window-female.webp' },
          { name: 'Room V2H', image: '/images/velway/2nd-floor/v2-room/v2h-single-window-female.webp' },
          { name: 'Room V2I', image: '/images/velway/2nd-floor/v2-room/v2i-single-skylight-female.webp' },
          { name: 'Room V2J', image: '/images/velway/2nd-floor/v2-room/v2j-single-window-female.webp' },
          { name: 'Room V2K', image: '/images/velway/2nd-floor/v2-room/v2k-single-window-female.webp' },
        ],
      },
    ],
    mapImage: '/images/map/velwaymap.png',
    mapImageMobile: '/images/map/mobile/velwaymap.png',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=2.342737,%20111.832199',
    virtualTourUrl: ''
  },

}

export function getResidenceDetail(id: string): ResidenceDetail {
  return (
    residenceDetails[id] ?? {
      highlightTags: ['全家私'],
      heroImages: ['/placeholder.svg'],
      amenityGrid: {
        propertyType: ['Co-Living Studio'],
        propertyLayout: ['Modern Layout'],
        roomType: ['Standard Single'],
        occupancyType: ['All Welcomed'],
        bathroomFacilities: ['Water Heater Equipped'],
        sharedAmenities: ['Basic Shared Kitchen & Wi-Fi'],
        deposit: ['Contact for Details'],
        utilities: ['Billed via Submeter'],
      },
      floors: [],
      mapImage: '/placeholder.svg',
      mapCaption: 'Sibu, Sarawak',
    }
  )
}