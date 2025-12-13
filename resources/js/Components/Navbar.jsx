import { Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Navbar({ auth }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-slate-900/80 backdrop-blur-md border-b border-slate-700 fixed w-full top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 relative">
                    {/* Logo - Left */}
                    <div className="flex items-center">
                        <Link href="/" className="text-2xl font-bold text-white flex items-center gap-2">
                            Cosmic Explorer
                        </Link>
                    </div>

                    {/* Desktop Navigation - Center */}
                    <div className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
                        <Link
                            href="/"
                            className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"
                        >
                        Home
                        </Link>
                        <Link
                            href="/explore"
                            className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"
                        >
                        Explore
                        </Link>
                        <Link
                            href="/daily-discovery"
                            className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"
                        >
                        Gallery
                        </Link>
                        {auth.user && (
                        <Link
                                href="/my-journey"
                                className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"
                        >
                        Journal
                        </Link>
                        )}
                    </div>

                    {/* Auth Button - Right */}
                    <div className="hidden md:flex items-center">
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
                            href="/"
                            className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-slate-700 rounded-md"
                        >
                             Home
                        </Link>
                        <Link
                            href="/explore"
                            className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-slate-700 rounded-md"
                        >
                             Explore
                        </Link>
                        <Link
                            href="/daily-discovery"
                            className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-slate-700 rounded-md"
                        >
                             Gallery
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
                            <Link
                                href="/login"
                                className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-slate-700 rounded-md"
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
