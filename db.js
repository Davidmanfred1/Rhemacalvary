// Local Storage Database Implementation
const DB = {
    // Initialize database tables
    init() {
        if (!localStorage.getItem('products')) {
            localStorage.setItem('products', JSON.stringify([]));
        }
        if (!localStorage.getItem('orders')) {
            localStorage.setItem('orders', JSON.stringify([]));
        }
        if (!localStorage.getItem('admins')) {
            // Initialize with default admin account
            const defaultAdmin = {
                username: 'admin',
                // In production, this should be a properly hashed password
                password: 'admin123',
                email: 'admin@rhemacalvary.org'
            };
            localStorage.setItem('admins', JSON.stringify([defaultAdmin]));
        }
    },

    // Product operations
    getProducts() {
        return JSON.parse(localStorage.getItem('products'));
    },

    addProduct(product) {
        const products = this.getProducts();
        products.push(product);
        localStorage.setItem('products', JSON.stringify(products));
    },

    updateProduct(productId, updatedProduct) {
        const products = this.getProducts();
        const index = products.findIndex(p => p.id === productId);
        if (index !== -1) {
            products[index] = { ...products[index], ...updatedProduct };
            localStorage.setItem('products', JSON.stringify(products));
            return true;
        }
        return false;
    },

    deleteProduct(productId) {
        const products = this.getProducts();
        const filteredProducts = products.filter(p => p.id !== productId);
        localStorage.setItem('products', JSON.stringify(filteredProducts));
    },

    // Order operations
    getOrders() {
        return JSON.parse(localStorage.getItem('orders'));
    },

    addOrder(order) {
        const orders = this.getOrders();
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));
    },

    updateOrderStatus(orderId, status) {
        const orders = this.getOrders();
        const order = orders.find(o => o.id === orderId);
        if (order) {
            order.status = status;
            localStorage.setItem('orders', JSON.stringify(orders));
            return true;
        }
        return false;
    },

    // Admin operations
    getAdmins() {
        return JSON.parse(localStorage.getItem('admins'));
    },

    validateAdmin(username, password) {
        const admins = this.getAdmins();
        return admins.find(a => a.username === username && a.password === password);
    },

    updateAdminSettings(username, updates) {
        const admins = this.getAdmins();
        const admin = admins.find(a => a.username === username);
        if (admin) {
            Object.assign(admin, updates);
            localStorage.setItem('admins', JSON.stringify(admins));
            return true;
        }
        return false;
    },

    // Analytics operations
    getAnalytics(startDate, endDate) {
        const orders = this.getOrders();
        const filteredOrders = startDate && endDate
            ? orders.filter(order => {
                const orderDate = new Date(order.date);
                return orderDate >= new Date(startDate) && orderDate <= new Date(endDate);
            })
            : orders;

        return {
            totalSales: filteredOrders.reduce((sum, order) => sum + order.total, 0),
            totalOrders: filteredOrders.length,
            productsSold: filteredOrders.reduce((sum, order) => sum + order.items.length, 0)
        };
    }
};