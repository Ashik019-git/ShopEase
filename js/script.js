/* =====================================================
   SHOPEASE JAVASCRIPT
   ===================================================== */


/* =====================================================
   PRODUCTS
   ===================================================== */

const products = [

    {
        id: 1,
        name: "Classic T-Shirt",
        price: 799,
        category: "Fashion",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"
    },

    {
        id: 2,
        name: "Running Shoes",
        price: 1999,
        category: "Shoes",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
    },

    {
        id: 3,
        name: "Classic Watch",
        price: 2499,
        category: "Watches",
        image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d"
    },

    {
        id: 4,
        name: "Travel Backpack",
        price: 1499,
        category: "Bags",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62"
    },

    {
        id: 5,
        name: "Denim Jacket",
        price: 1899,
        category: "Fashion",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5"
    },

    {
        id: 6,
        name: "Casual Sneakers",
        price: 1799,
        category: "Shoes",
        image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77"
    },

    {
        id: 7,
        name: "Smart Watch",
        price: 2999,
        category: "Watches",
        image: "https://images.unsplash.com/photo-1544117519-31a4b719223d"
    },

    {
        id: 8,
        name: "Leather Bag",
        price: 2199,
        category: "Bags",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62"
    }

];


/* =====================================================
   SHOW PRODUCTS
   ===================================================== */

function displayProducts(productList) {

    const productContainer =
        document.getElementById("productContainer");


    if (!productContainer) {
        return;
    }


    productContainer.innerHTML = "";


    productList.forEach(function(product) {

        const productCard =
            document.createElement("div");


        productCard.className =
            "product-card";


       productCard.innerHTML = `

    <img
        src="${product.image}"
        alt="${product.name}"
        class="product-image"
        onclick="openProduct(${product.id})"
        style="cursor: pointer;"
    >

    <div class="product-info">

        <p>${product.category}</p>

        <h3
            onclick="openProduct(${product.id})"
            style="cursor: pointer;"
        >
            ${product.name}
        </h3>

        <p class="product-price">
            ₹${product.price}
        </p>

        <button
            class="add-cart-button"
            onclick="addToCart(${product.id})"
        >
            Add to Cart
        </button>
        <button class="wishlist-button" onclick="addToWishlist(${product.id})">
    ♡ Wishlist
</button>

    </div>

`;


        productContainer.appendChild(productCard);

    });

}


/* =====================================================
   SEARCH PRODUCTS
   ===================================================== */

function searchProducts() {

    const searchInput =
        document.getElementById("searchInput");


    if (!searchInput) {
        return;
    }


    const searchText =
        searchInput.value.toLowerCase().trim();


    const filteredProducts =
        products.filter(function(product) {

            return (
                product.name
                    .toLowerCase()
                    .includes(searchText)
                ||
                product.category
                    .toLowerCase()
                    .includes(searchText)
            );

        });


    displayProducts(filteredProducts);

}


/* Search while typing */

const searchInput =
    document.getElementById("searchInput");


if (searchInput) {

    searchInput.addEventListener(
        "input",
        searchProducts
    );

}


/* =====================================================
   CART
   ===================================================== */

function getCart() {

    const cart =
        localStorage.getItem("cart");


    if (cart) {

        return JSON.parse(cart);

    }


    return [];

}


function saveCart(cart) {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}


function addToCart(productId) {

    const cart = getCart();


    const product =
        products.find(function(item) {

            return item.id === productId;

        });


    if (!product) {
        return;
    }


    cart.push(product);


    saveCart(cart);


    updateCartCount();


    alert(
        product.name +
        " added to cart!"
    );

}


function updateCartCount() {

    const cartCount =
        document.getElementById("cartCount");


    if (!cartCount) {
        return;
    }


    const cart = getCart();


    cartCount.textContent =
        cart.length;

}


/* =====================================================
   LOGIN / ACCOUNT
   ===================================================== */

function createAccount() {

    const email =
        prompt("Enter your email:");


    const password =
        prompt("Create your password:");


    if (!email || !password) {

        alert(
            "Please enter both email and password."
        );

        return;
    }


    const user = {

        email: email,

        password: password

    };


    localStorage.setItem(
        "user",
        JSON.stringify(user)
    );


    alert(
        "Account created successfully!"
    );

}


/* =====================================================
   LOGIN FORM
   ===================================================== */

