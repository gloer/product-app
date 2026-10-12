import "./productPage.css";
import ProductsComponent from "@/components/ProductsComponent/ProductsComponent";
import { ReactNode } from "react";
import Pagination from "@/components/Pagination/Pagination";
import Link from "next/link";

const PRODUCTS_PER_PAGE = 20;
const PRODUCTS_API = "https://dummyjson.com/products";

type Props = {
    searchParams: Promise<{ page?: string }>
}

export default async function ProductsPage(
    { searchParams }: Props
) {

    const { page } = await searchParams;

    let pageNum = 1;

    if (page != undefined) {
        pageNum = parseInt(page);
    }

    const numSkip = (pageNum - 1) * PRODUCTS_PER_PAGE;

    const response = await
        fetch(`${PRODUCTS_API}?limit=${PRODUCTS_PER_PAGE}&skip=${numSkip}`);

    if (!response.ok) {
        throw new Error("Something wrent wrong fetching data");
    }

    const { products, skip, total, limit } = await response.json();
    //const products: Products = data.products;

    const heading: ReactNode = (
        <h1>Our products {pageNum}</h1>
    );

    return (
        <>
            <ProductsComponent products={products} heading={heading} />
            <Pagination>
                <>
                    {
                        pageNum > 1 &&
                        <Link
                            href={`/products/?page=${pageNum - 1}`}
                            className="previousLink">
                            Previous
                        </Link>
                    }
                    {
                        skip + limit < total &&
                        <Link
                            href={`/products/?page=${pageNum + 1}`}
                            className="nextLink">
                            Next
                        </Link>
                    }
                </>

            </Pagination>
        </>
    );
}