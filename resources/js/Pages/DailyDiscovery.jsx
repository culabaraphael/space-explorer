import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export default function DailyDiscovery({ auth, apod }) {
    const canvasRef = useRef(null);
    const [activeTab, setActiveTab] = useState('apod');

    // Animated star background
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

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

        const stars = Array.from({ length: 500 }, () => new Star());

        function animate() {
            ctx.fillStyle = 'rgba(15, 23, 42, 0.2)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            stars.forEach(star => {
                star.update();
                star.draw();
            });

            requestAnimationFrame(animate);
        }

        animate();

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Mock data for gallery (using today's APOD as template)
    const galleryItems = apod ? [
        { ...apod, title: 'Pillars of Creation', date: '2024-11-28', description: 'The iconic Pillars of Creation captured by the Hubble Space Telescope, showing star-forming regions in the Eagle...' },
        { ...apod, title: 'Andromeda Galaxy', date: '2024-11-27', description: 'Our nearest major galactic neighbor, the Andromeda Galaxy, located 2.5 million light-years away.' },
        { ...apod, title: 'Carina Nebula', date: '2024-11-26', description: 'A stunning star-forming region captured by James Webb Space Telescope, revealing infant stars.' },
        { ...apod, title: 'Jupiter\'s Great Red Spot', date: '2024-11-25', description: 'A massive storm on Jupiter that has been raging for hundreds of years.' },
        { ...apod, title: 'Saturn\'s Rings', date: '2024-11-24', description: 'The magnificent ring system of Saturn captured in stunning detail.' },
        { ...apod, title: 'Orion Nebula', date: '2024-11-23', description: 'One of the brightest nebulae visible to the naked eye, a stellar nursery.' },
    ] : [];

    return (
        <>
            <Head title="Space Gallery" />

            {/* Animated Star Background */}
            <canvas
                ref={canvasRef}
                className="fixed inset-0 -z-10"
                style={{ background: 'linear-gradient(to bottom, #0f172a, #1e1b4b, #0f172a)' }}
            />

            {/* Navbar */}
            <nav className="fixed top-0 w-full z-50 bg-slate-900/50 backdrop-blur-md border-b border-purple-500/20">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                            <span className="text-2xl">🚀</span>
                        </div>
                        <span className="text-xl font-bold text-white">Cosmic Explorer</span>
                    </Link>

                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                            <span>🚀</span> Home
                        </Link>
                        <Link href="/explore" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                            <span>🔭</span> Explore
                        </Link>
                        <Link href="/daily-discovery" className="text-white font-semibold flex items-center gap-2">
                            <span>📷</span> Gallery
                        </Link>
                        {auth.user && (
                            <Link href="/my-journey" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                                <span>📖</span> Journal
                            </Link>
                        )}
                    </div>

                    {auth.user ? (
                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                        >
                            Logout
                        </Link>
                    ) : (
                        <Link
                            href="/login"
                            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </nav>

            {/* Main Content */}
            <div className="min-h-screen pt-24 pb-12 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <h1 className="text-5xl md:text-6xl font-bold mb-4">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
                                Space Gallery
                            </span>
                        </h1>
                        <p className="text-gray-400 text-lg">
                            Stunning images from NASA's archives showcasing the beauty of the cosmos
                        </p>
                    </motion.div>

                    {/* Tab Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex justify-center gap-4 mb-12"
                    >
                        <button
                            onClick={() => setActiveTab('apod')}
                            className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                                activeTab === 'apod'
                                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-purple-500/50'
                                    : 'bg-slate-800/50 text-gray-400 hover:text-white border border-purple-500/30'
                            }`}
                        >
                            <span>✨</span> Astronomy Picture of the Day
                        </button>
                        <button
                            onClick={() => setActiveTab('mars')}
                            className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                                activeTab === 'mars'
                                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-purple-500/50'
                                    : 'bg-slate-800/50 text-gray-400 hover:text-white border border-purple-500/30'
                            }`}
                        >
                            <span>📷</span> Mars Rover Photos
                        </button>
                    </motion.div>

                    {/* Gallery Grid */}
                    {galleryItems.length > 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {galleryItems.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.1 * index }}
                                    className="group relative bg-slate-800/30 backdrop-blur-sm rounded-xl overflow-hidden border border-purple-500/20 hover:border-purple-500/50 transition-all"
                                >
                                    {/* Date Badge */}
                                    <div className="absolute top-4 right-4 z-10">
                                        <div className="px-3 py-1 bg-slate-900/80 backdrop-blur-sm rounded-lg flex items-center gap-2 text-sm text-gray-300">
                                            <span>📅</span>
                                            {item.date}
                                        </div>
                                    </div>

                                    {/* Image */}
                                    <div className="aspect-video overflow-hidden bg-black">
                                        <img
                                            src={item.url}
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-white mb-2">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm line-clamp-2">
                                            {item.description || item.explanation}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <div className="text-center py-20">
                            <p className="text-gray-400 text-xl">Loading gallery...</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
