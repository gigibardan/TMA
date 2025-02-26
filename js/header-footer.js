
document.addEventListener("DOMContentLoaded", function () {
    function loadComponent(url, elementId, callback) {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                document.getElementById(elementId).innerHTML = data;
                if (callback) callback();
            })
            .catch(error => console.error(`Error loading ${url}:`, error));
    }

    function adjustNavbarLinks() {
        let basePath = window.location.pathname.includes("/courses/") ? "../" : "./";

        let links = {
            "HOME": basePath + "index.html",
            "PROGRAMARE": basePath + "programare.html",
            "ROBOTICS": basePath + "robotics.html",
            "ABOUT": basePath + "about.html",
            "CONTACT": basePath + "contact.html",
            "SCRATCH": basePath + "courses/scratch.html",
            "THUNKABLE": basePath + "courses/thunkable.html",
            "CONSTRUCT": basePath + "courses/construct.html",
            "GDEVELOP": basePath + "courses/gdevelop.html",
            "ALICE": basePath + "courses/alice.html",
            "MINECRAFT": basePath + "courses/minecraft.html",
            "ROBLOX": basePath + "courses/roblox.html",
            "GODOT": basePath + "courses/godot.html",
            "GREENFOOT": basePath + "courses/greenfoot.html",
            "PYTHON": basePath + "courses/python.html",
            "FRONTEND": basePath + "courses/frontend.html",
            "ESSENTIALS": basePath + "courses/essentials.html",
            "PRIME": basePath + "courses/prime.html",
            "MICROBIT": basePath + "courses/microbit.html",
            "ARDUINO": basePath + "courses/arduino.html",
            "LOGO": basePath + "assets/images/logo-techminds-sigla.png"
        };

        document.querySelectorAll("nav a, nav img").forEach(link => {
            let href = link.getAttribute("href") || link.getAttribute("src");
            if (href && links[href]) {
                if (link.tagName === "IMG") {
                    link.setAttribute("src", links[href]);
                } else {
                    link.setAttribute("href", links[href]);
                }
            }
        });
    }

    // Încarcă header-ul și apoi ajustează link-urile
    loadComponent("/header.html", "header", adjustNavbarLinks);
    loadComponent("/footer.html", "footer");
});
