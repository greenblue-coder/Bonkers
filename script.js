
"use strict";

/* ------------------------------
   Product information
------------------------------ */

const products = [
    {
        id: 1,
        name: "Relaxed Fit Graphic T-Shirt",
        category: "Oversized T-Shirts",
        price: 999,
        oldPrice: 1299,
        badge: "NEW",
        collection: "new",
        audience: "men",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=85"
    },
    {
        id: 2,
        name: "Classic Streetwear Hoodie",
        category: "Hoodies",
        price: 1799,
        oldPrice: 2199,
        badge: "BESTSELLER",
        collection: "best",
        audience: "men",
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=700&q=85"
    },
    {
        id: 3,
        name: "Everyday Relaxed T-Shirt",
        category: "Everyday Essentials",
        price: 899,
        oldPrice: 1099,
        badge: "NEW",
        collection: "new",
        audience: "women",
        image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=700&q=85"
    },
    {
        id: 4,
        name: "Minimal Graphic Tee",
        category: "Graphic T-Shirts",
        price: 999,
        oldPrice: 1299,
        badge: "POPULAR",
        collection: "best",
        audience: "men",
        image: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=700&q=85"
    },
    {
        id: 5,
        name: "Casual Everyday Shirt",
        category: "Casual Wear",
        price: 1199,
        oldPrice: 1499,
        badge: "NEW",
        collection: "new",
        audience: "women",
        image: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=700&q=85"
    },
    {
        id: 6,
        name: "Street Style Sweatshirt",
        category: "Sweatshirts",
        price: 1599,
        oldPrice: 1899,
        badge: "POPULAR",
        collection: "best",
        audience: "men",
        image: "https://images.unsplash.com/photo-1578681994506-b8f463449011?auto=format&fit=crop&w=700&q=85"
    },
    {
        id: 7,
        name: "Relaxed Casual Outfit",
        category: "Casual Wear",
        price: 1399,
        oldPrice: 1699,
        badge: "NEW",
        collection: "new",
        audience: "women",
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=700&q=85"
    },
    {
        id: 8,
        name: "Classic Everyday Tee",
        category: "T-Shirts",
        price: 799,
        oldPrice: 999,
        badge: "BESTSELLER",
        collection: "best",
        audience: "men",
        image: "https://images.unsplash.com/photo-1527719327859-c6ce80353573?auto=format&fit=crop&w=700&q=85"
    }
];

/* ------------------------------
   Cart and wishlist data
------------------------------ */

let cart = [];
const wishlist = new Set();

/* ------------------------------
   Helper functions
------------------------------ */

function formatPrice(price) {
    return "₹" + price.toLocaleString("en-IN");
}

function showToast(message) {
    const toast = document.getElementById("toast");

    toast.textContent = message;
    toast.classList.add("active");

    clearTimeout(showToast.timer);

    showToast.timer = setTimeout(() => {
        toast.classList.remove("active");
    }, 2500);
}

/* ------------------------------
   Display product cards
------------------------------ */

function createProductCard(product) {
    const card = document.createElement("article");
    card.className = "product-card";

    card.innerHTML = `
        <div class="product-image-wrap">
            <img
                src="${product.image}"
                alt="${product.name}"
                loading="lazy"
            >

            <span class="product-badge">${product.badge}</span>

            <button
                class="wishlist-button"
                type="button"
                data-wishlist="${product.id}"
                aria-label="Add ${product.name} to wishlist"
                aria-pressed="false"
            >♡</button>

            <button
                class="quick-add"
                type="button"
                data-add="${product.id}"
            >ADD TO CART +</button>
        </div>

        <div class="product-info">
            <p class="product-name">${product.name}</p>
            <p class="product-category">${product.category}</p>

            <p class="product-price">
                ${formatPrice(product.price)}
                <del>${formatPrice(product.oldPrice)}</del>
            </p>
        </div>
    `;

    return card;
}

function renderProducts(containerId, productList) {
    const container = document.getElementById(containerId);

    if (!container) {
        return;
    }

    container.replaceChildren();

    if (productList.length === 0) {
        const message = document.createElement("p");
        message.className = "no-results";
        message.textContent = "No products found. Try another search.";
        container.appendChild(message);
        return;
    }

    productList.forEach(product => {
        container.appendChild(createProductCard(product));
    });
}

function loadProductSections() {
    renderProducts(
        "newProducts",
        products.filter(product => product.collection === "new")
    );

    renderProducts(
        "bestProducts",
        products.filter(product => product.collection === "best")
    );

    renderProducts(
        "menProducts",
        products.filter(product => product.audience === "men")
    );

    renderProducts(
        "womenProducts",
        products.filter(product => product.audience === "women")
    );
}

/* ------------------------------
   Wishlist
------------------------------ */

