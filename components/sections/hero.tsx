'use client';

import { motion } from 'framer-motion';

export function Hero({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <section className="container-shell py-section">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="max-w-4xl"
      >
        <p className="mb-4 text-sm uppercase tracking-[0.2em] text-primary">Premium Digital Studio</p>
        <h1 className="mb-8 text-balance font-semibold">{title}</h1>
        <p className="text-lg text-foreground/75">{subtitle}</p>
      </motion.div>
    </section>
  );
}
