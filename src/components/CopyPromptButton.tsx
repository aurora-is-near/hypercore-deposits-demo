'use client';

import { useState } from 'react';

const PROMPT = `# Aurora Intents Topup Widget — Implementation Prompt

Implement the Aurora Intents standalone widget in topup mode so users can deposit any asset from any chain directly into a Hyperliquid (Hypercore) account.

---

## Package

Use the **standalone** variant — it includes built-in AppKit wallet connection:

\`\`\`bash
npm install @aurora-is-near/intents-swap-widget-standalone @aurora-is-near/intents-swap-widget
npm install @wagmi/core wagmi viem @walletconnect/sign-client accounts@0.12.2
npm install @reown/appkit @reown/appkit-adapter-wagmi @reown/appkit-adapter-solana
npm install @solana/wallet-adapter-wallets @creit.tech/stellar-wallets-kit
npm install @headlessui/react ethers
\`\`\`

Use \`--legacy-peer-deps\` if needed.

---

## Critical rules

- **Never** import from \`@aurora-is-near/intents-swap-widget-standalone\` for CSS — import styles from \`@aurora-is-near/intents-swap-widget/styles.css\`
- **Never** add \`connectedWallets\` to config — it does not exist on the standalone widget config type
- **Never** override the \`rpcs\` prop on \`WidgetConfigProvider\` — it breaks balance fetching
- **Always** set \`reactStrictMode: false\` in \`next.config.ts\`
- **Always** use \`ssr: false\` with Next.js dynamic import
- **Always** add a hydration guard (\`isMounted\` state) around the widget
- \`sendAddress\` must **never be null** in topup mode — provide a default address as fallback

---

## next.config.ts

\`\`\`ts
const nextConfig = { reactStrictMode: false };
export default nextConfig;
\`\`\`

---

## Component

\`\`\`tsx
'use client';

import { useState, useEffect } from 'react';
import {
  Widget,
  WidgetConfigProvider,
  useAppKitWallet,
} from '@aurora-is-near/intents-swap-widget-standalone';
import '@aurora-is-near/intents-swap-widget/styles.css';

const ALL_CHAINS = [
  'near', 'eth', 'sol', 'base', 'btc', 'gnosis', 'xrp', 'bera', 'tron', 'zec',
  'doge', 'arb', 'ton', 'op', 'avax', 'pol', 'bsc', 'sui', 'cardano', 'ltc',
  'stellar', 'monad', 'adi', 'aleo', 'bch', 'dash', 'plasma', 'scroll',
  'starknet', 'xlayer', 'aurora', 'hypercore',
] as const;

// topup mode requires sendAddress to be non-null — use a default until wallet connects
const DEFAULT_SEND_ADDRESS = '0xYOUR_DEFAULT_ADDRESS';

function DepositWidgetInner() {
  const { address } = useAppKitWallet(); // reads AppKit global singleton, updates reactively

  return (
    <WidgetConfigProvider
      config={{
        apiKey: 'YOUR_API_KEY',
        slippageTolerance: 100,
        enableAccountAbstraction: true,
        enableAutoTokensSwitching: false,
        chainsOrder: [...ALL_CHAINS],
        allowedChainsList: [...ALL_CHAINS],
        defaultSourceToken: { symbol: 'USDT', blockchain: 'near' as const },
        sendAddress: address ?? DEFAULT_SEND_ADDRESS,
        defaultTargetToken: { symbol: 'USDC', blockchain: 'hypercore' as const },
        showTransactionHistory: true,
        showConversionPreview: true,
        extraQuoteParameters: {},
      }}
      theme={{
        accentColor: '#00C896',
        successColor: '#98FFB5',
        warningColor: '#FADFAD',
        errorColor: '#FFB8BE',
        colorScheme: 'dark',
        borderRadius: 'md',
        stylePreset: 'clean',
        backgroundColor: '#24262D',
      }}
    >
      <Widget defaultTab="topup" tabs={['topup']} />
    </WidgetConfigProvider>
  );
}

export function DepositWidget() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => { setIsMounted(true); }, []);
  if (!isMounted) return <div style={{ width: 440, height: 560 }} />;
  return <DepositWidgetInner />;
}
\`\`\`

## Page (Next.js App Router)

\`\`\`tsx
'use client';
import dynamic from 'next/dynamic';

const DepositWidget = dynamic(
  () => import('@/components/DepositWidget').then(m => m.DepositWidget),
  { ssr: false }
);

export default function Home() {
  return <DepositWidget />;
}
\`\`\`

---

## How it works

- \`useAppKitWallet()\` reads the global AppKit wallet store — it works anywhere in the tree and updates reactively when the user connects/disconnects
- \`sendAddress\` sets the Hyperliquid destination address. When no wallet is connected, the default address is used so \`topup\` mode doesn't throw
- \`defaultTargetToken: { symbol: 'USDC', blockchain: 'hypercore' }\` routes deposits to Hypercore USDC
- The widget handles all wallet connection UI internally via AppKit/WalletConnect
- \`topup\` tab = deposit-only mode (no swap/withdraw tabs shown)`;

export function CopyPromptButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(PROMPT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="relative flex items-center gap-2 overflow-hidden rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur-sm transition-all hover:border-white/50 hover:bg-white/20 shine-button"
    >
      <span className="shine-sweep" />
      {copied ? (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Copied!
        </>
      ) : (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          Copy prompt for Claude
        </>
      )}
    </button>
  );
}
