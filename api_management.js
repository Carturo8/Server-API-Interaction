// Fetch all products from the JSON Server and display them in the console
function fetchAllProducts() {
    fetch('http://localhost:3000/products')
        .then(response => response.json())
        .then(data => {
            console.log("Available products:", data);
        })
        .catch(error => {
            console.error("Error fetching products:", error);
        });
}

fetchAllProducts();


// Function to add a new product to the server after validating the data
function addProduct(product) {
    // Validate product data before sending it to the server
    if (product.name && typeof product.price === "number" && product.price > 0) {
        fetch('http://localhost:3000/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        })
            .then(response => response.json())
            .then(data => console.log("Product added:", data))
            .catch(error => console.error("Error adding product:", error));
    } else {
        // Display an error if the validation fails
        console.error("Invalid product data. Please check the name and price.");
    }
}

// Example usage
const newProduct = { id: 4, name: "Monitor", price: 200 };
addProduct(newProduct);


// Function to update an existing product using PUT request
function updateProduct(id, updatedProduct) {
    // Validate updated product data
    if (updatedProduct.name && typeof updatedProduct.price === "number" && updatedProduct.price > 0) {
        fetch(`http://localhost:3000/products/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedProduct)
        })
            .then(response => response.json())
            .then(data => console.log("Product updated:", data))
            .catch(error => console.error("Error updating product:", error));
    } else {
        console.error("Invalid updated product data. Please check the name and price.");
    }
}

// Example usage
const updatedProduct = { name: "Laptop", price: 1400 };
updateProduct(1, updatedProduct);


// Function to delete a product by ID using DELETE request
function deleteProduct(id) {
    fetch(`http://localhost:3000/products/${id}`, {
        method: 'DELETE'
    })
        .then(() => console.log(`Product with ID ${id} deleted`))
        .catch(error => console.error("Error deleting product:", error));
}

// Example usage
deleteProduct(3);


function validarProducto(producto) {
    if (!producto.nombre || typeof  producto.precio !== "number") {
        console.error("Datos del producto no válidos.");
        return false;
    }
    return true;
}