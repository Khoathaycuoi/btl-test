const searchInput = document.getElementById("search-input");
const popup = document.getElementById("search-popup");

// --- Gom dữ liệu từ nhiều file JS -----
const allProducts = [
  ...(typeof ipProducts !== "undefined" ? ipProducts : []),
  ...(typeof macProducts !== "undefined" ? macProducts : []),
  ...(typeof ipadProducts !== "undefined" ? ipadProducts : []),
  ...(typeof watchProducts !== "undefined" ? watchProducts : []),
  ...(typeof phukienProducts !== "undefined" ? phukienProducts : []),
];

// --- Lấy danh sách tên sản phẩm ---
const productNames = allProducts.map((p) => p.name);

// --- Hàm bôi đậm phần tìm kiếm trùng ---
function highlightMatch(text, keyword) {
  if (!keyword) return text;
  const regex = new RegExp(`(${keyword})`, "gi");
  return text.replace(regex, "<strong>$1</strong>");
}

// --- Hiển thị gợi ý ---
function showSuggestions(keyword = "") {
  const value = keyword.trim().toLowerCase();
  let filtered;

  if (value === "") {
    // 1. Khi chưa nhập, lấy 5 SẢN PHẨM đầu tiên từ allProducts
    filtered = allProducts.slice(0, 5);
  } else {
    // 2. Lọc 5 SẢN PHẨM có tên chứa từ khóa
    filtered = allProducts
      .filter((p) => p.name.toLowerCase().includes(value))
      .slice(0, 5);
  }

  popup.innerHTML =
    filtered.length > 0
      ? filtered
          .map(
            (p) => `
          <div class="suggest-item">
            <img src="/${p.img}" class="suggest-img" alt="${p.name}" /> 
            <div class="suggest-info-wrapper">
              <p class="suggest-name">${highlightMatch(p.name, value)}</p>
              <span class="suggest-price">${(
                p.price || 0
              ).toLocaleString()}₫</span>

            </div>
          </div>`
          )
          .join("")
      : "<p class='no-result'>Không tìm thấy sản phẩm nào trùng khớp</p>";

  popup.style.display = "block";
}

// --- Sự kiện tìm kiếm ---
searchInput.addEventListener("focus", () => showSuggestions()); // Hiển thị gợi ý khi focus
searchInput.addEventListener("input", (e) => showSuggestions(e.target.value)); // Cập nhật gợi ý khi nhập

popup.addEventListener("click", (e) => {
  if (e.target.tagName === "P" || e.target.tagName === "STRONG") {
    const text = e.target.closest("p").textContent;
    searchInput.value = text;
    popup.style.display = "none";
  }
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".search-box")) popup.style.display = "none";
});

function renderProducts(products, containerId, title, type) {
  const container = document.getElementById(containerId);

  const html = `
    <div class="container-card">
    <h3 class="title-card-container text-white fw-bold mb-4">${title}</h3>
    <div class="card-container row g-4">
      ${products
        .slice(0, 4)
        .map(
          (p) => `
          <div class="col-md-4 col-lg-3">
            <div class="card shadow-sm border-0 h-100">
              <img src="${p.img}" class="card-img-top" alt="${p.name}" />
              <div class="card-body text-center">
                <h6 class="card-title mb-2">${p.name}</h6>
                <p class="text-danger fw-bold mb-1">
                  ${(p.price || 0).toLocaleString()}đ
                </p>
                <p class="text-muted text-decoration-line-through mb-1">
                  ${(p.oldPrice || 0).toLocaleString()}đ
                </p>
                <p class="text-success small mb-1">Giảm ${p.discount}%</p>
                <p class="small text-delivery mb-1">${"Trả góp 0% | Miễn phí vận chuyển"}</p>
                <button class="btn btn-outline-danger w-100 mt-2">Thêm vào giỏ hàng</button>
              </div>
            </div>
          </div>`
        )
        .join("")}
    </div>
    <button class="btn-view-all btn mt-4 mb-4 d-block m-auto text-white fs-3" data-type="${type}">Xem tất cả >></button>
    </div>
  `;

  container.innerHTML = html;
}

