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
    // returnd Product
    // @param {string} 
    toString() {
        return `Product: ${this.name}, Price: ${this.price}, Quantity: ${this.quantity}`;
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
