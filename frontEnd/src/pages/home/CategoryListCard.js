import { ProductCart } from "../../components/card/ProductCart";
import "../../assets/style/HomePage/contentMain.css";
export const CategoryListCard = ({ data, title }) => {
    return (
        <div className="content-main_homePage">
            <h2>{title}</h2>
            <div className="list-course_best-seller">
                {data
                    ? data.map((data) => {
                          return <ProductCart data={data} />;
                      })
                    : ""}
            </div>
        </div>
    );
};
