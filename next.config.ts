import type { NextConfig } from "next";

const legacyMenus = [
  { route: "/food", ids: ["burger", "fries", "fried-chicken", "nuggets"] },
  { route: "/drinks/canned", ids: ["coca-cola", "royal", "sprite", "mountain-dew"] },
  { route: "/drinks/sweets", ids: ["chocolate-smoothie", "vanilla-smoothie", "mocha-frappe", "cookies-and-cream-frappe"] },
  { route: "/drinks/burstDrinks", ids: ["citrus-burst", "yellow-citrus", "clear-spartan"] },
];

const config: NextConfig = {
  async redirects() {
    return [
      { source: "/foodCart", destination: "/cart", permanent: true },
      { source: "/drinks", destination: "/#menu", permanent: true },
      ...legacyMenus.flatMap(({ route, ids }) => ids.map((id, index) => ({
        source: `${route}/${index + 1}`,
        destination: `/menu/${id}`,
        permanent: true,
      }))),
    ];
  },
};

export default config;
