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

export default function ComingSoon({
  backHref = '/dashboard',
  logoSrc = '/logo-light-cropped.png',
  logoAlt = 'Logo',
}: {
  backHref?: string;
  logoSrc?: string;
  logoAlt?: string;
}) {
  const t = useTranslations();

  return (
    <div className='min-h-[calc(100dvh-4rem)] flex items-center justify-center px-6 py-10 bg-background'>
      <div className='w-full max-w-xl text-center'>
        <motion.div
          variants={floatAnim}
          initial='initial'
          animate='animate'
          className='relative z-10 h-full w-full grid place-items-center'
        >
          <Image src={logoSrc} alt={logoAlt} width={1158} height={511} priority className=' w-auto' />
        </motion.div>

        {/* Text */}
        <motion.h1
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className='text-3xl font-semibold tracking-tight'
        >
          {t('comingSoon.title')}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className='mt-2 text-sm text-muted-foreground'
        >
          {t('comingSoon.subtitle')}
        </motion.p>

        {/* Dots */}
        <motion.div
          variants={dotsContainer}
          initial='initial'
          animate='animate'
          className='mt-8 flex items-center justify-center gap-2'
          aria-label='Loading'
          role='status'
        >
          <motion.span variants={dot} className='h-2 w-2 rounded-full bg-primary' />
          <motion.span variants={dot} className='h-2 w-2 rounded-full bg-primary' />
          <motion.span variants={dot} className='h-2 w-2 rounded-full bg-primary' />
        </motion.div>

        {/* Back button */}
        <div className='mt-8 flex justify-center'>
          <Button asChild className='rounded-xl'>
            <Link href={backHref}>{t('comingSoon.back')}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
