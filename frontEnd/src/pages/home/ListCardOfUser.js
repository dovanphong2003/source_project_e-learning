import { ProductCart } from "../../components/card/ProductCart";
import "../../assets/style/HomePage/contentMain.css";
export const ListCardOfUser = () => {
    return (
        <div className="content-main_homePage">
            <div className="list-course_best-seller">
                <ProductCart courseHaveBuy={true} />
                <ProductCart courseHaveBuy={true} />
                <ProductCart courseHaveBuy={true} />
                <ProductCart courseHaveBuy={true} />
            </div>
        </div>
    );
};