// Render khi trang load
document.addEventListener("DOMContentLoaded", () => {
  if (typeof ipProducts !== "undefined") {
    renderProducts(ipProducts, "iphone-list", "iPhone Nổi bật 🔥", "iphone");
  }

  if (typeof macProducts !== "undefined")
    renderProducts(macProducts, "mac-list", "MacBook Nổi bật🔥", "mac");

  if (typeof ipadProducts !== "undefined")
    renderProducts(ipadProducts, "ipad-list", "iPad Nổi bật🔥", "ipad");

  if (typeof watchProducts !== "undefined")
    renderProducts(
      watchProducts,
      "watch-list",
      "Apple Watch Nổi bật🔥",
      "watch"
    );

  if (typeof phukienProducts !== "undefined")
    renderProducts(
      phukienProducts,
      "phukien-list",
      "Phụ Kiện Nổi bật🔥",
      "phukien"
    );
});

// ------------------ Xem tất cả -----------------
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-view-all")) {
    const type = e.target.getAttribute("data-type");
    if (type === "iphone") {
      window.location.href = `./pages/iphone.html`;
    } else if (type === "mac") {
      window.location.href = `./pages/mac.html`;
    } else if (type === "ipad") {
      window.location.href = `./pages/ipad.html`;
    } else if (type === "watch") {
      window.location.href = `./pages/watch.html`;
    } else if (type === "phukien") {
      window.location.href = `./pages/phukien.html`;
    }
  }
});

// ---------------------- Chọn box sản phẩm --------------------
document.addEventListener("click", (e) => {
  const items = e.target.closest(".box-sp-item");
  if (!items) return;
  const type = items.dataset.type;
  if (type === "iphone") {
    window.location.href = `./pages/iphone.html`;
  } else if (type === "mac") {
    window.location.href = `./pages/mac.html`;
  } else if (type === "ipad") {
    window.location.href = `./pages/ipad.html`;
  } else if (type === "watch") {
    window.location.href = `./pages/watch.html`;
  } else if (type === "phukien") {
    window.location.href = `./pages/phukien.html`;
  }
});

// --------------- Popup thêm giỏ hàng -----------
const addPopup = document.getElementById("add-popup");
const popupImg = document.getElementById("popup-img");
const popupName = document.getElementById("popup-name");
const popupPrice = document.getElementById("popup-price");
const popupQty = document.getElementById("popup-qty");
const qtyPlus = document.getElementById("qty-plus");
const qtyMinus = document.getElementById("qty-minus");
const confirmAdd = document.getElementById("confirmAdd");
const cancelAdd = document.getElementById("cancelAdd");

let currentProduct = null;

// Khi ấn nút Thêm vào giỏ hàng
document.addEventListener("click", (e) => {
  if (
    e.target.matches(".btn-outline-danger") ||
    e.target.matches(".card-img-top")
  ) {
    // Nếu chưa đăng nhập thì mở popup đăng nhập
    const user = JSON.parse(localStorage.getItem("loggedUser"));
    if (!user) {
      loginPopup.style.display = "flex";
      alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!");
      return;
    }

    const card = e.target.closest(".card");
    const name = card.querySelector(".card-title").textContent;
    const price = parseInt(
      card.querySelector(".text-danger").textContent.replace(/\D/g, "")
    );
    const img = card.querySelector("img").src;

    currentProduct = { name, price, img };
    popupName.textContent = name;
    popupPrice.textContent = price.toLocaleString() + "đ";
    popupImg.src = img;
    popupQty.textContent = 1;

    addPopup.style.display = "flex";
    document.body.style.overflow = "hidden";
  }
});

// Nút tăng giảm
qtyPlus.addEventListener("click", () => {
  popupQty.textContent = parseInt(popupQty.textContent) + 1;
});

qtyMinus.addEventListener("click", () => {
  const value = parseInt(popupQty.textContent);
  if (value > 1) popupQty.textContent = value - 1;
});

// Xác nhận thêm
confirmAdd.addEventListener("click", () => {
  const qty = parseInt(popupQty.textContent);
  if (currentProduct) {
    addToCart({ ...currentProduct, qty });
    alert(`Đã thêm ${qty} x ${currentProduct.name} vào giỏ`);
  }
  addPopup.style.display = "none";
  document.body.style.overflow = "";
});

// Hủy popup
cancelAdd.addEventListener("click", () => {
  addPopup.style.display = "none";
  document.body.style.overflow = "";
});
