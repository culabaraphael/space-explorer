import { Head, useForm, router } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

export default function MyJourney({ auth, discoveries }) {
    const canvasRef = useRef(null);
    const [editingId, setEditingId] = useState(null);
    const { data, setData, put, processing } = useForm({
        user_note: '',
    });

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
            ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
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

    const handleEdit = (discovery) => {
        setEditingId(discovery.id);
        setData('user_note', discovery.user_note || '');
    };

    const handleUpdate = (discoveryId) => {
        put(route('journey.update', discoveryId), {
            onSuccess: () => setEditingId(null),
        });
    };

    const handleDelete = (discoveryId) => {
        if (confirm('Are you sure you want to remove this discovery from your journey?')) {
            router.delete(route('journey.destroy', discoveryId));
        }
    };

    return (
        <>
            <Head title="My Journey" />

            {/* Animated Star Background */}
            <canvas
                ref={canvasRef}
                className="fixed inset-0 -z-10"
                style={{ background: '#000000' }}
            />

            <Navbar auth={auth} />

            <div className="min-h-screen pt-24 px-4 pb-12">
                <div className="max-w-7xl mx-auto">
                    {/* Header with animation */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            <span className="text-purple-400">My</span>{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                                Cosmic Journey
                            </span>
                        </h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-gray-400 text-lg"
                        >
                            {discoveries.length} {discoveries.length === 1 ? 'discovery' : 'discoveries'} saved
                        </motion.p>
                    </motion.div>

                    {discoveries.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="text-center py-20"
                        >
                            <div className="inline-block p-12 bg-slate-800/50 backdrop-blur-md rounded-xl border border-purple-500/30">
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                    className="text-6xl mb-4"
                                >
                                    🌌
                                </motion.div>
                                <p className="text-white text-2xl mb-4">Your journey hasn't begun yet</p>
                                <p className="text-gray-400 mb-6">Start exploring and save your favorite discoveries!</p>
                                <a
                                    href="/explore"
                                    className="inline-block px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-lg font-semibold transition-all hover:scale-105"
                                >
                                    🚀 Start Exploring
                                </a>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="grid gap-6"
                        >
                            <AnimatePresence>
                                {discoveries.map((discovery, index) => (
                                    <motion.div
                                        key={discovery.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, x: -100 }}
                                        transition={{ delay: index * 0.1, duration: 0.5 }}
                                        whileHover={{ scale: 1.02 }}
                                        className="bg-slate-800/50 backdrop-blur-md rounded-xl overflow-hidden border border-purple-500/20 hover:border-purple-500/50 transition-colors"
                                    >
                                        <div className="md:flex">
                                            {/* Image */}
                                            <div className="md:w-1/3 overflow-hidden">
                                                <motion.img
                                                    whileHover={{ scale: 1.1 }}
                                                    transition={{ duration: 0.5 }}
                                                    src={discovery.nasa_image_url}
                                                    alt={discovery.nasa_image_title}
                                                    className="w-full h-64 md:h-full object-cover"
                                                />
                                            </div>

                                            {/* Content */}
                                            <div className="md:w-2/3 p-6">
                                                <h3 className="text-2xl font-bold text-white mb-2">
                                                    {discovery.nasa_image_title}
                                                </h3>
                                                <p className="text-gray-400 text-sm mb-4 flex items-center gap-2">
                                                    <span>📅</span>
                                                    {new Date(discovery.nasa_date).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}
                                                </p>

                                                <div className="mb-4">
                                                    <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                                                        {discovery.nasa_explanation}
                                                    </p>
                                                </div>

                                                {/* User Note Section */}
                                                <div className="border-t border-slate-700 pt-4">
                                                    <p className="text-gray-400 font-semibold mb-2 flex items-center gap-2">
                                                        <span>📝</span> Your Note:
                                                    </p>

                                                    {editingId === discovery.id ? (
                                                        <motion.div
                                                            initial={{ opacity: 0 }}
                                                            animate={{ opacity: 1 }}
                                                        >
                                                            <textarea
                                                                className="w-full p-3 bg-slate-700 text-white rounded-lg border border-purple-500/30 focus:border-purple-500 focus:outline-none"
                                                                value={data.user_note}
                                                                onChange={(e) => setData('user_note', e.target.value)}
                                                                rows="3"
                                                            />
                                                            <div className="flex gap-2 mt-3">
                                                                <motion.button
                                                                    whileHover={{ scale: 1.05 }}
                                                                    whileTap={{ scale: 0.95 }}
                                                                    onClick={() => handleUpdate(discovery.id)}
                                                                    disabled={processing}
                                                                    className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-lg transition-colors disabled:opacity-50"
                                                                >
                                                                    {processing ? 'Saving...' : '✓ Save'}
                                                                </motion.button>
                                                                <motion.button
                                                                    whileHover={{ scale: 1.05 }}
                                                                    whileTap={{ scale: 0.95 }}
                                                                    onClick={() => setEditingId(null)}
                                                                    className="px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg transition-colors"
                                                                >
                                                                    ✕ Cancel
                                                                </motion.button>
                                                            </div>
                                                        </motion.div>
                                                    ) : (
                                                        <div>
                                                            <p className="text-gray-300 mb-3 italic">
                                                                {discovery.user_note || 'No note added yet.'}
                                                            </p>
                                                            <div className="flex gap-2">
                                                                <motion.button
                                                                    whileHover={{ scale: 1.05 }}
                                                                    whileTap={{ scale: 0.95 }}
                                                                    onClick={() => handleEdit(discovery)}
                                                                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors text-sm flex items-center gap-2"
                                                                >
                                                                    ✏️ Edit Note
                                                                </motion.button>
                                                                <motion.button
                                                                    whileHover={{ scale: 1.05 }}
                                                                    whileTap={{ scale: 0.95 }}
                                                                    onClick={() => handleDelete(discovery.id)}
                                                                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm flex items-center gap-2"
                                                                >
                                                                    🗑️ Remove
                                                                </motion.button>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </div>
            </div>
        </>
    );
}
