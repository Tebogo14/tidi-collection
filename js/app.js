function navigateTo(page) {
  // Push clean URL (without .html)
  const cleanPath = page.replace('.html', '');
  history.pushState({ page }, "", "/" + cleanPath);

  console.log("here")
  // Load page content dynamically
  loadPage(page);
}

window.onpopstate = function(event) {
  const page = (event.state && event.state.page) || "index.html";
  loadPage(page);
};

function loadPage(page) {
  fetch(page)
    .then(res => res.text())
    .then(html => {
      // Extract only <body> or relevant content if needed
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const content = doc.querySelector('body') || doc;
      document.getElementById('content').innerHTML = content.innerHTML;

    })
    .catch(err => {
      document.getElementById('content').innerHTML = "<p>Page not found.</p>";
    });
}

// Load default on first load
document.addEventListener('DOMContentLoaded', () => {
  const path = location.pathname.replace('/', '') || 'index.html';
  loadPage(path.endsWith('.html') ? path : path + '.html');
});
