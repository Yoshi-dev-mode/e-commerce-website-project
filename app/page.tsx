import { Menu } from "@/components/menu";
import { BurgerAssembly } from "@/components/burger-assembly";
import { DrinksHero } from "@/components/drinks-hero";
import { getProducts, isDemo } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function Home() {
  const products = await getProducts();
  const burger = products.find(({ id, image_path }) => id === "burger" && image_path === "/assets/burger.jpg");
  return (
    <main id="main-content">
      <DrinksHero demo={isDemo} />
      {burger && <BurgerAssembly burger={burger} />}
      <Menu products={products} />
    </main>
  );
}
