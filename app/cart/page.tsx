import { Cart } from "@/components/cart";
import { getProducts, isDemo } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function CartPage() {
  return <Cart products={await getProducts()} demo={isDemo} />;
}
