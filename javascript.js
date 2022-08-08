


let myLibrary = [];


/* Book constructor */
function Book(title,author,pages,read){
    this.title = title;
    this.author = author;
    this.pages  = pages;
    this.read   = read;
    this.info = function(){
        return(`${title} by ${author} , ${pages} pages , ${read}`)
    }
}

/* Adds book into library */
let addBookToLibrary = (book) =>{
    myLibrary.push(book)
}

const theHobbit = new Book('The Hobbit','Tolkien','295' ,'not read yet');
const theHobbits = new Book('The Hobbitss','Tolkiensss','295' ,'not read yet');



addBookToLibrary(theHobbit);
addBookToLibrary(theHobbits);



/* Modal and popup windows */
const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

openModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = document.querySelector(button.dataset.modalTarget)
    openModal(modal)
  })
})

overlay.addEventListener('click', () => {
  const modals = document.querySelectorAll('.modal.active')
  modals.forEach(modal => {
    closeModal(modal)
  })
})

closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal');
    closeModal(modal);
  })
})

function openModal(modal) {
  if (modal == null) return
  modal.classList.add('active')
  overlay.classList.add('active')
}

function closeModal(modal) {
  if (modal == null) return
  modal.classList.remove('active')
  overlay.classList.remove('active')
}

/* DOm elements */
const content = document.querySelector('.content')


/*Add book to array*/
const addBook = document.getElementById('add');



/*Gets all the info of input box*/
let checkValues = () =>{
  let  bookInfo = Array.from(document.getElementsByClassName('inputs'));
  let infoArray = [];
  bookInfo.forEach(info => {
    infoArray.push(info.value)
  });
  return infoArray
}

/* Makes the book object and adds it to the library */
let makeBook = (info) =>{
  const book = new Book(info[0],info[1],info[2],info[3]);
  addBookToLibrary(book)
}


/* Book */
addBook.addEventListener('click',()=>{
    let info = checkValues();
    makeBook(info);
    createBookCards(myLibrary);
    
    /* closes the overlay */
    const modal = document.querySelector('.modal.active')
    closeModal(modal)
})

/* Creates the book cards */
let createBookCards = (myLibrary) =>{
  document.querySelectorAll('.bookCard').forEach(e => e.remove());
  myLibrary.forEach(book => {
      /* Creates grid element with id */
      let bookCard = createCard(book)
      bookCard.classList.add("bookCard");
      bookCard.setAttribute('id',`${book.title}`)
      content.appendChild(bookCard);
  });
}

/* creates card */
let createCard = (book) => {
  
  let bookCard = document.createElement('div');

  /* Title of the book */
  let title = document.createElement('div');
  title.classList.add('cardText');
  title.textContent = book.title;
  bookCard.appendChild(title);

  /* Adds the remove feauture of the list */
  let removeBook = document.createElement('button')
  removeBook.classList.add('removeButton');
  removeBook.textContent='h'
  removeBook.addEventListener('click',() => {
    console.log(book.title)
  })
  bookCard.appendChild(removeBook);

  /*Author*/
  let author = document.createElement('div');
  author.classList.add('cardText');
  author.textContent = book.author;
  bookCard.appendChild(author);

  /*pages*/
  let pages = document.createElement('div');
  pages.classList.add('cardText');
  pages.textContent = book.pages;
  bookCard.appendChild(pages);

  /* read */
  let read = document.createElement('div')
  read.classList.add('cardText');
  read.textContent = book.read;
  bookCard.appendChild(read);

  return bookCard
} 


/* Intializes app */
createBookCards(myLibrary)
