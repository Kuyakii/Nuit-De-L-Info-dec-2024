let count = 0;
let item1 = 0;
let item2 = 0;
let item3 = 0;
let item4 = 0; // Compteur pour AutoClicker
let item5 = 0; // Compteur pour Resetter
let item6 = 0; // Compteur pour Baguettes
let click = 0;
let chiant = 10;
let drumShrinkStep = 0.9; // Facteur de réduction
let minDrumSize = 50; // Taille minimale du tambour en pourcentage
let shrinkChance = 0.5; // Chance de rétrécissement à chaque clic (50%)
let champiTaille = 200; // Taille ajoutée au tambour à chaque champi acheté
let confinementActive = false; // Indicateur de confinement
let sticksBroken = false; // Indicateur de baguettes cassées

// Récupération de l'image, du compteur et des sons
const image = document.getElementById('clickableImage');
const counter = document.getElementById('counter');
const clickSound = document.getElementById('clickSound');
const buySound1 = document.getElementById('buySound1');
const buySound2 = document.getElementById('buySound2');
const buySound3 = document.getElementById('buySound3');
const buySound4 = document.getElementById('buySound4');
const buySound5 = document.getElementById('buySound5'); // Nouveau
const buySound6 = document.getElementById('buySound6'); // Nouveau
const autoClickerContainer = document.getElementById('autoClickerContainer'); // Nouveau
const confinementTimer = document.createElement('div'); // Timer de confinement

// Configuration du timer de confinement
confinementTimer.id = 'confinementTimer';
confinementTimer.style.position = 'fixed';
confinementTimer.style.top = '10px';
confinementTimer.style.left = '10px';
confinementTimer.style.backgroundColor = 'red';
confinementTimer.style.color = 'white';
confinementTimer.style.padding = '5px';
confinementTimer.style.display = 'none';
document.body.appendChild(confinementTimer);

// Ajout de l'événement de clic
image.addEventListener('click', () => {
  if (sticksBroken) {
    alert("Vos baguettes sont cassées ! Achetez-en de nouvelles pour 2 points.");
    return;
  }

  const add = item1 + 1;
  click += 1;

  count += add;
  counter.textContent = count; // Mise à jour du compteur
  clickSound.play(); // Jouer le son

  // Vérifie si le tambour doit rétrécir
  if (Math.random() < shrinkChance && image.clientWidth > minDrumSize) {
    image.style.width = `${image.clientWidth * drumShrinkStep}px`;
  }

  // Vérifie si l'événement confinement doit être déclenché
  if (!confinementActive && Math.random() < 0.05) { // 5% de chance de déclencher le confinement
    startConfinement();
  }

  // Vérifie si les baguettes doivent se casser
  if (Math.random() < 0.1) { // 10% de chance de casser les baguettes
    breakSticks();
  }

  if (click % chiant === 0) {
    alert(`Bravo, Vous avez cliqué ${count} fois !`);
  }
  if (count === 69) {
    alert('Nice !');
  }

  // Génération de nouvelles positions aléatoires
  const x = Math.floor(Math.random() * window.innerWidth);
  const y = Math.floor(Math.random() * window.innerHeight);

  // Application des nouvelles positions à l'image
  image.style.position = 'absolute';
  image.style.left = `${x}px`;
  image.style.top = `${y}px`;
});

// Code pour rendre le menu déroulant déplaçable verticalement
const menu = document.getElementById('draggableMenu');
const menuItems = document.querySelectorAll('.menuItem');
let isDragging = false;
let startDragging = false;
let offsetY = 0;
let fallInterval;

menu.addEventListener('mousedown', (e) => {
  if (!confinementActive) {
    isDragging = true;
    startDragging = false; // Initialiser le début du drag à false
    clearInterval(fallInterval); // Arrête toute animation en cours
    offsetY = e.clientY - menu.getBoundingClientRect().top;
  }
});

// Code JavaScript pour afficher le pop-up de bienvenue
window.onload = function() {
  document.getElementById('welcomePopup').style.display = 'block';
};

function closePopup() {
  document.getElementById('welcomePopup').style.display = 'none';
}

// Code JavaScript pour afficher/masquer la bulle d'info
const infoButton = document.getElementById('infoButton');
const infoBubble = document.getElementById('infoBubble');

infoButton.addEventListener('click', () => {
  if (infoBubble.style.display === 'none' || !infoBubble.style.display) {
    infoBubble.style.display = 'block';
  } else {
    infoBubble.style.display = 'none';
  }
});





document.addEventListener('mousemove', (e) => {
  if (isDragging) {
    // Commence à afficher les items seulement après avoir détecté un mouvement suffisant
    if (!startDragging) {
      const moveY = Math.abs(e.clientY - (menu.getBoundingClientRect().top + offsetY));
      if (moveY > 5) { // Seuil de 5 pixels pour détecter le drag
        startDragging = true;
        menuItems.forEach((item) => item.style.display = 'block');
      }
    }

    if (startDragging) {
      menu.style.top = `${e.clientY - offsetY}px`;
    }
  }
});

document.addEventListener('mouseup', (e) => {
  if (isDragging) {
    isDragging = false;
    startDragging = false; // Réinitialiser le début du drag
    initiateFall();
  }
});

