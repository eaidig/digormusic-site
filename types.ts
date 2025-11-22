export interface Vector {
  x: number;
  y: number;
}

export interface BoidConfig {
  perceptionRadius: number;
  maxSpeed: number;
  maxForce: number;
  separationWeight: number;
  alignmentWeight: number;
  cohesionWeight: number;
}

export interface Song {
  title: string;
  artist: string;
  duration: string;
  cover: string;
}