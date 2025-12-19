'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { FileQuestion } from 'lucide-react';

const floatAnim = {
  initial: { y: 0 },
  animate: {
    y: [0, -8, 0],
    transition: {
      duration: 2.5,
      ease: [0.42, 0, 0.58, 1] as const,
      repeat: Infinity,
    },
  },
};

export default function NotFound({ backHref = '/dashboard' }: { backHref?: string }) {
  const t = useTranslations('notFound');

  return (
    <div className='flex min-h-[calc(100dvh-3.5rem)] items-center justify-center bg-background px-4 py-8 sm:min-h-[calc(100dvh-4rem)] sm:px-6 sm:py-10'>
      <div className='w-full max-w-md text-center'>
        {/* Floating Icon */}
        <motion.div
          variants={floatAnim}
          initial='initial'
          animate='animate'
          className='mx-auto mb-6 grid h-24 w-24 place-items-center rounded-3xl bg-primary/10 text-primary sm:h-32 sm:w-32'
        >
          <FileQuestion className='h-12 w-12 sm:h-16 sm:w-16' />
        </motion.div>

        {/* 404 Code */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className='font-en-heading text-7xl font-bold text-primary/20 sm:text-8xl'
        >
          {t('code')}
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className='mt-4 text-xl font-semibold tracking-tight sm:text-2xl'
        >
          {t('title')}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className='mt-2 text-sm text-muted-foreground'
        >
          {t('subtitle')}
        </motion.p>

        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className='mt-8 flex justify-center'
        >
          <Button asChild className='rounded-xl'>
            <Link href={backHref}>{t('back')}</Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
