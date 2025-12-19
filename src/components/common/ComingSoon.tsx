'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';

const floatAnim = {
  initial: { y: 0 },
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3.2,
      ease: [0.42, 0, 0.58, 1] as const,
      repeat: Infinity,
    },
  },
};

const dotsContainer = {
  animate: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const dot = {
  initial: { y: 0, opacity: 0.5 },
  animate: {
    y: [0, -7, 0],
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 0.7,
      ease: [0.42, 0, 0.58, 1] as const,
      repeat: Infinity,
    },
  },
};

export default function ComingSoon({ backHref = '/dashboard' }: { backHref?: string }) {
  const t = useTranslations();

  return (
    <div className='flex min-h-[calc(100dvh-3.5rem)] items-center justify-center bg-background px-4 py-8 sm:min-h-[calc(100dvh-4rem)] sm:px-6 sm:py-10'>
      <div className='w-full max-w-xl text-center'>
        <motion.div
          variants={floatAnim}
          initial='initial'
          animate='animate'
          className='relative z-10 grid h-full w-full place-items-center'
        >
          {/* Light theme logo */}
          <Image
            src='/logo-light-cropped.png'
            alt='Logo'
            width={1158}
            height={511}
            priority
            className='block w-auto max-w-70 dark:hidden sm:max-w-none'
          />
          {/* Dark theme logo */}
          <Image
            src='/logo-dark-cropped.png'
            alt='Logo'
            width={1158}
            height={511}
            priority
            className='hidden w-auto max-w-70 dark:block sm:max-w-none'
          />
        </motion.div>

        {/* Text */}
        <motion.h1
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className='text-2xl font-semibold tracking-tight sm:text-3xl'
        >
          {t('comingSoon.title')}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className='mt-2 text-xs text-muted-foreground sm:text-sm'
        >
          {t('comingSoon.subtitle')}
        </motion.p>

        {/* Dots */}
        <motion.div
          variants={dotsContainer}
          initial='initial'
          animate='animate'
          className='mt-6 flex items-center justify-center gap-2 sm:mt-8'
          aria-label='Loading'
          role='status'
        >
          <motion.span variants={dot} className='h-2 w-2 rounded-full bg-primary' />
          <motion.span variants={dot} className='h-2 w-2 rounded-full bg-primary' />
          <motion.span variants={dot} className='h-2 w-2 rounded-full bg-primary' />
        </motion.div>

        {/* Back button */}
        <div className='mt-6 flex justify-center sm:mt-8'>
          <Button asChild className='rounded-xl'>
            <Link href={backHref}>{t('comingSoon.back')}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
