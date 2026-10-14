```javascript
// Zet een plaatsnaam om naar coördinaten met de geocoding-API
async function zoekCoordinaten(plaats) {
    const url = "https://geocoding-api.open-meteo.com/v1/search?name="
        + encodeURIComponent(plaats) + "&count=1&language=nl&format=json";

    const antwoord = await fetch(url);
    if (!antwoord.ok) throw new Error("De plaats kon niet worden opgezocht.");

    const gegevens = await antwoord.json();

    if (!gegevens.results || gegevens.results.length === 0) {
        throw new Error("Geen plaats gevonden. Probeer een andere naam.");
    }

    return gegevens.results[0];
}

// Haal het actuele weer en de verwachting op
async function laadWeer() {
    const status = document.getElementById("status");
    const plaats = document.getElementById("plaats").value.trim();

    if (!plaats) {
        status.textContent = "Vul eerst een plaatsnaam in.";
        return;
    }

    status.textContent = "Weergegevens worden geladen...";

    try {
        const locatie = await zoekCoordinaten(plaats);
        const url = "https://api.open-meteo.com/v1/forecast"
            + "?latitude=" + locatie.latitude
            + "&longitude=" + locatie.longitude
            + "&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code"
            + "&hourly=temperature_2m"
            + "&forecast_days=1"
            + "&timezone=auto";

        const antwoord = await fetch(url);
        if (!antwoord.ok) throw new Error("De weer-API reageert niet.");

        const weer = await antwoord.json();
        const huidig = weer.current;

        document.getElementById("temperatuur").textContent =
            "Temperatuur in " + locatie.name + ": "
            + huidig.temperature_2m + " °C";

        document.getElementById("omstandigheden").textContent =
            "Gevoelstemperatuur: " + huidig.apparent_temperature
            + " °C | Luchtvochtigheid: "
            + huidig.relative_humidity_2m + "%";

        document.getElementById("wind").textContent =
            "Windsnelheid: " + huidig.wind_speed_10m + " km/u";

        status.textContent = "Weergegevens succesvol geladen.";
        tekenGrafiek(weer.hourly.time, weer.hourly.temperature_2m);
    } catch (fout) {
        status.textContent = "Fout: " + fout.message;
    }
}

// Teken een eenvoudige temperatuur-grafiek met Canvas
function tekenGrafiek(tijden, temperaturen) {
    const canvas = document.getElementById("weerGrafiek");
    const context = canvas.getContext("2d");

    // Zorg dat de grafiek op kleine schermen past
    const breedte = canvas.clientWidth || 700;
    const hoogte = 300;
    const verhouding = window.devicePixelRatio || 1;

    canvas.width = breedte * verhouding;
    canvas.height = hoogte * verhouding;
    context.scale(verhouding, verhouding);

    const waarden = temperaturen.slice(0, 24);
    const labels = tijden.slice(0, 24);

    if (waarden.length === 0) return;

    const minimum = Math.min(...waarden) - 2;
    const maximum = Math.max(...waarden) + 2;
    const links = 35;
    const rechts = breedte - 15;
    const boven = 20;
    const onder = hoogte - 35;

    context.clearRect(0, 0, breedte, hoogte);
    context.font = "12px Arial";
    context.strokeStyle = "#9aa4b7";
    context.fillStyle = getComputedStyle(document.body).color;

    // Teken de horizontale hulplijnen
    for (let i = 0; i <= 4; i++) {
        const y = boven + (onder - boven) * i / 4;
        context.beginPath();
        context.moveTo(links, y);
        context.lineTo(rechts, y);
        context.stroke();

        const waarde = maximum - (maximum - minimum) * i / 4;
        context.fillText(waarde.toFixed(0) + "°", 2, y + 4);
    }

    // Teken de temperatuur als een lijn
    context.strokeStyle = "#536dfe";
    context.lineWidth = 3;
    context.beginPath();

    waarden.forEach((waarde, index) => {
        const x = links + index * (rechts - links) / Math.max(1, waarden.length - 1);
        const y = onder - (waarde - minimum) / (maximum - minimum) * (onder - boven);

        if (index === 0) context.moveTo(x, y);
        else context.lineTo(x, y);

        if (index % 4 === 0) {
            context.fillStyle = getComputedStyle(document.body).color;
            context.fillText(labels[index].slice(11, 16), x - 12, hoogte - 10);
        }
    });

    context.stroke();
}

// Laad bij het openen alvast het weer voor Amsterdam
laadWeer();

// Teken de grafiek opnieuw als het venster van grootte verandert
window.addEventListener("resize", () => laadWeer());
```