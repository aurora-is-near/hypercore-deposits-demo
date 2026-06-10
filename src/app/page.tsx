'use client';

import dynamic from 'next/dynamic';

const DepositWidget = dynamic(
  () => import('@/components/DepositWidget').then((mod) => mod.DepositWidget),
  { ssr: false }
);

const Lightfall = dynamic(
  () => import('@/components/Lightfall'),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Full-screen background animation */}
      <div className="fixed inset-0 -z-10">
        <Lightfall
          colors={['#7FFFD4', '#00C896', '#0D6B55']}
          backgroundColor="#062018"
          speed={0.4}
          streakCount={6}
          streakWidth={0.8}
          streakLength={1.2}
          glow={1.2}
          density={0.5}
          twinkle={0.8}
          zoom={3}
          backgroundGlow={0.5}
          opacity={1}
          mouseInteraction={true}
          mouseStrength={0.6}
          mouseRadius={0.8}
        />
      </div>

      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
          Deposit to Hyperliquid
        </h1>
        <p className="text-gray-400 text-sm max-w-sm">
          Bridge any asset from any chain directly into your Hyperliquid account via Aurora Intents.
        </p>
      </div>

      <DepositWidget />

      <p className="mt-6 text-xs text-gray-600">
        Powered by{' '}
        <a
          href="https://intents.aurora.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-gray-400 underline transition-colors"
        >
          Aurora Intents
        </a>
      </p>
    </main>
  );
}
