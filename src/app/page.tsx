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
      {/* GitHub link — top-right corner */}
      <a
        href="https://github.com/aurora-is-near/hypercore-deposits-demo"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed top-4 right-4 z-10 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/60 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10 hover:text-white/90"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
        </svg>
        View source
      </a>
      {/* Full-screen background animation */}
      <div className="fixed inset-0 -z-10">
        <Lightfall
          colors={['#7FFFD4', '#00C896', '#0D6B55']}
          backgroundColor="#062018"
          speed={0.4}
          streakCount={2}
          streakWidth={0.2}
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
          Any asset. Any chain. Directly into your Hyperliquid account, ready to trade!
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
