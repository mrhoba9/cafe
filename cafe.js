"use strict";

const preloader = document.querySelector("[data-preaload]");
window.addEventListener("load", function () {
	preloader.classList.add("loaded");
	document.body.classList.add("loaded");
});

// add event listener on multiple elements
const addEventOnElements = function (elements, eventType, callback) {
	for (let i = 0, len = elements.length; i < len; i++) {
		elements[i].addEventListener(eventType, callback);
	}
};

// NAVBAR
const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");
const toggleNavbar = function () {
	navbar.classList.toggle("active");
	overlay.classList.toggle("active");
	document.body.classList.toggle("nav-active");
};
addEventOnElements(navTogglers, "click", toggleNavbar);

// HEADER & BACK TOP BTN
const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");
let lastScrollPos = 0;
const hideHeader = function () {
	const isScrollBottom = lastScrollPos < window.scrollY;
	if (isScrollBottom) {
		header.classList.add("hide");
	} else {
		header.classList.remove("hide");
	}

	lastScrollPos = window.scrollY;
};
window.addEventListener("scroll", function () {
	if (window.scrollY >= 50) {
		header.classList.add("active");
		backTopBtn.classList.add("active");
		hideHeader();
	} else {
		header.classList.remove("active");
		backTopBtn.classList.remove("active");
	}
});

// HERO SLIDER
const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");
let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];
const updateSliderPos = function () {
	lastActiveSliderItem.classList.remove("active");
	heroSliderItems[currentSlidePos].classList.add("active");
	lastActiveSliderItem = heroSliderItems[currentSlidePos];
};
const slideNext = function () {
	if (currentSlidePos >= heroSliderItems.length - 1) {
		currentSlidePos = 0;
	} else {
		currentSlidePos++;
	}

	updateSliderPos();
};
heroSliderNextBtn.addEventListener("click", slideNext);
const slidePrev = function () {
	if (currentSlidePos <= 0) {
		currentSlidePos = heroSliderItems.length - 1;
	} else {
		currentSlidePos--;
	}

	updateSliderPos();
};
heroSliderPrevBtn.addEventListener("click", slidePrev);

// auto slide
let autoSlideInterval;
const autoSlide = function () {
	autoSlideInterval = setInterval(function () {
		slideNext();
	}, 7000);
};
addEventOnElements(
	[heroSliderNextBtn, heroSliderPrevBtn],
	"mouseover",
	function () {
		clearInterval(autoSlideInterval);
	}
);
addEventOnElements(
	[heroSliderNextBtn, heroSliderPrevBtn],
	"mouseout",
	autoSlide
);
window.addEventListener("load", autoSlide);

// PARALLAX EFFECT
const parallaxItems = document.querySelectorAll("[data-parallax-item]");
let x, y;
window.addEventListener("mousemove", function (event) {
	x = (event.clientX / window.innerWidth) * 10 - 5;
	y = (event.clientY / window.innerHeight) * 10 - 5;

	// reverse the number eg. 20 -> -20, -5 -> 5
	x = x - x * 2;
	y = y - y * 2;

	for (let i = 0, len = parallaxItems.length; i < len; i++) {
		x = x * Number(parallaxItems[i].dataset.parallaxSpeed);
		y = y * Number(parallaxItems[i].dataset.parallaxSpeed);
		parallaxItems[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`;
	}
});

// fetch data from JSON to the menu section
const grid_list = document.getElementById("grid-list");
function fetchJsonDataForMenu() {
	fetch("./assets/json/delMenu.json")
		.then((res) => res.json())
		.then((data) => {
			data.forEach((item) => {
				grid_list.innerHTML += `
              <li id="${item.id}">
								<div class="menu-card hover:card">
									<figure class="card-banner img-holder" style="--width: 100; --height: 100">
										<img src="${item.image}"width="100"height="100"loading="lazy"alt="${
					item.name
				}"class="img-cover"/>
									</figure>
									<div>
										<div class="title-wrapper">
											<h3 class="title-3">
												<a href="#" class="card-title">${item.name}</a>
											</h3>
											<span class="badge label-1 ${item.special ? "block" : "hidden"}">${
					item.special
				}</span>
											<span class="span title-2">EGP ${item.price}</span>
										</div>
										<p class="card-text label-1">
                    ${item.description}
										</p>
									</div>
								</div>
							</li>
    `;
			});
		});
}
fetchJsonDataForMenu();

// fetch data from JSON to the event section
const grid_list_event = document.getElementById("grid-list-event");
function fetchJsonDataForEvent() {
	fetch("./assets/json/event.json")
		.then((res) => res.json())
		.then((data) => {
            console.log(data)
			data.forEach((item) => {
                grid_list_event.innerHTML+=`
                    <li>
                    <div class="event-card has-before hover:shine">
                        <div class="card-banner img-holder" style="--width: 350; --height: 450">
                            <img src="${item.image}" width="350" height="450" loading="lazy" alt="${item.description}" class="img-cover"/>
                            <time class="publish-date label-2" datetime="${item.date}"
                                >${item.date}</time>
                    </div>
                    <div class="card-content">
                    <p class="card-subtitle label-2 text-center">
                                    ${item.name}
                    </p>
                    <h3 class="card-title title-2 text-center">
                                ${item.description}
                    </h3>
                    </div>
                    </div>
                    </li>
                `;
			});
		});
}
fetchJsonDataForEvent();
