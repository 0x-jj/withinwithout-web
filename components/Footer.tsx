import React from "react";

const Footer: React.FC = ({ children }) => {
  return (
    <div className="footer" style={{ paddingBottom: "12px" }}>
      {/* <div className="left">Not an investment.</div> */}
      <div className="right" style={{ marginRight: "5rem", color: "#111" }}>
        <a
          href="https://aaronpenne.io/work/withinwithout"
          target="_blank"
          rel="noreferrer"
        >
          Aaron Penne
        </a>
        <a href="https://fingerprintsdao.xyz/" target="_blank" rel="noreferrer">
          FingerprintsDAO
        </a>
        <a
          href="https://twitter.com/FingerprintsDAO"
          target="_blank"
          rel="noreferrer"
        >
          Twitter
        </a>
        <a
          href="https://discord.gg/Mg7wx36upM"
          target="_blank"
          rel="noreferrer"
        >
          Discord
        </a>
      </div>
    </div>
  );
};

export default Footer;
