// src/pages/Home.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
// Assuming you have these assets/components
import backgourd from '../assets/background.png'
import Footer from "../components/Footer";

// --- TOOL LIST with 'category' property added for filtering ---
const TOOL_LIST = [
    // Organize PDF
    { slug: "/merge", title: "Merge PDF", desc: "Combine PDFs in the order you want with the easiest PDF merger available.", color: "bg-orange-100 text-orange-600", icon: "⇋", category: "Organize PDF" },
    { slug: "/split", title: "Split PDF", desc: "Separate one page or a whole set for easy conversion into independent PDF files.", color: "bg-amber-100 text-amber-600", icon: "✂️", category: "Organize PDF" },
    { slug: "/rotate", title: "Rotate PDF", desc: "Rotate your PDFs the way you need them. You can even rotate multiple PDFs at once!", color: "bg-rose-100 text-rose-600", icon: "↩️", category: "Organize PDF" },
    { slug: "/organize", title: "Organize PDF", desc: "Sort pages of your PDF however you like. Delete, add pages or add PDF pages for your perfect document.", color: "bg-orange-100 text-orange-600", icon: "📑", category: "Organize PDF" },
    { slug: "/page-numbers", title: "Page Numbers", desc: "Add page numbers into PDFs with ease. Choose your positions, dimensions, and typography.", color: "bg-fuchsia-100 text-fuchsia-600", icon: "🔢", category: "Organize PDF" },

    // Optimize PDF
    { slug: "/compress", title: "Compress PDF", desc: "Reduce the file size while optimizing for maximal PDF quality.", color: "bg-emerald-100 text-emerald-600", icon: "📦", category: "Optimize PDF" },
    { slug: "/pdf-to-pdf-a", title: "PDF to PDF/A", desc: "Transform your PDF to PDF/A, the ISO-standardized version of PDF for long-term archiving. Compliant PDF/A files are self-contained and ready to preserve content for years to come.", color: "bg-blue-100 text-blue-600", icon: "🗃️", category: "Optimize PDF" },
    { slug: "/repair-pdf", title: "Repair PDF", desc: "Repair a damaged PDF and recover data from the corrupted PDF. Fix PDF files with our Repair tool, so you can open them and recover data as soon as possible.", color: "bg-lime-100 text-lime-600", icon: "🩹", category: "Optimize PDF" },

    // Convert PDF
    { slug: "/pdf-to-word", title: "PDF to Word", desc: "Convert your PDF files into easy to edit DOC and DOCX documents. The converted WORD document is almost 100% accurate.", color: "bg-blue-100 text-blue-600", icon: "W", category: "Convert PDF" },
    { slug: "/pdf-to-ppt", title: "PDF to PowerPoint", desc: "Turn your PDF files into easy to edit PPT and PPTX slideshows.", color: "bg-red-100 text-red-600", icon: "P", category: "Convert PDF" },
    { slug: "/pdf-to-excel", title: "PDF to Excel", desc: "Pull data straight from PDFs into Excel spreadsheets in a few short seconds!", color: "bg-green-100 text-green-600", icon: "X", category: "Convert PDF" },
    { slug: "/word-to-pdf", title: "Word to PDF", desc: "Make DOC and DOCX files easy to read by converting them to PDF.", color: "bg-blue-100 text-blue-600", icon: "W", category: "Convert PDF" },
    { slug: "/ppt-to-pdf", title: "PowerPoint to PDF", desc: "Make PPT and PPTX slideshows easy to read by converting them to PDF.", color: "bg-red-100 text-red-600", icon: "P", category: "Convert PDF" },
    { slug: "/excel-to-pdf", title: "Excel to PDF", desc: "Make EXCEL spreadsheets easy to read by converting them to PDF.", color: "bg-green-100 text-green-600", icon: "X", category: "Convert PDF" },
    { slug: "/pdf-to-jpg", title: "PDF to JPG", desc: "Convert each PDF page into a JPG or extract all images contained in a PDF.", color: "bg-yellow-100 text-yellow-600", icon: "🖼️", category: "Convert PDF" },
    { slug: "/jpg-to-pdf", title: "JPG to PDF", desc: "Convert JPG images to PDF in seconds. Easily adjust orientation and margins.", color: "bg-yellow-100 text-yellow-600", icon: "🌄", category: "Convert PDF" },
    { slug: "/html-to-pdf", title: "HTML to PDF", desc: "Convert webpages in HTML to PDF. Copy and paste the URL of the page you want and convert it to PDF with a click.", color: "bg-cyan-100 text-cyan-600", icon: "🔗", category: "Convert PDF" },
    { slug: "/scan-to-pdf", title: "Scan to PDF", desc: "Capture document scans from your mobile device and send them instantly to your browser. No extra software needed.", color: "bg-red-100 text-red-600", icon: "📸", category: "Convert PDF" },
    { slug: "/ocr-pdf", title: "OCR PDF", desc: "Easily convert scanned PDF into searchable and selectable documents.", color: "bg-green-100 text-green-600", icon: "🤖", category: "Convert PDF" },

    // Edit PDF
    { slug: "/sign-pdf", title: "Sign PDF", desc: "Sign yourself or request electronic signatures from others.", color: "bg-indigo-100 text-indigo-600", icon: "✍️", category: "Edit PDF" },
    { slug: "/watermark", title: "Watermark", desc: "Stamp an image or text over your PDF in seconds. Choose the typography, transparency and position.", color: "bg-purple-100 text-purple-600", icon: "💧", category: "Edit PDF" },

    // PDF Security
    { slug: "/unlock-pdf", title: "Unlock PDF", desc: "Remove PDF password security, giving you the freedom to use your PDFs as you want.", color: "bg-sky-100 text-sky-600", icon: "🔓", category: "PDF Security" },
    { slug: "/protect-pdf", title: "Protect PDF", desc: "Protect PDF files with a password. Encrypt PDF documents to prevent unauthorized access.", color: "bg-red-100 text-red-600", icon: "🔒", category: "PDF Security" },
];