const loginForm =
    document.getElementById("loginForm");


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const email =
                document.getElementById("email")
                .value
                .trim();


            const password =
                document.getElementById("password")
                .value;


            const rememberMe =
                document.getElementById("rememberMe");


            const message =
                document.getElementById("loginMessage");


            const storedUser =
                JSON.parse(
                    localStorage.getItem("user")
                );


            if (!storedUser) {

                message.textContent =
                    "No account found. Please create an account first.";

                message.style.color =
                    "red";

                return;

            }


            if (
                storedUser.email === email &&
                storedUser.password === password
            ) {

                const loggedInUser = {

                    email: email

                };


                if (rememberMe.checked) {

                    localStorage.setItem(
                        "loggedInUser",
                        JSON.stringify(loggedInUser)
                    );

                    sessionStorage.removeItem(
                        "loggedInUser"
                    );

                } else {

                    sessionStorage.setItem(
                        "loggedInUser",
                        JSON.stringify(loggedInUser)
                    );

                    localStorage.removeItem(
                        "loggedInUser"
                    );

                }


                message.textContent =
                    "Login successful!";

                message.style.color =
                    "green";


                setTimeout(function() {

                    window.location.href =
                        "index.html";

                }, 1000);

            } else {

                message.textContent =
                    "Invalid email or password.";

                message.style.color =
                    "red";

            }

        }
    );

}


/* =====================================================
   GET CURRENT USER
   ===================================================== */

function getCurrentUser() {

    const rememberedUser =
        localStorage.getItem("loggedInUser");


    if (rememberedUser) {

        return JSON.parse(
            rememberedUser
        );

    }


    const sessionUser =
        sessionStorage.getItem("loggedInUser");


    if (sessionUser) {

        return JSON.parse(
            sessionUser
        );

    }


    return null;

}


/* =====================================================
   UPDATE LOGIN LINK
   ===================================================== */

function updateLoginLink() {

    const loginLink =
        document.getElementById("loginLink");


    if (!loginLink) {
        return;
    }


    const currentUser =
        getCurrentUser();


    if (currentUser) {

        loginLink.textContent =
            "👤 " + currentUser.email;


        loginLink.href = "#";


        loginLink.onclick =
            function(event) {

                event.preventDefault();

                logout();

            };

    }

}


/* =====================================================
   LOGOUT
   ===================================================== */

function logout() {

    localStorage.removeItem(
        "loggedInUser"
    );


    sessionStorage.removeItem(
        "loggedInUser"
    );


    alert(
        "You have been logged out."
    );


    window.location.reload();

}


/* =====================================================
   RUN WHEN PAGE LOADS
   ===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        displayProducts(products);

        updateCartCount();

        updateLoginLink();

    }
);
/* =====================================================
   CART PAGE
   ===================================================== */

function displayCart() {

    const cartContainer =
        document.getElementById("cartContainer");

    const cartSummary =
        document.getElementById("cartSummary");


    if (!cartContainer) {
        return;
    }


    const cart = getCart();


    /* Empty Cart */

    if (cart.length === 0) {

        cartContainer.innerHTML = `

            <div class="empty-cart">

                <h2>
                    Your cart is empty
                </h2>

                <p>
                    You haven't added any products yet.
                </p>

                <a href="index.html#products">
                    Start Shopping
                </a>

            </div>

        `;


        cartSummary.innerHTML = "";

        return;
    }


    cartContainer.innerHTML = "";


    /* Count quantities */

    const quantities = {};


    cart.forEach(function(product) {

        if (quantities[product.id]) {

            quantities[product.id]++;

        } else {

            quantities[product.id] = 1;

        }

    });


    /* Display products */

    Object.keys(quantities).forEach(function(productId) {

        const product =
            products.find(function(item) {

                return item.id === Number(productId);

            });


        if (!product) {
            return;
        }


        const quantity =
            quantities[productId];


        const cartItem =
            document.createElement("div");


        cartItem.className =
            "cart-item";


        cartItem.innerHTML = `

            <img
                src="${product.image}"
                alt="${product.name}"
                class="cart-item-image"
            >


            <div class="cart-item-info">

                <h3>
                    ${product.name}
                </h3>

                <p class="cart-item-category">
                    ${product.category}
                </p>

                <p class="cart-item-price">
                    ₹${product.price}
                </p>

            </div>


            <div class="quantity-controls">

                <button
                    class="quantity-button"
                    onclick="decreaseQuantity(${product.id})"
                >
                    -
                </button>

                <span class="quantity-number">
                    ${quantity}
                </span>

                <button
                    class="quantity-button"
                    onclick="increaseQuantity(${product.id})"
                >
                    +
                </button>

            </div>


            <button
                class="remove-button"
                onclick="removeFromCart(${product.id})"
            >
                Remove
            </button>

        `;


        cartContainer.appendChild(cartItem);

    });


    /* Calculate total */

    let total = 0;


    Object.keys(quantities).forEach(function(productId) {

        const product =
            products.find(function(item) {

                return item.id === Number(productId);

            });


        if (product) {

            total +=
                product.price *
                quantities[productId];

        }

    });


    cartSummary.innerHTML = `

        <h2>
            Order Summary
        </h2>

        <p class="cart-total">
            Total: ₹${total}
        </p>

        <a
            href="#"
            class="checkout-button"
            onclick="checkout()"
        >
            Proceed to Checkout
        </a>

    `;

}


