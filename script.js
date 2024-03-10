  
        document.addEventListener("DOMContentLoaded", function() {
            const Products = [
              { id: 1, name: 'Product-1', price: 100 },
              { id: 2, name: 'Product-2', price: 200 },
              { id: 3, name: 'Product-3', price: 300 },
            ];
          
            let cart = [];
          
            function renderProducts() {
              const productList = document.getElementById("productList");
              productList.innerHTML = "";
              Products.forEach(product => {
                const productItem = document.createElement("div");
                productItem.classList.add("product");
                productItem.innerHTML = `
                  <span>${product.name} - $${product.price}</span>
                  <button onclick="addToCart(${product.id})">+</button>
                  <span id="quantity_${product.id}">0</span>
                  <button onclick="removeFromCart(${product.id})">-</button>
                `;
                productList.appendChild(productItem);
              });
            }
          
            function renderCart() {
              const cartElement = document.getElementById("cart");
              cartElement.innerHTML = "";
              if (cart.length === 0) {
                cartElement.innerHTML = "<p>No Product added to the cart</p>";
              } else {
                cart.forEach(item => {
                  const cartItem = document.createElement("div");
                  cartItem.classList.add("cart-item");
                  cartItem.innerHTML = `
                    <span>${item.name} - $${item.price}</span>
                    <span>Quantity: ${item.quantity}</span>
                  `;
                  cartElement.appendChild(cartItem);
                });
                const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
                document.getElementById("totalPrice").textContent = `Total Price: $${totalPrice}`;
              }
            }
          
            window.addToCart = function(productId) {
              const product = Products.find(p => p.id === productId);
              const cartItem = cart.find(item => item.id === productId);
              if (cartItem) {
                cartItem.quantity++;
              } else {
                cart.push({ id: productId, name: product.name, price: product.price, quantity: 1 });
              }
              renderCart();
              renderProducts();
            }
          
            window.removeFromCart = function(productId) {
              const index = cart.findIndex(item => item.id === productId);
              if (index !== -1) {
                const cartItem = cart[index];
                cartItem.quantity--;
                if (cartItem.quantity === 0) {
                  cart.splice(index, 1);
                }
              }
              renderCart();
              renderProducts();
            }
          
            renderProducts();
            renderCart();
          });