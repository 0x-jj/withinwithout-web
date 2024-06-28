import chainInfo from "@/config/chainInfo.json";
import { getFeatures } from "@/lib/features";
import ABI from "config/apxfpAbi.json";
import { ethers } from "ethers";
import { NextApiResponse } from "next";

const provider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_URL);

const contract = new ethers.Contract(chainInfo.contractAddress, ABI, provider);

export default async function handler(
  req: { query: { tokenId: string; width: string } },
  res: NextApiResponse
) {
  const tokenId = req.query.tokenId;
  const td = await contract.tokenIdToTokenData(tokenId);
  let tokenData = {
    tokenId,
    hash: td.tokenHash,
    fingerprintsBalance: Number(td.printsCount / 1e18),
  };

  const features = await getFeatures(tokenData);

  res.json({
    name: `Within/Without #${tokenId}`,
    image: `https://withinwithout.s3.us-east-2.amazonaws.com/${tokenId}.png`,
    live_render: `https://www.withinwithout.xyz/api/token/live/${tokenId}`,
    external_url: `https://www.withinwithout.xyz/details/${tokenId}`,
    description: `by Aaron Penne in partnership with FingerprintsDAO \n\nA long form generative art project that asks the question: Is the art in the code or the output? For on-chain generative artwork it is both, simultaneously. Tracing the lineage from Sol LeWitt’s Wall Drawings to Larva Labs’ Autoglyphs, Aaron Penne’s Within/Without decouples the artist's instructions from the visual output, and those instructions are interpreted according to some element of chance. \n\nThe familiar Autoglyph-like structure is made up of primitive forms: lines, circles, and squares. In WW these are translated to create complex rectangular structures, dreamlike gradients, and soft edges made of pixelated digital artifacts. \n\nMore details: https://aaronpenne.io/work/withinwithout`,
    attributes: Object.entries(features).map(([k, v]) => ({
      trait_type: k,
      value: v,
    })),
  });
}
