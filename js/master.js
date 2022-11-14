// All Variables
const colorsLi = document.querySelectorAll(".color-list li");
let bgOptionInerval;
let optionElenmet = document.querySelectorAll(".option-box .random-bg span");
let bulletElement = document.querySelectorAll(".option-box .bullet-option span");
// check local Storage color variable
let colorOption = localStorage.getItem("color-option");
// let bgOption = localStorage.getItem("bg-option");

if (colorOption !== null) {
    document.documentElement.style.setProperty("--main-color", colorOption);
    colorsLi.forEach(ele => {
        if (ele.getAttribute("data-color") === colorOption) {
            ele.classList.add("active");
        } else {
            ele.classList.remove("active");
        }
    });
}
let bulletOption = localStorage.getItem("bullet-option");
if (bulletOption !== null) {
        if (bulletOption === "yes") {
            document.querySelector(".nav-bullets").style.display = "block";
            document.querySelector(".option-box .bullet-option span.yes").classList.add("active");
            document.querySelector(".option-box .bullet-option span.no").classList.remove("active");
        } else if (bulletOption === "no") {
            document.querySelector(".nav-bullets").style.display = "none";
            document.querySelector(".option-box .bullet-option span.yes").classList.remove("active");
            document.querySelector(".option-box .bullet-option span.no").classList.add("active");
        }
    }
   
//  setting cog icon
document.querySelector(".setting-box .gear .fa-cog").addEventListener("click", function () {
    this.classList.toggle("fa-spin");

    // show or hide setting box
    document.querySelector(".setting-box").classList.toggle("open");
});

// changing colors 

colorsLi.forEach((li) => {
    li.addEventListener('click', (e) => {
        document.documentElement.style.setProperty("--main-color", e.target.dataset.color);
        localStorage.setItem("color-option", e.target.dataset.color);
        handleActive(e);
    });
});

bulletElement.forEach((bullet) => {
    bullet.addEventListener('click', (e) => {
        if (e.target.dataset.bullet === "yes") {
            document.querySelector(".nav-bullets").style.display = "block";
            localStorage.setItem("bullet-option", "yes");
        } else {
            document.querySelector(".nav-bullets").style.display = "none";
            localStorage.setItem("bullet-option", "no");
        }
        handleActive(e);
    });
});
let bgOption;
let localStorBGOption = localStorage.getItem("bg-option");
if (localStorBGOption !== null) {
    optionElenmet.forEach(ele => {
        ele.classList.remove("active");
    });
    if (localStorBGOption === 'true') {
        bgOption = true;
        document.querySelector(".random-bg .yes").classList.add("active");
    }
    else {
        bgOption = false;
        document.querySelector(".random-bg .no").classList.add("active");
    }
} else {
    bgOption = true;
}


// change background image randomize
optionElenmet.forEach((span) => {
    span.addEventListener('click', (e) => {
        if (e.target.dataset.background === "yes") {
            bgOption = true;
            randomizeBackgroundImgs();
            localStorage.setItem("bg-option", true);
        } else {
            bgOption = false;
            clearInterval(bgOptionInerval);
            localStorage.setItem("bg-option", false);
        }
        handleActive(e);
    });
});

optionElenmet.forEach((span) => {
    span.addEventListener('click', (e) => {
        if (e.target.dataset.background === "yes") {
            bgOption = true;
            randomizeBackgroundImgs();
            localStorage.setItem("bg-option", true);
        } else {
            bgOption = false;
            clearInterval(bgOptionInerval);
            localStorage.setItem("bg-option", false);
        }
        handleActive(e);
    });
});

// change random images options of landing page function

function randomizeBackgroundImgs() {
    if (bgOption === true) {
        bgOptionInerval = setInterval(() => {
            let randomNumber = Math.floor(Math.random() * 6);
            document.querySelector(".landing-page").style.backgroundImage = 'url("../imgs/0' + randomNumber + '.jpg")';
        }, 10000);
    }
}
randomizeBackgroundImgs();


// Skills Section 
let skills = document.querySelector(".skills");
window.onscroll = function () {
    let skillsOffsetTop = skills.offsetTop;
    let skillsOuterHeight = skills.offsetHeight;
    let WidowHeight = this.innerHeight;
    let windowScrollTop = this.pageYOffset;
    if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - WidowHeight - 5)) {
        document.querySelectorAll(".skills .skill-box span").forEach(skill => {
            skill.style.width = skill.getAttribute("data-progress");
        });
    }
}


// pupup image box 

let galaryImages = document.querySelectorAll(".gallary img");
galaryImages.forEach(img => {
    img.addEventListener('click', (e) => {
        let popupOverlay = document.createElement("div");
        popupOverlay.className = "popup-overlay";
        document.body.appendChild(popupOverlay);
        let popupBox = document.createElement("div");
        let closePopupBox = document.createElement("div");
        closePopupBox.className = "close-popup";
        popupBox.className = "popup-box";
        let popupImg = document.createElement("img");
        popupImg.src = img.src;
        let i = document.createElement("i");
        i.className = "fas fa-window-close";
        closePopupBox.appendChild(i);
        popupBox.appendChild(popupImg);
        popupBox.appendChild(closePopupBox);
        document.body.appendChild(popupBox);

        popupOverlay.addEventListener('click', (e) => {
            popupBox.remove();
            popupOverlay.remove();
        });
        closePopupBox.addEventListener('click', (e) => {
            popupBox.remove();
            popupOverlay.remove();
        });

    });
});

// Move to the sections by bullets

let bullets = document.querySelectorAll(".nav-bullets .bullet");
let links = document.querySelectorAll(".header-area .links a");

function moveToSection(elements) {
    elements.forEach((ele => {
        ele.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: "smooth"
            });
        });
    }));
}

// Handle event Active 
function handleActive(ev) {
    ev.target.parentElement.querySelectorAll(".active").forEach(ele => {
        ele.classList.remove("active");
    });
    ev.target.classList.add("active");
}

moveToSection(bullets);

links.forEach(link => {
    link.addEventListener('click', e => {
        document.querySelectorAll(".header-area .links a.active").forEach(ele => {
            ele.classList.remove("active");
        });
        e.target.classList.add("active");
    });
});


// Reset Options 
document.querySelector(".setting-box .reset-options").onclick = (e) => {
    localStorage.clear();
    window.location.reload();
};

document.querySelector(".toggle-menu").addEventListener('click', (e) => {
    document.querySelector(".toggle-menu").classList.toggle("close");
    document.querySelector(".header-area .links").classList.toggle("open");
    document.querySelectorAll(".header-area .links.open a").forEach((li => {
        li.classList.remove("active");
    }));
});

// // Press anywhere to hide the links
// let linkePhone = document.querySelector(".header-area .links");
// document.addEventListener('click', (e) => {
//     if (!(e.target.className === linkePhone) && linkePhone.classList.contains("open")) {
//         // linkePhone.classList.remove("open");
//    } 
//     // console.log(e.target.className);
// });