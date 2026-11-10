import Link from "next/link";
import { notFound } from "next/navigation";
import { AddButton } from "@/components/bag";
import { ProductPhoto } from "@/components/product-photo";
import { money } from "@/lib/catalog";
import { getProducts } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = (await getProducts()).find((item) => item.id === id);
  if (!product) notFound();

  return (
    <main id="main-content" className="wrap inner-page">
      <Link className="back-link" href="/#menu">← Back to menu</Link>
      <div className="detail">
        <div className="detail-photo"><ProductPhoto product={product} preload sizes="(max-width: 700px) 90vw, 500px" /></div>
        <div>
          <p className="product-category">{product.category}</p>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <p className="price">{money(product.price_cents)}</p>
          <AddButton id={id} name={product.name} />
        </div>
      </div>
    </main>
  );
}
