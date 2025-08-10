let data;
let currentTopic = null;
let currentCategory = null;
let currentSentenceIndex = 0;

async function loadData() {
  const response = await fetch('topics.json');
  data = await response.json();
  loadHomepage();
}

function loadHomepage() {
  const topicsContainer = document.getElementById('topics');
  topicsContainer.innerHTML = '';

  data.categories.forEach(category => {
    const coreTopic = category.topics[0];
    const btn = document.createElement('button');
    btn.textContent = coreTopic.name;
    btn.className = 'topic-button';
    btn.onclick = () => showTopic(coreTopic, category);
    topicsContainer.appendChild(btn);
  });
}

function showTopic(topic, category) {
  currentTopic = topic;
  currentCategory = category;
  currentSentenceIndex = 0;
  document.getElementById('homepage').style.display = 'none';
  document.getElementById('topic-page').style.display = 'block';
  displaySentence();
  displayRelatedTopics();
}

function displaySentence() {
  document.getElementById('sentence').textContent =
    currentTopic.sentences[currentSentenceIndex] || '';
}

function displayRelatedTopics() {
  const relatedContainer = document.getElementById('related-topics');
  relatedContainer.innerHTML = '<h3>Related Topics</h3>';
  currentCategory.topics.forEach(t => {
    if (t.name !== currentTopic.name) {
      const btn = document.createElement('button');
      btn.textContent = t.name;
      btn.className = 'related-button';
      btn.onclick = () => showTopic(t, currentCategory);
      relatedContainer.appendChild(btn);
    }
  });
}

function goHome() {
  document.getElementById('homepage').style.display = 'block';
  document.getElementById('topic-page').style.display = 'none';
}

loadData();