/**
 * ToolCard component - Fully Responsive and Fixed Height for Desktop
 */
function ToolCard({ t }: { t: typeof TOOL_LIST[number] & { new?: boolean } }) {
    return (
        <Link
            to={t.slug}
            className={`
                block p-5 xl:p-8 font-normal text-decoration-none 
                
                // MOBILE (Default): Horizontal layout, auto height, full-width
                flex flex-row items-center gap-4 h-auto 
                
                // DESKTOP (lg:): Vertical layout, fixed height for grid consistency
                lg:flex-col lg:items-start lg:gap-3 
                
                relative overflow-hidden z-20 
                border border-[#cac7c7] rounded-[16px] hover:border-[#4b4949] hover:border-[0.5px]
                bg-white 
                transition-all duration-500 ease-in-out transform scale-100
                hover:shadow-xl hover:scale-[1.01] text-left
            `}
        >
            <div className="absolute top-4 right-4">
                {t.new && (
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-red-500 text-white">
                        New!
                    </span>
                )}
            </div>

            {/* Icon container */}
            <div
                className={`w-8 h-8 flex items-center justify-center rounded-lg text-xl flex-shrink-0 ${t.color} lg:w-12 lg:h-12 lg:text-2xl`}
            >
                {t.icon}
            </div>

            {/* Text Content Container (Allows for flex control) */}
            <div className="flex flex-col flex-grow">
                {/* Title */}
                <div className="font-semibold text-base text-gray-800 mt-0 lg:mt-2">{t.title}</div>

                {/* Description: 1 line on mobile (line-clamp-1), 3 lines on tablet/desktop (lg:line-clamp-3) */}
                <div className="text-sm text-gray-500 line-clamp-1 lg:line-clamp-3">
                    {t.desc}
                </div>
            </div>
        </Link>
    );
}

/**
 * FeatureCard component - Ensured responsiveness by using md:col-span-1
 */
// function FeatureCard({ title, desc, img }: { title: string; desc: string; img?: string }) {
//     return (
//         // The grid-cols-1 md:grid-cols-3 handles the layout transition
//         <div className="bg-white rounded-2xl p-4 shadow-sm flex gap-4 items-center">
//             <div className="w-24 h-16 flex-shrink-0 rounded overflow-hidden bg-gray-50">
//                 <img src={img} alt={title} className="w-full h-full object-cover" />
//             </div>
//             <div>
//                 <div className="font-semibold">{title}</div>
//                 <div className="text-sm text-gray-500">{desc}</div>
//             </div>
//         </div>
//     );
// }


