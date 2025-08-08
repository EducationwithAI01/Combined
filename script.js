fetch('topics.json')
  .then(response => response.json())
  .then(data => {
    const topicsContainer = document.getElementById('topics');
    data.forEach(topic => {
      const btn = document.createElement('button');
      btn.textContent = topic.name;
      btn.addEventListener('click', () => showTopic(topic));
      topicsContainer.appendChild(btn);
    });
  })
  .catch(error => console.error('Error loading topics:', error));
