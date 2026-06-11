# Hyperliquid Deposit Demo

A Next.js demo showing how to integrate the [Aurora Intents](https://intents.aurora.dev) deposit widget to let users bridge assets from any chain directly into their [Hyperliquid](https://hyperliquid.xyz) account — with the destination address automatically set to their connected wallet.

**Live demo:** [hypercore-deposits-demo.vercel.app](https://hypercore-deposits-demo.vercel.app)

---

## How it works

### Aurora Intents Deposit Widget

[Aurora Intents](https://docs.intents.aurora.dev) is a cross-chain intent protocol that can move any asset from any supported chain to a destination address on a target chain. The `@aurora-is-near/intents-swap-widget-standalone` package provides a drop-in React widget with built-in wallet connection (via AppKit/WalletConnect).

This demo uses the widget in **deposit-only mode** — swap and withdraw tabs are hidden, and the destination is locked to Hyperliquid (Hypercore).

```tsx
<Widget defaultTab="deposit" tabs={['deposit']} />
```

### Hypercore & destination address

Hyperliquid's on-chain layer (Hypercore) uses standard EVM addresses. This means the deposit destination is simply the user's connected EVM wallet address — no special derivation needed.

### Dynamic destination address injection

The key integration piece: as soon as a user connects their wallet, the widget automatically uses that address as the Hyperliquid deposit destination via the `sendAddress` config prop.

```tsx
import { useAppKitWallet } from '@aurora-is-near/intents-swap-widget-standalone';

function DepositWidgetInner() {
  const { address } = useAppKitWallet(); // reads the global AppKit wallet store

  return (
    <WidgetConfigProvider
      config={{
        apiKey: 'YOUR_API_KEY',
        sendAddress: address ?? null,           // destination = connected wallet
        defaultTargetToken: { symbol: 'USDC', blockchain: 'hypercore' },
        // ...
      }}
      theme={widgetTheme}
    >
      <Widget defaultTab="deposit" tabs={['deposit']} />
    </WidgetConfigProvider>
  );
}
```

`useAppKitWallet` reads from AppKit's global singleton store — it works anywhere in the component tree, outside the provider, and updates reactively when the user connects or disconnects. When no wallet is connected, `sendAddress: null` leaves the destination field editable in the widget.

---

## Setup

### 1. Get an API key

Register at [Aurora Intents Studio](https://studio.intents.aurora.dev) to get your API key.

### 2. Install dependencies

```bash
npm install @aurora-is-near/intents-swap-widget-standalone @aurora-is-near/intents-swap-widget
# peer deps
npm install @wagmi/core wagmi viem
```

### 3. Configure the widget

Create your widget component (see [`src/components/DepositWidget.tsx`](src/components/DepositWidget.tsx)):

```tsx
'use client';
import { useState, useEffect } from 'react';
import {
  Widget,
  WidgetConfigProvider,
  useAppKitWallet,
} from '@aurora-is-near/intents-swap-widget-standalone';
import '@aurora-is-near/intents-swap-widget/styles.css';

function DepositWidgetInner() {
  const { address } = useAppKitWallet();

  return (
    <WidgetConfigProvider
      config={{
        apiKey: 'YOUR_API_KEY',
        sendAddress: address ?? null,
        defaultTargetToken: { symbol: 'USDC', blockchain: 'hypercore' },
        defaultSourceToken: { symbol: 'USDT', blockchain: 'near' },
        slippageTolerance: 100,
        enableAccountAbstraction: true,
        showTransactionHistory: true,
        showConversionPreview: true,
      }}
    >
      <Widget defaultTab="deposit" tabs={['deposit']} />
    </WidgetConfigProvider>
  );
}

// Hydration guard — the widget uses browser APIs, skip SSR
export function DepositWidget() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => { setIsMounted(true); }, []);
  if (!isMounted) return <div style={{ width: 440, height: 560 }} />;
  return <DepositWidgetInner />;
}
```

### 4. Load it without SSR

In Next.js App Router, use `dynamic` to prevent server-side rendering:

```tsx
import dynamic from 'next/dynamic';

const DepositWidget = dynamic(
  () => import('@/components/DepositWidget').then(m => m.DepositWidget),
  { ssr: false }
);
```

### 5. Disable React Strict Mode (recommended)

Add to `next.config.ts` to avoid widget state machine issues from double-invocation:

```ts
const nextConfig = {
  reactStrictMode: false,
};
```

---

## Supported source chains

The widget supports depositing from any of these chains into Hyperliquid:

`near` · `eth` · `base` · `arb` · `op` · `sol` · `btc` · `bsc` · `avax` · `pol` · `ton` · `tron` · `sui` · `bera` · `monad` · `gnosis` · `scroll` · `starknet` · `aurora` · and more

---

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## References

- [Aurora Intents docs](https://docs.intents.aurora.dev)
- [Widget integration quickstart](https://docs.intents.aurora.dev/intents-deposits/quickstart/widget-integration)
- [Hyperliquid / Hypercore docs](https://hyperliquid.gitbook.io/hyperliquid-docs/hypercore/overview)
- [`@aurora-is-near/intents-swap-widget-standalone` on npm](https://www.npmjs.com/package/@aurora-is-near/intents-swap-widget-standalone)
