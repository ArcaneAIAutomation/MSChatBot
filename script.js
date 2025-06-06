// Chatbot questions with enhanced and conversational tone
const questions = [
    {
        id: 'welcome',
        text: "Hi there! 👋 I'm your Microsoft Solutions Review Assistant. Let's work together to make sure you're getting the most out of your Microsoft investments. Ready? Let's get started!",
        type: 'message'
    },
    {
        id: 'organisation',
        text: "What's the name of your organisation?",
        type: 'text'
    },
    {
        id: 'priorities',
        text: "What are the biggest strategic priorities or challenges your organisation is focusing on right now?",
        type: 'text'
    },
    {
        id: 'goals',
        text: "What are your top business goals for the next 6–12 months?",
        type: 'text'
    },
    {
        id: 'consequences',
        text: "If these challenges aren't addressed in the next 6–12 months, what could happen?",
        type: 'text'
    },
    {
        id: 'current_support',
        text: "How are Microsoft solutions currently helping you achieve your goals?",
        type: 'text'
    },
    {
        id: 'upcoming_projects',
        text: "Are there any upcoming projects where Microsoft technologies could make a difference?",
        type: 'text'
    },
    {
        id: 'current_products',
        text: "Which Microsoft products and services are you currently using?",
        type: 'text'
    },
    {
        id: 'adoption_rate',
        text: "On a scale from 1 (Very Low) to 5 (Very High), how would you rate adoption of Microsoft tools across your teams?",
        type: 'rating',
        options: [1, 2, 3, 4, 5]
    },
    {
        id: 'underutilised',
        text: "Are there any Microsoft tools or features you think are underused in your organisation?",
        type: 'text'
    },
    {
        id: 'training',
        text: "Do your employees receive enough training and support to use Microsoft tools effectively?",
        type: 'options',
        options: ['Yes', 'No', 'Not Sure']
    },
    {
        id: 'technical_issues',
        text: "Are you experiencing any technical issues or performance concerns with Microsoft products?",
        type: 'text'
    },
    {
        id: 'integrations',
        text: "Are there any integrations or customisations that could be improved?",
        type: 'text'
    },
    {
        id: 'security_confidence',
        text: "How confident are you in your current security setup with Microsoft?",
        type: 'rating',
        options: [1, 2, 3, 4, 5],
        labels: ['Not Confident', '', '', '', 'Very Confident']
    },
    {
        id: 'security_tools',
        text: "Which of these Microsoft security and compliance tools are you using?",
        type: 'multiple',
        options: ['Microsoft Defender', 'Microsoft Entra', 'Microsoft Purview', 'None']
    },
    {
        id: 'audits',
        text: "Do you have any upcoming audits or regulatory requirements we should know about?",
        type: 'text'
    },
    {
        id: 'license_value',
        text: "Do you feel you're getting full value from your current Microsoft licensing?",
        type: 'options',
        options: ['Yes', 'No', 'Not Sure']
    },
    {
        id: 'license_review',
        text: "Have you reviewed your license usage recently to find potential savings?",
        type: 'options',
        options: ['Yes', 'No', 'Not Sure']
    },
    {
        id: 'optimization_interest',
        text: "Would you be interested in a licensing or cost optimisation review?",
        type: 'options',
        options: ['Yes', 'No', 'Maybe']
    },
    {
        id: 'ai_exploration',
        text: "Are you exploring AI, automation, or data analytics with Microsoft tools?",
        type: 'text'
    },
    {
        id: 'innovation_interest',
        text: "Would you like to learn more about Microsoft Copilot, Fabric, or other new innovations?",
        type: 'options',
        options: ['Yes', 'No', 'Maybe']
    },
    {
        id: 'future_tech',
        text: "What future capabilities or technologies are you considering for your organisation?",
        type: 'text'
    },
    {
        id: 'better_support',
        text: "How can Trustmarque better support your organisation?",
        type: 'text'
    },
    {
        id: 'gaps',
        text: "Are there any gaps in communication or service delivery you'd like to highlight?",
        type: 'text'
    },
    {
        id: 'roadmap_session',
        text: "Would you be open to a roadmap session or executive briefing?",
        type: 'options',
        options: ['Yes', 'No', 'Maybe']
    },
    {
        id: 'thank_you',
        text: "Thank you for sharing your insights! We appreciate your time and look forward to helping you achieve your goals.",
        type: 'message'
    }
];

// Chatbot state management
let currentQuestionIndex = 0;
let userResponses = {};
let typingTimer;
const messageContainer = document.getElementById('messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-btn');

