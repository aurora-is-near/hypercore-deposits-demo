'use client';

import dynamic from 'next/dynamic';

const DepositWidget = dynamic(
  () => import('@/components/DepositWidget').then((mod) => mod.DepositWidget),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#0D0F14] px-4">
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
