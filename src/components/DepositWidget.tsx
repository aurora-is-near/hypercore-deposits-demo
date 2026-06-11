'use client';

import { useState, useEffect } from 'react';
import {
  Widget,
  WidgetConfigProvider,
  useAppKitWallet,
} from '@aurora-is-near/intents-swap-widget-standalone';
import '@aurora-is-near/intents-swap-widget/styles.css';
import { widgetTheme } from '@/config/widget';

const ALL_CHAINS = [
  'near', 'eth', 'sol', 'base', 'btc', 'gnosis', 'xrp', 'bera', 'tron', 'zec',
  'doge', 'arb', 'ton', 'op', 'avax', 'pol', 'bsc', 'sui', 'cardano', 'ltc',
  'stellar', 'monad', 'adi', 'aleo', 'bch', 'dash', 'plasma', 'scroll',
  'starknet', 'xlayer', 'aurora', 'hypercore',
] as const;

// Inner component — must be rendered inside WidgetConfigProvider to use useAppKitWallet
function DepositWidgetInner() {
  const { address } = useAppKitWallet();

  return (
    <WidgetConfigProvider
      config={{
        apiKey: '5a6c4f98-f174-4bd2-aa19-3d53e3abe87d',
        slippageTolerance: 100,
        enableAccountAbstraction: true,
        enableAutoTokensSwitching: false,
        chainsOrder: [...ALL_CHAINS],
        allowedChainsList: [...ALL_CHAINS],
        // Lock destination to Hypercore — users cannot change it
        allowedTargetChainsList: ['hypercore'],
        defaultSourceToken: {
          symbol: 'USDT',
          blockchain: 'near',
        },
        // Deposit goes to the connected EVM address on Hypercore
        sendAddress: address ?? null,
        defaultTargetToken: {
          symbol: 'USDC',
          blockchain: 'hypercore',
        },
        showTransactionHistory: true,
        showConversionPreview: true,
        extraQuoteParameters: {},
      }}
      theme={widgetTheme}
    >
      <Widget defaultTab="deposit" tabs={['deposit']} />
    </WidgetConfigProvider>
  );
}

export function DepositWidget() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="w-[440px] h-[560px] rounded-2xl animate-pulse bg-[#24262D]" />;
  }

  return <DepositWidgetInner />;
}
