// Array of initial quotes
const quotes = [
  {
    text: "The best way to predict the future is to create it.",
    category: "Motivation",
  },
  {
    text: "Do what you can, with what you have, where you are.",
    category: "Inspiration",
  },
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    category: "Perseverance",
  },
];

// Function to display a random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  // Display the quote
  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = `<p><strong>${quote.text}</strong></p><p><em>Category: ${quote.category}</em></p>`;
}

// Function to create a form for adding new quotes
function createAddQuoteForm() {
  const formContainer = document.createElement("div");
  formContainer.id = "quoteForm";

  formContainer.innerHTML = `
        <h2>Add a New Quote</h2>
        <input type="text" id="newQuoteText" placeholder="Enter quote text" required>
        <input type="text" id="newQuoteCategory" placeholder="Enter category" required>
        <button id="addQuoteButton">Add Quote</button>
    `;

  document.body.appendChild(formContainer);

  // Add event listener for the new quote submission
  document
    .getElementById("addQuoteButton")
    .addEventListener("click", function () {
      const text = document.getElementById("newQuoteText").value.trim();
      const category = document.getElementById("newQuoteCategory").value.trim();

      if (text && category) {
        quotes.push({ text, category });
        alert("Quote added successfully!");
        document.getElementById("newQuoteText").value = "";
        document.getElementById("newQuoteCategory").value = "";
        showRandomQuote(); // Show newly added quote
      } else {
        alert("Please enter both text and category.");
      }
    });
}

// Attach event listeners after the DOM loads
document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("newQuote")
    .addEventListener("click", showRandomQuote);
  createAddQuoteForm();
  showRandomQuote(); // Display an initial quote
});

// #2 Retrieve quotes from local storage or use default quotes
const defaultQuotes = [
  {
    text: "The best way to predict the future is to create it.",
    category: "Motivation",
  },
  {
    text: "Do what you can, with what you have, where you are.",
    category: "Inspiration",
  },
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    category: "Perseverance",
  },
];

const quote = JSON.parse(localStorage.getItem("quote")) || defaultQuotes;

// Function to save quotes to local storage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quote));
}

// Function to display a random quote
function showRandomQuote() {
  if (quote.length === 0) return;

  const randomIndex = Math.floor(Math.random() * quote.length);
  const quotez = quote[randomIndex];

  // Save the last viewed quote in session storage
  sessionStorage.setItem("lastViewedQuote", JSON.stringify(quotez));

  // Display the quote
  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = `<p><strong>${quotez.text}</strong></p><p><em>Category: ${quote.category}</em></p>`;
}

// Function to restore the last viewed quote from session storage
function restoreLastViewedQuote() {
  const lastQuote = sessionStorage.getItem("lastViewedQuote");
  if (lastQuote) {
    const quotez = JSON.parse(lastQuote);
    const quoteDisplay = document.getElementById("quoteDisplay");
    quoteDisplay.innerHTML = `<p><strong>${quotez.text}</strong></p><p><em>Category: ${quote.category}</em></p>`;
  } else {
    showRandomQuote();
  }
}

// Function to create a form for adding new quotes
function createAddQuoteForm() {
  const formContainer = document.createElement("div");
  formContainer.id = "quoteForm";

  formContainer.innerHTML = `
        <h2>Add a New Quote</h2>
        <input type="text" id="newQuoteText" placeholder="Enter quote text" required>
        <input type="text" id="newQuoteCategory" placeholder="Enter category" required>
        <button id="addQuoteButton">Add Quote</button>
    `;

  document.body.appendChild(formContainer);

  // Event listener for adding a new quote
  document
    .getElementById("addQuoteButton")
    .addEventListener("click", function () {
      const text = document.getElementById("newQuoteText").value.trim();
      const category = document.getElementById("newQuoteCategory").value.trim();

      if (text && category) {
        quotes.push({ text, category });
        saveQuotes(); // Save to local storage
        alert("Quote added successfully!");
        document.getElementById("newQuoteText").value = "";
        document.getElementById("newQuoteCategory").value = "";
        showRandomQuote(); // Show newly added quote
      } else {
        alert("Please enter both text and category.");
      }
    });
}

// Function to export quotes to a JSON file
function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const downloadLink = document.createElement("a");
  downloadLink.href = url;
  downloadLink.download = "quotes.json";
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}

// Function to import quotes from a JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();

  fileReader.onload = function (event) {
    try {
      const importedQuotes = JSON.parse(event.target.result);
      if (Array.isArray(importedQuotes)) {
        quotes.push(...importedQuotes);
        saveQuotes();
        alert("Quotes imported successfully!");
        showRandomQuote(); // Refresh display
      } else {
        alert("Invalid file format. Please upload a valid JSON file.");
      }
    } catch (error) {
      alert("Error reading file. Make sure it is a valid JSON file.");
    }
  };

  fileReader.readAsText(event.target.files[0]);
}

// Attach event listeners after the DOM loads
document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("newQuote")
    .addEventListener("click", showRandomQuote);
  createAddQuoteForm();

  // Create Import and Export buttons
  const controls = document.createElement("div");
  controls.innerHTML = `
        <h2>Import / Export Quotes</h2>
        <input type="file" id="importFile" accept=".json" onchange="importFromJsonFile(event)">
        <button id="exportButton">Export Quotes</button>
    `;
  document.body.appendChild(controls);

  document
    .getElementById("exportButton")
    .addEventListener("click", exportToJsonFile);

  restoreLastViewedQuote(); // Restore the last viewed quote from session storage
});
