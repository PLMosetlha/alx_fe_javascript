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

// #3 Function to save quotes to local storage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Function to populate the category dropdown
function populateCategories() {
  const categoryFilter = document.getElementById("categoryFilter");
  const uniqueCategories = ["all", ...new Set(quotes.map((q) => q.category))];

  categoryFilter.innerHTML = uniqueCategories
    .map((cat) => `<option value="${cat}">${cat}</option>`)
    .join("");

  // Restore last selected category filter
  const savedFilter = localStorage.getItem("selectedCategory") || "all";
  categoryFilter.value = savedFilter;
}

// Function to filter and display quotes by category
function filterQuotes() {
  const selectedCategory = document.getElementById("categoryFilter").value;
  localStorage.setItem("selectedCategory", selectedCategory); // Save filter selection

  const filteredQuotes =
    selectedCategory === "all"
      ? quotes
      : quotes.filter((q) => q.category === selectedCategory);

  if (filteredQuotes.length > 0) {
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const quote = filteredQuotes[randomIndex];

    document.getElementById("quoteDisplay").innerHTML = `
            <p><strong>${quote.text}</strong></p>
            <p><em>Category: ${quote.category}</em></p>
        `;
  } else {
    document.getElementById("quoteDisplay").textContent =
      "<p>No quotes available in this category.</p>";
  }
}

// Function to add a new quote
function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();

  if (text && category) {
    quotes.push({ text, category });
    saveQuotes(); // Save to local storage
    populateCategories(); // Update dropdown
    alert("Quote added successfully!");
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
    filterQuotes(); // Refresh display
  } else {
    alert("Please enter both text and category.");
  }
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
        populateCategories(); // Update dropdown
        alert("Quotes imported successfully!");
        filterQuotes(); // Refresh display
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
  document.getElementById("newQuote").addEventListener("click", filterQuotes);
  document.getElementById("addQuoteButton").addEventListener("click", addQuote);
  document
    .getElementById("exportButton")
    .addEventListener("click", exportToJsonFile);

  populateCategories();
  filterQuotes();
});

// #4 Syncing data with server and implementing conflict Resolution
const SERVER_URL = "https://jsonplaceholder.typicode.com/posts"; // Using JSONPlaceholder as mock API
const SYNC_INTERVAL = 60000; // Sync every 60 seconds

// Function to save quotes to local storage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// 🔹 Fetch Quotes from JSONPlaceholder
async function fetchQuotesFromServer() {
  try {
    const response = await fetch(SERVER_URL);
    if (!response.ok) throw new Error("Failed to fetch data from server");

    const serverQuotes = await response.json();
    mergeQuotes(serverQuotes);
  } catch (error) {
    console.error("Error fetching server quotes:", error);
  }
}

// 🔹 Merge Server Quotes into Local Storage
function mergeQuotes(serverQuotes) {
  let updated = false;

  serverQuotes.forEach((serverQuote) => {
    const text = serverQuote.title; // JSONPlaceholder uses 'title' instead of 'text'
    const category = "General"; // JSONPlaceholder doesn't have categories, assigning default

    const existingIndex = quotes.findIndex((q) => q.text === text);

    if (existingIndex === -1) {
      // New quote from server, add it
      quotes.push({ text, category });
      updated = true;
    }
  });

  if (updated) {
    saveQuotes();
    showNotification("Quotes updated from server!");
    populateCategories();
    filterQuotes();
  }
}

// 🔹 Show User Notification
function showNotification(message) {
  const notification = document.createElement("div");
  notification.innerText = message;
  notification.style.cssText =
    "position:fixed;top:10px;right:10px;background:#28a745;color:white;padding:10px;border-radius:5px;";

  document.body.appendChild(notification);

  setTimeout(() => {
    document.body.removeChild(notification);
  }, 3000);
}

// 🔹 Sync Local Quotes to Server
async function syncQuotesToServer() {
  try {
    const response = await fetch(SERVER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "New Quote",
        body: "Example quote",
        userId: 1,
      }), // Mocked data
    });

    if (!response.ok) throw new Error("Failed to sync data to server");

    showNotification("Local quotes synced with server!");
  } catch (error) {
    console.error("Error syncing quotes:", error);
  }
}

// 🔹 Start Auto Sync Every 60 Seconds
function startAutoSync() {
  fetchQuotesFromServer(); // Initial fetch
  setInterval(fetchQuotesFromServer, SYNC_INTERVAL);
}

// 🔹 Event Listeners After DOM Loads
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("newQuote").addEventListener("click", filterQuotes);

  if (document.getElementById("addQuoteButton")) {
    document.getElementById("addQuoteButton").addEventListener("click", () => {
      addQuote();
      syncQuotesToServer(); // Sync new quote to server
    });
  }

  if (document.getElementById("exportButton")) {
    document
      .getElementById("exportButton")
      .addEventListener("click", exportToJsonFile);
  }

  populateCategories();
  filterQuotes();
  startAutoSync(); // Start auto-syncing
});
