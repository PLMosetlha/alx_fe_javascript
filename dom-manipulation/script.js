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
