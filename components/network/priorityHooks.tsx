//@ts-nocheck

import { getPriorityConnector } from "@web3-react/core";
import { hooks as metaMaskHooks, metaMask } from "./connectors/metaMask";
import {
  hooks as walletConnectHooks,
  walletConnect,
} from "./connectors/walletConnect";

export const {
  usePriorityAccount,
  usePriorityENSName,
  usePriorityProvider,
  usePriorityWeb3React,
  usePriorityConnector,
} = getPriorityConnector(
  [metaMask, metaMaskHooks],
  [walletConnect, walletConnectHooks]
);
