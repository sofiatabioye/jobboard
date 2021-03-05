
/**
 * Define Global Variables
 * 
*/
const unordList = document.querySelector("#navbar__list");
const sectionEls = document.querySelectorAll("section");
const docFrag = new DocumentFragment();

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

const activateSec = entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("your-active-class");
            activateSecNavBar(entry);
        } else {
            entry.target.classList.remove("your-active-class");
        }

    })
}

// for activating anchors im navigation bar
const activateSecNavBar = entry => {
    navAnchors = document.querySelectorAll("#navbar__list a");
    navAnchors.forEach(navAnchor => {
        if (navAnchor.classList.contains(entry.target.id)) {
            navAnchor.classList.add("your-active-class");
        } else {
            navAnchor.classList.remove("your-active-class");
        }
    })
};

const scrollToView = (eventObj, sectionID) => {
    eventObj.preventDefault();
    console.log(sectionID)
    const targetSec = document.querySelector(`#${sectionID}`);
    targetSec.scrollIntoView({ block: 'end', behavior: 'smooth' })
}

// build the nav
sectionEls.forEach((section) => {
    const listEl = document.createElement("li");
    const anchorEl = document.createElement("a");
    anchorEl.classList.add(`${section.id}`, "menu__link");
    anchorEl.href = `#${section.id}`;
    anchorEl.textContent = section.getAttribute("data-nav");
    listEl.appendChild(anchorEl);
    docFrag.appendChild(listEl);
});

// append list of anchors to nav unordered list
unordList.appendChild(docFrag);

// Add class 'active' to section when near top of viewport
// use observer
const options = {
    threshold: 0.625
}

let observer = new IntersectionObserver(activateSec, options);

sectionEls.forEach(section => observer.observe(section));


// Scroll to anchor ID using scrollTO event
const anchrs = document.querySelectorAll("a.menu__link");
console.log(anchrs)
anchrs.forEach(anch => {
    anch.addEventListener('click', e => {
        scrollToView(e, anch.classList[0]);
    });
})



