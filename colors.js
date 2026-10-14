```javascript
// Zet RGB-waarden om naar een hexadecimale kleur
function berekenHex() {
    const rood = Number(document.getElementById("rood").value);
    const groen = Number(document.getElementById("groen").value);
    const blauw = Number(document.getElementById("blauw").value);

    // Controleer of de waarden binnen het toegestane bereik liggen
    const waarden = [rood, groen, blauw];

    if (waarden.some(v => !Number.isInteger(v) || v < 0 || v > 255)) {
        alert("Vul voor rood, groen en blauw een heel getal tussen 0 en 255 in.");
        return;
    }

    // Elke waarde wordt omgezet naar twee hexadecimale tekens
    const hex = "#" + waarden
        .map(v => v.toString(16).padStart(2, "0"))
        .join("")
        .toUpperCase();

    document.getElementById("hexResultaat").textContent = "Hex: " + hex;
    document.getElementById("kleurVoorbeeld").style.backgroundColor = hex;
}
```