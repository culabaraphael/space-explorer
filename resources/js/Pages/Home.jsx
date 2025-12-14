import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

export default function Home({ auth }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Star class
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

        // Create stars
        const stars = Array.from({ length: 800 }, () => new Star());

        // Animation loop
        function animate() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            stars.forEach(star => {
                star.update();
                star.draw();
            });

            requestAnimationFrame(animate);
        }

        animate();

        // Handle resize
        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <Head title="Home" />

            {/* Animated Star Background */}
            <canvas
                ref={canvasRef}
                className="fixed inset-0 -z-10"
                style={{ background: '#000000' }}
            />

            {/* Custom Navbar */}
            <nav className="fixed top-0 w-full z-50 bg-slate-900/50 backdrop-blur-md border-b border-blue-500/20">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <span className="text-xl font-bold text-white">Cosmic Explorer</span>
                    </div>

                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                        Home
                        </Link>
                        <Link href="/explore" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                        Explore
                        </Link>
                        <Link href="/daily-discovery" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                        Gallery
                        </Link>
                        {auth.user ? (
                        <Link href="/my-journey" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                        Journal
                        </Link>
                        ) : null}
                    </div>

                    {auth.user ? (
                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                        >
                            Logout
                        </Link>
                    ) : (
                        <Link
                            href="/login"
                            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </nav>

            {/* Main Content */}
            <div className="min-h-screen flex flex-col items-center justify-center px-4 pt-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="max-w-4xl text-center"
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-block mb-8 px-4 py-2 bg-blue-500/20 border border-blue-500/50 rounded-full"
                    >
                        <span className="text-cyan-300 text-sm flex items-center gap-2">
                            <span>✨</span> Powered by NASA API
                        </span>
                    </motion.div>

                    {/* Main Heading */}
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
                    >
                        Begin Your{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-500 to-blue-600">
                            Cosmic Journey
                        </span>
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto"
                    >
                        Explore the wonders of space through stunning imagery, discover
                        celestial objects, and create your personal space journal
                    </motion.p>

                    {/* Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Link
                            href="/explore"
                            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white text-lg font-semibold rounded-lg transition-all hover:scale-105 shadow-lg shadow-blue-500/50 flex items-center justify-center gap-2"
                        >
                            <span>🚀</span> Start Exploring
                        </Link>
                        <Link
                            href="/daily-discovery"
                            className="px-8 py-4 bg-slate-800/50 hover:bg-slate-700/50 text-white text-lg font-semibold rounded-lg transition-all hover:scale-105 border border-blue-500/30 flex items-center justify-center gap-2"
                        >
                            View Gallery
                        </Link>
                    </motion.div>

                    {/* Scroll Indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2, repeat: Infinity, duration: 2 }}
                        className="mt-16"
                    >
                        <div className="w-6 h-10 border-2 border-blue-500/50 rounded-full mx-auto flex items-start justify-center p-2">
                            <motion.div
                                animate={{ y: [0, 12, 0] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                                className="w-1.5 h-1.5 bg-blue-500 rounded-full"
                            />
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </>
    );
}
