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
    if (validateProduct(product)) {
        fetch('http://localhost:3000/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        })
            .then(response => response.json())
            .then(data => console.log("Product added:", data))
            .catch(error => console.error("Error adding product:", error));
    }
}

// Example usage
const newProduct = { id: 4, name: "Monitor", price: 200 };
addProduct(newProduct);


// Function to update an existing product using PUT request
function updateProduct(id, updatedProduct) {
    if (validateProduct(updatedProduct)) {
        fetch(`http://localhost:3000/products/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedProduct)
        })
            .then(response => response.json())
            .then(data => console.log("Product updated:", data))
            .catch(error => console.error("Error updating product:", error));
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


// Validate if the product has all required fields and a valid price
function validateProduct(product) {
    if (!product.name || typeof product.price !== "number" || product.price <= 0) {
        console.error("Invalid product data. Please check the name and price.");
        return false;
    }
    return true;
}