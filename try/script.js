const staffBtn = document.getElementById('staff-btn');
const studentBtn = document.getElementById('student-btn');
const loginForm = document.getElementById('login-form');
const staffRegistrationForm = document.getElementById('staff-registration-form');
const loginMessage = document.getElementById('login-message');
const registrationMessage = document.getElementById('registration-message');
const portalEntry = document.getElementById('portal-entry');
const qaPlatform = document.getElementById('qa-platform');
const postQuestionBtn = document.getElementById('postQuestionBtn');
const questionInput = document.getElementById('questionInput');
const questionsList = document.getElementById('questionsList');
const logoutTopBtn = document.getElementById('logout-top-btn');

const allowedStudents = new Set([
    'student1@example.com',
    'student2@example.com'
]);

const staffDb = {
    'staff1@school.edu': { password: 'staffpass123', name: 'Dr. Smith' }
};

const questionsByStaff = {};
let userRole = '';

function showInitialState() {
    portalEntry.classList.remove('hidden');
    qaPlatform.classList.add('hidden');
    loginForm.classList.add('hidden');
    staffRegistrationForm.classList.add('hidden');
    logoutTopBtn.classList.add('hidden');
}

function showLoggedInState() {
    portalEntry.classList.add('hidden');
    qaPlatform.classList.remove('hidden');
    logoutTopBtn.classList.remove('hidden');
    displayQuestions();
}

function displayQuestions() {
    questionsList.innerHTML = '';
    for (const staff in staffDb) {
        const section = document.createElement('div');
        section.className = 'staff-section';

        const name = document.createElement('h3');
        name.className = 'staff-name';
        name.textContent = staffDb[staff].name;
        section.appendChild(name);

        (questionsByStaff[staff] || []).forEach(q => {
            const div = document.createElement('div');
            div.className = 'question';
            div.textContent = q;
            section.appendChild(div);
        });

        questionsList.appendChild(section);
    }
}

staffBtn.onclick = () => {
    userRole = 'staff';
    loginForm.classList.add('hidden');
    staffRegistrationForm.classList.remove('hidden');
};

studentBtn.onclick = () => {
    userRole = 'student';
    staffRegistrationForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
};

loginForm.onsubmit = e => {
    e.preventDefault();
    const email = emailInput.value;
    const pass = password.value;

    if (userRole === 'student' && allowedStudents.has(email)) {
        showLoggedInState();
    } else if (userRole === 'staff' && staffDb[email]?.password === pass) {
        showLoggedInState();
    } else {
        loginMessage.textContent = 'Invalid credentials';
        loginMessage.className = 'message error';
    }
};

staffRegistrationForm.onsubmit = e => {
    e.preventDefault();
    staffDb[staffEmail.value] = {
        name: staffName.value,
        password: staffPassword.value
    };
    registrationMessage.textContent = 'Registered successfully';
    registrationMessage.className = 'message success';
};

postQuestionBtn.onclick = () => {
    const q = questionInput.value.trim();
    if (!q) return;
    questionsByStaff['staff1@school.edu'] ??= [];
    questionsByStaff['staff1@school.edu'].push(q);
    questionInput.value = '';
    displayQuestions();
};

logoutTopBtn.onclick = showInitialState;

showInitialState();