document.addEventListener("click", event => {
    const wishlistButton = event.target.closest("[data-wishlist]");

    if (!wishlistButton) {
        return;
    }

    const productId = Number(wishlistButton.dataset.wishlist);

    if (wishlist.has(productId)) {
        wishlist.delete(productId);
        wishlistButton.classList.remove("active");
        wishlistButton.textContent = "♡";
        wishlistButton.setAttribute("aria-pressed", "false");

        showToast("Removed from wishlist");
    } else {
        wishlist.add(productId);
        wishlistButton.classList.add("active");
        wishlistButton.textContent = "♥";
        wishlistButton.setAttribute("aria-pressed", "true");

        showToast("Added to wishlist");
    }
});

/* ------------------------------
   Add products to cart
------------------------------ */

document.addEventListener("click", event => {
    const addButton = event.target.closest("[data-add]");

    if (!addButton) {
        return;
    }

    const productId = Number(addButton.dataset.add);
    addToCart(productId);
});

function addToCart(productId) {
    const product = products.find(item => item.id === productId);

    if (!product) {
        return;
    }

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();
    showToast("Added to your cart");
}

/* ------------------------------
   Update cart display
------------------------------ */

function updateCart() {
    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const drawerCartCount = document.getElementById("drawerCartCount");
    const cartTotal = document.getElementById("cartTotal");

    const totalQuantity = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const totalPrice = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    cartCount.textContent = totalQuantity;
    drawerCartCount.textContent = totalQuantity;
    cartTotal.textContent = formatPrice(totalPrice);

    cartItems.replaceChildren();

    if (cart.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.className = "empty-cart";
        emptyMessage.textContent = "Your cart is currently empty.";

        cartItems.appendChild(emptyMessage);
        return;
    }

    cart.forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";

        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">

            <div>
                <h3>${item.name}</h3>

                <p class="item-price">
                    ${formatPrice(item.price)}
                </p>

                <div class="quantity-controls">
                    <button
                        type="button"
                        data-decrease="${item.id}"
                        aria-label="Decrease quantity"
                    >−</button>

                    <span>${item.quantity}</span>

                    <button
                        type="button"
                        data-increase="${item.id}"
                        aria-label="Increase quantity"
                    >+</button>
                </div>

                <button
                    class="remove-item"
                    type="button"
                    data-remove="${item.id}"
                >REMOVE</button>
            </div>
        `;

        cartItems.appendChild(cartItem);
    });
}

/* ------------------------------
   Change cart quantity
------------------------------ */

document.addEventListener("click", event => {
    const increaseButton = event.target.closest("[data-increase]");
    const decreaseButton = event.target.closest("[data-decrease]");
    const removeButton = event.target.closest("[data-remove]");

    if (increaseButton) {
        changeQuantity(Number(increaseButton.dataset.increase), 1);
    }

    if (decreaseButton) {
        changeQuantity(Number(decreaseButton.dataset.decrease), -1);
    }

    if (removeButton) {
        removeFromCart(Number(removeButton.dataset.remove));
    }
});

function changeQuantity(productId, amount) {
    const item = cart.find(product => product.id === productId);

    if (!item) {
        return;
    }

    item.quantity += amount;

    if (item.quantity <= 0) {
        cart = cart.filter(product => product.id !== productId);
    }

    updateCart();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);

    updateCart();
    showToast("Item removed from cart");
}

/* ------------------------------
   Open and close cart drawer
------------------------------ */

const cartDrawer = document.getElementById("cartDrawer");
const overlay = document.getElementById("overlay");

function openCart() {
    cartDrawer.classList.add("active");
    overlay.classList.add("active");
    document.body.classList.add("no-scroll");
}

function closeCart() {
    cartDrawer.classList.remove("active");
    overlay.classList.remove("active");
    document.body.classList.remove("no-scroll");
}

document.getElementById("cartButton").addEventListener("click", openCart);
document.getElementById("closeCart").addEventListener("click", closeCart);
overlay.addEventListener("click", closeCart);

/* ------------------------------
   Mobile navigation
------------------------------ */

const menuButton = document.getElementById("menuButton");
const mainNav = document.getElementById("mainNav");

menuButton.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("active");

    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.textContent = isOpen ? "✕" : "☰";
});

mainNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        mainNav.classList.remove("active");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.textContent = "☰";
    });
});

/* ------------------------------
   Search products
------------------------------ */

const searchInput = document.getElementById("searchInput");

document.getElementById("searchForm").addEventListener("submit", event => {
    event.preventDefault();

    const query = searchInput.value.trim().toLowerCase();

    if (!query) {
        showToast("Enter a product name to search");
        return;
    }

    const results = products.filter(product => {
        return (
            product.name.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query) ||
            product.audience.toLowerCase().includes(query)
        );
    });

    renderProducts("newProducts", results);

    document.getElementById("new").scrollIntoView({
        behavior: "smooth"
    });

});

/* ------------------------------
   Newsletter form
------------------------------ */

document.getElementById("newsletterForm").addEventListener("submit", event => {
    event.preventDefault();

    const emailInput = document.getElementById("emailInput");
    const message = document.getElementById("newsletterMessage");

    if (!emailInput.checkValidity()) {
        emailInput.reportValidity();
        return;
    }

    message.textContent = "Thanks for subscribing!";
    emailInput.value = "";
});

/* ------------------------------
   Account and checkout demo
------------------------------ */

document.getElementById("accountButton").addEventListener("click", () => {
    showToast("Account login is not connected in this demo");
});

document.getElementById("checkoutButton").addEventListener("click", () => {
    if (cart.length === 0) {
        showToast("Your cart is empty");
        return;
    }

    showToast("Checkout needs to be connected to a payment system");
});

/* ------------------------------
   Keyboard support
------------------------------ */

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeCart();
        mainNav.classList.remove("active");
        menuButton.textContent = "☰";
        menuButton.setAttribute("aria-expanded", "false");
    }
});

/* ------------------------------
   Start the website
------------------------------ */

loadProductSections();
updateCart();

/* Automatic hero slider */

const hero = document.querySelector(".hero");
const heroSlides = [...hero.querySelectorAll(".hero-slide")];
const heroPrevious = hero.querySelector(".hero-arrow.prev");
const heroNext = hero.querySelector(".hero-arrow.next");
const heroDots = [...hero.querySelectorAll(".hero-dot")];

let currentSlide = 0;
let heroTimer;

function showHeroSlide(index) {
    heroSlides[currentSlide].classList.remove("active");

    currentSlide = (index + heroSlides.length) % heroSlides.length;

    heroSlides[currentSlide].classList.add("active");
    heroDots.forEach((dot, dotIndex) => {
        dot.classList.toggle("active", dotIndex === currentSlide);
    });
}

function startHeroSlider() {
    clearInterval(heroTimer);

    heroTimer = setInterval(() => {
        showHeroSlide(currentSlide + 1);
    }, 4000);
}

heroNext.addEventListener("click", () => {
    showHeroSlide(currentSlide + 1);
    startHeroSlider();
});

heroPrevious.addEventListener("click", () => {
    showHeroSlide(currentSlide - 1);
    startHeroSlider();
});

heroDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        showHeroSlide(index);
        startHeroSlider();
    });
});

if (heroSlides.length > 1) {
    startHeroSlider();
}

/* Independent rotating banner below the campaign photos */
const hero2 = document.querySelector(".hero2");
const hero2Slides = [...hero2.querySelectorAll(".hero2-slide")];
const hero2Previous = hero2.querySelector(".hero2-controls .prev");
const hero2Next = hero2.querySelector(".hero2-controls .next");
const hero2Dots = [...hero2.querySelectorAll(".hero2-controls .hero-dot")];

let currentHero2Slide = 0;
let hero2Timer;

function showHero2Slide(index) {
    hero2Slides[currentHero2Slide].classList.remove("active");
    hero2Dots[currentHero2Slide].classList.remove("active");

    currentHero2Slide = (index + hero2Slides.length) % hero2Slides.length;

    hero2Slides[currentHero2Slide].classList.add("active");
    hero2Dots[currentHero2Slide].classList.add("active");
}

function startHero2Slider() {
    clearInterval(hero2Timer);
    hero2Timer = setInterval(() => {
        showHero2Slide(currentHero2Slide + 1);
    }, 4000);
}

hero2Next.addEventListener("click", () => {
    showHero2Slide(currentHero2Slide + 1);
    startHero2Slider();
});

hero2Previous.addEventListener("click", () => {
    showHero2Slide(currentHero2Slide - 1);
    startHero2Slider();
});

hero2Dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        showHero2Slide(index);
        startHero2Slider();
    });
});

if (hero2Slides.length > 1) {
    startHero2Slider();
}

const newsTrack = document.querySelector(".latest-news-grid");
const newsCards = [...newsTrack.querySelectorAll(".news-card")];
const newsDots = [...document.querySelectorAll(".news-page-dot")];

function setActiveNewsDot(index) {
    newsDots.forEach((dot, dotIndex) => {
        const isActive = dotIndex === index;
        dot.classList.toggle("active", isActive);
        if (isActive) {
            dot.setAttribute("aria-current", "true");
        } else {
            dot.removeAttribute("aria-current");
        }
    });
}

newsDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        setActiveNewsDot(index);
        if (window.matchMedia("(max-width: 760px)").matches) {
            newsCards[index].scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "start"
            });
        }
    });
});

newsTrack.addEventListener("scroll", () => {
    if (!window.matchMedia("(max-width: 760px)").matches) {
        return;
    }

    const trackLeft = newsTrack.getBoundingClientRect().left;
    const activeIndex = newsCards.reduce((closestIndex, card, index) => {
        const closestCard = newsCards[closestIndex];
        const distance = Math.abs(card.getBoundingClientRect().left - trackLeft);
        const closestDistance = Math.abs(
            closestCard.getBoundingClientRect().left - trackLeft
        );
        return distance < closestDistance ? index : closestIndex;
    }, 0);

    setActiveNewsDot(activeIndex);
});
