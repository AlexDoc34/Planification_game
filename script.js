console.log("script.js loaded");
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

function updateUI() {
    budgetElem.textContent = budget;
    timeElem.textContent = time;
    satisfactionElem.textContent = satisfaction;

    // Débloquer la planification après une certaine progression
    if (!planningUnlocked && time <= 20) {
        planningUnlocked = true;
        planBtn.disabled = false;
        logMessage("🔓 Planification débloquée ! Investissez pour organiser votre projet.");
    }

    // Débloquer la gestion des tâches après une planification réussie
    if (!tasksUnlocked && planningUnlocked && budget >= 40000) {
        tasksUnlocked = true;
        manageTasksBtn.disabled = false;
        logMessage("🔓 Gestion des tâches débloquée ! Vous pouvez maintenant structurer votre projet.");
    }
}

function logMessage(message) {
    const p = document.createElement("p");
    p.textContent = message;
    logElem.appendChild(p);
    logElem.scrollTop = logElem.scrollHeight;
}

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

function startPlanning() {
    if (budget >= 10000 && time >= 5) {
        budget -= 10000;
        time -= 5;
        satisfaction += 20;
        logMessage("✅ Planification réalisée : les futurs aléas auront moins d'impact !");
    } else {
        logMessage("❌ Ressources insuffisantes pour planifier le projet.");
    }
    updateUI();
}

function manageTasks() {
    if (budget >= 15000 && time >= 7) {
        budget -= 15000;
        time -= 7;
        satisfaction += 30;
        logMessage("✅ Gestion des tâches effectuée avec succès !");
    } else {
        logMessage("❌ Ressources insuffisantes pour gérer les tâches.");
    }
    updateUI();
}

function generateRandomEvent() {
    const events = [
        { description: "Un retard de livraison cause des problèmes.", impact: { budget: -3000, time: -5, satisfaction: -10 } },
        { description: "Un client demande une modification urgente.", impact: { budget: -5000, time: -3, satisfaction: -10 } },
        { description: "Bonne météo : gain de temps.", impact: { budget: 0, time: 2, satisfaction: 5 } },
        { description: "Une équipe découvre une inefficacité.", impact: { budget: -2000, time: -2, satisfaction: -5 } }
    ];
    return events[Math.floor(Math.random() * events.length)];
}

function handleEvent(event) {
    logMessage(`⚡ ${event.description}`);
    budget += event.impact.budget;
    time += event.impact.time;
    satisfaction += event.impact.satisfaction;
    satisfaction = Math.max(0, Math.min(100, satisfaction)); // Limiter satisfaction entre 0 et 100
}

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

function disableButtons() {
    const buttons = document.querySelectorAll("#actions button");
    buttons.forEach(button => button.disabled = true);
}
