let userData = {
    level: 1,
    experience: 0,
    strength: 10,
    endurance: 15,
    flexibility: 8,
    quests: {
      quest1: false,
      quest2: false,
    },
    inventory: ['protein_shake', 'energy_bar']
  };
  
  function loadUserData() {
    const data = localStorage.getItem('user_data');
    if (data) {
      userData = JSON.parse(data);
    }
    updateDisplay();
  }
  
  function saveUserData() {
    localStorage.setItem('user_data', JSON.stringify(userData));
  }
  
  function updateDisplay() {
    document.getElementById('level').textContent = userData.level;
    document.getElementById('experience').textContent = userData.experience;
    document.getElementById('strength').textContent = userData.strength;
    document.getElementById('endurance').textContent = userData.endurance;
    document.getElementById('flexibility').textContent = userData.flexibility;
    const experienceFill = document.querySelector('.experience-fill');
    experienceFill.style.width = (userData.experience / 100) * 100 + '%';
  
    // Update quest checkboxes
    for (const [questId, completed] of Object.entries(userData.quests)) {
      const questInput = document.getElementById(questId);
      if (questInput) questInput.checked = completed;
    }
  }
  
  function checkLevelUp() {
    const requiredExperience = 100; // Fixed for simplicity, can be level-based
    while (userData.experience >= requiredExperience) {
      userData.level += 1;
      userData.experience -= requiredExperience;
      alert(`Level up! You are now level ${userData.level}!`);
    }
    updateDisplay();
    saveUserData();
  }
  
  document.querySelectorAll('.quests input[type="checkbox"]').forEach(quest => {
    const questId = quest.id;
    quest.addEventListener('change', () => {
      if (quest.checked && !userData.quests[questId]) {
        userData.quests[questId] = true;
        const reward = parseInt(quest.nextElementSibling.nextElementSibling.textContent.replace('+', '').replace(' XP', '')) || 0;
        userData.experience += reward;
        checkLevelUp();
      } else if (!quest.checked && userData.quests[questId]) {
        userData.quests[questId] = false;
      }
      saveUserData();
    });
  });
  
  loadUserData();