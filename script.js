 // Part 1: Base Class
 class ProductProperties {
    // @param {String } name - Name of Product
    // @param {Number} price - Price of product
    //@param {Number} quantity - remaining stock quantity
    constructor(name, price, quantity) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
      }

    // Calculates total value = price * quantity
    // returs {number}
    getTotalValue() {
        return this.price * this.quantity;
    
    }
    // return Product
    // @param {string} 
    toString() {
        return `Product: ${this.name}, Price: ${this.price}, Quantity: ${this.quantity}`;
    }

    // @param {ProductProperties[]} products
    // @param {number} discount - Discount
    static applyDiscount(products, discount) {
        products.forEach(product => {
          product.price = product.price * (1 - discount);
        });
      }
    }



// Part 2: Subclass
class PerishableProductProperties extends ProductProperties {

    // @param {String } name - Name of Product
    // @param {Number} price - Price of product
    // @param {Number} quantity - remaining stock quantity
    // @param {String} expirationDate

    constructor(name, price, quantity, expirationDate) {
    super(name, price, quantity);
    this.expirationDate = expirationDate;
    }

    // @returns {string}
    toString() {
        return `${super.toString()}, Expiry Date: ${this.expirationDate}`;
    }
}

// Part 4: Store Management Class
class Store {
   
    constructor() {
      this.inventory = [];
    }
  
    
    addProduct(product) {
      this.inventory.push(product);
    }
  
    
    getInventoryValue() {
      return this.inventory.reduce((total, product) => total + product.getTotalValue(), 0);
    }
  
    
     // Find and returns a product by its name.
    
    findProductByName(name) {
      return this.inventory.find(product => product.name === name) || null;
    }
  
    
    // Applies  discount to all products.
    
    applyDiscountToAll(discountRate) {
      ProductProperties.applyDiscount(this.inventory, discountRate);
    }
  }

// ###########################################
// DOM Control

// Arrays to store product entries
const regularProducts = [];          
const perishableProducts = [];       

// Toggle visibility of the expiry
document.getElementById('perishable').addEventListener('change', function() {
  const isPerishable = this.value === 'true';  
  // Show the expiration date if product is perishable
  document.getElementById('expiryDiv').classList.toggle('hidden', !isPerishable);
});

// form submission
document.getElementById('productForm').addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent default form submit behavior (page reload)

  // Get input values from the form
  const name = document.getElementById('name').value;
  const price = parseFloat(document.getElementById('price').value);
  const quantity = parseInt(document.getElementById('quantity').value);
  const isPerishable = document.getElementById('perishable').value === 'true';

  // Create the  product object and store it
  if (isPerishable) {
    const expiry = document.getElementById('expiry').value;
    const perishableProduct = new PerishableProductProperties(name, price, quantity, expiry);
    perishableProducts.push(perishableProduct);   
    updatePerishableTable();                      
  } else {
    const product = new ProductProperties(name, price, quantity);
    regularProducts.push(product);                
    updateRegularTable();                         
  }

  // Reset form and hide expiration field 
  this.reset();
  document.getElementById('expiryDiv').classList.add('hidden');
});

// Update HTML table for regular products
function updateRegularTable() {
  const tbody = document.querySelector('#regularTable tbody');
  tbody.innerHTML = ''; 

  // Loop  array and insert each as a table row
  regularProducts.forEach((product, index) => {
    const row = `<tr>
      <td>${index + 1}</td>                            
      <td>${product.name}</td>                         
      <td>$${product.price.toFixed(2)}</td>            
      <td>${product.quantity}</td>                     
      <td>$${product.getTotalValue()}</td>  
    </tr>`;
    tbody.insertAdjacentHTML('beforeend', row);
  });
}

// Update HTML table for perishable products
function updatePerishableTable() {
  const tbody = document.querySelector('#perishableTable tbody');
  tbody.innerHTML = ''; 

  // Loop  array and insert each as a table row
  perishableProducts.forEach((product, index) => {
    const row = `<tr>
      <td>${index + 1}</td>                            
      <td>${product.name}</td>                        
      <td>$${product.price.toFixed(2)}</td>           
      <td>${product.quantity}</td>                     
      <td>${product.expirationDate}</td>               
      <td>$${product.getTotalValue()}</td>  
    </tr>`;
    tbody.insertAdjacentHTML('beforeend', row);
  });
}

document.getElementById('discountForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const type = document.getElementById('productType').value;
    const discountPercent = parseFloat(document.getElementById('discount').value);
  
    if (isNaN(discountPercent) || discountPercent < 0 || discountPercent > 100) {
      alert('Please enter a valid discount between 0 and 100.');
      return;
    }
  
    const discountRate = discountPercent / 100;
  
    // Apply discount 
    if (type === 'regular') {
      ProductProperties.applyDiscount(regularProducts, discountRate);
      updateRegularTable();
    } else if (type === 'perishable') {
      ProductProperties.applyDiscount(perishableProducts, discountRate);
      updatePerishableTable();
    }
  
    this.reset();
  });
  
  //Create a Store instance
  const store = new Store();

  //sync store to products
  function syncStoreInventory() {
    store.inventory = [];

    regularProducts.forEach((productInstance) => {
        if (productInstance instanceof ProductProperties) {
          store.addProduct(productInstance);
        }
      });

    perishableProducts.forEach((perishableInstance) => {
        if (perishableInstance instanceof PerishableProductProperties) {
          store.addProduct(perishableInstance);
        }
      });
    }

    // ✅ Search product by name using store class
document.getElementById('storeSearchForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    syncStoreInventory(); // keep updated
  
    const searchName = document.getElementById('searchName').value.trim();
    const result = store.findProductByName(searchName);
  
    const resultDiv = document.getElementById('searchResult');
    resultDiv.textContent = result
      ? `✅ Found: ${result.toString()}`
      : `❌ Product "${searchName}" not found.`;
  
    this.reset();
  });
  
  // ✅ Show total inventory value using store class
  document.getElementById('showInventoryValue').addEventListener('click', function() {
    syncStoreInventory(); // ensure up to date
  
    const total = store.getInventoryValue();
    document.getElementById('inventoryValueDisplay').textContent =
      `💰 Total Inventory Value: $${total.toFixed(2)}`;
  });