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

console.log(myLibrary);



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
    const modal = button.closest('.modal')
    closeModal(modal)
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