/* =====================================================
   INCREASE QUANTITY
   ===================================================== */

function increaseQuantity(productId) {

    const cart = getCart();


    const product =
        products.find(function(item) {

            return item.id === productId;

        });


    if (!product) {
        return;
    }


    cart.push(product);


    saveCart(cart);


    displayCart();

    updateCartCount();

}


/* =====================================================
   DECREASE QUANTITY
   ===================================================== */

function decreaseQuantity(productId) {

    const cart = getCart();


    const index =
        cart.findIndex(function(product) {

            return product.id === productId;

        });


    if (index !== -1) {

        cart.splice(index, 1);

    }


    saveCart(cart);


    displayCart();

    updateCartCount();

}


/* =====================================================
   REMOVE PRODUCT
   ===================================================== */

function removeFromCart(productId) {

    const cart =
        getCart().filter(function(product) {

            return product.id !== productId;

        });


    saveCart(cart);


    displayCart();

    updateCartCount();

}


/* =====================================================
   CHECKOUT
   ===================================================== */


function checkout() {

    const currentUser = getCurrentUser();

    if (!currentUser) {

        alert("Please sign in before checkout.");

        window.location.href = "login.html";

        return;
    }

    const cart = getCart();

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;
    }

    window.location.href = "checkout.html";
}


/* =====================================================
   LOAD CART PAGE
   ===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        displayCart();

    }
);
    /* =====================================================
   OPEN PRODUCT DETAILS
   ===================================================== */

function openProduct(productId) {

    window.location.href = "product.html?id=" + productId;

}
/* =====================================================
   DISPLAY PRODUCT DETAILS
   ===================================================== */

function displayProductDetails() {

    const productDetails =
        document.getElementById("productDetails");

    if (!productDetails) {
        return;
    }

    const urlParams =
        new URLSearchParams(window.location.search);

    const productId =
        Number(urlParams.get("id"));

    const product =
        products.find(function(item) {
            return item.id === productId;
        });

    if (!product) {

        productDetails.innerHTML = `
            <h2>Product not found</h2>

            <a href="index.html">
                Back to Shopping
            </a>
        `;

        return;
    }

    productDetails.innerHTML = `

        <div class="product-details-card">

            <div class="product-details-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

            </div>


            <div class="product-details-info">

                <p class="product-details-category">
                    ${product.category}
                </p>

                <h1>
                    ${product.name}
                </h1>

                <h2 class="product-details-price">
                    ₹${product.price}
                </h2>

                <p class="product-description">
                    This is a high-quality
                    ${product.name}
                    from our
                    ${product.category}
                    collection.
                    Perfect for everyday use.
                </p>


                <button
                    class="add-cart-button"
                    onclick="addToCart(${product.id})"
                >
                    Add to Cart
                </button>


                <button
                    class="buy-now-button"
                    onclick="buyNow(${product.id})"
                >
                    Buy Now
                </button>

            </div>

        </div>

    `;

}


/* =====================================================
   BUY NOW
   ===================================================== */

function buyNow(productId) {

    addToCart(productId);

    window.location.href = "cart.html";

}


/* =====================================================
   LOAD PRODUCT DETAILS PAGE
   ===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        displayProductDetails();

    }
);
/* =====================================================
   WISHLIST
   ===================================================== */

function getWishlist() {

    const wishlist =
        localStorage.getItem("wishlist");

    if (wishlist) {
        return JSON.parse(wishlist);
    }

    return [];
}


/* SAVE WISHLIST */

function saveWishlist(wishlist) {

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

}


/* ADD PRODUCT TO WISHLIST */

function addToWishlist(productId) {

    const wishlist = getWishlist();

    const product =
        products.find(function(item) {
            return item.id === productId;
        });

    if (!product) {
        return;
    }

    const alreadyAdded =
        wishlist.some(function(item) {
            return item.id === productId;
        });

    if (alreadyAdded) {

        alert("Product is already in your wishlist!");

        return;
    }

    wishlist.push(product);

    saveWishlist(wishlist);

    alert(
        product.name +
        " added to wishlist ❤️"
    );

}


