# 📦 Product Management

🔗 **[Try it here!](https://carturo8.github.io/Server-API-Interaction/)**

A simple web application to manage products: add, update, delete, and search products using a modern interface with stylish alerts powered by SweetAlert2.

---

## 🖼️ Preview

![App Screenshot](assets/img/preview.png)  

---

## 🚀 Features

- 🔍 Search products by name or ID
- ➕ Add new products with name and price
- 📝 Edit existing products
- 🗑️ Delete products with confirmation
- 💾 Data persistence using `json-server`
- 🎨 Responsive and clean design

---

## 🛠️ Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript
- [SweetAlert2](https://sweetalert2.github.io/)
- [JSON Server](https://github.com/typicode/json-server) (for simulating a REST API)

---

## 📁 Project Structure

```bash
server-api-interaction/
│
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── main.js
│   └── img/
│       └── preview.png
│
├── db.json
├── index.html
├── .gitignore
├── LICENSE
└── README.md
```

---

## 📝 File Descriptions

- `index.html`: Main HTML structure and UI layout of the app.
- `db.json`: Mock database used by JSON Server to simulate a REST API.
- `.gitignore`: Specifies files and folders to exclude from version control.
- `LICENSE`: MIT license for open-source distribution.
- `README.md`: Project documentation and usage instructions.
- `assets/css/styles.css`: Custom styles for layout, responsiveness, and UI design.
- `assets/js/main.js`: Main JavaScript logic for CRUD operations and UI interaction.
- `assets/img/preview.png`: Screenshot of the app displayed in the README.

---

## 📦 Installation & Running

### 1. Clone the repository

```bash
git clone https://github.com/Carturo8/Server-API-Interaction.git
cd server-api-interaction
```

### 2. Install JSON Server (if you don't have it)

```bash
npm install -g json-server
```

### 3. Start the server

```bash
json-server --watch db.json --port 3000
```
⚠️ Make sure port 3000 is available, or update it in main.js.

### 4. Open the project

Open `index.html` in your browser or use Live Server in VS Code.

---

## 💡 How to Use

1. Fill the form to add new products (name and price).

2. Click Edit to load a product into the form.

3. Click Delete to remove a product (with confirmation).

4. Use the search bar to filter products by name or ID.

--- 

## ✅ Requirements

- A modern web browser (Chrome, Firefox, Edge, etc.)
- Node.js and npm (to run json-server)

## 📄 License

This project is licensed under the MIT License – see the [LICENSE](https://github.com/Carturo8/Server-API-Interaction/blob/main/LICENSE) file for more details.
