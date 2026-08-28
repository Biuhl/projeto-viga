"use client";

import { useEffect, useRef } from "react";

export default function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationFrameId: number;
    let timeoutId: NodeJS.Timeout;

    const resizeCanvas = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // --- ESTRELAS FIXAS QUE PISCAM ---
    const STAR_COUNT = 220;

    class Star {
      x = 0;
      y = 0;
      size = 0;
      alpha = 0;
      speed = 0;

      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 1.4 + 0.3;
        this.alpha = Math.random();
        this.speed = (Math.random() * 0.015 + 0.005) * (Math.random() > 0.5 ? 1 : -1);
      }

      update() {
        this.alpha += this.speed;
        if (this.alpha <= 0.05 || this.alpha >= 1) {
          this.speed = -this.speed;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, this.alpha)})`;
        ctx.shadowBlur = this.size * 2;
        ctx.shadowColor = "#ffffff";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    const stars: Star[] = Array.from({ length: STAR_COUNT }, () => new Star());

    // --- ESTRELAS CADENTES ---
    class ShootingStar {
      x = 0;
      y = 0;
      length = 0;
      speed = 0;
      angle = Math.PI / 4;
      opacity = 1;
      active = false;

      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * (width * 0.8);
        this.y = Math.random() * (height * 0.5);
        this.length = Math.random() * 100 + 70;
        this.speed = Math.random() * 12 + 15;
        this.angle = Math.PI / 4;
        this.opacity = 1;
        this.active = false;
      }

      trigger() {
        this.reset();
        this.active = true;
      }

      update() {
        if (!this.active) return;
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.opacity -= 0.016;

        if (this.opacity <= 0 || this.x > width || this.y > height) {
          this.active = false;
        }
      }

      draw() {
        if (!this.active || !ctx) return;

        const tailX = this.x - Math.cos(this.angle) * this.length;
        const tailY = this.y - Math.sin(this.angle) * this.length;

        const gradient = ctx.createLinearGradient(this.x, this.y, tailX, tailY);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity})`);
        gradient.addColorStop(0.3, `rgba(180, 220, 255, ${this.opacity * 0.8})`);
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.save();
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();
        ctx.restore();
      }
    }

    const shootingStars: ShootingStar[] = Array.from({ length: 4 }, () => new ShootingStar());

    const spawnShootingStar = () => {
      const inactiveStar = shootingStars.find((s) => !s.active);
      if (inactiveStar) {
        inactiveStar.trigger();
      }
      timeoutId = setTimeout(spawnShootingStar, Math.random() * 2500 + 800);
    };

    spawnShootingStar();

    // --- LOOP DE RENDERIZAÇÃO ---
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      stars.forEach((star) => {
        star.update();
        star.draw();
      });

      shootingStars.forEach((star) => {
        star.update();
        star.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 bg-black"
    />
  );
}