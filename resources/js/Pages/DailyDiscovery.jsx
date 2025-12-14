import { Head, Link, useForm } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export default function DailyDiscovery({ auth, apod, gallery }) {
    const canvasRef = useRef(null);
    const [activeTab, setActiveTab] = useState('apod');
    const [selectedImage, setSelectedImage] = useState(null);
    const [showNoteModal, setShowNoteModal] = useState(false);

    const { data, setData, post, processing, reset } = useForm({
        nasa_image_url: '',
        nasa_image_title: '',
        nasa_explanation: '',
        nasa_date: '',
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

    const galleryItems = gallery && gallery.length > 0 ? gallery : [];

    // Handle Add to Journal button click
    const handleAddToJournal = (image) => {
        setData({
            nasa_image_url: image.url,
            nasa_image_title: image.title,
            nasa_explanation: image.explanation,
            nasa_date: image.date,
            user_note: '',
        });
        setShowNoteModal(true);
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('journey.store'), {
            onSuccess: () => {
                setShowNoteModal(false);
                setSelectedImage(null);
                reset();
                alert('Added to your journey!');
            },
        });
    };

    return (
        <>
            <Head title="Space Gallery" />

            {/* Animated Star Background */}
            <canvas
                ref={canvasRef}
                className="fixed inset-0 -z-10"
                style={{ background: '#000000' }}
            />

            {/* Navbar */}
            <nav className="fixed top-0 w-full z-50 bg-slate-900/50 backdrop-blur-md border-b border-blue-500/20">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-3">
                        <span className="text-xl font-bold text-white">Cosmic Explorer</span>
                    </Link>

                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                        Home
                        </Link>
                        <Link href="/explore" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                        Explore
                        </Link>
                        <Link href="/daily-discovery" className="text-white font-semibold flex items-center gap-2">
                        Gallery
                        </Link>
                        {auth.user && (
                        <Link href="/my-journey" className="text-gray-300 hover:text-white transition-colors flex items-center gap-2">
                        Journal
                        </Link>
                        )}
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
            <div className="min-h-screen pt-24 pb-12 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <h1 className="text-5xl md:text-6xl font-bold mb-4">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">
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
                                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-blue-500/50'
                                    : 'bg-slate-800/50 text-gray-400 hover:text-white border border-blue-500/30'
                            }`}
                        >
                            <span>✨</span> Astronomy Picture of the Day
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
                                    onClick={() => setSelectedImage(item)}
                                    className="group relative bg-slate-800/30 backdrop-blur-sm rounded-xl overflow-hidden border border-blue-500/20 hover:border-blue-500/50 transition-all cursor-pointer hover:scale-105"
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
                                        {item.media_type === 'video' || !item.url ? (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <span className="text-6xl">🎥</span>
                                            </div>
                                        ) : (
                                            <img
                                                src={item.url}
                                                alt={item.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                    e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center"><span class="text-6xl">❌</span></div>';
                                                }}
                                            />
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-white mb-2">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm line-clamp-2">
                                            {item.explanation}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <div className="text-center py-20">
                            <p className="text-gray-400 text-xl">No images available</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Detail Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
                    >
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="fixed top-8 right-8 w-12 h-12 bg-slate-800/90 hover:bg-slate-700 rounded-full flex items-center justify-center text-white text-xl transition-colors z-[110] shadow-lg"
                        >
                            ✕
                        </button>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-slate-900/95 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-blue-500/30"
                        >
                            <div className="w-full aspect-video bg-black">
                                <img
                                    src={selectedImage.hdurl || selectedImage.url}
                                    alt={selectedImage.title}
                                    className="w-full h-full object-contain"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-gray-400 text-xl">Image unavailable</div>';
                                    }}
                                />
                            </div>

                            <div className="p-8">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <h2 className="text-3xl font-bold text-white mb-2">
                                            {selectedImage.title}
                                        </h2>
                                        <div className="flex items-center gap-4 text-gray-400">
                                            <span className="flex items-center gap-2">
                                                📷 Apod
                                            </span>
                                            <span className="flex items-center gap-2">
                                                📅 {new Date(selectedImage.date).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </span>
                                        </div>
                                    </div>
                                    {auth.user && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleAddToJournal(selectedImage);
                                            }}
                                            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white rounded-lg font-semibold transition-all flex items-center gap-2"
                                        >
                                            📖 Add to Journal
                                        </button>
                                    )}
                                </div>

                                <p className="text-gray-300 leading-relaxed">
                                    {selectedImage.explanation}
                                </p>

                                {selectedImage.copyright && (
                                    <p className="mt-4 text-sm text-gray-500">
                                        © {selectedImage.copyright}
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Note Modal */}
            <AnimatePresence>
                {showNoteModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[120] flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-slate-900/95 rounded-2xl max-w-md w-full p-8 border border-blue-500/30"
                        >
                            <h3 className="text-2xl font-bold text-white mb-4">Add Personal Note</h3>
                            <p className="text-gray-400 mb-4">Add a personal note about this discovery (optional)</p>

                            <form onSubmit={handleSubmit}>
                                <textarea
                                    value={data.user_note}
                                    onChange={(e) => setData('user_note', e.target.value)}
                                    placeholder="What do you think about this image?"
                                    rows="4"
                                    className="w-full px-4 py-3 bg-slate-800 border border-blue-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 mb-4"
                                />

                                <div className="flex gap-3">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white rounded-lg font-semibold transition-all disabled:opacity-50"
                                    >
                                        {processing ? 'Saving...' : 'Save to Journal'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowNoteModal(false);
                                            reset();
                                        }}
                                        className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition-all"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
