let predictionData = [
	{
		"text": "Скоро вы откроете в себе новый талант.",
	},
	{
		"text": "Ваша идея приведёт к удивительному результату.",
	},
	{
		"text": "Скоро услышите добрую новость.",
	},
	{
		"text": "Всё получится — верьте.",
	},
	{
		"text": "Новый год принесёт долгожданные перемены.",
	},
	{
		"text": "В 2026‑м сбывается то, о чём мечтали.",
	},
	{
		"text": "Вас ждёт год больших возможностей.",
	},
	{
		"text": "2026‑й подарит вдохновляющие встречи.",
	},
	{
		"text": "Вас ждёт год тёплых сюрпризов.",
	},
	{
		"text": "В 2026‑м всё сложится наилучшим образом.",
	},
	{
		"text": "Вас ждёт год смелых решений.",
	},
	{
		"text": "2026‑й станет годом роста.",
	},
	{
		"text": "Вас ждёт незабываемый отпуск в 2026‑м.",
	},
	{
		"text": "В новом году исполнится маленькое чудо.",
	},
	{
		"text": "2026‑й подарит тёплые воспоминания.",
	},
	{
		"text": "Вас ждёт год добрых перемен.",
	},
	{
		"text": "В 2026‑м найдётся верный путь.",
	},
	{
		"text": "Новый год принесёт радостные открытия.",
	},
]

document.addEventListener('DOMContentLoaded', function () {
	initStarfield();

	const scrollArrows = document.querySelectorAll('.scroll');
	const toysContainer = document.querySelector('.border');

	const scrollArrowObserver = new IntersectionObserver((entries, self) => {
		for (let entry of entries) {
			if (entry.isIntersecting && !entry.target.classList.contains('scroll-active')) {
				if (!entry.target.classList.contains('scroll-active')) {
					entry.target.classList.add('scroll-active');
					let toysOffset = toysContainer.getBoundingClientRect().top + window.scrollY
					document.body.classList.add('disable-scrolling');
					scrollTo(toysOffset, 2200, easing.easeOutQuart, () => {
						document.body.classList.remove('disable-scrolling');
						//entry.target.classList.remove('scroll-active');
					});
				}
			}
		}
	}, {root: null, threshold: 1, rootMargin: '-30px'});

	function initArrowObservers(scrollArrows) {
		for (let arrow of scrollArrows) {
			scrollArrowObserver.observe(arrow);
		}
	}

	if (scrollArrows  && toysContainer)
	{
		initArrowObservers(scrollArrows);
	}

	let toys = document.querySelectorAll('.christmas-toy');
	if (toys.length > 0) {
		toys.forEach((toy) => {
			toy.addEventListener('click', openPrediction);
		})
	}
});