/* REMOVE PRODUCT FROM WISHLIST */

function removeFromWishlist(productId) {

    const wishlist =
        getWishlist().filter(function(product) {

            return product.id !== productId;

        });

    saveWishlist(wishlist);

    displayWishlist();

}


/* DISPLAY WISHLIST */

function displayWishlist() {

    const wishlistContainer =
        document.getElementById("wishlistContainer");

    if (!wishlistContainer) {
        return;
    }

    const wishlist = getWishlist();

    if (wishlist.length === 0) {

        wishlistContainer.innerHTML = `

            <div class="empty-cart">

                <h2>
                    Your wishlist is empty ❤️
                </h2>

                <p>
                    You haven't added any products yet.
                </p>

                <a href="index.html#products">
                    Explore Products
                </a>

            </div>

        `;

        return;
    }

    wishlistContainer.innerHTML = "";


    wishlist.forEach(function(product) {

        const wishlistItem =
            document.createElement("div");

        wishlistItem.className =
            "wishlist-item";


        wishlistItem.innerHTML = `

            <img
                src="${product.image}"
                alt="${product.name}"
                class="wishlist-image"
            >

            <div class="wishlist-info">

                <p>
                    ${product.category}
                </p>

                <h2>
                    ${product.name}
                </h2>

                <h3>
                    ₹${product.price}
                </h3>


                <button
                    class="add-cart-button"
                    onclick="addToCart(${product.id})"
                >
                    Add to Cart
                </button>


                <button
                    class="remove-button"
                    onclick="removeFromWishlist(${product.id})"
                >
                    Remove
                </button>

            </div>

        `;


        wishlistContainer.appendChild(wishlistItem);

    });

}


/* LOAD WISHLIST PAGE */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        displayWishlist();

    }
);
/* =====================================================
   CHECKOUT PAGE
   ===================================================== */

function displayCheckout() {

    const checkoutItems =
        document.getElementById("checkoutItems");

    const checkoutTotal =
        document.getElementById("checkoutTotal");

    if (!checkoutItems || !checkoutTotal) {
        return;
    }

    const cart = getCart();

    if (cart.length === 0) {

        checkoutItems.innerHTML = `
            <p>Your cart is empty.</p>
        `;

        checkoutTotal.textContent = "0";

        return;
    }

    let total = 0;

    checkoutItems.innerHTML = "";

    cart.forEach(function(product) {

        total += product.price;

        const item = document.createElement("div");

        item.className = "checkout-item";

        item.innerHTML = `
            <img
                src="${product.image}"
                alt="${product.name}"
            >

            <div>
                <h3>${product.name}</h3>
                <p>${product.category}</p>
                <strong>₹${product.price}</strong>
            </div>
        `;

        checkoutItems.appendChild(item);
    });

    checkoutTotal.textContent = total;
}


/* =====================================================
   PLACE ORDER
   ===================================================== */

function placeOrder() {

    const cart = getCart();

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;
    }

    const fullName =
        document.getElementById("fullName").value;

    const phone =
        document.getElementById("phone").value;

    const address =
        document.getElementById("address").value;

    const city =
        document.getElementById("city").value;

    const pincode =
        document.getElementById("pincode").value;

    const payment =
        document.querySelector(
            'input[name="payment"]:checked'
        ).value;


    if (
        fullName === "" ||
        phone === "" ||
        address === "" ||
        city === "" ||
        pincode === ""
    ) {

        alert("Please fill all delivery details.");

        return;
    }


    const order = {

        orderId: "ORD" + Date.now(),

        customerName: fullName,

        phone: phone,

        address: address,

        city: city,

        pincode: pincode,

        payment: payment,

        products: cart,

        date: new Date().toLocaleString()
    };


    localStorage.setItem(
        "lastOrder",
        JSON.stringify(order)
    );


    localStorage.removeItem("cart");


    alert(
        "Order placed successfully! 🎉\n\n" +
        "Order ID: " +
        order.orderId
    );


    window.location.href = "index.html";
}


/* =====================================================
   CHECKOUT PAGE LOAD
   ===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        displayCheckout();

        const checkoutForm =
            document.getElementById("checkoutForm");

        if (checkoutForm) {

            checkoutForm.addEventListener(
                "submit",
                function(event) {

                    event.preventDefault();

                    placeOrder();

                }
            );
        }

    }
);