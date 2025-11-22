import { BoidConfig, Song } from './types';

export const BOID_CONFIG: BoidConfig = {
  perceptionRadius: 50,
  maxSpeed: 3,
  maxForce: 0.05,
  separationWeight: 1.5,
  alignmentWeight: 1.0,
  cohesionWeight: 1.0,
};

export const FEATURED_SONG: Song = {
  title: "Caminhos do Vento",
  artist: "Digor Music",
  duration: "3:45",
  cover: "https://picsum.photos/400/400?grayscale", // Abstract placeholder
};

export const SOCIAL_LINKS = {
  spotify: "#",
  youtube: "#",
  instagram: "#",
  contact: "mailto:contato@digormusic.com.br"
};