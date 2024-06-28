"use strict";

export function getFeatures(tokenData) {
  let seed = gs(tokenData.hash);

  function gs(token) {
    // get seed
    return parseInt(tokenData.hash.slice(0, 16), 16);
  }

  function rd() {
    // random between 0:1
    seed ^= seed << 13;
    seed ^= seed >> 17;
    seed ^= seed << 5;
    return ((seed < 0 ? ~seed + 1 : seed) % 1000) / 1000;
  }

  function rb(a, b) {
    // random between two numbers
    return a + (b - a) * rd();
  }

  function rj(a, j) {
    // random jitter
    return rb(a - j, a + j);
  }

  function rc(choices) {
    // randomly pick from array
    return choices[Math.floor(rb(0, choices.length * 0.99))];
  }

  function rco(choices) {
    // randomly pick an object from array, but weighted according to w
    let a = [];
    choices.forEach((elem, idx) => {
      for (let i = 0; i < elem.w; i++) {
        a.push(elem);
      }
    });
    return rc(a);
  }

  function shuffle(a) {
    // inplace shuffling for arrays
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rd() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
  }

  function gj(a, name, val = false) {
    // get an object according to name
    // gj(pp.pal, "Bacon")
    let out = a.filter(({ n }) => n == name);
    if (val) {
      out = out.map(({ v }) => v);
      return [...out];
    } else {
      return out[0];
    }
  }

  function hexRgb(hex) {
    // convert hex to 3 rgb values 0:255
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }

  function hexV3(c) {
    // convert hex to vec3 for shader usage 0:1
    let h = /^\#([A-Fa-f\d]+)$/.exec(c)[1];
    let out;
    if (h.length === 3) {
      out = [
        parseInt(h[0] + h[0], 16) / 255,
        parseInt(h[1] + h[1], 16) / 255,
        parseInt(h[2] + h[2], 16) / 255,
      ];
    } else if (h.length === 6) {
      out = [
        parseInt(h[0] + h[1], 16) / 255,
        parseInt(h[2] + h[3], 16) / 255,
        parseInt(h[4] + h[5], 16) / 255,
      ];
    }
    return out;
  }

  function lerpHex(a, b, s) {
    // interpolate between hex values (probably a better way to do this with a better color space)
    let ah = +a.replace("#", "0x"),
      ar = ah >> 16,
      ag = (ah >> 8) & 0xff,
      ab = ah & 0xff,
      bh = +b.replace("#", "0x"),
      br = bh >> 16,
      bg = (bh >> 8) & 0xff,
      bb = bh & 0xff,
      rr = ar + s * (br - ar),
      rg = ag + s * (bg - ag),
      rb = ab + s * (bb - ab);

    return (
      "#" +
      (((1 << 24) + (rr << 16) + (rg << 8) + rb) | 0).toString(16).slice(1)
    );
  }

  function hex3to6(hx) {
    if (hx[0] != "#") hx = "#" + hx;
    if (hx.length >= 7) return hx;
    hx = hx
      .split("")
      .map((ch) => {
        if (ch == "#") {
          return ch;
        }
        return ch + ch;
      })
      .join("");
    return hx;
  }

  function lerp(min, max, pct) {
    // interpolate between two numbers with pct=0 being min and pct=1 being max
    return min * (1 - pct) + max * pct;
  }

  function mapRng(val, start1, stop1, start2, stop2) {
    // implementation of p5's map
    return ((val - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
  }

  function titleCase(str) {
    str = str.toLowerCase().split(" ");
    for (let i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(" ");
  }

  function getDate(dayOnly = false) {
    let dd = new Date().toLocaleString("en-US", {
      timeZone: "America/Los_Angeles",
    });
    let day = new Date(dd).getDay();
    let d = dd.split("/");

    if (dayOnly) {
      return day;
    } else {
      return d[0] + d[1];
    }
  }

  let cw = "#F2F3EE";
  let cb = "#222222";
  let zephyrPal = [
    "#4E6E61",
    "#365",
    "#4C3F5D",
    "#336",
    "#358",
    "#CCC",
    "#45A",
    "#576",
    "#5493B6",
    "#7AC",
    "#89292D",
    "#87A",
    "#8F3935",
    "#A33",
    "#B8513B",
    "#B78",
    "#C54",
    "#C95",
    "#D57C30",
    "#D94",
    "#DA9",
    "#C99",
    "#DEC254",
  ];

  let palette = [
    {
      w: 12,
      n: "Riley",
      v: ["#E8E2D6", "#656463", "#333", "#111", "#F3F3EF", "#000", cw, cb],
    },
    {
      w: 2,
      n: "Darkness",
      v: [
        "#111",
        "#656463",
        "#333",
        cb,
        "#000",
        "#454443",
        cb,
        "#656463",
        "#313035",
      ],
    },
    {
      w: 1,
      n: "Light",
      v: [
        "#EFE8D8",
        "#fff",
        "#F3F3EF",
        "#E8E2D6",
        cw,
        "#DEDFDA",
        "#fff",
        "#ccc",
        "#EEE",
      ],
    },
    {
      w: 10,
      n: "South Beach",
      v: ["#78cdd0", "#fdd4bd", "#253122", "#f9c1ce", cw, cb],
    },
    {
      w: 10,
      n: "Young Again",
      v: ["#a36aa5", "#006eb8", "#fcb315", "#e31f26", cw, cb],
    },
    { w: 10, n: "Laguna", v: ["#cee", "#9bc", "#099", "#78cdd0", cw, cb] },
    { w: 9, n: "Phoenix", v: ["#8F3935", "#D94", "#E8E2D6", cw, cb] },
    {
      w: 5,
      n: "Slayer",
      v: ["#6d4145", "#ca92a8", "#713b4c", "#f9c1ce", cw, cb],
    },
    {
      w: 7,
      n: "Bacon",
      v: [
        "#89292D",
        "#7A0000",
        "#A33",
        "#7A2B2A",
        "#863A39",
        "#A13A34",
        cw,
        cb,
      ],
    },
    {
      w: 7,
      n: "Thaddeus",
      v: ["#064f6e", "#f68c50", "#40456a", "#f3a257", cw, cb],
    },
    {
      w: 3,
      n: "Squidgit",
      v: ["#7a4456", "#c2ae93", "#c27544", "#762c19", cw, cb],
    },
    { w: 3, n: "BB", v: ["#12354e", "#c2ae93", "#bb7125", "#eea78c", cw, cb] },
    { w: 10, n: "Cat's Game", v: ["#336", "#45A", "#A33", "#f3a257", cw, cb] },
    {
      w: 3,
      n: "Sycamore",
      v: ["#6E4E37", "#C54", "#B73", "#CCC", "#C95", "#D57C30", "#D94", cw, cb],
    },
    {
      w: 5,
      n: "Silverado",
      v: ["#34454c", "#d8a37b", "#71502f", "#f5ecc2", cw, cb],
    },
    {
      w: 2,
      n: "Certainty",
      v: ["#547076", "#c5a56e", "#f5ecc2", "#dd4027", cw, cb],
    },
    {
      w: 2,
      n: "Tinkham",
      v: ["#006eb8", "#00978d", "#fdbf68", "#f99d1b", cw, cb],
    },

    // { w: 100000, n: "Zephyr", v: zephyrPal },
    { w: 15, n: "Oracle", v: ["#000", rc(zephyrPal), cb, cw, cb, cw] },
    {
      w: 3,
      n: "Basil Gogos",
      v: ["#823d65", "#83ABAB", cb, "#7A4280", cb, cw],
    },
    {
      w: 10,
      n: "Cat's Cradle",
      v: ["#45A", "#336", "#358", "#5493B6", cw, cb],
    },
    { w: 8, n: "Front Row", v: ["#336", "#5493B6", "#89292D", "#87A", cw, cb] },

    {
      w: 7,
      n: "Coalinga",
      v: [
        "#2C2728",
        "#8E7D7A",
        "#A55556",
        "#474044",
        "#162122",
        "#2C2728",
        "#3F4245",
        "#5A6268",
        "#454A4F",
        "#28292A",
        "#B8C3D4",
        "#AD8A85",
        "#9F9897",
        "#3B3B3B",
        "#767273",
        "#3F3533",
        "#4D4947",
        "#6A6261",
        "#B2775F",
      ],
    },
    {
      w: 5,
      n: "Halcyon",
      v: [
        "#756485",
        "#835061",
        "#9A95A0",
        "#B6A5C8",
        "#9B85A2",
        "#835061",
        "#C58FAD",
        "#BC849E",
        "#883E3F",
        "#BD636E",
        "#CF707D",
        "#703946",
        "#8C495C",
        "#B9627D",
        "#683D4D",
        "#3F2D39",
        "#7F4364",
        "#5E3750",
        "#252830",
        "#4A354F",
        "#3A2D3E",
        "#1E231D",
        "#242525",
        "#212322",
        "#1C211E",
        "#2E272D",
        "#42303D",
        "#26262D",
        "#482F37",
        "#7B4048",
        "#4C3037",
        "#442F35",
        "#A9554E",
        "#9C4E47",
        "#4E282B",
        "#B26A53",
        "#CE7C5D",
        "#884331",
        "#9A605B",
        "#C48A8C",
        "#A06B6A",
        "#714A4F",
        "#A88DB1",
        "#A38AAE",
        "#594662",
        "#B1A9B4",
        "#242525",
        "#212322",
        "#1C211E",
      ],
    },

    {
      w: 1,
      n: "Avid Lines Field",
      v: ["#FCE8CD", "#433520", "#025955", "#00917C"],
    },
    {
      w: 1,
      n: "Avid Lines College",
      v: ["#393E46", "#FFD368", "#EEEEEE", "#222831"],
    },
    {
      w: 1,
      n: "Bedtime Jim",
      v: [
        "#263DB2",
        "#6D9BDE",
        "#3F5AE4",
        "#E17B6D",
        "#E9D5AA",
        "#7F3A26",
        "#FFFDDF",
        "#000000",
      ],
    },
    {
      w: 1,
      n: "Miami Jim",
      v: [
        "#4F0DFA",
        "#FF1BD2",
        "#000000",
        "#FD8B5B",
        "#5A65FA",
        "#C54E38",
        "#F38B7C",
      ],
    },

    // testtttt

    {
      w: 5,
      n: "Pickup",
      v: [
        "#DC5D4A",
        "#89CEE3",
        "#DF5B44",
        "#D96E58",
        "#89CEE3",
        "#6BB5E0",
        cw,
        "#CFCE9A",
        "#DCE29E",
        "#73554D",
        "#3C2F65",
        cb,
        "#B98E68",
        "#98724B",
        "#6B4D26",
        "#B0934D",
        cb,
        "#006AB8",
        "#A5825C",
        "#5B5463",
        "#00579F",
        "#287BB7",
      ],
    },
    {
      w: 2,
      n: "jp",
      v: [
        "#C9C9B9",
        "#CAA384",
        "#E6BF9B",
        "#DCB595",
        "#86867D",
        "#493C38",
        cb,
        "#B4A592",
        "#BC997E",
        "#D8B390",
        "#E17E58",
        "#3E475D",
        "#5B4E53",
        "#B17867",
        "#A94A26",
        "#A0715A",
        "#E37B49",
        "#4D576B",
        "#3C3D54",
        "#D07C52",
        "#CA8F72",
        "#BCA996",
        "#D2643C",
        cb,
        cw,
      ],
    },
    {
      w: 5,
      n: "Precaution",
      v: [
        cw,
        "#D05C4E",
        "#EBE5D9",
        "#F1BFB7",
        cb,
        "#F1BFB7",
        "#BAD6C8",
        "#F9CC6A",
        "#77A3BB",
        "#A8A298",
      ],
    },
    {
      w: 2,
      n: "Just Outside",
      v: [
        "#7BAEAE",
        "#DAC8B9",
        "#7AB0B5",
        "#A1B5B5",
        "#F9CC6A",
        "#DAC8B9",
        "#E0CBB9",
        "#E4C0A5",
        "#C73D23",
        "#A5281A",
        "#000000",
        "#797269",
        "#CB464C",
        "#C30F13",
        "#B12021",
        "#DFA688",
        cw,
        "#000000",
        "#4F5A6A",
        cw,
        "#D1962D",
        "#D1A759",
      ],
    },

    {
      w: 10,
      n: "Construct",
      v: [
        "#6CA9C2",
        "#C7B9A3",
        "#B2B9B6",
        "#93B0BA",
        "#6CA9C2",
        "#4E9CC0",
        "#4291BE",
        "#4195C2",
        "#4E8ABA",
        "#7585AE",
        cw,
        cb,
        cw,
        "#BBA0AF",
        "#B1799E",
        "#BB618A",
        "#C15F82",
        "#BD5A80",
        "#C15E86",
        "#C7658C",
        "#C48AA0",
        "#C69FAA",
        "#C2AFAF",
        cw,
        cb,
        cw,
      ],
    },

    {
      w: 10,
      n: "New Room",
      v: [
        "#C6BCAF",
        "#CFB853",
        "#692C45",
        "#252424",
        "#C6BCAF",
        "#2F4571",
        "#692C45",
        "#C6BCAF",
        "#40604E",
        "#C6BCAF",
        "#A63C3D",
        "#252424",
        "#212D55",
        "#C6BCAF",
        "#252424",
      ],
    },
  ];

  // determine all the major parameters aka features
  let pp = {
    glyph: [
      { w: 2, n: String.raw`X/\ `, v: [".", "X", "/", `\\`, "."] },
      { w: 2, n: String.raw`+-|`, v: [".", "+", "-", "|", "."] },
      { w: 1, n: String.raw`/\ `, v: [".", "/", `\\`, ".", "."] },
      { w: 1, n: String.raw`\|-/`, v: [".", `\\`, "|", "-", "/"] },
      { w: 3, n: String.raw`O|-`, v: [".", "O", "|", "-", "."] },
      { w: 1, n: String.raw`\ `, v: [".", "\\", ".", ".", "."] },
      { w: 2, n: String.raw`#|-+`, v: [".", "#", "|", "-", "+"] },
      { w: 2, n: String.raw`O`, v: [".", "O", "O", ".", "."] },
      { w: 2, n: String.raw`#`, v: [".", "#", ".", ".", "."] },
      { w: 3, n: String.raw`#O`, v: [".", "#", "O", ".", "."] },
    ],
    plcmt: [
      { w: 1, n: "Exposed", v: 0.17 },
      { w: 12, n: "Inset", v: 0.095 },
      { w: 3, n: "Full Bleed", v: 0 },
    ],
    border: [
      { w: 0, n: "None", v: "0." },
      // { w: 1, n: "Inset", v: "1." },
      { w: 4, n: "Trimmed", v: "2." },
    ],
    numUp: [
      { w: 70, n: "Solo", v: "1." },
      { w: 1, n: "Quad", v: "2." },
      // { w: 1, n: "9 up", v: "3." },
    ],
    cThk: [
      { w: 10, n: "Thick", v: 0.015 },
      { w: 7, n: "Thin", v: 0.01 },
      { w: 4, n: "Micro", v: 0.005 },
      { w: 21, n: "Pixelated", v: 0.015 },
    ],
    gBlur: [
      { w: 10, n: "Small", v: 0.001 },
      { w: 3, n: "Medium", v: 0.0025 },
      { w: 1, n: "Large", v: 0.006 },
      { w: 0, n: "Minimal", v: 0.0001 },
    ],
    bg: [
      { w: 0, n: "None", v: cb },
      { w: 4, n: "Light", v: cw },
      { w: 9, n: "Dark", v: cb },
      { w: 1, n: "Sync", v: 0 },
    ],
    frameColor: [
      { w: 0, n: "None", v: cb },
      { w: 1, n: "Light", v: cw },
      { w: 1, n: "Dark", v: cb },
      { w: 0, n: "Sync", v: cb },
    ],
    skeleton: [
      { w: 0, n: "Reveal", v: "1." },
      { w: 0, n: "Overlay", v: ".5" },
      { w: 1, n: "Hide", v: "0." },
    ],
    colorize: [
      { w: 1, n: "True", v: "1." },
      { w: 0, n: "False", v: "0." },
    ],
    ms: [
      { w: 8, n: "Conceptual", v: 120 },
      { w: 1, n: "Meditative", v: 10 },
    ],
    bgBlur: [
      { w: 5, n: "Active", v: "blurBG" },
      { w: 1, n: "Middling", v: "blurBG" },
      { w: 0, n: "Dormant", v: "" },
    ],
    zoom: [
      { w: 2, n: "Enhance", v: [0.3722, 0.2556] },
      { w: 7, n: "In", v: [0.2573, 0.4854] },
      { w: 15, n: "Out", v: [0, 1] },
    ],
    zoomMove: [
      { w: 1, n: "On", v: "1." },
      { w: 30, n: "Off", v: "0." },
    ],
    spread: [
      { w: 2, n: "Full", v: 0.015 },
      { w: 4, n: "Mid", v: 0.008 },
      { w: 3, n: "Little", v: 0.005 },
      { w: 1, n: "None", v: 0.0004 },
    ],
    direction: [
      { w: 2, n: "Reverse Angle", v: [-1, 1] },
      { w: 4, n: "Vertical", v: [0, 1] },
      { w: 4, n: "Horizontal", v: [1, 0] },
      { w: 2, n: "Forward Angle", v: [1, 1] },
    ],
    phase: [
      { w: 5, n: "PI by 2", v: "PI/2." },
      { w: 3, n: "PI by 4", v: "PI/4." },
      { w: 2, n: "PI by 6", v: "PI/6." },
      { w: 10, n: "Flat", v: "0." },
    ],
    xFiles: [
      { w: 175, n: "Classified", v: 0 },
      { w: 1, n: "I want to believe", v: 1 },
    ],
    ct: [
      { w: 1, n: "Reckoning", v: [21, 24, 30, 33, 39, 42] },
      { w: 1, n: "Removed", v: [30, 33] },
      { w: 0, n: "None", v: [100] },
    ],
    cRep: [
      { w: 1, n: "Few", v: 2 },
      { w: 1, n: "Some", v: 3 },
      { w: 1, n: "Many", v: 4 },
    ],
    prophecy: [{ w: 1, n: "Chosen", v: "None" }],
    ctgry: [
      { w: 0, n: "Ghost", v: "" },
      { w: 0, n: "Pixelated", v: "" },
      { w: 1, n: "Within", v: "" },
      { w: 1, n: "Without", v: "" },
    ],
    prints: [
      { w: 0, n: "Member", v: "1." },
      { w: 1, n: "Smudged", v: "0." },
    ],
    pal: palette,
  };

  let p = {};
  for (let key in pp) p[key] = rco(pp[key]);
  if (getDate() == 424) p.pal = gj(pp.pal, "Riley");
  if (getDate(true) == 6) p.ms = gj(pp.ms, "Meditative");
  let printsBal = tokenData.fingerprintsBalance;

  for (let i = 0; i < p.pal.v.length; i++) p.pal.v[i] = hex3to6(p.pal.v[i]);

  if (p.cThk.v > 0.01 && p.zoom.n == "In") {
    p.ctgry.n = "Personal";
  } else if (
    p.cThk.v >= 0.01 &&
    p.zoom.n == "Enhance" &&
    p.gBlur.n == "Large"
  ) {
    p.cThk = gj(pp.cThk, "Thin");
    p.ctgry.n = "Ghost";
  }

  if (p.ctgry.n == "Ghost" && (p.pal.n == "Light" || p.pal.n == "Darkness")) {
    p.pal = gj(pp.pal, "Oracle");
  }

  if (p.pal.n == "Oracle") {
    let oc = gj(pp.pal, "Oracle");
    oc = oc.v[1];
    p.prophecy.v = oc.replace("#", "");
  }

  if (p.glyph.n == String.raw`\ `) {
    p.cThk.n = "Crutch";
    p.cThk.v = 0.05;
  }

  if (p.cThk.n == "Pixelated") {
    p.phase = gj(pp.phase, "Flat");
    p.gBlur = gj(pp.gBlur, "Minimal");
  }

  if ((p.cThk.v > 0.01 && p.gBlur.v > 0.5) || p.plcmt.n == "Exposed") {
    p.zoom = gj(pp.zoom, "Out");
  }

  if (p.zoom.n == "Enhance" && p.cThk.n == "Micro") {
    p.cThk = gj(pp.cThk, "Thin");
  }

  if (p.zoom.n == "Out") {
    p.ct = gj(pp.ct, "None");
  }

  // no shader border if full bleed
  if (p.plcmt.v == 0 && printsBal < 998) {
    p.border = gj(pp.border, "None");
  }
  // color sync
  if (p.bg.n == "Sync") {
    // background sync
    p.bg.v = p.pal.v[0];
    p.frameColor = gj(pp.frameColor, "Dark");
  } else if (p.bg.n == "Light") {
    p.frameColor = gj(pp.frameColor, "Dark");
  } else if (p.bg.n == "Dark") {
    p.frameColor = gj(pp.frameColor, "Light");
  }
  if (printsBal > 998) {
    p.prints = gj(pp.prints, "Member");
    p.frameColor = gj(pp.frameColor, "Sync");
    p.frameColor.v = p.pal.v[1];
    p.plcmt = gj(pp.plcmt, "Inset");
  }

  // bg: [
  //     { w: 0, n: "None", v: cb },
  //     { w: 3, n: "Light", v: cw },
  //     { w: 9, n: "Dark", v: cb },
  //     { w: 1, n: "Sync", v: 0 },
  // ],
  // frameColor: [
  //     { w: 1, n: "None", v: cb },
  //     { w: 1, n: "Light", v: cw },
  //     { w: 1, n: "Dark", v: cb },
  //     { w: 1, n: "Sync", v: 0 },
  // ],

  if (p.pal.n == "Darkness") {
    p.bg = gj(pp.bg, "Dark");
  }

  if (p.pal.n == "Light") {
    p.bg = gj(pp.bg, "Light");
  }

  if (p.xFiles.v) {
    p.pal = gj(pp.pal, "Darkness");
    p.plcmt = gj(pp.plcmt, "Full Bleed");
    p.ms.n = "Warp Speed";
    p.ms.v = 1;
    p.ctgry.n = "Intergalactic";
  }

  for (let i = 0; i < p.pal.v.length; i++) p.pal.v[i] = hex3to6(p.pal.v[i]); // convert #123 to #112233
  // if (p.cThk.v >= 0.01 && )

  let pFeatures = {
    "Glyph Type": p.glyph.n,
    Placement: p.plcmt.n,
    "Border Type": p.border.n,
    Format: p.numUp.n,
    Thickness: p.cThk.n,
    Distortion: p.gBlur.n,
    Background: p.bg.n,
    Speed: p.ms.n,
    "Sub Layers": p.bgBlur.n,
    Zoom: p.zoom.n,
    "Zoom Movement": p.zoomMove.n,
    Delta: p.spread.n,
    Direction: p.direction.n,
    Phase: p.phase.n,
    Center: p.ct.n,
    "Palette Depth": p.cRep.n,
    Prophecy: p.prophecy.v,
    Category: p.ctgry.n,
    Prints: p.prints.n,
    Colors: p.pal.n,
  };

  return pFeatures;
}
