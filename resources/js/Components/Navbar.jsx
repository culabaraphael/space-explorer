import { Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Navbar({ auth }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-slate-900/80 backdrop-blur-md border-b border-slate-700 fixed w-full top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/" className="text-2xl font-bold text-white flex items-center gap-2">
                            <span className="text-3xl">🚀</span>
                            Space Explorer
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link
                            href="/daily-discovery"
                            className="text-gray-300 hover:text-white transition-colors"
                        >
                            Daily Discovery
                        </Link>
                        <Link
                            href="/explore"
                            className="text-gray-300 hover:text-white transition-colors"
                        >
                            Explore
                        </Link>

                        {auth.user ? (
                            <>
                                <Link
                                    href="/my-journey"
                                    className="text-gray-300 hover:text-white transition-colors"
                                >
                                    Journal
                                </Link>
                                <Link
                                    href="/logout"
                                    method="post"
                                    as="button"
                                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                                >
                                    Logout
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="text-gray-300 hover:text-white transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-300 hover:text-white focus:outline-none"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="md:hidden bg-slate-800 border-t border-slate-700">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <Link
                            href="/daily-discovery"
                            className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-slate-700 rounded-md"
                        >
                            Daily Discovery
                        </Link>
                        <Link
                            href="/explore"
                            className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-slate-700 rounded-md"
                        >
                            Explore
                        </Link>
                        {auth.user ? (
                            <>
                                <Link
                                    href="/my-journey"
                                    className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-slate-700 rounded-md"
                                >
                                    Journal
                                </Link>
                                <Link
                                    href="/logout"
                                    method="post"
                                    as="button"
                                    className="block w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-slate-700 rounded-md"
                                >
                                    Logout
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-slate-700 rounded-md"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-slate-700 rounded-md"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
