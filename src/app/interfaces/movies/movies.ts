export interface Root {
    score: number
    show: MovieListItem
  }
  
  export interface MovieListItem {
    id: number
    url: string
    name: string
    type: string
    language: any
    genres: string[]
    status: string
    runtime: number
    averageRuntime: number
    premiered: string
    ended: string
    officialSite: any
    schedule: Schedule
    rating: Rating
    weight: number
    network: Network
    webChannel: any
    dvdCountry: any
    externals: Externals
    image: Image
    summary: string
    updated: number
    _links: Links
  }
  export interface Movie {
    id: number
    url: string
    name: string
    type: string
    language: string
    genres: string[]
    status: string
    runtime: any
    averageRuntime: number
    premiered: string
    ended: string
    officialSite: string
    schedule: Schedule
    rating: Rating
    weight: number
    network: any
    webChannel: WebChannel
    dvdCountry: any
    externals: Externals
    image: Image
    summary: string
    updated: number
    _links: Links
  }
  
  export interface Schedule {
    time: string
    days: string[]
  }
  
  export interface Rating {
    average: number
  }
  
  export interface Network {
    id: number
    name: string
    country: Country
    officialSite: any
  }
  
  export interface Country {
    name: string
    code: string
    timezone: string
  }
  
  export interface Externals {
    tvrage: any
    thetvdb: number
    imdb: string
  }
  
  export interface Image {
    medium: string
    original: string
  }
  
  export interface Links {
    self: Self
    previousepisode: Previousepisode
  }
  
  export interface Self {
    href: string
  }
  
  export interface Previousepisode {
    href: string
    name: string
  }

  export interface WebChannel {
    id: number
    name: string
    country: any
    officialSite: string
  }
  