let topicsData = {};
let currentTopic = null;
let currentSentenceIndex = 0;
let autoTimer = null;
let timerRunning = true;

const toggleTimerBtn = document.getElementById("toggleTimerBtn");

fetch("topics.json")
  .then(res => res.json())
  .then(data => {
    topicsData = data;
    showHomepage();
  });

function showHomepage() {
  clearAutoTimer();
  timerRunning = true;
  toggleTimerBtn.textContent = "Stop Timer";

  document.getElementById("homepage").style.display = "block";
  document.getElementById("topicView").style.display = "none";

  const coreTopicsContainer = document.getElementById("coreTopics");
  coreTopicsContainer.innerHTML = "";

  topicsData.categories.forEach(category => {
    const btn = document.createElement("button");
    btn.textContent = category.topics[0].name;
    btn.onclick = () => showTopic(category.topics[0].name);
    coreTopicsContainer.appendChild(btn);
  });
}

function showTopic(topicName) {
  document.getElementById("homepage").style.display = "none";
  document.getElementById("topicView").style.display = "block";

  currentTopic = findTopic(topicName);
  currentSentenceIndex = 0;
  displaySentence();
  startAutoTimer();
}

function displaySentence() {
  // Show current topic name above sentence
  document.getElementById("topicTitle").textContent = currentTopic.name;

  document.getElementById("sentenceContainer").textContent =
    currentTopic.sentences[currentSentenceIndex];

  // Related topics (exclude current)
  const relatedContainer = document.getElementById("relatedTopics");
  relatedContainer.innerHTML = "";

  let category = findCategory(currentTopic.name);
  category.topics
    .filter(t => t.name !== currentTopic.name)
    .forEach(t => {
      const btn = document.createElement("button");
      btn.textContent = t.name;
      btn.onclick = () => {
        clearAutoTimer();
        showTopic(t.name);
      };
      relatedContainer.appendChild(btn);
    });
}

function nextSentence() {
  if (currentSentenceIndex < currentTopic.sentences.length - 1) {
    currentSentenceIndex++;
    displaySentence();
  } else {
    // Move to next topic in the same category (loop if last)
    let category = findCategory(currentTopic.name);
    let topics = category.topics;
    let currentIndex = topics.findIndex(t => t.name === currentTopic.name);

    let nextIndex = (currentIndex + 1) % topics.length;  // wrap around
    currentTopic = topics[nextIndex];
    currentSentenceIndex = 0;
    displaySentence();
  }
}

function startAutoTimer() {
  clearAutoTimer();

  if (!timerRunning) return;

  const sentence = currentTopic.sentences[currentSentenceIndex];
  const wordsCount = sentence.trim().split(/\s+/).length;
  const delay = 2000 + wordsCount * 400; // 2 sec base + 400ms per word

  autoTimer = setTimeout(() => {
    nextSentence();
    startAutoTimer();
  }, delay);
}

function clearAutoTimer() {
  if (autoTimer) {
    clearTimeout(autoTimer);
    autoTimer = null;
  }
}

toggleTimerBtn.onclick = () => {
  if (timerRunning) {
    clearAutoTimer();
    timerRunning = false;
    toggleTimerBtn.textContent = "Start Timer";
  } else {
    timerRunning = true;
    toggleTimerBtn.textContent = "Stop Timer";
    startAutoTimer();
  }
};

document.getElementById("backBtn").onclick = () => {
  if (timerRunning) clearAutoTimer();
  if (currentSentenceIndex > 0) {
    currentSentenceIndex--;
    displaySentence();
  }
  if (timerRunning) startAutoTimer();
};

document.getElementById("nextBtn").onclick = () => {
  if (timerRunning) clearAutoTimer();
  nextSentence();
  if (timerRunning) startAutoTimer();
};

document.getElementById("homeBtn").onclick = () => {
  clearAutoTimer();
  timerRunning = true;
  toggleTimerBtn.textContent = "Stop Timer";
  showHomepage();
};

// Helpers
function findTopic(name) {
  for (let category of topicsData.categories) {
    for (let topic of category.topics) {
      if (topic.name === name) return topic;
    }
  }
  return null;
}

function findCategory(topicName) {
  return topicsData.categories.find(cat =>
    cat.topics.some(t => t.name === topicName)
  );
}
