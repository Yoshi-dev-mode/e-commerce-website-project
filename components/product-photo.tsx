import Image from "next/image";
import type { Product } from "@/lib/catalog";

const imageSizes: Record<string, [number, number]> = {
  "/assets/citrus-burst.png": [500, 500],
  "/assets/clearDrink.jpg": [506, 207],
  "/assets/yellowDrink.jpg": [501, 207],
};

export function ProductPhoto({ product, preload = false, eager = false, decorative = false, sizes }: {
  product: Product;
  preload?: boolean;
  eager?: boolean;
  decorative?: boolean;
  sizes: string;
}) {
  const [width, height] = imageSizes[product.image_path] ?? [239, 228];
  return <Image src={product.image_path} alt={decorative ? "" : product.name}
    width={width} height={height} sizes={sizes} preload={preload}
    loading={preload ? undefined : eager ? "eager" : "lazy"}
    data-source="client" data-subject={product.name}
    data-fit={product.category === "Canned drinks" ? "contain" : undefined} />;
}
