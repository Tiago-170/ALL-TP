const Api = "https://v2.jokeapi.dev/joke/Any?lang=fr&blacklistFlags=nsfw,religious,political,racist,sexist,explicit";
// API

async function recupererBlague(api) {
    const reponse = await fetch(api);
    if (!reponse.ok) {
        throw new Error(`${reponse.status}`);
    }
    const donnees = await reponse.json();
    const deuxParties = donnees.type === "twopart";
    return {
        id: donnees.id ?? Date.now(),
        categorie: donnees.category,
        introduction: deuxParties
            ? donnees.setup
            : donnees.joke,
        reponse: deuxParties
            ? donnees.delivery
            : "-"
    };
}

// Tableau
function creerTableau(nomsColonnes, conteneur = document.getElementById("container")) {
    const conteneurTableau = document.createElement("div");
    conteneurTableau.className = "w-full overflow-x-auto max-h-[70vh] overflow-y-auto";

    const tableau = document.createElement("table");
    tableau.className = "w-full border-collapse text-left text-sm text-gray-700";

    const enTete = document.createElement("thead");
    enTete.className = "bg-gray-100 sticky top-0 z-10";

    const ligneEnTete = document.createElement("tr");

    nomsColonnes.forEach(nomColonne => {
        const cellule = document.createElement("th");

        cellule.textContent = nomColonne;

        cellule.className =
            "px-4 py-3 font-semibold text-gray-900 border-b border-gray-300";

        ligneEnTete.appendChild(cellule);
    });

    enTete.appendChild(ligneEnTete);

    const corpsTableau = document.createElement("tbody");
    corpsTableau.className = "divide-y divide-gray-200 bg-white";

    tableau.appendChild(enTete);
    tableau.appendChild(corpsTableau);

    conteneurTableau.appendChild(tableau);
    conteneur.appendChild(conteneurTableau);

    return corpsTableau;
}

function ajouterLigne(corpsTableau, valeurs) {
    const ligne = document.createElement("tr");
    ligne.className = "hover:bg-gray-50 transition-colors";

    valeurs.forEach(valeur => {
        const cellule = document.createElement("td");
        cellule.className = "px-4 py-3 border-b border-gray-200";

        if (valeur instanceof HTMLElement) {
            cellule.appendChild(valeur);
        } else {
            cellule.textContent = valeur ?? "";
        }

        ligne.appendChild(cellule);
    });

    corpsTableau.appendChild(ligne);

    return ligne;
}

// Bouton supprimer

function creerBoutonSuppression(idBlague, blagues) {
    const bouton = document.createElement("button");
    bouton.textContent = "Supprimer";
    bouton.className = "px-2.5 py-1 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 hover:text-red-700 rounded transition-colors cursor-pointer";

    bouton.addEventListener("click", evenement => {
        const index = blagues.findIndex(
            blague => blague.id === idBlague
        );

        if (index !== -1) {
            blagues.splice(index, 1);
        }

        const ligne = evenement.target.closest("tr");

        if (ligne) {
            ligne.remove();
        }
    });

    return bouton;
}

// Affichage d'une blague

function afficherBlague(blague, corpsTableau, blagues) {
    const boutonSuppression = creerBoutonSuppression(blague.id, blagues);

    ajouterLigne(corpsTableau, [
        blague.categorie,
        blague.introduction,
        blague.reponse,
        boutonSuppression
    ]);
}

    // Initialisation

async function debut() {
    const boutonBlague = document.getElementById("JokeBtn");

    const corpsTableau = creerTableau([
        "Catégorie",
        "Setup",
        "Delivery",
        "Action"
    ]);

    // Les blagues existent uniquement pendant la session
    let blagues = [];

    // Récupérer la première blague
    try {
        const premiereBlague =
            await recupererBlague(Api);

        blagues.push(premiereBlague);

        afficherBlague(
            premiereBlague,
            corpsTableau,
            blagues
        );

    } catch (erreur) {
        console.error("Erreur :", erreur);
    }

    // Récupérer une nouvelle blague
    boutonBlague.addEventListener(
        "click",
        async () => {
            try {
                boutonBlague.disabled = true;

                const nouvelleBlague =
                    await recupererBlague(Api);

                blagues.push(nouvelleBlague);

                afficherBlague(
                    nouvelleBlague,
                    corpsTableau,
                    blagues
                );

            } catch (erreur) {
                console.error("Erreur :", erreur);

            } finally {
                boutonBlague.disabled = false;
            }
        }
    );
}

debut();