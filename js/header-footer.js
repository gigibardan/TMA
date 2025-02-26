document.addEventListener("DOMContentLoaded", function () {
    function loadComponent(url, elementId, callback) {
        let basePath = window.location.pathname.includes("/courses/") ? "../" : "./";

        fetch(basePath + url)
            .then(response => response.text())
            .then(data => {
                document.getElementById(elementId).innerHTML = data;
                if (callback) callback(basePath); // Pass basePath to callback
            })
            .catch(error => console.error(`Error loading ${url}:`, error));
    }

    function updateNavLinks(basePath) {
        document.getElementById("logo-img").src = basePath + "assets/images/logo-techminds-sigla.png";
        document.getElementById("home-link").href = basePath + "index.html";
        document.getElementById("scratch-link").href = basePath + "courses/scratch.html";
        document.getElementById("thunkable-link").href = basePath + "courses/thunkable.html";
        document.getElementById("gdevelop-link").href = basePath + "courses/gdevelop.html";
        document.getElementById("minecraft-link").href = basePath + "courses/minecraft.html";
        document.getElementById("roblox-link").href = basePath + "courses/roblox.html";
        document.getElementById("robotics-link").href = basePath + "robotics.html";
        document.getElementById("essentials-link").href = basePath + "courses/essentials.html";
        document.getElementById("prime-link").href = basePath + "courses/prime.html";
        document.getElementById("microbit-link").href = basePath + "courses/microbit.html";
        document.getElementById("arduino-link").href = basePath + "courses/arduino.html";
        document.getElementById("about-link").href = basePath + "about.html";
        document.getElementById("contact-link").href = basePath + "contact.html";
    }

    // Load header and footer, and update links once loaded
    loadComponent("header.html", "header", updateNavLinks);
    loadComponent("footer.html", "footer");
});
