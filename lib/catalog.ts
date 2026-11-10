export type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  image_path: string;
  price_cents: number;
  sort_order: number;
};

export const money = (cents: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);

export const maxQuantity = 20;
export const maxCartLines = 20;

export const menuItemId = (id: string) => `menu-item-${id}`;