export default function Home() {
    const [activeCategory, setActiveCategory] = useState("All");

    const categories = [
        "All",
        "Organize PDF",
        "Optimize PDF",
        "Convert PDF",
        "Edit PDF",
        "PDF Security",
    ];

    const filteredTools = TOOL_LIST.filter(tool => {
        if (activeCategory === "All") {
            return true;
        }
        return tool.category === activeCategory;
    });

    const promoDesktop = "/assets/promo-cards/desktop.png";
    // const promoMobile = "/assets/promo-cards/mobile.png";
    // const promoBusiness = "/assets/promo-cards/business.png";

    return (
        <>
            <div style={{
                backgroundImage: `url(${backgourd})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }} 
            // Added max-w-7xl and mx-auto for general centering and responsiveness
            className="space-y-12 flex flex-col justify-center items-center pt-5 lg:pt-12 mx-auto ">
                
                <div className="w-full">
                    
                    {/* Tool Section */}
                    <section className="px-5 xl:px-9 text-center w-full"> 
                        {/* Main Heading & Subtitle */}
                        <h1 className="text-[23px] lg:text-[30px] xl:text-[42px] font-bold text-gray-800">
                            Every tool you need to work with PDFs in one place
                        </h1>
                        <p className="mt-4 text-[16px] lg:text-[20px] xl:text-[30px]  text-gray-600 lg:max-w-5xl mx-auto">
                            Split, compress, convert, rotate, unlock and watermark PDFs with just a
                            few clicks. All are 100% FREE and easy to use! Merge,
                        </p>

                        {/* Tool Category Navigation (Tabs) */}
                        <div className="mt-10 mb-8 flex flex-wrap justify-center gap-2 px-2">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-4 py-2 text-sm font-medium rounded-full transition ${cat === activeCategory
                                            ? "bg-gray-800 text-white"
                                            : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* Tool Grid: FIXED: 1 column on mobile, 3 on tablet, 6 on desktop */}
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 px-2">
                            {filteredTools.map((t) => (
                                <ToolCard key={t.slug} t={t} />
                            ))}
                        </div>
                    </section>

                    {/* --- horizontal line separation --- */}

                    {/* Work your way — features */}
                    {/* <section className="container mx-auto px-4 mt-20"> 
                        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Work your way</h2>
                    
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <FeatureCard title="Work offline with Desktop" desc="Batch edit and manage documents locally, with no internet and no limits." img={promoDesktop} />
                            <FeatureCard title="On-the-go with Mobile" desc="Your favorite tools, right in your pocket. Keep working anytime, anywhere." img={promoMobile} />
                            <FeatureCard title="Built for business" desc="Automate document management, onboard teams easily, and scale with flexible plans." img={promoBusiness} />
                        </div>
                    </section> */}

                    {/* --- horizontal line separation --- */}

                    {/* premium banner */}
                    <section className="container mx-auto px-4 mt-20 mb-20"> {/* Added mb-20 for space before footer */}
                        <div className="bg-yellow-50 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-3 gap-8 items-center border border-yellow-200">
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800">
                                    Get more with Premium
                                </h3>
                                <ul className="mt-3 text-gray-600 space-y-2">
                                    <li>• Full access to desktop tools</li>
                                    <li>• Advanced OCR and secure e-signatures</li>
                                    <li>• Connect tools and create custom workflows</li>
                                </ul>
                                <div className="mt-4">
                                    <Link
                                        to="/pricing"
                                        className="px-5 py-2 bg-yellow-600 text-white font-medium rounded-full hover:bg-yellow-700 transition"
                                    >
                                        Get Premium
                                    </Link>
                                </div>
                            </div>
                            <div className="md:col-span-2">
                                <div className="h-48 bg-white rounded-lg flex items-center justify-center overflow-hidden shadow-xl">
                                    <img
                                        src={promoDesktop}
                                        onError={(e: any) =>
                                            (e.currentTarget.src =
                                                "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder")
                                        }
                                        alt="premium banner"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <Footer />
        </>
    );
}