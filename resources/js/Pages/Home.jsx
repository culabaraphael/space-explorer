import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import StarBackground from '@/Components/StarBackground';
import { motion } from 'framer-motion';

export default function Home({ auth }) {

    return (
        <>
            <Head title="Home" />

            <StarBackground />
            <Navbar auth={auth} />

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
                </motion.div>
            </div>
        </>
    );
}
