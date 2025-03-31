initializeSiteNav();

function initializeSiteNav() {
    const siteNav = document.getElementById("site-nav");
    const currentPage = siteNav.dataset.current;

    const homeNav = document.createElement("a");
    homeNav.innerText = "Home";
    if (currentPage == "home") {
        homeNav.className = "current";
        homeNav.href = "#";
    } else {
        homeNav.href = "/index.html";
    }
    siteNav.appendChild(homeNav);

    const forceBuilderNav = document.createElement("a");
    forceBuilderNav.innerText = "Force Builder";
    if (currentPage == "force-builder") {
        forceBuilderNav.className = "current";
        forceBuilderNav.href = "#";
    } else {
        forceBuilderNav.href = "/force-builder.html";
    }
    siteNav.appendChild(forceBuilderNav);

    const firingArcsNav = document.createElement("a");
    firingArcsNav.innerText = "Firing Arcs";
    if (currentPage == "firing-arcs") {
        firingArcsNav.className = "current";
        firingArcsNav.href = "#";
    } else {
        firingArcsNav.href = "/firing-arcs-diagram.html";
    }
    siteNav.appendChild(firingArcsNav);

    const innerSphereNav = document.createElement("a");
    innerSphereNav.innerText = "Inner Sphere";
    if (currentPage == "inner-sphere") {
        innerSphereNav.className = "current";
        innerSphereNav.href = "#";
    } else {
        innerSphereNav.href = "/the-inner-sphere.html";
    }
    siteNav.appendChild(innerSphereNav);
}