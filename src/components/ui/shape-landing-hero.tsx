"use client";

import { motion } from "framer-motion";
import { Circle } from "lucide-react";
import { cn } from "@/lib/utils";

function ElegantShape({
    className,
    delay = 0,
    width = 400,
    height = 100,
    rotate = 0,
    gradient = "from-white/[0.08]",
}: {
    className?: string;
    delay?: number;
    width?: number;
    height?: number;
    rotate?: number;
    gradient?: string;
}) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: -150,
                rotate: rotate - 15,
            }}
            animate={{
                opacity: 1,
                y: 0,
                rotate: rotate,
            }}
            transition={{
                duration: 2.4,
                delay,
                ease: [0.23, 0.86, 0.39, 0.96],
                opacity: { duration: 1.2 },
            }}
            className={cn("absolute", className)}
        >
            <motion.div
                animate={{
                    y: [0, 15, 0],
                }}
                transition={{
                    duration: 12,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
                style={{
                    width,
                    height,
                }}
                className="relative"
            >
                <div
                    className={cn(
                        "absolute inset-0 rounded-full",
                        "bg-gradient-to-r to-transparent",
                        gradient,
                        "backdrop-blur-[2px] border-2 border-white/[0.15]",
                        "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
                        "after:absolute after:inset-0 after:rounded-full",
                        "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"
                    )}
                />
            </motion.div>
        </motion.div>
    );
}

function HeroGeometric({
    badge = "Design Collective",
    title1 = "Elevate Your Digital Vision",
    title2 = "Crafting Exceptional Websites",
}: {
    badge?: string;
    title1?: string;
    title2?: string;
}) {
    const fadeUpVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                delay: 0.5 + i * 0.2,
                ease: [0.25, 0.4, 0.25, 1],
            },
        }),
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-amber-900/30 via-orange-900/20 to-yellow-900/30">
            {/* Enhanced gradient overlay with more vibrant colors */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/[0.15] via-orange-500/[0.10] to-yellow-500/[0.15] blur-3xl" />
            <div className="absolute inset-0 bg-gradient-to-tr from-red-500/[0.08] via-transparent to-pink-500/[0.08] blur-2xl" />
            <div className="absolute inset-0 bg-gradient-to-bl from-purple-500/[0.06] via-transparent to-blue-500/[0.06] blur-xl" />

            <div className="absolute inset-0 overflow-hidden">
                <ElegantShape
                    delay={0.3}
                    width={600}
                    height={140}
                    rotate={12}
                    gradient="from-amber-500/[0.20] via-orange-500/[0.15]"
                    className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
                />

                <ElegantShape
                    delay={0.5}
                    width={500}
                    height={120}
                    rotate={-15}
                    gradient="from-orange-500/[0.20] via-red-500/[0.15]"
                    className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
                />

                <ElegantShape
                    delay={0.4}
                    width={300}
                    height={80}
                    rotate={-8}
                    gradient="from-yellow-500/[0.20] via-amber-400/[0.15]"
                    className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
                />

                <ElegantShape
                    delay={0.6}
                    width={200}
                    height={60}
                    rotate={20}
                    gradient="from-amber-400/[0.20] via-orange-400/[0.15]"
                    className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
                />

                <ElegantShape
                    delay={0.7}
                    width={150}
                    height={40}
                    rotate={-25}
                    gradient="from-orange-400/[0.20] via-red-400/[0.15]"
                    className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
                />

                {/* Additional shapes for more depth */}
                <ElegantShape
                    delay={0.8}
                    width={250}
                    height={70}
                    rotate={35}
                    gradient="from-purple-500/[0.15] via-pink-500/[0.10]"
                    className="right-[5%] md:right-[10%] bottom-[20%] md:bottom-[25%]"
                />

                <ElegantShape
                    delay={0.9}
                    width={180}
                    height={50}
                    rotate={-30}
                    gradient="from-blue-500/[0.15] via-indigo-500/[0.10]"
                    className="left-[30%] md:left-[35%] top-[60%] md:top-[65%]"
                />
            </div>

            {/* Title and badge with enhanced contrast */}
            <div className="relative z-10 container mx-auto px-4 md:px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <motion.div
                        custom={0}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.12] border border-amber-200/[0.20] mb-8 md:mb-12 shadow-xl backdrop-blur-md"
                    >
                        <Circle className="h-2 w-2 fill-amber-400/90 text-amber-400/90" />
                        <span className="text-sm text-white/90 tracking-wide font-medium">
                            {badge}
                        </span>
                    </motion.div>

                    <motion.div
                        custom={1}
                        variants={fadeUpVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 md:mb-8 tracking-tight">
                            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-amber-50 to-amber-100/95 drop-shadow-2xl filter brightness-110">
                                {title1}
                            </span>
                            <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-white/98 to-orange-200 drop-shadow-2xl filter brightness-110">
                                {title2}
                            </span>
                        </h1>
                    </motion.div>
                </div>
            </div>

            {/* Enhanced overlay gradients for better contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-amber-950/40 via-transparent to-orange-950/30 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-950/20 via-transparent to-blue-950/20 pointer-events-none" />
        </div>
    );
}

export { HeroGeometric }