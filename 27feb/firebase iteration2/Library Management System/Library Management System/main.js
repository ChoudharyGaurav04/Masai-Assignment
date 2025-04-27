// main.js

// Your Firebase Realtime Database URL
const BASE_URL = 'https://your-project-id.firebaseio.com'; // Replace this!

// ----------------------
// Load State
// ----------------------
let booksState = {
  filters: { genre: '', author: '', available: '' },
  sort: { field: '', order: 'asc' },
  pagination: { page: 1, itemsPerPage: 5 }
};

let membersState = {
  filters: { active: '', membershipDate: '' },
  sort: { field: '', order: 'asc' },
  pagination: { page: 1, itemsPerPage: 5 }
};

function saveState() {
  localStorage.setItem('booksState', JSON.stringify(booksState));
  localStorage.setItem('membersState', JSON.stringify(membersState));
}

function loadState() {
  const savedBooksState = localStorage.getItem('booksState');
  const savedMembersState = localStorage.getItem('membersState');
  if (savedBooksState) booksState = JSON.parse(savedBooksState);
  if (savedMembersState) membersState = JSON.parse(savedMembersState);
}

// ----------------------
// CRUD Operations
// ----------------------
async function fetchBooks() {
  const res = await fetch(`${BASE_URL}/books.json`);
  const data = await res.json();
  return Object.entries(data || {}).map(([firebaseKey, value]) => ({ firebaseKey, ...value }));
}

async function fetchMembers() {
  const res = await fetch(`${BASE_URL}/members.json`);
  const data = await res.json();
  return Object.entries(data || {}).map(([firebaseKey, value]) => ({ firebaseKey, ...value }));
}

async function addBook(book) {
  await fetch(`${BASE_URL}/books.json`, {
    method: 'POST',
    body: JSON.stringify(book),
    headers: { 'Content-Type': 'application/json' }
  });
}

async function updateBook(key, book) {
  await fetch(`${BASE_URL}/books/${key}.json`, {
    method: 'PATCH',
    body: JSON.stringify(book),
    headers: { 'Content-Type': 'application/json' }
  });
}

async function deleteBook(key) {
  await fetch(`${BASE_URL}/books/${key}.json`, { method: 'DELETE' });
}

async function addMember(member) {
  await fetch(`${BASE_URL}/members.json`, {
    method: 'POST',
    body: JSON.stringify(member),
    headers: { 'Content-Type': 'application/json' }
  });
}

async function updateMember(key, member) {
  await fetch(`${BASE_URL}/members/${key}.json`, {
    method: 'PATCH',
    body: JSON.stringify(member),
    headers: { 'Content-Type': 'application/json' }
  });
}

async function deleteMember(key) {
  await fetch(`${BASE_URL}/members/${key}.json`, { method: 'DELETE' });
}

// ----------------------
// Filtering, Sorting, Pagination
// ----------------------
function applyBookFilters(books) {
  return books.filter(book => {
    return (!booksState.filters.genre || book.genre === booksState.filters.genre)
      && (!booksState.filters.author || book.author.includes(booksState.filters.author))
      && (booksState.filters.available === '' || book.available === (booksState.filters.available === 'true'));
  });
}

function applyMemberFilters(members) {
  return members.filter(member => {
    return (!membersState.filters.active || member.active === (membersState.filters.active === 'true'));
  });
}

function applySorting(data, sortState) {
  const { field, order } = sortState;
  if (!field) return data;
  
  return data.sort((a, b) => {
    if (a[field] < b[field]) return order === 'asc' ? -1 : 1;
    if (a[field] > b[field]) return order === 'asc' ? 1 : -1;
    return 0;
  });
}

function paginate(data, paginationState) {
  const { page, itemsPerPage } = paginationState;
  const start = (page - 1) * itemsPerPage;
  return data.slice(start, start + itemsPerPage);
}

// ----------------------
// Render Books
// ----------------------
async function renderBooks() {
  let books = await fetchBooks();
  books = applyBookFilters(books);
  books = applySorting(books, booksState.sort);
  books = paginate(books, booksState.pagination);

  const table = document.getElementById('books-table');
  table.innerHTML = `
    <tr>
      <th>Title</th><th>Author</th><th>Genre</th><th>Published Year</th><th>Available</th><th>Actions</th>
    </tr>
    ${books.map(book => `
      <tr>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.genre}</td>
        <td>${book.publishedYear}</td>
        <td>${book.available ? 'Yes' : 'No'}</td>
        <td>
          <button onclick="openEditBook('${book.firebaseKey}')">Edit</button>
          <button onclick="deleteBook('${book.firebaseKey}').then(renderBooks)">Delete</button>
        </td>
      </tr>
    `).join('')}
  `;
}

// ----------------------
// Render Members
// ----------------------
async function renderMembers() {
  let members = await fetchMembers();
  members = applyMemberFilters(members);
  members = applySorting(members, membersState.sort);
  members = paginate(members, membersState.pagination);

  const table = document.getElementById('members-table');
  table.innerHTML = `
    <tr>
      <th>Name</th><th>Membership Date</th><th>Active</th><th>Actions</th>
    </tr>
    ${members.map(member => `
      <tr>
        <td>${member.name}</td>
        <td>${member.membershipDate}</td>
        <td>${member.active ? 'Yes' : 'No'}</td>
        <td>
          <button onclick="openEditMember('${member.firebaseKey}')">Edit</button>
          <button onclick="deleteMember('${member.firebaseKey}').then(renderMembers)">Delete</button>
        </td>
      </tr>
    `).join('')}
  `;
}

// ----------------------
// On Page Load
// ----------------------
window.onload = function() {
  loadState();
  renderBooks();
  renderMembers();
};
