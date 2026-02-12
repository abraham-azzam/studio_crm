'use client';

import { motion } from 'framer-motion';

type Item = { title: string; text: string };

export function GridCards({ items }: { items: Item[] }) {
  return (
    <section className="container-shell pb-section">
      <div className="grid gap-6 md:grid-cols-3">
        {items.map((item, index) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08, duration: 0.65 }}
            className="rounded-site border border-white/10 bg-gradient-to-b from-white/10 to-transparent p-7 shadow-premium"
          >
            <h3 className="mb-3 text-xl font-semibold">{item.title}</h3>
            <p className="text-sm text-foreground/75">{item.text}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
