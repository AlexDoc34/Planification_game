console.log("script.js loaded");
// Initialisation des ressources
let budget = 50000;
let time = 30;
let satisfaction = 50;
let planningUnlocked = false;
let tasksUnlocked = false;

const logElem = document.getElementById("log");
const budgetElem = document.getElementById("budget");
const timeElem = document.getElementById("time");
const satisfactionElem = document.getElementById("satisfaction");
const planBtn = document.getElementById("planBtn");
const manageTasksBtn = document.getElementById("manageTasksBtn");

// Mise à jour de l'interface utilisateur
function updateUI() {
    budgetElem.textContent = `${budget}€`;
    timeElem.textContent = `${time} jours`;
    satisfactionElem.textContent = `${satisfaction}%`;

    // Débloquer la planification après une certaine progression
    if (!planningUnlocked && time <= 25) {
        planningUnlocked = true;
        planBtn.disabled = false;
        logMessage("🔓 Planification débloquée ! Vous pouvez maintenant planifier le projet.");
    }

    // Débloquer la gestion des tâches après une planification réussie
    if (!tasksUnlocked && planningUnlocked && satisfaction >= 60) {
        tasksUnlocked = true;
        manageTasksBtn.disabled = false;
        logMessage("🔓 Gestion des tâches débloquée ! Vous pouvez structurer votre projet.");
    }
}

// Journal des événements
function logMessage(message) {
    const p = document.createElement("p");
    p.textContent = message;
    logElem.appendChild(p);
    logElem.scrollTop = logElem.scrollHeight;
}

// Action : Réagir à un aléa
function reactToEvent() {
    if (time > 0) {
        const event = generateRandomEvent();
        handleEvent(event);
    } else {
        logMessage("⏳ Plus de temps pour réagir aux aléas !");
    }
    updateUI();
    checkEndConditions();
}

// Action : Planifier le projet
function startPlanning() {
    if (budget >= 10000 && time >= 5) {
        budget -= 10000;
        time -= 5;
        satisfaction += 15;
        logMessage("✅ Vous avez planifié le projet. Les aléas sont moins fréquents !");
    } else {
        logMessage("❌ Ressources insuffisantes pour planifier.");
    }
    updateUI();
}

// Action : Gérer les tâches
function manageTasks() {
    if (budget >= 15000 && time >= 7) {
        budget -= 15000;
        time -= 7;
        satisfaction += 25;
        logMessage("✅ Gestion des tâches effectuée avec succès !");
    } else {
        logMessage("❌ Ressources insuffisantes pour gérer les tâches.");
    }
    updateUI();
}

// Génération d'aléas aléatoires
function generateRandomEvent() {
    const events = [
        { description: "Un fournisseur est en retard.", impact: { budget: -2000, time: -3, satisfaction: -5 } },
        { description: "Un client demande une modification urgente.", impact: { budget: -5000, time: -2, satisfaction: -10 } },
        { description: "Une météo favorable accélère les travaux.", impact: { budget: 0, time: 2, satisfaction: 5 } },
        { description: "Un problème technique ralentit l'avancement.", impact: { budget: -3000, time: -4, satisfaction: -8 } }
    ];
    return events[Math.floor(Math.random() * events.length)];
}

// Gestion des aléas
function handleEvent(event) {
    logMessage(`⚡ ${event.description}`);
    budget += event.impact.budget;
    time += event.impact.time;
    satisfaction += event.impact.satisfaction;

    // Limiter satisfaction entre 0 et 100
    satisfaction = Math.max(0, Math.min(100, satisfaction));
}

// Vérification des conditions de fin de jeu
function checkEndConditions() {
    if (satisfaction >= 80 && budget >= 0 && time >= 0) {
        logMessage("🎉 Félicitations ! Vous avez livré le projet avec succès !");
        disableButtons();
    } else if (time <= 0) {
        logMessage("⏳ Temps écoulé ! Le projet est un échec.");
        disableButtons();
    } else if (budget <= 0) {
        logMessage("💸 Budget épuisé ! Le projet est un échec.");
        disableButtons();
    }
}

// Désactivation des boutons à la fin du jeu
function disableButtons() {
    const buttons = document.querySelectorAll("#actions button");
    buttons.forEach(button => button.disabled = true);
}
