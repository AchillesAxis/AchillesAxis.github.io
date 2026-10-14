```javascript
// Houd de score bij
let doelpunten = 0;
let reddingen = 0;
let bezig = false;

// Speel één penalty
function schiet(richting) {
    if (bezig) return;

    bezig = true;

    const richtingen = ["links", "midden", "rechts"];
    const keeper = richtingen[Math.floor(Math.random() * richtingen.length)];

    const keeperEmoji = document.getElementById("keeper");
    const bal = document.getElementById("bal");
    const status = document.getElementById("spelStatus");

    keeperEmoji.textContent = keeper === "links" ? "🧤⬅️"
        : keeper === "rechts" ? "➡️🧤" : "🧤";

    bal.textContent = richting === "links" ? "⚽⬅️"
        : richting === "rechts" ? "➡️⚽" : "⚽⬆️";

    if (richting === keeper) {
        reddingen++;
        status.textContent = "De keeper redt jouw schot!";
    } else {
        doelpunten++;
        status.textContent = "GOAL! Je hebt gescoord!";
    }

    document.getElementById("score").textContent =
        "Doelpunten: " + doelpunten + " | Reddingen: " + reddingen;

    // Geef de speler even tijd voordat de volgende penalty mag
    setTimeout(() => {
        bezig = false;
        keeperEmoji.textContent = "🧤";
        bal.textContent = "⚽";
    }, 900);
}

// Zet de score terug naar nul
function resetSpel() {
    doelpunten = 0;
    reddingen = 0;
    bezig = false;

    document.getElementById("score").textContent =
        "Doelpunten: 0 | Reddingen: 0";
    document.getElementById("spelStatus").textContent =
        "Klaar voor de penalty!";
    document.getElementById("keeper").textContent = "🧤";
    document.getElementById("bal").textContent = "⚽";
}
```