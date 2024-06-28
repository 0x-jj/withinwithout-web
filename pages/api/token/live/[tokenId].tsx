import chainInfo from "@/config/chainInfo.json";
import ABI from "config/apxfpAbi.json";
import { BigNumber, ethers } from "ethers";
import fs from "fs";
import path from "path";

const provider = new ethers.providers.JsonRpcProvider(process.env.ALCHEMY_URL);

const contract = new ethers.Contract(chainInfo.contractAddress, ABI, provider);

interface tokenData {
  printsCount: BigNumber;
  tokenHash: string;
  tokenId: string;
}

export default async function handler(
  req: { query: { tokenId: any } },
  res: any
) {
  const { tokenId } = req.query;
  const script = fs.readFileSync(path.resolve("./public/script.txt"));
  const td: tokenData = await contract.tokenIdToTokenData(Number(tokenId));

  let tokenData = {
    tokenId,
    hash: td.tokenHash,
    // @ts-ignore
    fingerprintsBalance: Number(td.printsCount / 1e18),
  };

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.send(`<!DOCTYPE html>
  <html lang="en">
      <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
  
          <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.0.0/p5.min.js"></script> -->
  
          <script type="application/javascript">
              let tokenData = ${JSON.stringify(tokenData)};
          </script>
  
          <style type="text/css">
              html {
                  height: 100%;
              }
              body {
                  min-height: 100%;
                  margin: 0;
                  padding: 0;
              }
              canvas {
                  padding: 0;
                  margin: auto;
                  display: block;
                  position: absolute;
                  top: 0;
                  bottom: 0;
                  left: 0;
                  right: 0;
              }
          </style>
      </head>
      <body>
      <script>
      ${script}
      </script>
      </body>
  </html>
  `);
}
