import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';

const FacebookLink = () => (
    <a 
        href="https://www.facebook.com/FranklinCountyGovTracker" 
        target="_blank" 
        rel="noopener noreferrer"
        className="footer-link"
    >
        Follow Us On Facebook!
    </a>
);

const footerItems: ReactNode[] = [
    'Contact / Feedback: caleblaroche14@gmail.com',
    '© 2026 Franklin County Government Tracker',
    <FacebookLink key="fb" />
];

const Footer = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isNarrow, setIsNarrow] = useState(false);

    useEffect(() => {
        const checkWidth = () => setIsNarrow(window.innerWidth < 700);
        checkWidth();
        window.addEventListener('resize', checkWidth);
        return () => window.removeEventListener('resize', checkWidth);
    }, []);

    useEffect(() => {
        if (!isNarrow) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % footerItems.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [isNarrow]);

    return (
        <footer className="footer">
            {isNarrow ? (
                <div className="footer-carousel">
                    <span className="footer-carousel-item">{footerItems[currentIndex]}</span>
                    <div className="footer-carousel-dots">
                        {footerItems.map((_, i) => (
                            <span
                                key={i}
                                className={`footer-dot ${i === currentIndex ? 'active' : ''}`}
                                onClick={() => setCurrentIndex(i)}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <>
                    <div>{footerItems[0]}</div>
                    <p>{footerItems[1]}</p>
                    <div>{footerItems[2]}</div>
                </>
            )}
        </footer>
    );
};

export default Footer;