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
        return `Product: ${this.name}, Price: ${this.price}, Quantity: ${this.quantity}`
    }
    }