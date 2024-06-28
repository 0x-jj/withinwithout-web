export function getErrorMessage(err: any): string {
  const error = JSON.stringify(err);
  if (error.includes("PresaleNotOpen")) {
    return "The presale isn't open yet!";
  } else if (error.includes("CollectionSoldOut")) {
    return "Collection is sold out! There are no more public mints available";
  } else if (error.includes("AlreadyMintedInPresale")) {
    return "You are only allowed one presale transaction";
  } else if (error.includes("ReserveMintCountExceeded")) {
    return "There are no more reserve mints available";
  } else if (error.includes("NotEligible")) {
    return "Either you are not eligible to mint in the presale or you selected a mint count you are not eligible for!";
  } else if (error.includes("PresaleSoldOut")) {
    return "The presale is sold out!";
  } else if (error.includes("PublicSaleNotOpen")) {
    return "The public sale is not open yet";
  } else if (error.includes("requires a signer")) {
    return "Please connect your wallet first!";
  } else if (error.includes("execution reverted")) {
    return "Contract execution would revert";
  } else {
    return "Unknown error";
  }
}
