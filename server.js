const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());

// Tickets laden
function loadTickets() {
  return JSON.parse(fs.readFileSync("tickets.json"));
}

// Tickets speichern
function saveTickets(tickets) {
  fs.writeFileSync("tickets.json", JSON.stringify(tickets, null, 2));
}

// Ticket erstellen
app.post("/api/ticket", (req, res) => {
  const tickets = loadTickets();

  const newTicket = {
    id: Date.now(),
    category: req.body.category,
    subject: req.body.subject,
    message: req.body.message,
    status: "open",
    created: new Date().toISOString()
  };

  tickets.push(newTicket);
  saveTickets(tickets);

  res.json({ success: true, ticket: newTicket });
});

// Alle Tickets abrufen
app.get("/api/tickets", (req, res) => {
  res.json(loadTickets());
});

// Einzelnes Ticket abrufen
app.get("/api/ticket/:id", (req, res) => {
  const tickets = loadTickets();
  const ticket = tickets.find(t => t.id == req.params.id);
  res.json(ticket || {});
});

// Server starten
app.listen(3000, () => console.log("Backend läuft auf http://localhost:3000"));
