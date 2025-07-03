import "../css/style.css";

document.addEventListener("DOMContentLoaded", () => {
  const sectionBooks = document.querySelector("#show-books");

  const navbar = document.querySelector(".nav-list");
  const toggleBtn = document.querySelector(".menu-toggle");
  const closeBtn = document.querySelector(".menu-close");

  function toggleMenu(show) {
    navbar.classList.toggle("hidden", !show);
    closeBtn.classList.toggle("hidden", !show);
    toggleBtn.classList.toggle("hidden", show);
  }

  toggleBtn.addEventListener("click", () => toggleMenu(true));
  closeBtn.addEventListener("click", () => toggleMenu(false));

  const button = document.querySelector(".search-button");

  button.addEventListener("click", () => {
    search();
  });

  async function search() {
    const input = document.querySelector("#category");
    const category = input.value.trim().toLowerCase();

    if (!category) {
      alert("Inserisci una categoria prima di cercare.");
      return;
    }

    const { default: axios } = await import("axios");
    const { default: _ } = await import("lodash");

    const url = `https://openlibrary.org/subjects/${category}.json`;

    try {
      const response = await axios.get(url);
      const json = response.data;

      // Controllo che l'array dei libri esista e abbia elementi con Lodash
      if (!_.get(json, "works.length", 0)) {
        alert("Nessun libro trovato per questa categoria.");
        sectionBooks.style.display = "none";
        return;
      }

      // Mostro il contenitore solo dopo aver verificato che ci siano libri
      sectionBooks.style.display = "flex";
      sectionBooks.style.flexDirection = "column";
      sectionBooks.style.alignItems = "center";
      sectionBooks.style.justifyContent = "center";
      sectionBooks.innerHTML = "";

      json.works.forEach((book) => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");

        const titleElement = document.createElement("p");
        titleElement.classList.add("book-title");
        titleElement.textContent = book.title;

        const authorDiv = document.createElement("div");
        authorDiv.classList.add("book-authors");

        if (_.get(book, "authors.length", 0)) {
          book.authors.forEach((author) => {
            const authorElement = document.createElement("p");
            authorElement.textContent = `Autore: ${author.name}`;
            authorElement.classList.add("author-name");
            authorDiv.appendChild(authorElement);
          });
        } else {
          const authorElement = document.createElement("p");
          authorElement.textContent = "Autore non disponibile";
          authorDiv.appendChild(authorElement);
        }

        const descriptionButton = document.createElement("button");
        descriptionButton.classList.add("description-btn");
        descriptionButton.textContent = "Descrizione";

        const descriptionDiv = document.createElement("div");
        descriptionDiv.classList.add("book-description");

        const descriptionElement = document.createElement("p");
        descriptionDiv.appendChild(descriptionElement);

        descriptionButton.addEventListener("click", async () => {
          if (descriptionDiv.style.display === "block") {
            descriptionDiv.style.display = "none";
            return;
          }

          try {
            const secondUrl = `https://openlibrary.org${book.key}.json`;
            const secondResponse = await axios.get(secondUrl);
            const secondJson = secondResponse.data;

            let descriptionText = "Descrizione non disponibile";

            if (secondJson.description) {
              if (typeof secondJson.description === "string") {
                descriptionText = secondJson.description;
              } else if (secondJson.description.value) {
                descriptionText = secondJson.description.value;
              }
            }

            descriptionElement.textContent = `Descrizione: ${descriptionText}`;
            descriptionDiv.style.display = "block";
          } catch (error) {
            console.error("Errore nel recupero della descrizione:", error);
            descriptionElement.textContent =
              "Errore durante il recupero della descrizione.";
            descriptionDiv.style.display = "block";
          }
        });

        bookCard.appendChild(titleElement);
        bookCard.appendChild(authorDiv);
        bookCard.appendChild(descriptionButton);
        bookCard.appendChild(descriptionDiv);
        sectionBooks.appendChild(bookCard);
      });
    } catch (error) {
      console.error("Errore durante il fetch dei libri:", error);
      alert("Si è verificato un errore nel recupero dei dati.");
      sectionBooks.style.display = "none";
    }
  }
});
