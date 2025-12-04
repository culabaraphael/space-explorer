import { Head, useForm, router } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import { useState } from 'react';

export default function MyJourney({ auth, discoveries }) {
    const [editingId, setEditingId] = useState(null);
    const { data, setData, put, processing } = useForm({
        user_note: '',
    });

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
            <Navbar auth={auth} />

            <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-black pt-20 px-4 pb-12">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            My Cosmic Journey
                        </h1>
                        <p className="text-gray-400 text-lg">
                            {discoveries.length} {discoveries.length === 1 ? 'discovery' : 'discoveries'} saved
                        </p>
                    </div>

                    {discoveries.length === 0 ? (
                        <div className="text-center py-20">
                            <div className="inline-block p-12 bg-slate-800/50 rounded-xl border border-slate-700">
                                <div className="text-6xl mb-4">🌌</div>
                                <p className="text-white text-2xl mb-4">Your journey hasn't begun yet</p>
                                <p className="text-gray-400 mb-6">Start exploring and save your favorite discoveries!</p>
                                <a
                                    href="/explore"
                                    className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                                >
                                    Start Exploring
                                </a>
                            </div>
                        </div>
                    ) : (
                        <div className="grid gap-6">
                            {discoveries.map((discovery) => (
                                <div
                                    key={discovery.id}
                                    className="bg-slate-800/50 backdrop-blur-md rounded-xl overflow-hidden border border-slate-700 hover:border-slate-600 transition-colors"
                                >
                                    <div className="md:flex">
                                        {/* Image */}
                                        <div className="md:w-1/3">
                                            <img
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
                                            <p className="text-gray-400 text-sm mb-4">
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
                                                <p className="text-gray-400 font-semibold mb-2">Your Note:</p>

                                                {editingId === discovery.id ? (
                                                    <div>
                                                        <textarea
                                                            className="w-full p-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-blue-500 focus:outline-none"
                                                            value={data.user_note}
                                                            onChange={(e) => setData('user_note', e.target.value)}
                                                            rows="3"
                                                        />
                                                        <div className="flex gap-2 mt-3">
                                                            <button
                                                                onClick={() => handleUpdate(discovery.id)}
                                                                disabled={processing}
                                                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
                                                            >
                                                                {processing ? 'Saving...' : 'Save'}
                                                            </button>
                                                            <button
                                                                onClick={() => setEditingId(null)}
                                                                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                                                            >
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <p className="text-gray-300 mb-3 italic">
                                                            {discovery.user_note || 'No note added yet.'}
                                                        </p>
                                                        <div className="flex gap-2">
                                                            <button
                                                                onClick={() => handleEdit(discovery)}
                                                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
                                                            >
                                                                Edit Note
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(discovery.id)}
                                                                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm"
                                                            >
                                                                Remove
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
