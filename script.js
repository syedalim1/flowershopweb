
    // Shopping Cart Functionality
    document.addEventListener('DOMContentLoaded', function() {
      const cartBtn = document.getElementById('cart-btn');
    const closeCart = document.querySelector('.close-cart');
    const cartOverlay = document.querySelector('.cart-overlay');
    const cartContainer = document.querySelector('.cart-container');
    const cartItems = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total span');
    const cartCount = document.querySelector('.cart-count');
    const addToCartBtns = document.querySelectorAll('.cart-btn');
    const checkoutBtn = document.querySelector('.checkout-btn');

    let cart = [];
    let total = 0;

    // Open cart
    cartBtn.addEventListener('click', function(e) {
        e.preventDefault();
    cartOverlay.classList.add('active');
    cartContainer.classList.add('active');
      });

    // Close cart
    closeCart.addEventListener('click', function() {
        cartOverlay.classList.remove('active');
    cartContainer.classList.remove('active');
      });

    cartOverlay.addEventListener('click', function() {
        cartOverlay.classList.remove('active');
    cartContainer.classList.remove('active');
      });

      // Add to cart
      addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const productBox = this.closest('.box');
            const productImg = productBox.querySelector('img').src;
            const productName = productBox.querySelector('h3').textContent;
            const productPrice = productBox.querySelector('.price').textContent.replace('₹', '');

            // Check if product already in cart
            const existingItem = cart.find(item => item.name === productName);

            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({
                    img: productImg,
                    name: productName,
                    price: parseInt(productPrice),
                    quantity: 1
                });
            }

            updateCart();
            showToast(productName + ' added to cart!');
        });
      });

    // Update cart
    function updateCart() {
        cartItems.innerHTML = '';
    total = 0;
    let itemCount = 0;
        
        cart.forEach(item => {
        total += item.price * item.quantity;
    itemCount += item.quantity;

    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
    <img src="${item.img}" alt="${item.name}">
        <div class="cart-item-details">
            <h4>${item.name}</h4>
            <div class="price">₹${item.price}</div>
            <div class="cart-item-quantity">
                <button class="quantity-btn minus">-</button>
                <span class="quantity-value">${item.quantity}</span>
                <button class="quantity-btn plus">+</button>
            </div>
        </div>
        <button class="remove-item"><i class="fas fa-trash"></i></button>
        `;

        cartItems.appendChild(cartItem);

        // Quantity buttons
        const minusBtn = cartItem.querySelector('.minus');
        const plusBtn = cartItem.querySelector('.plus');
        const removeBtn = cartItem.querySelector('.remove-item');

        minusBtn.addEventListener('click', function() {
            if (item.quantity > 1) {
            item.quantity--;
        updateCart();
            }
          });

        plusBtn.addEventListener('click', function() {
            item.quantity++;
        updateCart();
          });

        removeBtn.addEventListener('click', function() {
            cart = cart.filter(cartItem => cartItem.name !== item.name);
        updateCart();
          });
        });

        cartTotal.textContent = '₹' + total;
        cartCount.textContent = itemCount;
      }

        // Checkout
        checkoutBtn.addEventListener('click', function() {
        if (cart.length === 0) {
            showToast('Your cart is empty!');
        return;
        }

        showToast('Order placed successfully!');
        cart = [];
        updateCart();
        
        setTimeout(() => {
            cartOverlay.classList.remove('active');
        cartContainer.classList.remove('active');
        }, 1500);
      });

        // Toast notification
        function showToast(message) {
        const toast = document.createElement('div');
        toast.classList.add('toast');
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            toast.classList.remove('show');
          setTimeout(() => {
            document.body.removeChild(toast);
          }, 300);
        }, 3000);
      }
    });

        // Contact Form Functionality
        document.getElementById("contact-form").addEventListener("submit", function(e) {
            e.preventDefault();
        const successMessage = document.getElementById("success-message");
        successMessage.textContent = "Message sent successfully!";
        successMessage.style.display = "block";
        successMessage.classList.add("show");

        // Reset form
        this.reset();

      // Hide message after 3 seconds
      setTimeout(() => {
            successMessage.classList.remove("show");
        setTimeout(() => {
            successMessage.style.display = "none";
        }, 500);
      }, 3000);
    });

