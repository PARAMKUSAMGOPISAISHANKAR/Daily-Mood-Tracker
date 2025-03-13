const moodButtons = document.querySelectorAll('.mood-button');
const body = document.body;
const moodList = document.getElementById('mood-list');

let moodHistory = JSON.parse(localStorage.getItem('moodHistory')) || [];

function updateMoodHistory() {
    moodList.innerHTML = '';
    moodHistory.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.mood} - ${item.date}`;
        moodList.appendChild(li);
    });
}

moodButtons.forEach(button => {
    button.addEventListener('click', () => {
        const mood = button.dataset.mood;
        const color = button.dataset.color;
        const emoji = button.dataset.emoji;

        body.style.backgroundColor = color;

        const date = new Date().toLocaleDateString();
        moodHistory.push({ mood: `${mood} ${emoji}`, date: date });
        localStorage.setItem('moodHistory', JSON.stringify(moodHistory));

        updateMoodHistory();
    });
});

updateMoodHistory();
