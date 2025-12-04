import { useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function DiscoveryCard({ apod, auth, showSaveButton = true }) {
    const [showModal, setShowModal] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        nasa_image_url: apod?.url || '',
        nasa_image_title: apod?.title || '',
        nasa_explanation: apod?.explanation || '',
        nasa_date: apod?.date || '',
        user_note: '',
    });

    const handleSave = (e) => {
        e.preventDefault();

        if (!auth.user) {
            alert('Please login to save discoveries!');
            return;
        }

        post(route('journey.store'), {
            onSuccess: () => {
                setShowModal(false);
                setData('user_note', '');
            },
            onError: (errors) => {
                console.error('Save error:', errors);
            }
        });
    };

    if (!apod) {
        return (
            <div className="card bg-slate-800/50 backdrop-blur-md shadow-xl p-6">
                <p className="text-gray-400">No data available</p>
            </div>
        );
    }

    return (
        <>
            <div className="card bg-slate-800/50 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-700 overflow-hidden">
                <figure className="relative h-64 overflow-hidden">
                    <img
                        src={apod.url}
                        alt={apod.title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        loading="lazy"
                    />
                </figure>
                <div className="card-body p-6">
                    <h2 className="card-title text-white text-xl mb-2">{apod.title}</h2>
                    <p className="text-gray-400 text-sm mb-2">{apod.date}</p>
                    <p className="text-gray-300 line-clamp-3 text-sm">{apod.explanation}</p>
                    {showSaveButton && auth.user && (
                        <div className="card-actions justify-end mt-4">
                            <button
                                onClick={() => setShowModal(true)}
                                className="btn btn-primary bg-blue-600 hover:bg-blue-700 border-none text-white"
                            >
                                Save to Journey
                            </button>
                        </div>
                    )}
                    {showSaveButton && !auth.user && (
                        <div className="card-actions justify-end mt-4">
                            <a
                                href="/login"
                                className="btn btn-ghost text-blue-400 hover:text-blue-300"
                            >
                                Login to Save
                            </a>
                        </div>
                    )}
                </div>
            </div>

            {/* Save Modal */}
            {showModal && (
                <div className="modal modal-open">
                    <div className="modal-box bg-slate-800 border border-slate-700 max-w-2xl">
                        <h3 className="font-bold text-lg text-white mb-4">Save to Your Journey</h3>

                        <div className="mb-4">
                            <img
                                src={apod.url}
                                alt={apod.title}
                                className="w-full h-48 object-cover rounded-lg"
                            />
                        </div>

                        <p className="text-gray-300 mb-4">{apod.title}</p>

                        <form onSubmit={handleSave}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-gray-300">Add your personal note (optional)</span>
                                </label>
                                <textarea
                                    className="textarea textarea-bordered bg-slate-700 text-white border-slate-600 focus:border-blue-500"
                                    placeholder="What fascinates you about this discovery?"
                                    value={data.user_note}
                                    onChange={(e) => setData('user_note', e.target.value)}
                                    rows="4"
                                />
                                {errors.user_note && (
                                    <p className="text-red-400 text-sm mt-1">{errors.user_note}</p>
                                )}
                            </div>
                            <div className="modal-action">
                                <button
                                    type="button"
                                    className="btn btn-ghost text-gray-300"
                                    onClick={() => setShowModal(false)}
                                    disabled={processing}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary bg-blue-600 hover:bg-blue-700 border-none"
                                    disabled={processing}
                                >
                                    {processing ? 'Saving...' : 'Save Discovery'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
