import { Menu } from "@/components/menu";
import { BurgerAssembly } from "@/components/burger-assembly";
import { ProductPhoto } from "@/components/product-photo";
import { menuItemId } from "@/lib/catalog";
import { getProducts, isDemo } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function Home() {
  const products = await getProducts();
  const burger = products.find(({ id, image_path }) => id === "burger" && image_path === "/assets/burger.jpg");
  const featured = ["burger", "fried-chicken", "fries", "mocha-frappe"]
    .map((id) => products.find((product) => product.id === id))
    .filter((product) => product !== undefined);

  return (
    <main id="main-content">
      <section className="hero" aria-labelledby="hero-title">
        <div className="wrap hero-inner">
          <div className="hero-copy">
            {isDemo && <p className="demo-label">Demo storefront</p>}
            <h1 id="hero-title">Burgers, sides <br className="hero-break" />& cold drinks.</h1>
            <p className="hero__lead">Put together a meal with fried chicken, crispy fries and your choice of soda, smoothie or frappe.</p>
            <a className="button hero-action" href="#menu">Browse the menu <span aria-hidden="true">↓</span></a>
          </div>
          {featured.length > 0 && (
            <div className="hero-photos">
              {featured.map((product, index) => (
                <a className="hero-photo" key={product.id} href={`#${menuItemId(product.id)}`}
                  aria-label={`Find ${product.name} on the menu`}>
                  <ProductPhoto product={product} decorative preload={index === 0} eager sizes="(max-width: 700px) 44vw, (max-width: 1400px) 23vw, 300px" />
                </a>
              ))}
            </div>
          )}
        </div>
      </section>
      {burger && <BurgerAssembly burger={burger} />}
      <Menu products={products} />
    </main>
  );
}