function initiateFall() {
  fallInterval = setInterval(() => {
    let menuTop = parseInt(menu.style.top.replace('px', ''));
    if (menuTop < window.innerHeight - menu.clientHeight) {
      menu.style.top = `${menuTop + 5}px`; // Ajustez la valeur pour contrôler la vitesse de chute
    } else {
      clearInterval(fallInterval); // Arrête l'animation lorsque le menu atteint le bas de l'écran
      menuItems.forEach((item) => item.style.display = 'none'); // Masque les items lorsque le menu retombe
    }
  }, 30); // Ajustez la fréquence de l'intervalle pour contrôler la fluidité de l'animation
}

// Fonction pour acheter un item
function buyItem(cost, itemNumber) {
  if (count >= cost) {
    count -= cost;
    counter.textContent = count; // Mise à jour du compteur
    alert(`Item ${itemNumber} acheté pour ${cost} points !`);
    
    // Joue le son approprié pour chaque item
    if (itemNumber === 1) {
      buySound1.play();
   
      performActionForItem1();
    } else if (itemNumber === 2) {
      buySound2.play();
     
      performActionForItem2();
    } else if (itemNumber === 3) {
      buySound3.play();
     
      performActionForItem3();
    } else if (itemNumber === 4) {
      buySound4.play();
      
      performActionForItem4();
    } else if (itemNumber === 5) {
      buySound5.play();
      
      performActionForItem5(); // Action pour Resetter
    } else if (itemNumber === 6) {
       buySound6.play();
      
      performActionForItem6(); // Action pour Baguettes
    }

    // Ajoute des micro-transactions farfelues
    if (Math.random() < 0.2) { // 20% de chance de voir une micro-transaction
      prompt("Achetez cet item invisible pour 100 points !"); // Juste pour s'amuser
    }

    // Met à jour les compteurs d'items
    updateItemCounters();
  } else {
    alert("Pas assez de points pour acheter cet item.");
  }
}

// Exemple d'action spécifique pour le premier item
function performActionForItem1() {
  ++item1;
}

function performActionForItem2() {
  chiant = Math.round(chiant * 1.5);
  ++item2;
}

function performActionForItem3() {
  image.style.width = `${image.clientWidth + champiTaille}px`;
  ++item3;
}

function performActionForItem4() {
  ++item4;
  addAutoClickers(item4);
  startAutoClicks();
}

// Ajouter une nouvelle fonction pour l'item Resetter
function performActionForItem5() {
  alert("BOUHOUHOU T'AS TOUT PERDU !");
  count = 0; // Réinitialiser le compteur
  counter.textContent = count; // Mise à jour du compteur
  ++item5;
}

// Ajouter une nouvelle fonction pour les baguettes
function performActionForItem6() {
  alert("Vous avez racheté des baguettes !");
  sticksBroken = false; // Réparer les baguettes
  ++item6;
  updateItemCounters(); // Mettre à jour les compteurs d'items
}

// Fonction pour casser les baguettes
function breakSticks() {
  alert("Oh non ! Vos baguettes se sont cassées. Achetez-en de nouvelles pour 2 points !");
  sticksBroken = true; // Indique que les baguettes sont cassées
}

// Fonction pour démarrer le confinement
function startConfinement() {
  confinementActive = true;
  confinementTimer.style.display = 'block';
  let confinementDuration = 10; // Durée du confinement en secondes
  confinementTimer.textContent = `Confinement, privé de boutique ! : ${confinementDuration} s`;

  let interval = setInterval(() => {
    confinementDuration--;
    confinementTimer.textContent = `Confinement, privé de boutique ! : ${confinementDuration} s`;
    if (confinementDuration <= 0) {
      clearInterval(interval);
      endConfinement();
    }
  }, 1000); // Mise à jour toutes les secondes
}

// Fonction pour terminer le confinement
function endConfinement() {
  confinementActive = false;
  confinementTimer.style.display = 'none';
}

function performActionForItem4() {
  
  ++item4;
  addAutoClickers(item4);
  startAutoClicks();
}

// Fonction pour ajouter des AutoClickers
function addAutoClickers(number) {
  for (let i = 0; i < number; i++) {
    const autoClicker = document.createElement('div');
    autoClicker.className = 'auto-clicker';
    autoClickerContainer.appendChild(autoClicker);
  }
}

// Fonction pour démarrer les clics automatiques
function startAutoClicks() {
  setInterval(() => {
    count += item4; // Ajoute un clic pour chaque AutoClicker
    counter.textContent = count; // Mise à jour du compteur
  }, 1000); // Intervalle de 1 seconde
}

// Met à jour les compteurs d'items affichés dans le menu
function updateItemCounters() {
  document.getElementById('itemCount1').textContent = item1;
  document.getElementById('itemCount2').textContent = item2;
  document.getElementById('itemCount3').textContent = item3;
  document.getElementById('itemCount4').textContent = item4;
  document.getElementById('itemCount5').textContent = item5; // Nouveau compteur pour Resetter
  document.getElementById('itemCount6').textContent = item6; // Nouveau compteur pour Baguettes
}

// Fonction pour obtenir une couleur aléatoire
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Fonction pour déplacer le bouton de clic de manière aléatoire
function moveButtonRandomly() {
  const randomX = Math.floor(Math.random() * (window.innerWidth - 200));
  const randomY = Math.floor(Math.random() * (window.innerHeight - 200));
  image.style.left = `${randomX}px`;
  image.style.top = `${randomY}px`;
}
