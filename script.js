const questions = [
    {
        question: "Qual o maior desafio da sua rotina hoje?",
        options: ["Falta de tempo para brincar", "Excesso de telas em casa", "Falta de ideias do que fazer"],
        profile: "geral" 
    },
    {
        question: "Como seu filho reage quando está entediado?",
        options: ["Pede o celular/tablet", "Fica irritado ou agitado", "Inventa alguma brincadeira sozinho"],
        profile: "telas"
    },
    {
        question: "Quanto tempo de qualidade você consegue ter por dia?",
        options: ["Menos de 30 minutos", "Entre 30 min e 1 hora", "Mais de 1 hora"],
        profile: "tempo"
    },
    {
        question: "Qual tipo de atividade você prefere?",
        options: ["Algo rápido e sem bagunça", "Artes e pintura", "Brincadeiras ao ar livre"],
        profile: "criatividade"
    },
    {
        question: "O que você mais deseja para sua família?",
        options: ["Mais conexão e risadas", "Menos brigas e estresse", "Crianças mais independentes"],
        profile: "conexao"
    }
];

let currentQuestionIndex = 0;
const quizContainer = document.getElementById('quiz-container');
const resultContainer = document.getElementById('result-container');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const progressBar = document.getElementById('progress-bar');
const ctaButton = document.getElementById('cta-button');

// Check Local Storage
// Uncomment the line below to reset for testing purposes
// localStorage.removeItem('quizCompleted'); 

if (localStorage.getItem('quizCompleted') === 'true') {
    showResult(); 
} else {
    renderQuestion();
}

function renderQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    optionsContainer.innerHTML = '';

    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option-btn');
        button.addEventListener('click', () => handleAnswer(option));
        optionsContainer.appendChild(button);
    });

    updateProgressBar();
}

function updateProgressBar() {
    // Width represents % of questions answered OR current progress
    const progress = ((currentQuestionIndex) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

function handleAnswer(selectedOption) {
    // Here we could save the answer if needed for more complex profiling
    // For now, we just move to the next question
    
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        // Add a small delay/transition effect if desired, or just render immediately
        // Updating progress bar first creates a nice visual
        updateProgressBar();
        
        // Brief timeout for visual feedback (optional)
        setTimeout(() => {
            renderQuestion();
        }, 200); 
    } else {
        updateProgressBar();
        finishQuiz();
    }
}

function finishQuiz() {
    // Set 100% width on finish
    progressBar.style.width = '100%';
    
    // Save completion status
    localStorage.setItem('quizCompleted', 'true');
    
    setTimeout(() => {
        showResult();
    }, 400);
}

function showResult() {
    quizContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');
    
    // Example of dynamic result message (can be expanded based on answers)
    // For now, it's static as requested
}

// Add Affiliate Link Logic
ctaButton.addEventListener('click', (e) => {
    // e.preventDefault(); // Remove this when actual link is inserted
    
    // Replace '#' with your actual Hotmart/Kiwify link
    const affiliateLink = "https://www.hotmart.com/pt-br"; 
    
    // Open in new tab
    window.open(affiliateLink, '_blank');
});