// Initialize chatbot
document.addEventListener('DOMContentLoaded', () => {
    // Start conversation
    showNextQuestion();
    
    // Event listeners
    sendButton.addEventListener('click', handleUserInput);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUserInput();
        }
    });
});

// Display the next question
function showNextQuestion() {
    if (currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex];
        showTypingIndicator();
        
        // Simulate typing delay for a more natural conversation feel
        setTimeout(() => {
            removeTypingIndicator();
            addBotMessage(question.text);
            
            if (question.type === 'options') {
                displayOptions(question.options);
            } else if (question.type === 'rating') {
                displayRatingOptions(question.options, question.labels);
            } else if (question.type === 'multiple') {
                displayMultipleOptions(question.options);
            } else if (question.type === 'text') {
                // Text input is handled by the default input field
                userInput.focus();
            } else if (question.type === 'message') {
                // This is just a bot message, move to next question
                currentQuestionIndex++;
                setTimeout(showNextQuestion, 1000);
            }
        }, 1000);
    } else {
        // End of questions - could add code to submit responses to a server here
        console.log('All responses:', userResponses);
        
        // For demo purposes, show a download option
        const downloadBtn = document.createElement('button');
        downloadBtn.textContent = 'Download Responses';
        downloadBtn.className = 'bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 mt-4 mx-auto block';
        downloadBtn.addEventListener('click', () => {
            downloadResponses();
        });
        messageContainer.appendChild(downloadBtn);
        
        // Add Microsoft Form submit button
        const msFormBtn = document.createElement('button');
        msFormBtn.textContent = 'Submit to Microsoft Form';
        msFormBtn.className = 'bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 mt-4 mx-auto block';
        msFormBtn.addEventListener('click', () => {
            submitToMicrosoftForm();
        });
        messageContainer.appendChild(msFormBtn);
    }
}

// Handle user's text input
function handleUserInput() {
    const question = questions[currentQuestionIndex];
    const userValue = userInput.value.trim();
    
    if (userValue === '' && question.type === 'text') {
        // Don't proceed if text input is empty
        return;
    }
    
    // Save response
    userResponses[question.id] = userValue;
    
    // Display user's message in chat
    addUserMessage(userValue);
    
    // Clear input and prepare for next question
    userInput.value = '';
    currentQuestionIndex++;
    
    // Move to next question after a short delay
    setTimeout(showNextQuestion, 500);
}

// Add a bot message to the chat
function addBotMessage(text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message bot-message';
    messageDiv.textContent = text;
    messageContainer.appendChild(messageDiv);
    scrollToBottom();
}

// Add a user message to the chat
function addUserMessage(text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message user-message';
    messageDiv.textContent = text;
    messageContainer.appendChild(messageDiv);
    scrollToBottom();
}

// Display option buttons for choice questions
function displayOptions(options) {
    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'options-container flex flex-wrap justify-center mt-4';
    
    options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.className = 'option-button';
        button.addEventListener('click', () => {
            // Mark selected
            document.querySelectorAll('.option-button').forEach(btn => {
                btn.classList.remove('selected');
            });
            button.classList.add('selected');
            
            // Save response and continue
            userResponses[questions[currentQuestionIndex].id] = option;
            addUserMessage(option);
            
            // Remove options after selection
            optionsContainer.remove();
            
            // Move to next question
            currentQuestionIndex++;
            setTimeout(showNextQuestion, 500);
        });
        optionsContainer.appendChild(button);
    });
    
    messageContainer.appendChild(optionsContainer);
    scrollToBottom();
}

// Display rating options (1-5)
function displayRatingOptions(options, labels) {
    const ratingContainer = document.createElement('div');
    ratingContainer.className = 'rating-buttons';
    
    options.forEach((value, index) => {
        const button = document.createElement('button');
        button.textContent = value;
        button.className = 'rating-button';
        button.setAttribute('title', labels && labels[index] ? labels[index] : value);
        
        button.addEventListener('click', () => {
            // Mark selected
            document.querySelectorAll('.rating-button').forEach(btn => {
                btn.classList.remove('selected');
            });
            button.classList.add('selected');
            
            // Save response and continue
            userResponses[questions[currentQuestionIndex].id] = value;
            addUserMessage(`Rating: ${value}${labels && labels[index] ? ` (${labels[index]})` : ''}`);
            
            // Remove options after selection
            ratingContainer.remove();
            
            // Move to next question
            currentQuestionIndex++;
            setTimeout(showNextQuestion, 500);
        });
        
        ratingContainer.appendChild(button);
    });
    
    // Add labels if provided
    if (labels && labels.length > 0) {
        const labelContainer = document.createElement('div');
        labelContainer.className = 'flex justify-between w-full text-xs text-gray-500 mt-1';
        
        if (labels[0]) {
            const leftLabel = document.createElement('span');
            leftLabel.textContent = labels[0];
            labelContainer.appendChild(leftLabel);
        }
        
        if (labels[labels.length - 1]) {
            const rightLabel = document.createElement('span');
            rightLabel.textContent = labels[labels.length - 1];
            labelContainer.appendChild(rightLabel);
        }
        
        ratingContainer.appendChild(labelContainer);
    }
    
    messageContainer.appendChild(ratingContainer);
    scrollToBottom();
}

