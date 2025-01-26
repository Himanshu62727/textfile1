// Function to fetch product data from a JSON file
async function fetchProducts() {
    try {
      const response = await fetch('products.json'); // Path to your JSON file
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const products = await response.json();
      return products;
    } catch (error) {
      console.error('Error fetching products:', error);
      displayErrorMessage('Failed to load products. Please try again later.'); // Display message to the user
      return []; // Return an empty array to avoid further errors
    }
  }
  
  // Function to display an error message to the user
  function displayErrorMessage(message) {
      const errorContainer = document.createElement('div');
      errorContainer.className = 'error-message'; // You can style this in CSS
      errorContainer.textContent = message;
      document.querySelector('.bestselling-furniture').prepend(errorContainer); // Add the message to the bestselling section
  }
  
  // Function to display products on the page
  function displayProducts(products) {
      const cardsContainer = document.querySelector('.bestselling-furniture-cards');
  
      products.forEach(product => {
          const card = document.createElement('div');
          card.className = 'bestselling-furniture-card';
          card.innerHTML = `
              <img src="${product.image}" class="bestselling-furniture-img">
              <h2 class="bestselling-furniture-heading">${product.name}</h2>
              <p class="bestselling-furniture-paragraph">Price: $${product.price}</p>
              <button class="bestselling-furniture-btn">Buy Now</button>
          `;
          cardsContainer.appendChild(card);
      });
  }
  
  // Example products.json file (create this file in the same directory as your HTML)
  /*
  [
    { "name": "Kitchen Set", "image": "bestsellig-furniture-kitchen.jpg", "price": 15000 },
    { "name": "Wardrobe", "image": "bestsellig-furniture-wardrobe.jpg", "price": 10000 },
    { "name": "Sofa", "image": "bestsellig-furniture-sofa.jpg", "price": 1500 },
    // ... more products
  ]
  */
  
  // Call the functions when the DOM is fully loaded
  document.addEventListener('DOMContentLoaded', async () => {
      const products = await fetchProducts();
      if(products.length > 0) {
          displayProducts(products);
      }
  });
  
  // Example of fetching data from an actual API (replace with your API endpoint)
  async function fetchDataFromAPI(){
      try {
          const response = await fetch('https://dummyjson.com/products?limit=6');
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          const products = data.products;
          displayProducts(products);
      } catch (error) {
          console.error('Error fetching data from API', error);
          displayErrorMessage('Failed to load products from API');
      }
  }
  
  // You can call this function instead of fetchProducts if you have a real API
  // document.addEventListener('DOMContentLoaded', fetchDataFromAPI);