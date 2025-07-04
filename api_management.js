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


const productoActualizado = { nombre: "Laptop", precio: 1400 };

fetch('http://localhost:3000/productos/1', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productoActualizado)
})
    .then(responde => responde.json())
    .then(data => console.log("Producto actualizado:", data))
    .catch(error => console.error("Error al actualizar producto:", error));


fetch('http://localhost:3000/productos/3', { method: 'DELETE' })
    .then(() => console.log("Producto eliminado"))
    .catch(error => console.error("Error al eliminar producto:", error));


function validarProducto(producto) {
    if (!producto.nombre || typeof  producto.precio !== "number") {
        console.error("Datos del producto no válidos.");
        return false;
    }
    return true;
}