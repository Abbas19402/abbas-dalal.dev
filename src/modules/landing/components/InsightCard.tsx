import { Code2 } from 'lucide-react';
import { ReactNode } from 'react';

interface InsightCardProps {
    icon: ReactNode;
    title: string;
    category: string;
    content: string;
}

export default function InsightCard({ icon, title, category, content }: InsightCardProps) {
    return (
        <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-3xl p-8 md:p-12 relative overflow-hidden group">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:opacity-10 transition-opacity">
                <Code2 size={120} />
            </div>

            <div className="relative z-10">
                {/* Header with Icon and Title */}
                <div className="flex items-center gap-6 mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-zinc-800/50 flex items-center justify-center border border-zinc-700/50 group-hover:border-sky-500/30 transition-colors">
                        {icon}
                    </div>
                    <div>
                        <h3 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white to-gray-400">
                            {title}
                        </h3>
                        <p className="text-sky-500/80 font-mono text-sm tracking-wider uppercase mt-1">
                            {category}
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div className="pl-2">
                    <p className="text-xl md:text-2xl font-light text-gray-300 leading-relaxed font-sans">
                        {content}
                    </p>
                </div>
            </div>
        </div>
    );
}
