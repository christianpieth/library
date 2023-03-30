document.addEventListener("DOMContentLoaded", function(event) {

const bookForm = document.getElementById("book-form")
const saveBtn = document.getElementById("submit")
const clearBtn = document.getElementById("clear");
const downloadPdfBtn = document.getElementById("download-pdf");
downloadPdfBtn.addEventListener("click", downloadPdf);

clearBtn.addEventListener("click", function(event) {
  localStorage.removeItem("books");
  renderBooks(); // Aktualisiere die Listendarstellung, um die gelöschten Bücher zu entfernen
});

saveBtn.addEventListener("click", function(event) {
    event.preventDefault();
    //Zugriff auf Eingabefelder
    const nameInput = document.getElementById("name")
    const autorInput = document.getElementById("autor")
    const genreInput = document.getElementById("genre")
    // Speicher der Inhalte in ein JS-Objekt
    const book = {
        name: nameInput.value,
        autor: autorInput.value,
        genre: genreInput.value
    }
    // Leereingaben verhindern
    if (!nameInput.value || !autorInput.value || !genreInput.value) {
        // Ein oder mehrere Felder sind leer, tue nichts und gib eine Fehlermeldung aus
        alert("Bitte füllen Sie alle Felder aus.");
        return;
      }


    let booksArray = [];
    if (localStorage.getItem("books")) {
      //Laden der aktuellen Liste
      booksArray = JSON.parse(localStorage.getItem("books"));
    }

    booksArray.push(book);
    localStorage.setItem("books", JSON.stringify(booksArray)); //Speichern des Arrays

    //Clear Input Fields
    nameInput.value = "";
    autorInput.value = "";
    genreInput.value = "";

    //Listendarstellung aktualisieren
    renderBooks();
  });
  function renderBooks() {
    bookList.innerHTML = ""; //löscht die alte Listendarstellung
    let booksArray = [];
    if (localStorage.getItem("books")) {
      booksArray = JSON.parse(localStorage.getItem("books"));
    }
    //Sortieren des Arrays alphabetisch nach dem Buchtitel
    booksArray.sort(function(a, b) {
      var nameA = a.name.toUpperCase(); // Groß-/Kleinschreibung ignorieren
      var nameB = b.name.toUpperCase(); // Groß-/Kleinschreibung ignorieren
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0; // Namen sind gleich
    });
    //Erstellen der Listendarstellung
    booksArray.forEach(function(book) {
      const li = document.createElement("li");
      li.textContent = `${book.name} von ${book.autor} (${book.genre})`;
      bookList.appendChild(li);
    });
  }
  renderBooks();
})

function downloadPdf() {
  const doc = new jsPDF();
  const listItems = document.querySelectorAll("#bookList li");
  let y = 20;

  listItems.forEach(function(item) {
    doc.text(20, y, item.textContent);
    y += 10;
  });

  doc.save("book-list.pdf");
}



// Inhalte der Liste als PDF downloaden
// Als Email versenden --> wahrscheinlich wesentlich komplexer. 