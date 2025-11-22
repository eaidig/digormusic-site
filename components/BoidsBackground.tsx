import React, { useRef, useEffect } from 'react';
import { BOID_CONFIG } from '../constants';
import { Vector } from '../types';

class Boid {
  position: Vector;
  velocity: Vector;
  acceleration: Vector;
  width: number;
  height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.position = {
      x: Math.random() * width,
      y: Math.random() * height
    };
    const angle = Math.random() * 2 * Math.PI;
    this.velocity = {
      x: Math.cos(angle),
      y: Math.sin(angle)
    };
    this.acceleration = { x: 0, y: 0 };
  }

  edges() {
    if (this.position.x > this.width) this.position.x = 0;
    else if (this.position.x < 0) this.position.x = this.width;
    if (this.position.y > this.height) this.position.y = 0;
    else if (this.position.y < 0) this.position.y = this.height;
  }

  align(boids: Boid[]) {
    let steering = { x: 0, y: 0 };
    let total = 0;
    for (const other of boids) {
      const d = Math.hypot(this.position.x - other.position.x, this.position.y - other.position.y);
      if (other !== this && d < BOID_CONFIG.perceptionRadius) {
        steering.x += other.velocity.x;
        steering.y += other.velocity.y;
        total++;
      }
    }
    if (total > 0) {
      steering.x /= total;
      steering.y /= total;
      const mag = Math.hypot(steering.x, steering.y);
      if (mag > 0) {
        steering.x = (steering.x / mag) * BOID_CONFIG.maxSpeed;
        steering.y = (steering.y / mag) * BOID_CONFIG.maxSpeed;
      }
      steering.x -= this.velocity.x;
      steering.y -= this.velocity.y;
      const steerMag = Math.hypot(steering.x, steering.y);
      if (steerMag > BOID_CONFIG.maxForce) {
        steering.x = (steering.x / steerMag) * BOID_CONFIG.maxForce;
        steering.y = (steering.y / steerMag) * BOID_CONFIG.maxForce;
      }
    }
    return steering;
  }

  separation(boids: Boid[]) {
    let steering = { x: 0, y: 0 };
    let total = 0;
    for (const other of boids) {
      const d = Math.hypot(this.position.x - other.position.x, this.position.y - other.position.y);
      if (other !== this && d < BOID_CONFIG.perceptionRadius / 1.5) {
        let diff = { x: this.position.x - other.position.x, y: this.position.y - other.position.y };
        if (d > 0) {
            diff.x /= d;
            diff.y /= d;
        }
        steering.x += diff.x;
        steering.y += diff.y;
        total++;
      }
    }
    if (total > 0) {
      steering.x /= total;
      steering.y /= total;
      const mag = Math.hypot(steering.x, steering.y);
      if (mag > 0) {
        steering.x = (steering.x / mag) * BOID_CONFIG.maxSpeed;
        steering.y = (steering.y / mag) * BOID_CONFIG.maxSpeed;
      }
      steering.x -= this.velocity.x;
      steering.y -= this.velocity.y;
      const steerMag = Math.hypot(steering.x, steering.y);
      if (steerMag > BOID_CONFIG.maxForce) {
        steering.x = (steering.x / steerMag) * BOID_CONFIG.maxForce;
        steering.y = (steering.y / steerMag) * BOID_CONFIG.maxForce;
      }
    }
    return steering;
  }

  cohesion(boids: Boid[]) {
    let steering = { x: 0, y: 0 };
    let total = 0;
    for (const other of boids) {
      const d = Math.hypot(this.position.x - other.position.x, this.position.y - other.position.y);
      if (other !== this && d < BOID_CONFIG.perceptionRadius) {
        steering.x += other.position.x;
        steering.y += other.position.y;
        total++;
      }
    }
    if (total > 0) {
      steering.x /= total;
      steering.y /= total;
      steering.x -= this.position.x;
      steering.y -= this.position.y;
      const mag = Math.hypot(steering.x, steering.y);
      if (mag > 0) {
        steering.x = (steering.x / mag) * BOID_CONFIG.maxSpeed;
        steering.y = (steering.y / mag) * BOID_CONFIG.maxSpeed;
      }
      steering.x -= this.velocity.x;
      steering.y -= this.velocity.y;
      const steerMag = Math.hypot(steering.x, steering.y);
      if (steerMag > BOID_CONFIG.maxForce) {
        steering.x = (steering.x / steerMag) * BOID_CONFIG.maxForce;
        steering.y = (steering.y / steerMag) * BOID_CONFIG.maxForce;
      }
    }
    return steering;
  }

  flock(boids: Boid[]) {
    const alignment = this.align(boids);
    const cohesion = this.cohesion(boids);
    const separation = this.separation(boids);

    this.acceleration.x += alignment.x * BOID_CONFIG.alignmentWeight;
    this.acceleration.y += alignment.y * BOID_CONFIG.alignmentWeight;
    
    this.acceleration.x += cohesion.x * BOID_CONFIG.cohesionWeight;
    this.acceleration.y += cohesion.y * BOID_CONFIG.cohesionWeight;
    
    this.acceleration.x += separation.x * BOID_CONFIG.separationWeight;
    this.acceleration.y += separation.y * BOID_CONFIG.separationWeight;
  }

  update() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    this.velocity.x += this.acceleration.x;
    this.velocity.y += this.acceleration.y;

    const speed = Math.hypot(this.velocity.x, this.velocity.y);
    if (speed > BOID_CONFIG.maxSpeed) {
      this.velocity.x = (this.velocity.x / speed) * BOID_CONFIG.maxSpeed;
      this.velocity.y = (this.velocity.y / speed) * BOID_CONFIG.maxSpeed;
    }
    
    this.acceleration = { x: 0, y: 0 };
    this.edges();
  }

  draw(ctx: CanvasRenderingContext2D) {
    const angle = Math.atan2(this.velocity.y, this.velocity.x);
    const size = 5; // Slightly smaller for elegance
    
    ctx.save();
    ctx.translate(this.position.x, this.position.y);
    ctx.rotate(angle);
    
    ctx.beginPath();
    ctx.moveTo(size * 1.5, 0);
    ctx.lineTo(-size, size);
    ctx.lineTo(-size * 0.5, 0); // Indented tail for bird shape
    ctx.lineTo(-size, -size);
    ctx.lineTo(size * 1.5, 0);
    
    // DARK GREEN Birds to contrast with Yellow Background
    ctx.fillStyle = 'rgba(27, 94, 32, 0.5)'; 
    ctx.fill();
    
    ctx.restore();
  }
}

const BoidsBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const flock: Boid[] = [];
    const flockSize = 60; // Adjusted count

    const resizeCanvas = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      if (flock.length === 0) {
        for (let i = 0; i < flockSize; i++) {
            flock.push(new Boid(canvas.width, canvas.height));
        }
      } else {
        flock.forEach(b => {
            b.width = canvas.width;
            b.height = canvas.height;
        });
      }
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const flockSnapshot = [...flock];
      for (const boid of flock) {
        boid.edges();
        boid.flock(flockSnapshot);
        boid.update();
        boid.draw(ctx);
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};

export default BoidsBackground;