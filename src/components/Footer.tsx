
import { Link } from 'react-router-dom';

// --- FOOTER LINKS DATA (Organized by AI/Tech Categories) ---
const FOOTER_LINKS = [
    {
        title: "AI Tools", // Focus on intelligent features
        links: [
            { label: "AI Merge & Organize", to: "/merge" },
            { label: "Intelligent Split", to: "/split" },
            { label: "Predictive Compress", to: "/compress" },
            { label: "Smart Conversion Suite", to: "/convert" },
            { label: "All PDF Tools", to: "/tools" },
        ],
    },
    {
        title: "Platform", // Focus on technology and infrastructure
        links: [
            { label: "About Us", to: "/about" },
            { label: "Subscription Plans", to: "/pricing" },
            { label: "API Documentation", to: "/api-docs" },
            { label: "System Status", to: "/status" },
        ],
    },
    {
        title: "Security & Legal", // Focus on trust and security standards
        links: [
            { label: "Terms of Service", to: "/terms" },
            { label: "Data Privacy Policy", to: "/privacy" },
            { label: "Encryption Standards", to: "/security" },
            { label: "Cookie Settings", to: "/cookies" },
        ],
    },
];

export default function Footer() {
    return (
        // 1. Main container: Dark, modern background (bg-gray-900)
        <footer className="w-full bg-gray-900 text-white pt-16">
            <div className="container mx-auto px-4">

                {/* Top Section: Logo/Branding and Link Columns */}
                {/* Responsive Grid: 1 column on mobile, 5 columns on desktop (2 for logo, 3 for links) */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-gray-700">

                    {/* Column 1: Logo and Slogan */}
                    <div className="md:col-span-2 space-y-4">
                        <Link to="/" className="text-3xl font-extrabold flex items-center group">
                            {/* Logo with Red Accent and Hover Glow (AI Touch) */}
                            <span className="font-sans text-red-500 transition group-hover:drop-shadow-[0_0_8px_rgba(239,68,68,0.7)]">❤️PDF</span>
                        </Link>
                        <p className="text-gray-400 text-sm max-w-sm">
                            Harness the power of AI to securely manage, convert, and optimize your documents with **intelligent processing**.
                        </p>

                        {/* AI-Themed Action Button (e.g., Try our API) */}
                        {/* <Link 
                            to="/api-docs" 
                            className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-red-400 hover:text-red-500 transition pt-2"
                        >
                            {/* Terminal/Code SVG icon */}
                        {/* <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L19.5 7.25M12 2v2M4 12h2m14 0h2m-6-6l-1 1M6 6l1 1m-1 11l1-1m11 1l-1-1"></path></svg>
                            Explore Developer API
                        </Link> */}
                    </div>

                    {/* Columns 2-4: Links - Responsive Grid */}
                    {/* Mobile: 2 columns, Desktop: 3 columns */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:col-span-3">
                        {FOOTER_LINKS.map((col) => (
                            <div key={col.title}>
                                {/* Category Title: Bold text-red-500 accent */}
                                <h4 className="text-sm font-bold mb-4 uppercase tracking-wider text-red-500">
                                    {col.title}
                                </h4>
                                <ul className="space-y-3">
                                    {col.links.map((link) => (
                                        <li key={link.label}>
                                            <Link
                                                to={link.to}
                                                // Link style: subtle gray to white on hover
                                                className="text-sm text-gray-400 hover:text-white transition"
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Section: Copyright and Social Icons */}
                <div className="py-6 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-xs text-gray-500 order-2 md:order-1 mt-4 md:mt-0">
                        &copy; {new Date().getFullYear()} ❤️PDF. Powered by Intelligent Automation.
                    </p>

                    {/* Social/System Icons: High-tech look, simple icons */}
                    <div className="flex space-x-4 order-1 md:order-2">
                        {/* Placeholder for Social/Utility icon */}
                        <a href="#" className="text-gray-400 hover:text-red-500 transition">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15.5V15h2v2.5h-2zM12 13c-1.1 0-2-.9-2-2V7c0-1.1.9-2 2-2s2 .9 2 2v4c0 1.1-.9 2-2 2z" /></svg>
                        </a>
                        {/* Placeholder for Social/Utility icon */}
                        <a href="#" className="text-gray-400 hover:text-red-500 transition">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0H5C2.24 0 0 2.24 0 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5V5c0-2.76-2.24-5-5-5zM8.09 19.82h-3.48V13.3h3.48v6.52zM6.35 11.66c-1.15 0-1.87-.78-1.87-1.74s.72-1.74 1.87-1.74c1.15 0 1.87.78 1.87 1.74s-.72 1.74-1.87 1.74zM19.82 19.82h-3.48v-3.57c0-.85-.31-1.43-1.06-1.43-.58 0-1.03.41-1.2.81-.08.14-.1.33-.1.52v4.18h-3.48s.05-5.9 0-6.52h3.48v2.79c.47-.69 1.3-.85 1.86-.85 2.01 0 2.37 1.32 2.37 3.22v4.36z" /></svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}