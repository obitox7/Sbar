let loader = document.getElementById("loader");
let balls = document.querySelectorAll(".ball");
let labels = document.querySelectorAll("label");
let box = document.getElementById("box4");
let parent = document.getElementById("parent");
let card = document.querySelector(".card");

window.onload = function () {
  const title = localStorage.getItem("productTitle");
  const price = localStorage.getItem("productPrice");

  if (title && price) {
    document.getElementById("productName").textContent = title;
    document.getElementById("productPrice").textContent = price;

    // Extract unit price from ₹xxx (remove ₹ symbol)
    unitPrice = parseInt(price.replace(/[^\d]/g, ''));
    updatePrice(); // Update total price
  }
};

const quantityInput = document.getElementById("quantity");
const totalPriceSpan = document.getElementById("totalPrice");
let unitPrice = 0; // will be set on load

function updatePrice() {
  const qty = parseInt(quantityInput.value) || 0;
  totalPriceSpan.textContent = "₹" + (qty * unitPrice);
}

quantityInput.addEventListener("change", updatePrice);

// Order submission
function buy2() {
  const requiredFields = ["name", "phone", "state", "pincode", "city", "address", "txn"];
  let isValid = true;

  requiredFields.forEach(id => {
    const input = document.getElementById(id);
    const label = input.previousElementSibling;

    if (input.value.trim() === "") {
      input.style.border = "1px solid red";
      if (label && label.tagName === "LABEL") label.style.color = "red";
      isValid = false;
    } else {
      input.style.border = "";
      if (label && label.tagName === "LABEL") label.style.color = "";
    }
  });

  if (!isValid) return;

  loader.style.zIndex = "5";
  balls.forEach(ball => {
    ball.style.animationPlayState = "running";
  });

  const data = {
    name: document.getElementById("name").value,
    phone: document.getElementById("phone").value,
    state: document.getElementById("state").value,
    pincode: document.getElementById("pincode").value,
    city: document.getElementById("city").value,
    address: document.getElementById("address").value,
    txn: document.getElementById("txn").value,
    product: document.getElementById("productName").textContent,
    price: document.getElementById("totalPrice").textContent,
    quantity: document.getElementById("quantity").value
  };

  fetch("https://script.google.com/macros/s/AKfycbzYcVcg-wmqFKMLhPe3B7YqpburDBzqr5y0ET_JVxGF0u7mxHNVnPbzIaXKZKztXxP2yg/exec", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(res => {
      requiredFields.forEach(id => {
        const input = document.getElementById(id);
        input.value = "";
        input.style.border = "";
      });

      loader.style.zIndex = "-5";
      balls.forEach(ball => {
        ball.style.animationPlayState = "paused";
      });

      parent.style.width = "30px";
      parent.style.height = "10px";
      card.style.zIndex = "4";
      card.style.width = "100%";
      card.style.backgroundColor = "white";
      card.style.height = "100vh";

      alert("✅ Order placed successfully!");
    })
    .catch(err => {
      console.error("Error:", err);
      loader.style.zIndex = "-5";
      balls.forEach(ball => {
        ball.style.animationPlayState = "paused";
      });
      alert("❌ Something went wrong. Please try again.");
    });
}