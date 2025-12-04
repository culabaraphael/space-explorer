import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export default function Explore({ auth, apods }) {
    const canvasRef = useRef(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState('All');

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

    // Filter logic
    const filteredApods = apods?.filter(apod => {
        const matchesSearch = apod.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = activeFilter === 'All' ||
                              (activeFilter === 'APOD' && apod.media_type === 'image') ||
                              (activeFilter === 'Planets' && apod.title.toLowerCase().includes('planet')) ||
                              (activeFilter === 'Mars' && apod.title.toLowerCase().includes('mars')) ||
                              (activeFilter === 'Asteroids' && apod.title.toLowerCase().includes('asteroid'));
        return matchesSearch && matchesFilter;
    }) || [];

    return (
        <>
            <Head title="Explore the Cosmos" />

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
                        <Link href="/explore" className="text-white font-semibold flex items-center gap-2">
                            <span>🔭</span> Explore
                        </Link>
                        <Link href="/daily-discovery" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
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
                            <span className="text-purple-400">Explore</span>{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                                the Cosmos
                            </span>
                        </h1>
                        <p className="text-gray-400 text-lg">
                            Discover planets, galaxies, and cosmic wonders from NASA's vast collection
                        </p>
                    </motion.div>

                    {/* Search Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="max-w-2xl mx-auto mb-8"
                    >
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search for space objects..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-6 py-4 pl-12 bg-slate-800/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                            />
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl">
                                🔍
                            </span>
                        </div>
                    </motion.div>

                    {/* Filter Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-wrap justify-center gap-3 mb-8"
                    >
                        {['All', 'Planets', 'APOD', 'Mars', 'Asteroids'].map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                                    activeFilter === filter
                                        ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/50'
                                        : 'bg-slate-800/50 text-gray-400 hover:text-white border border-purple-500/30'
                                }`}
                            >
                                {filter === 'All' && '🌌'}
                                {filter === 'Planets' && '🪐'}
                                {filter === 'APOD' && '📷'}
                                {filter === 'Mars' && '🔴'}
                                {filter === 'Asteroids' && '⭐'}
                                {' '}{filter}
                            </button>
                        ))}
                    </motion.div>

                    {/* Results Count */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-center text-gray-400 mb-8"
                    >
                        Found {filteredApods.length} objects
                    </motion.p>

                    {/* Grid */}
                    {filteredApods.length > 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {filteredApods.map((apod, index) => (
                                <motion.div
                                    key={apod.date}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group relative bg-slate-800/30 backdrop-blur-sm rounded-xl overflow-hidden border border-purple-500/20 hover:border-purple-500/50 transition-all hover:scale-105"
                                >
                                    {/* Badge */}
                                    <div className="absolute top-4 right-4 z-10">
                                        <span className="px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                                            🌍 Planet
                                        </span>
                                    </div>

                                    {/* Image */}
                                    <div className="aspect-square overflow-hidden bg-black">
                                        <img
                                            src={apod.url}
                                            alt={apod.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-white mb-2">
                                            {apod.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm line-clamp-2">
                                            {apod.explanation}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <div className="text-center py-20">
                            <p className="text-gray-400 text-xl">No objects found matching your search</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
