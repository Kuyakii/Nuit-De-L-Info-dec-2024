const canvas = document.getElementById('waterCanvas');
const ctx = canvas.getContext('2d');

// Adapter la taille du canvas à la taille de l'écran
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Variables pour simuler les vagues
const waveHeight = 25;
const waveSpeed = 0.1;
const waveCount = 3;  // Nombre de vagues superposées pour plus de réalisme
let offset = 0;

// Fonction pour dessiner l'effet d'eau
function drawWater() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Effacer le canvas à chaque frame

    // Dégradé pour l'eau
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#1E90FF');  // Couleur de l'eau en haut (bleu clair)
    gradient.addColorStop(0.7, '#4682B4');  // Couleur de l'eau au milieu (bleu moyen)
    gradient.addColorStop(1, '#1C3D55');  // Couleur plus sombre pour le fond de l'eau

    ctx.fillStyle = gradient;
    ctx.beginPath();

    // Créer les vagues
    for (let x = 0; x < canvas.width; x++) {
        let y = 0;

        // Ajouter plusieurs vagues de hauteur et vitesse différentes
        for (let i = 0; i < waveCount; i++) {
            y += Math.sin(x * 0.03 + offset + (i * 2)) * (waveHeight - i * 5);
        }

        // Ajuster la position verticale des vagues pour les superposer
        y += canvas.height / 2;

        ctx.lineTo(x, y);
    }

    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.closePath();

    ctx.fill(); // Remplir la forme de la vague

    // Animer la vague
    offset += waveSpeed; // Déplacer la vague pour simuler le mouvement
    requestAnimationFrame(drawWater); // Appeler la fonction pour l'animation
}

// Démarrer l'animation
drawWater();