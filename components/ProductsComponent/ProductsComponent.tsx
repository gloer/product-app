import "./ProductsComponent.css";
import { Products } from "@/types/types";
import ProductComponent from "../ProductComponent/ProductComponent";
import { ReactNode } from "react";



type Props = {
    products: Products;
    heading: ReactNode;
}

export default async function ProductsComponent({ products, heading }: Props) {
    if (process.env.NODE_ENV === "development") {
        await new Promise((resolve) => setTimeout(resolve, 2000));
    }
    return (
        <>
            {heading}
            <section className="products">
                {
                    products.map(product => (

                        <ProductComponent
                            product={product}
                            key={product.id}
                        />

                    ))
                }
            </section>
        </>
    );
}