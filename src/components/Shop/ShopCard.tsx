import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { Link } from "react-router-dom";

interface props {
    key: any;
    productId: string;
    productName: string;
    productImg: string;
    productPrice: number;
}

function ShopCard({ productId, productName, productImg, productPrice }: props) {
    return (
        <Link to={`/shop/${productId}`}>
            <div className="p-5 shadow-sm hover:shadow-md relative">
                <div className="overflow-hidden h-60">
                    <img src={productImg} alt="img" className="h-full" />
                </div>
                <div className="mt-4">
                    <h2 className="font-sans">{productName}</h2>
                    <div>
                        <h2 className="text-2xl">${productPrice}</h2>
                        <h2 className="font-sans mt-5">Shiping to Bangladesh</h2>
                    </div>

                </div>
            </div>
        </Link>
    )
}

export default ShopCard