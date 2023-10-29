import { SingleProduct } from "@/components/SingleProduct";
import { getProducts } from "@/helpers/getProducts"
import { Products } from "@/components/Products";

type Props = {
    params: {
        id: string;
    };
};

const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export async function generateMetadata({ params }: Props) {
    const product = await getProducts(`?_id=${params.id}`);
    const capitalizedName = capitalizeFirstLetter(product.name); 

    return {
        title: `${capitalizedName} | Ecommerce Template`,
        description: product.description,   
    };
}

const ProductPage = async ({ params }: Props) => {
    const product = await getProducts(`?_id=${params.id}`);

    const randomProducts = await getProducts(`?random=${params.id}`);

    return (
        <section>
            <SingleProduct product={product} />

            <h2 className="random-section-h2">YOU MIGHT ALSO LIKE...</h2>

            <Products
                products={randomProducts}
                extraClassname={"colums-mobile"}
            />
        </section>
    );
};

export default ProductPage;