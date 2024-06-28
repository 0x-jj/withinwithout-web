interface BasicChainInformation {
  urls: string[];
  name: string;
}

export const CHAINS: {
  [chainId: number]: BasicChainInformation;
} = {
  1: {
    urls: ["https://cloudflare-eth.com"].filter((url) => url !== undefined),
    name: "Mainnet",
  },
  // 4: {
  //   urls: [
  //     process.env.NEXT_PUBLIC_ALCHEMY_URL
  //       ? process.env.NEXT_PUBLIC_ALCHEMY_URL
  //       : (undefined as unknown as string),
  //   ].filter((url) => url !== undefined),
  //   name: "Rinkeby",
  // },
};

export const URLS: { [chainId: number]: string[] } = Object.keys(
  CHAINS
).reduce<{ [chainId: number]: string[] }>((accumulator, chainId) => {
  const validURLs: string[] = CHAINS[Number(chainId)].urls;

  if (validURLs.length) {
    accumulator[Number(chainId)] = validURLs;
  }

  return accumulator;
}, {});
