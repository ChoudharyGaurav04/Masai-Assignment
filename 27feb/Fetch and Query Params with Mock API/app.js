async function fetchProducts() {
    const category = document.getElementById('category').value;
    const minPrice = document.getElementById('minPrice').value;
    const maxPrice = document.getElementById('maxPrice').value;
    const productList = document.getElementById('productList');
    const status = document.getElementById('status');
  
    // Clear previous products and status
    productList.innerHTML = '';
    status.textContent = 'Loading...';
    status.className = 'loading';
  
    try {
      let url = `https://mockapi.io/products?`;
  
      const params = [];
      if (category) params.push(`category=${category}`);
      if (minPrice) params.push(`min_price=${minPrice}`);
      if (maxPrice) params.push(`max_price=${maxPrice}`);
      params.push(`sort=asc`);
  
      url += params.join('&');
  
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
  
      const products = await response.json();
  
      if (products.length === 0) {
        status.textContent = 'No products found.';
        return;
      }
  
      status.textContent = ''; // Clear loading message
  
      products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product';
        productCard.innerHTML = `
          <img src="${product.image || 'https://via.placeholder.com/150'}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>Price: $${product.price}</p>
        `;
        productList.appendChild(productCard);
      });
    } catch (error) {
      console.error(error);
      status.textContent = 'Something went wrong!';
      status.className = 'error';
    }
  }
  