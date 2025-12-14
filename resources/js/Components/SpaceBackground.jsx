import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { useState, useEffect } from 'react';

export default function SpaceBackground() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Check if mobile
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Fallback for mobile devices (performance)
    if (isMobile) {
        return (
            <div className="fixed inset-0 -z-10 bg-gradient-to-b from-slate-900 via-blue-900 to-black" />
        );
    }

    return (
        <div className="fixed inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-blue-900 to-black" />
            <Canvas camera={{ position: [0, 0, 1] }}>
                <Stars
                    radius={100}
                    depth={50}
                    count={5000}
                    factor={4}
                    saturation={0}
                    fade
                    speed={1}
                />
            </Canvas>
        </div>
    );
}
