import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import StarBackground from '@/Components/StarBackground';

export default function MainLayout({ auth, title, children }) {
    return (
        <>
            <Head title={title} />
            <StarBackground />
            <Navbar auth={auth} />
            <div className="min-h-screen pt-24 px-4 pb-12">
                {children}
            </div>
        </>
    );
}