function getRandomIntInclusive(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function initStarfield() {
	const sky = document.querySelector(".sky");
	if (!sky) {
		console.warn("Starfield: sky not found — skipping init.");
		return;
	}

	// Get star count from data attribute
	let starCount = parseInt(sky.dataset.stars || "80", 10);

	// Reduce stars on mobile for clarity + performance
	if (window.matchMedia("(max-width: 767px)").matches) {
		starCount = Math.round(starCount * 0.4); // 40% of normal
	}

	// Clear any previous stars
	sky.innerHTML = "";
	const starParams = {
		'minSize': 15, //px
		'maxSize': 25,
		'minDuration': 2500, // ms
		'maxDuration': 3500,
		'minDelay': 1000, // ms
		'maxDelay': 3000
	};

	for (let i = 0; i < starCount; i++) {
		const el = document.createElement("div");
		el.className = "star";
		el.dataset.parallax = ''
		el.innerHTML = `<svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
			<g clip-path="url(#clip0_13691_75240)">
				<path
					d="M18.9705 11.5942L13.9035 13.197C12.7295 13.5716 11.8438 14.5291 11.5554 15.7364L9.84584 22.9593L8.13626 15.6948C7.8479 14.5083 6.98281 13.5508 5.82936 13.1553L1.05078 11.5734L5.89115 9.97058C7.024 9.59591 7.88909 8.68004 8.17745 7.51438L9.86643 1.02002L11.5348 7.49357C11.8438 8.65922 12.7295 9.59591 13.8623 9.97058L18.991 11.5734L18.9705 11.5942Z"
					stroke="white" stroke-linejoin="round"/>
			</g>
			<defs>
				<clipPath class="clip0_13691_75240">
					<rect width="20" height="24" fill="white"/>
				</clipPath>
			</defs>
		</svg>`;

		// Random positioning inside viewport
		el.style.left = Math.random() * 100 + "%";
		el.style.top = Math.random() * 100 + "%";

		// Random sizes (smaller looks more magical)
		const size = getRandomIntInclusive(starParams.minSize, starParams.maxSize);
		el.style.width = size + "px";
		el.style.height = size * 1.2 + "px";

		// Offset start time so sparkles are randomized
		let delay = getRandomIntInclusive(starParams.minDelay, starParams.maxDelay);
		let duration = getRandomIntInclusive(starParams.minDuration, starParams.maxDuration);
		el.querySelector('svg').style.animation = 'starDynamic ' + duration + 'ms infinite ease-out';
		el.querySelector('svg').style.animationDelay = -1 * delay + 'ms';

		sky.appendChild(el);
	}
}

function openPrediction(eventToy) {
	const toy = eventToy.target.closest('.christmas-toy_ball');
	let randomItem = getRandomIntInclusive(0, predictionData.length - 1);
	toy.querySelector('.prediction-text').textContent = predictionData[randomItem].text;
	// toy.querySelector('.prediction-icon img').src = predictionData[randomItem].url;
	let toyChoice = toy.querySelector('.christmas-toy_ball-choice');
	let toyPrediction = toy.querySelector('.christmas-toy_ball-prediction');
	toyChoice.classList.add('hidden');
	toyPrediction.classList.add('active');
	toy.closest('.christmas-toys_container').style = 'pointer-events: none';
}

/* smooth scroll to */
function scrollTo(Y, duration, easingFunction, callback) {

	let start = Date.now(),
		elem = document.documentElement.scrollTop ? document.documentElement : document.body,
		from = elem.scrollTop;

	if (from === Y) {
		callback();
		return; /* Prevent scrolling to the Y point if already there */
	}

	function min(a, b) {
		return a < b ? a : b;
	}

	function scroll(timestamp) {

		var currentTime = Date.now(),
			time = min(1, ((currentTime - start) / duration)),
			easedT = easingFunction(time);

		elem.scrollTop = (easedT * (Y - from)) + from;

		if (time < 1) requestAnimationFrame(scroll);
		else if (callback) callback();
	}

	requestAnimationFrame(scroll)
}

/* easing functions */
const easing = {
	// no easing, no acceleration
	linear: function (t) {
		return t
	},
	// accelerating from zero velocity
	easeInQuad: function (t) {
		return t * t
	},
	// decelerating to zero velocity
	easeOutQuad: function (t) {
		return t * (2 - t)
	},
	// acceleration until halfway, then deceleration
	easeInOutQuad: function (t) {
		return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t
	},
	// accelerating from zero velocity
	easeInCubic: function (t) {
		return t * t * t
	},
	// decelerating to zero velocity
	easeOutCubic: function (t) {
		return (--t) * t * t + 1
	},
	// acceleration until halfway, then deceleration
	easeInOutCubic: function (t) {
		return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
	},
	// accelerating from zero velocity
	easeInQuart: function (t) {
		return t * t * t * t
	},
	// decelerating to zero velocity
	easeOutQuart: function (t) {
		return 1 - (--t) * t * t * t
	},
	// acceleration until halfway, then deceleration
	easeInOutQuart: function (t) {
		return t < .5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t
	},
	// accelerating from zero velocity
	easeInQuint: function (t) {
		return t * t * t * t * t
	},
	// decelerating to zero velocity
	easeOutQuint: function (t) {
		return 1 + (--t) * t * t * t * t
	},
	// acceleration until halfway, then deceleration
	easeInOutQuint: function (t) {
		return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t
	},
	// decelerating to zero velocity
	easeOutCirc: function (t) {
		return Math.sqrt(1 - (--t * t));
	}
}