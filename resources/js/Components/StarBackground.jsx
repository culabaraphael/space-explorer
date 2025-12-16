import { useEffect, useRef, useState } from 'react';

export default function StarBackground() {
    const canvasRef = useRef(null);
    const [imagesLoaded, setImagesLoaded] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Load planet textures
        const planetTextures = {};
        const textureUrls = {
            earth: '/images/planets/2k_earth_daymap.jpg',
            jupiter: '/images/planets/2k_jupiter.jpg',
            mars: '/images/planets/2k_mars.jpg',
            mercury: '/images/planets/2k_mercury.jpg',
            neptune: '/images/planets/2k_neptune.jpg',
            saturn: '/images/planets/2k_saturn.jpg',
            saturnRing: '/images/planets/2k_saturn_ring_alpha.png',
            uranus: '/images/planets/2k_uranus.jpg',
            venus: '/images/planets/2k_venus_atmosphere.jpg',
        };

        let loadedCount = 0;
        const totalTextures = Object.keys(textureUrls).length;

        // Load all textures
        Object.keys(textureUrls).forEach(key => {
            const img = new Image();
            img.onload = () => {
                loadedCount++;
                if (loadedCount === totalTextures) {
                    setImagesLoaded(true);
                    startAnimation();
                }
            };
            img.onerror = () => {
                console.warn(`Failed to load texture: ${textureUrls[key]}`);
                loadedCount++;
                if (loadedCount === totalTextures) {
                    startAnimation();
                }
            };
            img.src = textureUrls[key];
            planetTextures[key] = img;
        });

        class Star {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.z = Math.random() * canvas.width;
                this.speed = 2;
            }

            update() {
                this.z -= this.speed;
                if (this.z <= 0) {
                    this.z = canvas.width;
                    this.x = Math.random() * canvas.width;
                    this.y = Math.random() * canvas.height;
                }
            }

            draw() {
                const sx = (this.x - canvas.width / 2) * (canvas.width / this.z);
                const sy = (this.y - canvas.height / 2) * (canvas.width / this.z);
                const x = sx + canvas.width / 2;
                const y = sy + canvas.height / 2;

                const size = (1 - this.z / canvas.width) * 2;
                const opacity = 1 - this.z / canvas.width;

                ctx.beginPath();
                ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        class Planet {
            constructor() {
                this.reset();
                // Start at random position instead of all from far away
                this.z = Math.random() * canvas.width;
            }

            reset() {
                this.x = Math.random() * canvas.width - canvas.width / 2;
                this.y = Math.random() * canvas.height - canvas.height / 2;
                this.z = canvas.width;
                this.speed = 0.5 + Math.random() * 0.5;
                this.baseSize = 80 + Math.random() * 140;

                // Real planet types with their textures
                const planetTypes = [
                    { texture: 'mars', name: 'Mars', hasRings: false },
                    { texture: 'jupiter', name: 'Jupiter', hasRings: false },
                    { texture: 'saturn', name: 'Saturn', hasRings: true },
                    { texture: 'earth', name: 'Earth', hasRings: false },
                    { texture: 'neptune', name: 'Neptune', hasRings: false },
                    { texture: 'uranus', name: 'Uranus', hasRings: false },
                    { texture: 'venus', name: 'Venus', hasRings: false },
                    { texture: 'mercury', name: 'Mercury', hasRings: false },
                ];

                this.type = planetTypes[Math.floor(Math.random() * planetTypes.length)];
                this.rotation = Math.random() * Math.PI * 2;
                this.rotationSpeed = (Math.random() - 0.5) * 0.01;
                this.hasRings = this.type.hasRings;
                this.ringRotation = Math.random() * Math.PI * 2;
            }

            update() {
                this.z -= this.speed;
                // Rotate planet from left to right (positive rotation)
                this.rotation += 0.005;
                // Rotate rings slowly
                this.ringRotation += 0.002;

                if (this.z <= 0) {
                    this.reset();
                }
            }

            draw() {
                const sx = (this.x / this.z) * canvas.width;
                const sy = (this.y / this.z) * canvas.height;
                const x = sx + canvas.width / 2;
                const y = sy + canvas.height / 2;

                const scale = (1 - this.z / canvas.width);
                const size = this.baseSize * scale;
                const opacity = Math.min(scale * 2, 0.9);

                if (size < 5 || opacity < 0.1) return;

                const texture = planetTextures[this.type.texture];
                if (!texture || !texture.complete) return;

                ctx.save();

                // Draw Saturn's rings behind planet
                if (this.hasRings && size > 20 && planetTextures.saturnRing && planetTextures.saturnRing.complete) {
                    ctx.save();
                    ctx.globalAlpha = opacity * 0.85;
                    ctx.translate(x, y);

                    // Tilt the rings
                    ctx.rotate(-0.3);

                    // Back half (behind planet)
                    ctx.save();
                    ctx.beginPath();
                    ctx.ellipse(0, 0, size * 2.3, size * 0.5, 0, Math.PI, Math.PI * 2);
                    ctx.closePath();
                    ctx.clip();

                    // Rotate ring texture slightly
                    ctx.rotate(this.ringRotation);

                    // Draw ring texture centered
                    const ringSize = size * 3;
                    ctx.drawImage(
                        planetTextures.saturnRing,
                        -ringSize / 2,
                        -ringSize / 2,
                        ringSize,
                        ringSize
                    );
                    ctx.restore();

                    ctx.restore();
                }

                // Draw the planet sphere
                ctx.globalAlpha = opacity;

                // Create circular clipping path
                ctx.save();
                ctx.beginPath();
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.clip();

                // Draw texture with rotation (left to right)
                // Calculate how much of the texture to show based on rotation
                const textureWidth = texture.width;
                const textureHeight = texture.height;

                // Offset texture horizontally for rotation effect
                const rotationOffset = (this.rotation * textureWidth * 0.5) % textureWidth;

                // Draw texture in two parts for seamless rotation
                ctx.drawImage(
                    texture,
                    rotationOffset, 0, textureWidth - rotationOffset, textureHeight,
                    x - size, y - size, (textureWidth - rotationOffset) / textureWidth * size * 2, size * 2
                );

                if (rotationOffset > 0) {
                    ctx.drawImage(
                        texture,
                        0, 0, rotationOffset, textureHeight,
                        x - size + (textureWidth - rotationOffset) / textureWidth * size * 2, y - size,
                        rotationOffset / textureWidth * size * 2, size * 2
                    );
                }

                ctx.restore();

                // Add spherical shading for 3D effect
                ctx.globalAlpha = opacity;

                // Shadow gradient from right edge (terminator)
                const shadowGradient = ctx.createRadialGradient(
                    x - size * 0.2,
                    y - size * 0.2,
                    size * 0.3,
                    x,
                    y,
                    size * 1.4
                );
                shadowGradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
                shadowGradient.addColorStop(0.6, 'rgba(0, 0, 0, 0.2)');
                shadowGradient.addColorStop(1, 'rgba(0, 0, 0, 0.8)');

                ctx.fillStyle = shadowGradient;
                ctx.beginPath();
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.fill();

                // Add bright highlight for sun reflection
                ctx.globalAlpha = opacity * 0.6;
                const highlightGradient = ctx.createRadialGradient(
                    x - size * 0.35,
                    y - size * 0.35,
                    0,
                    x - size * 0.35,
                    y - size * 0.35,
                    size * 0.6
                );
                highlightGradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
                highlightGradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.4)');
                highlightGradient.addColorStop(1, 'transparent');
                ctx.fillStyle = highlightGradient;
                ctx.beginPath();
                ctx.arc(x - size * 0.35, y - size * 0.35, size * 0.6, 0, Math.PI * 2);
                ctx.fill();

                // Draw Saturn's rings in front of planet
                if (this.hasRings && size > 20 && planetTextures.saturnRing && planetTextures.saturnRing.complete) {
                    ctx.save();
                    ctx.globalAlpha = opacity;
                    ctx.translate(x, y);

                    // Tilt the rings
                    ctx.rotate(-0.3);

                    // Front half (in front of planet)
                    ctx.save();
                    ctx.beginPath();
                    ctx.ellipse(0, 0, size * 2.3, size * 0.5, 0, 0, Math.PI);
                    ctx.closePath();
                    ctx.clip();

                    // Rotate ring texture slightly
                    ctx.rotate(this.ringRotation);

                    // Draw ring texture centered
                    const ringSize = size * 3;
                    ctx.drawImage(
                        planetTextures.saturnRing,
                        -ringSize / 2,
                        -ringSize / 2,
                        ringSize,
                        ringSize
                    );
                    ctx.restore();

                    // Add planet shadow on the rings
                    ctx.save();
                    ctx.globalAlpha = opacity * 0.6;
                    ctx.beginPath();
                    ctx.ellipse(0, 0, size * 2.3, size * 0.5, 0, 0, Math.PI);
                    ctx.closePath();
                    ctx.clip();

                    // Shadow gradient
                    const shadowGrad = ctx.createRadialGradient(0, 0, size * 0.8, 0, 0, size * 1.5);
                    shadowGrad.addColorStop(0, 'rgba(0, 0, 0, 0.8)');
                    shadowGrad.addColorStop(0.7, 'rgba(0, 0, 0, 0.3)');
                    shadowGrad.addColorStop(1, 'transparent');

                    ctx.fillStyle = shadowGrad;
                    ctx.fillRect(-size * 2.5, -size * 0.6, size * 5, size * 1.2);
                    ctx.restore();

                    ctx.restore();
                }

                ctx.restore();
            }
        }

        // Create stars only (no planets)
        const stars = Array.from({ length: 300 }, () => new Star());
        let animationFrameId;

        function startAnimation() {
            function animate() {
                ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                // Draw and update stars
                stars.forEach(star => {
                    star.update();
                    star.draw();
                });

                animationFrameId = requestAnimationFrame(animate);
            }

            animate();
        }

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 -z-10"
            style={{ background: '#000000' }}
        />
    );
}
