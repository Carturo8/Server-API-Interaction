// Get references to DOM elements
const form = document.getElementById("product-form");
const inputId = document.getElementById("product-id");
const inputName = document.getElementById("product-name");
const inputPrice = document.getElementById("product-price");
const addBtn = document.getElementById("add-btn");
const updateBtn = document.getElementById("update-btn");
const cancelBtn = document.getElementById("cancel-btn");
const productList = document.getElementById("product-list");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const clearSearchBtn = document.getElementById("clear-search-btn");

const API_URL = "http://localhost:3000/products";

// Load all products when the page loads
window.addEventListener("DOMContentLoaded", () => {
    loadProducts();
    switchToAddMode();
});

// Handle form submission based on mode
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const isEditing = inputId.value !== "";
    if (isEditing) {
        updateProduct();
    } else {
        addProduct();
    }
});

// Cancel editing and reset form
cancelBtn.addEventListener("click", () => {
    form.reset();
    switchToAddMode();
});

// Load and display all products
function loadProducts() {
    fetch(API_URL)
        .then((res) => res.json())
        .then((data) => {
            productList.innerHTML = "";
            data.forEach(renderProductItem);
        })
        .catch((err) => {
            showAlert("Error loading products", "error");
            console.error("Load error:", err);
        });
}

// Render a product row in the table
function renderProductItem(product) {
    const row = document.createElement("tr");

    const idCell = document.createElement("td");
    idCell.textContent = product.id;

    const nameCell = document.createElement("td");
    nameCell.textContent = product.name;

    const priceCell = document.createElement("td");
    priceCell.textContent = `$${product.price}`;

    const actionsCell = document.createElement("td");

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("edit-btn"); // 👇 add class for styling
    editBtn.addEventListener("click", () => fillFormForEdit(product));

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn"); // 👇 add class for styling
    deleteBtn.addEventListener("click", () => deleteProduct(product.id));

    actionsCell.appendChild(editBtn);
    actionsCell.appendChild(deleteBtn);

    row.appendChild(idCell);
    row.appendChild(nameCell);
    row.appendChild(priceCell);
    row.appendChild(actionsCell);

    productList.appendChild(row);
}

// Fill the form with product data to edit
function fillFormForEdit(product) {
    inputId.value = product.id;
    inputName.value = product.name;
    inputPrice.value = product.price;
    switchToEditMode();
}

// Add a new product
function addProduct() {
    const name = inputName.value.trim();
    const price = parseFloat(inputPrice.value);
    const product = { name, price };

    if (!validateProduct(product)) return;

    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
    })
        .then((res) => res.json())
        .then((data) => {
            showAlert("Product added successfully", "success");
            renderProductItem(data);
            form.reset();
            switchToAddMode();
        })
        .catch((err) => {
            showAlert("Failed to add product", "error");
            console.error("Add error:", err);
        });
}

// Update existing product
function updateProduct() {
    const id = inputId.value.trim();
    const name = inputName.value.trim();
    const price = parseFloat(inputPrice.value);
    const product = { name, price };

    if (!validateProduct(product)) return;

    fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
    })
        .then((res) => res.json())
        .then(() => {
            showAlert("Product updated successfully", "success");
            loadProducts();
            form.reset();
            switchToAddMode();
        })
        .catch((err) => {
            showAlert("Failed to update product", "error");
            console.error("Update error:", err);
        });
}

// Delete a product after confirmation
function deleteProduct(id) {
    Swal.fire({
        title: "Are you sure?",
        text: "This product will be deleted permanently.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#aaa",
        confirmButtonText: "Yes, delete it",
        position: "top-end",
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`${API_URL}/${id}`, {
                method: "DELETE",
            })
                .then(() => {
                    showAlert("Product deleted", "success");
                    loadProducts();
                })
                .catch((err) => {
                    showAlert("Failed to delete product", "error");
                    console.error("Delete error:", err);
                });
        }
    });
}

// Validate product before sending to server
function validateProduct(product) {
    if (
        !product.name ||
        typeof product.name !== "string" ||
        !Number.isFinite(product.price) ||
        product.price <= 0
    ) {
        showAlert("Invalid product data", "error");
        return false;
    }
    return true;
}

// Show toast notification using SweetAlert2
function showAlert(message, type) {
    Swal.fire({
        toast: true,
        position: "top-end",
        icon: type,
        title: message,
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
    });
}

// Switch UI to Add mode
function switchToAddMode() {
    addBtn.style.display = "inline-block";
    updateBtn.style.display = "none";
    cancelBtn.style.display = "none";
    inputId.value = "";
}

// Switch UI to Edit mode
function switchToEditMode() {
    addBtn.style.display = "none";
    updateBtn.style.display = "inline-block";
    cancelBtn.style.display = "inline-block";
}

// Search by name or ID
searchBtn.addEventListener("click", () => {
    const term = searchInput.value.trim().toLowerCase();

    if (term === "") {
        showAlert("Please enter a search term", "info");
        return;
    }

    fetch(API_URL)
        .then((res) => res.json())
        .then((products) => {
            const filtered = products.filter((p) =>
                p.name.toLowerCase().includes(term) || String(p.id) === term
            );

            productList.innerHTML = "";

            if (filtered.length === 0) {
                showAlert("No products found", "info");
            } else {
                filtered.forEach(renderProductItem);
            }
        })
        .catch((err) => {
            showAlert("Search failed", "error");
            console.error("Search error:", err);
        });
});

// Clear search and reload the full list
clearSearchBtn.addEventListener("click", () => {
    searchInput.value = "";
    loadProducts();
});