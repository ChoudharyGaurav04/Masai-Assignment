// Initialize Firebase with your credentials
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
  };
  
  const app = firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const novelsCollection = db.collection('novels');
  
  // DOM elements
  const novelsList = document.getElementById('novelsList');
  const searchInput = document.getElementById('searchInput');
  const yearFilter = document.getElementById('yearFilter');
  const sortAsc = document.getElementById('sortAsc');
  const sortDesc = document.getElementById('sortDesc');
  
  // Fetch and render novels
  function fetchNovels() {
    let query = novelsCollection;
  
    // Apply year filter
    const year = yearFilter.value;
    if (year) {
      query = query.where('release_year', '==', parseInt(year));
    }
  
    // Apply search filter
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm) {
      query = query.where('title', '>=', searchTerm).where('title', '<=', searchTerm + '\uf8ff');
    }
  
    query.get().then(snapshot => {
      novelsList.innerHTML = '';
      snapshot.forEach(doc => {
        const novel = doc.data();
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${novel.title}</td>
          <td>${novel.author}</td>
          <td>${novel.price}</td>
          <td>${novel.release_year}</td>
          <td>${novel.genre}</td>
        `;
        novelsList.appendChild(row);
      });
    });
  }
  
  // Sort novels by price
  sortAsc.addEventListener('click', () => {
    novelsCollection.orderBy('price').get().then(snapshot => {
      novelsList.innerHTML = '';
      snapshot.forEach(doc => {
        const novel = doc.data();
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${novel.title}</td>
          <td>${novel.author}</td>
          <td>${novel.price}</td>
          <td>${novel.release_year}</td>
          <td>${novel.genre}</td>
        `;
        novelsList.appendChild(row);
      });
    });
  });
  
  sortDesc.addEventListener('click', () => {
    novelsCollection.orderBy('price', 'desc').get().then(snapshot => {
      novelsList.innerHTML = '';
      snapshot.forEach(doc => {
        const novel = doc.data();
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${novel.title}</td>
          <td>${novel.author}</td>
          <td>${novel.price}</td>
          <td>${novel.release_year}</td>
          <td>${novel.genre}</td>
        `;
        novelsList.appendChild(row);
      });
    });
  });
  
  // Event listeners for search and filter
  searchInput.addEventListener('input', fetchNovels);
  yearFilter.addEventListener('change', fetchNovels);
  
  // Initial fetch
  fetchNovels();
  