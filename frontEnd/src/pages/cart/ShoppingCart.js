import React, { useEffect, useState } from "react";
import "../../assets/style/cart/cart.css";
import "../../assets/style/responsiveCss/resShoppingCart.css";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { RoleContext } from "../../context/RoleContext";

import axios from "axios";
import { CheckOut } from "./CheckOut";
export const ShoppingCart = () => {
    const [checkCheckOut, setCheckCheckOut] = useState(false);
    const { cartOrigin, fncSetCartOrigin, deleteItemToCart } =
        useContext(CartContext);
    const { isIdUser } = useContext(RoleContext);
    const totalPrice = cartOrigin.length
        ? cartOrigin.reduce((acc, curr) => {
              const value = parseInt(
                  curr.course_price.replace(".", "").replace("đ", ""),
                  10
              );
              return acc + value;
          }, 0)
        : "";
    const handleFormatNumber = (number) => {
        // convert to string
        let strNumber = String(number);

        // reverse
        strNumber = strNumber.split("").reverse().join("");

        // create arr save
        let formattedArr = [];

        for (let i = 0; i < strNumber.length; i++) {
            if (i % 3 === 0 && i !== 0) {
                formattedArr.push(".");
            }
            formattedArr.push(strNumber[i]);
        }

        // convert reverse -> to origin
        formattedArr = formattedArr.reverse();

        // add đ end
        const formattedNumber = formattedArr.join("") + "đ";
        return formattedNumber;
    };
    const [checkhandle, setcheckHandle] = useState(false);
    const [price, setPrice] = useState("");
    useEffect(() => {
        setPrice(handleFormatNumber(totalPrice));
    }, [cartOrigin, checkhandle]);

    // config price course
    function formatCurrency(input) {
        const numberWithCommas = input
            .replace(/[,.đ]/g, "")
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return numberWithCommas === "free"
            ? numberWithCommas
            : numberWithCommas + "đ";
    }
    return (
        <main>
            {checkCheckOut ? (
                <CheckOut
                    totalPrice={price}
                    data={cartOrigin}
                    checkCheckOut={checkCheckOut}
                    setCheckCheckOut={setCheckCheckOut}
                    fncSetCartOrigin={fncSetCartOrigin}
                />
            ) : (
                <div className="container-cart_course">
                    {cartOrigin.length ? (
                        <>
                            <h1 className="title_container-cart">
                                Giỏ hàng ({cartOrigin.length} khóa học)
                            </h1>
                            <div className="container-cart_check-out-cart">
                                <div className="container-cart">
                                    <div className="header-container_cart"></div>
                                    <hr />
                                    {cartOrigin.map((data) => {
                                        return (
                                            <>
                                                <div className="info_course-cart">
                                                    <div className="image_price-course">
                                                        <div className="image_course-cart">
                                                            <img
                                                                src={`${data.image_course}`}
                                                                alt=""
                                                            />
                                                        </div>
                                                        <div className="info-title-course-author">
                                                            <span className="info-title_course">
                                                                {
                                                                    data.course_name
                                                                }
                                                            </span>
                                                            <span className="author-course_cart">
                                                                Giảng viên:{" "}
                                                                {data.user_name}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="price_delete-el_cart">
                                                        <div className="price-course_info">
                                                            {formatCurrency(
                                                                data.course_price
                                                            )}
                                                        </div>
                                                        <button
                                                            onClick={async (
                                                                event
                                                            ) => {
                                                                event.preventDefault();
                                                                try {
                                                                    const response =
                                                                        await axios.delete(
                                                                            `${process.env.REACT_APP_URL_BACKEND}/course/deleteCourseCartAPI?idCourse=${data.course_id}&id_user=${isIdUser}`
                                                                        );
                                                                    setcheckHandle(
                                                                        !checkhandle
                                                                    );
                                                                    deleteItemToCart(
                                                                        data.course_id
                                                                    );
                                                                } catch (error) {}
                                                            }}
                                                        >
                                                            <span class="bnt-delete-cartitem material-symbols-outlined">
                                                                close
                                                            </span>
                                                        </button>
                                                    </div>
                                                </div>
                                                <hr />
                                            </>
                                        );
                                    })}
                                </div>
                                {cartOrigin.length ? (
                                    <>
                                        <div className="pay-cart_course pay-cart_course-all">
                                            <p>Tổng :</p>
                                            <h2>{price}</h2>
                                            <button
                                                onClick={(event) => {
                                                    event.preventDefault();
                                                    setCheckCheckOut(
                                                        !checkCheckOut
                                                    );
                                                }}
                                            >
                                                Thanh toán
                                            </button>
                                        </div>
                                        <div className="pay-cart_course pay-cart_course-mobile">
                                            <p>Tổng :</p>
                                            <h2>{price}</h2>
                                            <button
                                                onClick={(event) => {
                                                    event.preventDefault();
                                                    setCheckCheckOut(
                                                        !checkCheckOut
                                                    );
                                                }}
                                            >
                                                Thanh toán
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    ""
                                )}
                            </div>
                        </>
                    ) : (
                        <>
                            <div
                                style={{
                                    textAlign: "center",
                                    width: "100%",
                                }}
                            >
                                <img
                                    style={{ width: "400px" }}
                                    src="/pngwing.com.png"
                                    alt="cart empty"
                                    className="img-cart-empty"
                                />
                                <h2>Không Có Gì Trong Giỏ Hàng Cả</h2>
                            </div>
                        </>
                    )}
                </div>
            )}
        </main>
    );
};
