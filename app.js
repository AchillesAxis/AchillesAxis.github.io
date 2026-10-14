```javascript
// Verander het kleuraccent van de website
function veranderAccent(kleur) {
    document.documentElement.style.setProperty("--accent", kleur);
}

// Schakel tussen licht en donker
function veranderThema(donker) {
    document.body.classList.toggle("dark", donker);
}

// Verander de achtergrondkleur
function veranderAchtergrond(kleur) {
    document.documentElement.style.setProperty("--achtergrond", kleur);
}

// Verander de naam die op de website wordt getoond
function veranderNaam(naam) {
    const kop = document.getElementById("welkomstNaam");

    if (kop && naam.trim() !== "") {
        kop.textContent = "Welkom in de wereld van " + naam + "!";
    }
}
```