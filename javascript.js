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

const theHobbit = new Book('The Hobbit','Tolkien','295' ,false);
const theHobbits = new Book('The Hobbitss','Tolkiensss','295' ,false);

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
    clearContent();
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
    
  if (info.type === 'text' ||info.type === 'number'){
      infoArray.push(info.value)
  }else{
      if(info.checked === false){
        infoArray.push(false)
      }else{
        infoArray.push(true)
      }
  }});

  if(infoArray.includes('')){
    let index = infoArray.indexOf('');
    let missingField = ''
    if(index === 0){
      missingField = 'title'
    } else if(index === 1){
      missingField = 'author'
    }else if(index === 2){
      missingField = 'number of pages'
    }
    alert(`The ${missingField} is missing`)
  }else{
    return infoArray
  }
 
}

/* Makes the book object and adds it to the library */
let makeBook = (info) =>{
  const book = new Book(info[0],info[1],info[2],info[3]);
  addBookToLibrary(book)
}
/* Book */
addBook.addEventListener('click',()=>{
  try {
    let info = checkValues();
    makeBook(info);
    createBookCards(myLibrary);
    
    /* closes the overlay */
    const modal = document.querySelector('.modal.active')
    clearContent()
    closeModal(modal)
  } catch (error) {
    console.log(error)
  }}
)

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
  let bookCardHeader = document.createElement('div');
  bookCardHeader.classList.add('bookCardHeader');
  let bookCardContents = document.createElement('div');
  bookCardContents.classList.add('bookCardContents')

  /* Title of the book */
  let title = document.createElement('div');
  title.classList.add('cardText');
  title.textContent = book.title;
  bookCardHeader.appendChild(title);

  /* Adds the remove feauture of the list */
  let delBook = document.createElement('i')
  delBook.setAttribute('class',"material-icons custom")
  delBook.textContent='delete'
  delBook.addEventListener('click',()=>{
    removeBook(book);
  })


  bookCardHeader.appendChild(delBook);
  bookCard.appendChild(bookCardHeader);

  /*Author*/
  let author = document.createElement('div');
  author.classList.add('cardText');
  author.textContent = `Author: ${book.author}`;
  bookCardContents.appendChild(author);

  /*pages*/
  let pages = document.createElement('div');
  pages.classList.add('cardText');
  pages.textContent = `Pages: ${book.pages}`;
  bookCardContents.appendChild(pages);

  /* read */
  let read = document.createElement('i')
  read.setAttribute('class',"material-icons custom")
  read.textContent = 'book';
  if (book.read=== true){
    read.style.color = 'green'
  }else{
    read.style.color = 'white'
  }
  bookCardContents.appendChild(read);

  /* Test button for read status */
    /* read */

    read.addEventListener('click',() => {
      changeStatus(book)
      console.log(book.read)
    })

    bookCard.appendChild(bookCardContents);
  return bookCard
} 

/* Removes Book from screen */
let removeBook = (book) =>{
  let index = myLibrary.indexOf(book);
  console.log(index);
  console.log(myLibrary);
  myLibrary.splice(index,1)
  console.log(myLibrary);
  createBookCards(myLibrary);
}
/*Clears content of the form */
let clearContent = () => {
  let  bookInfo = document.getElementsByClassName('inputs')
  Array.from(bookInfo).forEach(book => {
    if (book.type === 'text' || book.type === 'number'){
      book.value = ''
    }else{
      book.checked = false
    }
  }
)};
/* Changes the status from read to not read */
let changeStatus = (book) =>{
  if(book.read === false){
    book.read = true
  }else{
    book.read= false
  }
  createBookCards(myLibrary)
}




/* Intializes app */
createBookCards(myLibrary);
