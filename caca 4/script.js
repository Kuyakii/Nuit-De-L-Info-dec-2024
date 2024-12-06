const textPeau = "La peau et les océans partagent plusieurs similitudes. Tous deux couvrent une vaste étendue : la peau enveloppe tout le corps humain, tandis que les océans couvrent 71 % de la Terre. Ils servent de barrières protectrices : la peau protège le corps contre les agressions extérieures et régule la température, tout comme les océans régulent le climat et absorbent la chaleur. Tous deux sont dynamiques et interconnectés : la peau est un organe vivant qui se renouvelle constamment, tandis que les océans, en perpétuelle circulation, influencent les conditions climatiques et environnementales.\n"
const textSang = "Le système cardiovasculaire et les rivières fonctionnent de manière similaire en assurant la circulation des éléments vitaux. Les artères, comme les grandes rivières, transportent le sang (ou l'eau) vers des destinations importantes, tandis que les veines agissent comme des affluents, ramenant le sang (ou l'eau) vers un point central. Les rivières irriguent les terres et soutiennent les écosystèmes, tout comme le système cardiovasculaire nourrit les organes et tissus du corps en leur fournissant oxygène et nutriments. Les deux systèmes sont essentiels à la survie, permettant la distribution et la régulation des ressources nécessaires. "
const textPoumons = "Les phytoplanctons sont les poumons invisibles de notre planète, respirant au cœur des océans. Tandis que nous respirons pour vivre, ces derniers, minuscules sentinelles marines,produisent l'oxygène essentiel à notre souffle. Si les poumons humains s’essoufflent sous la pollution, les poumons océaniques, eux, luttent aussi contre les menaces de la dégradation. Tout comme nos poumons dépendent de l’air, notre air dépend des océans. En protégeant ces minuscules créatures marines, nous préservons le souffle vital de la Terre.\n"
const corpsImage = document.querySelector("#corps")
const zoomImage = document.querySelector(".zoom-image");
const righttext = document.querySelector(".right-text");
const diapo = document.querySelector("#diapo")
righttext.innerText = textPeau

    window.addEventListener("scroll", function () {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    const scrollPercent = (scrollY / (docHeight - windowHeight));



    let scale = 1 + (scrollPercent);
    //righttext.style.opacity = 0;
    zoomImage.style.transform = `scale(${scale})`;
    const scrollThresholdPeau = 0.8;
    const scrollThresholdPoumons = 1.0;

        diapo.src = "caca 4img/peau"

    if(scrollPercent>=scrollThresholdPoumons){
        corpsImage.src ="caca 4/img/corps-humain.webp"
        righttext.innerText = textPoumons
        corpsImage.style.transform =` translateY(450px) scale(${1+3*scrollPercent})`
        diapo.src = "caca 4/img/vegetaux.jpg"
    }
    else if (scrollPercent >= scrollThresholdPeau) {
        corpsImage.src ="caca 4/img/corps-humain.webp"
        righttext.innerText = textSang
        diapo.src = "caca 4/img/river.jpg"
    }
    else  {
        corpsImage.src ="caca 4/img/Corps-peau-humain.png"
        righttext.innerText = textPeau
        diapo.src = "caca 4/img/ocean.jpg"
    }
});

const imagesDiapo = diapo.querySelectorAll("img");

function ajusterAffichageImages() {
    // Vérifier la largeur de la fenêtre
    const largeurFenetre = window.innerWidth;

    // Si la largeur est inférieure à 922 pixels, cacher toutes les images
    if (largeurFenetre < 922) {
        imagesDiapo.forEach(image => {
            image.style.display = "none";
        });
    } else {
        // Sinon, afficher toutes les images
        imagesDiapo.forEach(image => {
            image.style.display = "block"; // ou "inline-block" en fonction du besoin
        });
    }
}

ajusterAffichageImages();

window.addEventListener("resize", ajusterAffichageImages);
