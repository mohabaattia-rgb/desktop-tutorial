/* =====================================================
   NAVBAR
===================================================== */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 40) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

/* =====================================================
   MOBILE MENU
===================================================== */

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("show");

  const icon = menuBtn.querySelector("i");

  if (navLinks.classList.contains("show")) {
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-xmark");
  } else {
    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");
  }
});

/* =====================================================
   ACTIVE NAV LINK
===================================================== */

const sections = document.querySelectorAll("section[id]");
const links = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      current = section.getAttribute("id");
    }
  });

  links.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

/* =====================================================
   CATEGORY FILTER
===================================================== */

const categoryButtons = document.querySelectorAll(".category");

const foodCards = document.querySelectorAll(".food-card");

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    categoryButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    const category = button.dataset.category;

    foodCards.forEach((card) => {
      const cardCategory = card.dataset.category;

      if (category === "all" || cardCategory === category) {
        card.style.display = "block";

        setTimeout(() => {
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";
        }, 20);
      } else {
        card.style.opacity = "0";
        card.style.transform = "translateY(10px)";

        setTimeout(() => {
          card.style.display = "none";
        }, 250);
      }
    });
  });
});

/* =====================================================
   FAVORITE
===================================================== */

const hearts = document.querySelectorAll(".heart");

hearts.forEach((heart) => {
  heart.addEventListener("click", () => {
    const icon = heart.querySelector("i");

    icon.classList.toggle("fa-regular");
    icon.classList.toggle("fa-solid");

    heart.classList.toggle("liked");
  });
});

/* =====================================================
   CART
===================================================== */

const cartBtn = document.querySelector(".cart-btn");

const cartPanel = document.querySelector(".cart-panel");

const closeCart = document.querySelector(".close-cart");

const cartOverlay = document.querySelector(".cart-overlay");

const cartItems = document.querySelector(".cart-items");

const cartCount = document.querySelector(".cart-count");

const cartTotal = document.querySelector(".cart-total");

let cart = [];

/* OPEN CART */

cartBtn.addEventListener("click", openCart);

function openCart() {
  cartPanel.classList.add("open");

  cartOverlay.classList.add("show");
}

/* CLOSE CART */

closeCart.addEventListener("click", closeCartPanel);

cartOverlay.addEventListener("click", closeCartPanel);

function closeCartPanel() {
  cartPanel.classList.remove("open");

  cartOverlay.classList.remove("show");
}

/* ADD TO CART */

const addButtons = document.querySelectorAll(".add-cart");

addButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const name = button.dataset.name;

    const price = Number(button.dataset.price);

    const existing = cart.find((item) => item.name === name);

    if (existing) {
      existing.quantity++;
    } else {
      cart.push({
        name,
        price,
        quantity: 1,
      });
    }

    updateCart();

    openCart();
  });
});

/* UPDATE CART */

function updateCart() {
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty 🍕
            </p>
        `;
  }

  let total = 0;
  let count = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    count += item.quantity;

    const div = document.createElement("div");

    div.classList.add("cart-item");

    div.innerHTML = `

            <div>

                <h4>
                    ${item.name}
                    × ${item.quantity}
                </h4>

                <p>
                    $${(item.price * item.quantity).toFixed(2)}
                </p>

            </div>

            <button
                class="remove-item"
                data-index="${index}"
            >
                <i class="fa-solid fa-trash"></i>
            </button>

        `;

    cartItems.appendChild(div);
  });

  cartCount.textContent = count;

  cartTotal.textContent = total.toFixed(2);

  /* REMOVE */

  document.querySelectorAll(".remove-item").forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.index);

      cart.splice(index, 1);

      updateCart();
    });
  });
}

/* =====================================================
   CHECKOUT
===================================================== */

const checkoutBtn = document.querySelector(".checkout-btn");

checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty!");

    return;
  }

  alert("Thank you for your order! 🍕");
});

/* =====================================================
   CONTACT FORM
===================================================== */

const contactForm = document.querySelector(".contact-form");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  alert("Your message has been sent successfully!");

  contactForm.reset();
});

/* =====================================================
   NEWSLETTER
===================================================== */

const newsletter = document.querySelector(".newsletter form");

newsletter.addEventListener("submit", (e) => {
  e.preventDefault();

  alert("You're subscribed! 🔥");

  newsletter.reset();
});
