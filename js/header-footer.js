document.addEventListener("DOMContentLoaded", function () {
    function getBasePath() {
        let path = window.location.pathname;
        let depth = (path.match(/\//g) || []).length - 1;
        return "../".repeat(depth); 
    }

    function loadComponent(url, elementId, callback) {
        let basePath = getBasePath(); // Determine correct relative path
        fetch(basePath + url)
            .then(response => response.text())
            .then(data => {
                document.getElementById(elementId).innerHTML = data;
                if (callback) callback();
            })
            .catch(error => console.error(`Error loading ${url}:`, error));
    }

    loadComponent("header.html", "header");
    loadComponent("footer.html", "footer");
});
