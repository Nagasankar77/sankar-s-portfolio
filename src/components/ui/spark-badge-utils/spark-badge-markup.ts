export const SPARK_BADGE_MARKUP = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Animated credential badge in rain</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body {
      width: 100%;
      height: 100%;
      overflow: hidden;
      background-color: #020617;
    }
    canvas {
      display: block;
      width: 100%;
      height: 100%;
    }
  </style>
</head>
<body>
  <canvas id="canvas"></canvas>
  <script>
    (function() {
      const canvas = document.getElementById('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      let width = 0;
      let height = 0;
      let dpr = 1;
      let mouse = { x: -9999, y: -9999, active: false };

      function resize() {
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
      }
      window.addEventListener('resize', resize);
      resize();

      window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        mouse.active = true;
      });
      window.addEventListener('mouseleave', () => {
        mouse.active = false;
      });

      // Simplex-like simple curl noise generator
      function pseudoNoise(x, y, t) {
        return Math.sin(x * 0.015 + t * 0.8) * Math.cos(y * 0.015 - t * 0.6) +
               Math.sin((x + y) * 0.008 + t * 0.4) * 0.5;
      }

      // 1. Rear Rain System
      const rearRainCount = Math.floor(Math.max(60, Math.min(width * 0.12, 140)));
      const rearDrops = [];
      for (let i = 0; i < rearRainCount; i++) {
        rearDrops.push({
          x: Math.random() * width,
          y: Math.random() * height,
          length: Math.random() * 24 + 16,
          speed: Math.random() * 8 + 12,
          opacity: Math.random() * 0.18 + 0.07,
          width: Math.random() * 0.8 + 0.4
        });
      }

      // 2. Foreground Rain & Splashes
      const fgRainCount = Math.floor(Math.max(40, Math.min(width * 0.08, 90)));
      const fgDrops = [];
      for (let i = 0; i < fgRainCount; i++) {
        fgDrops.push({
          x: Math.random() * width,
          y: Math.random() * height,
          length: Math.random() * 38 + 24,
          speed: Math.random() * 12 + 18,
          opacity: Math.random() * 0.35 + 0.15,
          width: Math.random() * 1.2 + 0.7
        });
      }

      const splashes = [];
      function addSplash(x, y, color = 'rgba(56, 189, 248,') {
        const count = Math.floor(Math.random() * 4) + 2;
        for (let i = 0; i < count; i++) {
          const angle = Math.PI + (Math.random() - 0.5) * Math.PI * 0.8;
          const speed = Math.random() * 2.5 + 1;
          splashes.push({
            x,
            y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed * 0.7,
            life: 1.0,
            decay: Math.random() * 0.04 + 0.03,
            size: Math.random() * 1.6 + 0.8,
            color
          });
        }
      }

      // 3. Curl-Noise Embers & Waterline Sparks
      const emberCount = 85;
      const embers = [];
      for (let i = 0; i < emberCount; i++) {
        embers.push({
          x: width * 0.5 + (Math.random() - 0.5) * Math.min(width * 0.6, 500),
          y: height * 0.5 + (Math.random() - 0.5) * Math.min(height * 0.6, 400),
          vx: 0,
          vy: 0,
          size: Math.random() * 2.2 + 1,
          hue: Math.random() > 0.3 ? 188 : 205, // cyan to electric blue
          alpha: Math.random() * 0.8 + 0.2,
          pulseSpeed: Math.random() * 0.03 + 0.02,
          pulse: Math.random() * Math.PI * 2
        });
      }

      // Waterline Ripples
      const ripples = [];
      let lastRippleTime = 0;

      let time = 0;

      function render() {
        time += 0.018;

        // Background clear with slight decay for motion blur
        ctx.fillStyle = '#020617';
        ctx.fillRect(0, 0, width, height);

        // Center coordinates
        const cx = width * 0.5;
        const cy = height * 0.46;
        const badgeWidth = Math.min(width * 0.75, 460);
        const badgeHeight = Math.min(height * 0.6, 320);
        const waterlineY = cy + badgeHeight * 0.42;

        // Ambient radial glow behind badge
        const radialGlow = ctx.createRadialGradient(cx, cy, 20, cx, cy, Math.max(badgeWidth, 360));
        radialGlow.addColorStop(0, 'rgba(6, 182, 212, 0.12)');
        radialGlow.addColorStop(0.5, 'rgba(30, 58, 138, 0.08)');
        radialGlow.addColorStop(1, 'rgba(2, 6, 23, 0)');
        ctx.fillStyle = radialGlow;
        ctx.fillRect(0, 0, width, height);

        // PASS 1: Rear Rain
        ctx.strokeStyle = '#64748b';
        ctx.lineCap = 'round';
        for (let i = 0; i < rearDrops.length; i++) {
          const d = rearDrops[i];
          ctx.lineWidth = d.width;
          ctx.strokeStyle = 'rgba(148, 163, 184, ' + d.opacity + ')';
          ctx.beginPath();
          ctx.moveTo(d.x, d.y);
          ctx.lineTo(d.x + d.length * 0.18, d.y + d.length);
          ctx.stroke();

          d.x += d.speed * 0.18;
          d.y += d.speed;

          if (d.y > height) {
            d.y = -d.length;
            d.x = Math.random() * width;
          }
        }

        // PASS 2: Luminous Credential Badge & Waterline
        ctx.save();
        
        // Dissolve & reform breathing pulse
        const breathe = Math.sin(time * 1.2) * 0.15 + 0.85;

        // Draw Badge Contour (Carved geometric credential)
        const bw = badgeWidth * 0.5;
        const bh = badgeHeight * 0.5;

        ctx.strokeStyle = 'rgba(6, 182, 212, ' + (0.35 * breathe) + ')';
        ctx.lineWidth = 1.5;
        ctx.shadowColor = 'rgba(6, 182, 212, 0.6)';
        ctx.shadowBlur = 18;

        // Outer Hexagonal Shield Path
        ctx.beginPath();
        ctx.moveTo(cx, cy - bh);
        ctx.lineTo(cx + bw * 0.9, cy - bh * 0.65);
        ctx.lineTo(cx + bw, cy + bh * 0.35);
        ctx.lineTo(cx, cy + bh);
        ctx.lineTo(cx - bw, cy + bh * 0.35);
        ctx.lineTo(cx - bw * 0.9, cy - bh * 0.65);
        ctx.closePath();
        ctx.stroke();

        // Inner frame with subtle fill
        ctx.shadowBlur = 0;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.015)';
        ctx.fill();

        ctx.strokeStyle = 'rgba(255, 255, 255, ' + (0.12 * breathe) + ')';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Carved Typography & Emblems
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Badge Status Pill
        ctx.font = '600 10px monospace';
        ctx.letterSpacing = '3px';
        ctx.fillStyle = 'rgba(34, 211, 238, ' + (0.85 * breathe) + ')';
        ctx.fillText('AI // MACHINE LEARNING CREDENTIAL', cx, cy - bh * 0.45);

        // Core Figure Name & Role
        ctx.font = '900 24px "Space Grotesk", sans-serif';
        ctx.fillStyle = 'rgba(255, 255, 255, ' + (0.92 * breathe) + ')';
        ctx.shadowColor = 'rgba(56, 189, 248, 0.5)';
        ctx.shadowBlur = 12;
        ctx.fillText('NAGASANKAR', cx, cy - bh * 0.1);

        ctx.shadowBlur = 0;
        ctx.font = '600 11px monospace';
        ctx.fillStyle = 'rgba(148, 163, 184, ' + (0.75 * breathe) + ')';
        ctx.fillText('FUTURE AI ENGINEER • 7.7 CGPA', cx, cy + bh * 0.16);

        // Waterline (Sparks and boundary)
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(cx - bw * 1.15, waterlineY);
        ctx.lineTo(cx + bw * 1.15, waterlineY);
        ctx.stroke();

        // Waterline Sparks burst occasionally
        if (Math.random() < 0.3) {
          const sx = cx + (Math.random() - 0.5) * badgeWidth * 1.6;
          addSplash(sx, waterlineY, 'rgba(34, 211, 238,');
        }

        ctx.restore();

        // Waterline Ripples
        if (time - lastRippleTime > 0.45) {
          ripples.push({
            x: cx + (Math.random() - 0.5) * badgeWidth,
            y: waterlineY,
            radius: 2,
            maxRadius: Math.random() * 35 + 20,
            alpha: 0.5
          });
          lastRippleTime = time;
        }

        for (let i = ripples.length - 1; i >= 0; i--) {
          const r = ripples[i];
          r.radius += 0.8;
          r.alpha *= 0.96;

          ctx.save();
          ctx.strokeStyle = 'rgba(56, 189, 248, ' + r.alpha + ')';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.ellipse(r.x, r.y, r.radius, r.radius * 0.25, 0, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();

          if (r.alpha < 0.02 || r.radius > r.maxRadius) {
            ripples.splice(i, 1);
          }
        }

        // Curl-Noise Embers Field
        for (let i = 0; i < embers.length; i++) {
          const e = embers[i];
          const angle = pseudoNoise(e.x, e.y, time) * Math.PI * 2.5;

          e.vx = Math.cos(angle) * 1.4;
          e.vy = Math.sin(angle) * 1.4 - 0.8; // Net upward drift

          // Mouse attraction/repulsion
          if (mouse.active) {
            const dx = mouse.x - e.x;
            const dy = mouse.y - e.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 180 && dist > 10) {
              e.vx += (dx / dist) * 0.8;
              e.vy += (dy / dist) * 0.8;
            }
          }

          e.x += e.vx;
          e.y += e.vy;
          e.pulse += e.pulseSpeed;

          // Re-spawn if off-screen or faded
          if (e.y < cy - bh * 1.4 || e.x < 0 || e.x > width || e.y > height) {
            e.x = cx + (Math.random() - 0.5) * badgeWidth * 1.1;
            e.y = waterlineY + Math.random() * 40;
          }

          const currentAlpha = (Math.sin(e.pulse) * 0.3 + 0.7) * e.alpha;
          ctx.save();
          ctx.fillStyle = 'hsla(' + e.hue + ', 90%, 65%, ' + currentAlpha + ')';
          ctx.shadowColor = 'hsla(' + e.hue + ', 95%, 60%, 0.8)';
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(e.x, e.y, e.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        // PASS 3: Foreground Rain & Splashes
        ctx.lineCap = 'round';
        for (let i = 0; i < fgDrops.length; i++) {
          const d = fgDrops[i];
          ctx.lineWidth = d.width;
          ctx.strokeStyle = 'rgba(56, 189, 248, ' + d.opacity + ')';
          ctx.beginPath();
          ctx.moveTo(d.x, d.y);
          ctx.lineTo(d.x + d.length * 0.16, d.y + d.length);
          ctx.stroke();

          d.x += d.speed * 0.16;
          d.y += d.speed;

          // Impact at waterline or bottom
          if (d.y >= waterlineY && d.y - d.speed < waterlineY && Math.abs(d.x - cx) < badgeWidth * 0.8) {
            addSplash(d.x, waterlineY, 'rgba(56, 189, 248,');
          }

          if (d.y > height) {
            if (Math.random() < 0.4) {
              addSplash(d.x, height - 2, 'rgba(148, 163, 184,');
            }
            d.y = -d.length;
            d.x = Math.random() * width;
          }
        }

        // Render Splashes
        for (let i = splashes.length - 1; i >= 0; i--) {
          const s = splashes[i];
          s.x += s.vx;
          s.y += s.vy;
          s.vy += 0.15; // gravity
          s.life -= s.decay;

          ctx.fillStyle = s.color + s.life + ')';
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
          ctx.fill();

          if (s.life <= 0) {
            splashes.splice(i, 1);
          }
        }

        requestAnimationFrame(render);
      }

      requestAnimationFrame(render);
    })();
  </script>
</body>
</html>
`;