// Display multiple choice options with checkboxes
function displayMultipleOptions(options) {
    const multipleContainer = document.createElement('div');
    multipleContainer.className = 'multiple-container flex flex-col items-start mt-4';
    
    const selectedOptions = [];
    
    options.forEach(option => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'flex items-center mb-2';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `option-${option.replace(/\s+/g, '-').toLowerCase()}`;
        checkbox.className = 'mr-2';
        
        const label = document.createElement('label');
        label.htmlFor = checkbox.id;
        label.textContent = option;
        
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                selectedOptions.push(option);
            } else {
                const index = selectedOptions.indexOf(option);
                if (index > -1) {
                    selectedOptions.splice(index, 1);
                }
            }
        });
        
        optionDiv.appendChild(checkbox);
        optionDiv.appendChild(label);
        multipleContainer.appendChild(optionDiv);
    });
    
    // Add a "Continue" button
    const continueBtn = document.createElement('button');
    continueBtn.textContent = 'Continue';
    continueBtn.className = 'bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 mt-2';
    
    continueBtn.addEventListener('click', () => {
        if (selectedOptions.length === 0) {
            selectedOptions.push('None selected');
        }
        
        // Save response and continue
        userResponses[questions[currentQuestionIndex].id] = selectedOptions;
        addUserMessage(`Selected: ${selectedOptions.join(', ')}`);
        
        // Remove options after selection
        multipleContainer.remove();
        
        // Move to next question
        currentQuestionIndex++;
        setTimeout(showNextQuestion, 500);
    });
    
    multipleContainer.appendChild(continueBtn);
    messageContainer.appendChild(multipleContainer);
    scrollToBottom();
}

// Show typing indicator
function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'typing-indicator';
    typingDiv.id = 'typing-indicator';
    
    for (let i = 0; i < 3; i++) {
        const dot = document.createElement('span');
        typingDiv.appendChild(dot);
    }
    
    messageContainer.appendChild(typingDiv);
    scrollToBottom();
}

// Remove typing indicator
function removeTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) {
        indicator.remove();
    }
}

// Scroll chat to bottom
function scrollToBottom() {
    const chatContainer = document.getElementById('chat-container');
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Download responses as JSON
function downloadResponses() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(userResponses, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "microsoft_solutions_review.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

// --- Microsoft Forms Integration ---
// Map chatbot responses to Microsoft Form fields
function submitToMicrosoftForm() {
    // Replace with your Form's field IDs (input names)
    const formUrl = 'https://forms.office.com/pages/responsepage.aspx?id=BVQxqp-0bEq1TH-ksg24C2nHUlzSC0VFrB0DI0xiu95UMVFBNE85V1RNUzJZWk1CNDg0VDM1UlRaUi4u';
    // Microsoft Forms expects POST to a specific endpoint with field names like 'entry.1234567890'
    // Unfortunately, Microsoft Forms does not officially support direct POST from JS due to CORS.
    // The best workaround is to open the Form prefilled with answers using query params.

    // Map your chatbot questions to Form field IDs (replace with your actual Form field IDs)
    const fieldMap = {
        organisation: '1',
        priorities: '2',
        goals: '3',
        consequences: '4',
        current_support: '5',
        upcoming_projects: '6',
        current_products: '7',
        adoption_rate: '8',
        underutilised: '9',
        training: '10',
        technical_issues: '11',
        integrations: '12',
        security_confidence: '13',
        security_tools: '14',
        audits: '15',
        license_value: '16',
        license_review: '17',
        optimization_interest: '18',
        ai_exploration: '19',
        innovation_interest: '20',
        future_tech: '21',
        better_support: '22',
        gaps: '23',
        roadmap_session: '24'
    };

    // Build prefill query string (replace with actual field names from your Form)
    const params = new URLSearchParams();
    Object.keys(fieldMap).forEach(key => {
        if (userResponses[key]) {
            params.append(`field${fieldMap[key]}`, userResponses[key]);
        }
    });
    // Open the Form with prefilled answers in a new tab
    window.open(`${formUrl}&${params.toString()}`, '_blank');
}
