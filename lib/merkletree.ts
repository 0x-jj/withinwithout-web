import Scores from "config/scores.json";
import keccak256 from "keccak256";
import { MerkleTree } from "merkletreejs";

let singles = [];
let doubles = [];

for (const [address, points] of Object.entries(Scores)) {
  const hash = keccak256(address);
  singles.push(hash);
  if (points >= 2) {
    doubles.push(hash);
  }
}

const SINGLE_MERKLE_TREE = new MerkleTree(singles, keccak256, {
  sortPairs: true,
});

const DOUBLE_MERKLE_TREE = new MerkleTree(doubles, keccak256, {
  sortPairs: true,
});

export function getMerkleProof(address: string, count: number) {
  const hash = keccak256(address);
  if (count === 1) {
    return SINGLE_MERKLE_TREE.getHexProof(hash);
  } else if (count === 2) {
    return DOUBLE_MERKLE_TREE.getHexProof(hash);
  }
  throw new Error("Unsupported count");
}
