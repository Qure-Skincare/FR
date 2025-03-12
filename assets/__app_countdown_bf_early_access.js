loadjs=function(){var h=function(){},c={},u={},f={};function o(e,n){if(e){var r=f[e];if(u[e]=n,r)for(;r.length;)r[0](e,n),r.splice(0,1)}}function l(e,n){e.call&&(e={success:e}),n.length?(e.error||h)(n):(e.success||h)(e)}function d(r,t,s,i){var c,o,e=document,n=s.async,u=(s.numRetries||0)+1,f=s.before||h,l=r.replace(/[\?|#].*$/,""),a=r.replace(/^(css|img)!/,"");i=i||0,/(^css!|\.css$)/.test(l)?((o=e.createElement("link")).rel="stylesheet",o.href=a,(c="hideFocus"in o)&&o.relList&&(c=0,o.rel="preload",o.as="style")):/(^img!|\.(png|gif|jpg|svg|webp)$)/.test(l)?(o=e.createElement("img")).src=a:((o=e.createElement("script")).src=r,o.async=void 0===n||n),!(o.onload=o.onerror=o.onbeforeload=function(e){var n=e.type[0];if(c)try{o.sheet.cssText.length||(n="e")}catch(e){18!=e.code&&(n="e")}if("e"==n){if((i+=1)<u)return d(r,t,s,i)}else if("preload"==o.rel&&"style"==o.as)return o.rel="stylesheet";t(r,n,e.defaultPrevented)})!==f(r,o)&&e.head.appendChild(o)}function r(e,n,r){var t,s;if(n&&n.trim&&(t=n),s=(t?r:n)||{},t){if(t in c)throw"LoadJS";c[t]=!0}function i(n,r){!function(e,t,n){var r,s,i=(e=e.push?e:[e]).length,c=i,o=[];for(r=function(e,n,r){if("e"==n&&o.push(e),"b"==n){if(!r)return;o.push(e)}--i||t(o)},s=0;s<c;s++)d(e[s],r,n)}(e,function(e){l(s,e),n&&l({success:n,error:r},e),o(t,e)},s)}if(s.returnPromise)return new Promise(i);i()}return r.ready=function(e,n){return function(e,r){e=e.push?e:[e];var n,t,s,i=[],c=e.length,o=c;for(n=function(e,n){n.length&&i.push(e),--o||r(i)};c--;)t=e[c],(s=u[t])?n(t,s):(f[t]=f[t]||[]).push(n)}(e,function(e){l(n,e)}),r},r.done=function(e){o(e,[])},r.reset=function(){c={},u={},f={}},r.isDefined=function(e){return e in c},r}();loadJS=loadjs;

loadJS('https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js', () =>
{
	loadJS('https://cdnjs.cloudflare.com/ajax/libs/moment-timezone/0.5.34/moment-timezone-with-data-10-year-range.min.js', () =>
	{
		// Set target dates and elements for each countdown section
		const countdownSectionsUpdated = document.querySelectorAll(".countdown_timer_with_zone");

		countdownSectionsUpdated.forEach((section) => {
			const targetDate = moment.tz(section.getAttribute("data-target-date"), section.getAttribute("data-target-time-zone")).utc();
			const targetDateNext = moment.tz(section.getAttribute("data-target-date-next"), section.getAttribute("data-target-time-zone")).utc();
			const targetElement = section.querySelector(".countdown_block");
			createCountdownTimerUpdated(targetDate, targetDateNext, targetElement);
		});
	})
})

function createCountdownTimerUpdated(targetDate, targetDateNext, targetElement) {
	// Update the countdown every 1 second
	const countdownInterval = setInterval(function () {
		const currentDate = moment.utc();
		let timeRemaining = targetDate - currentDate;

		if (timeRemaining <= 0) {
			timeRemaining = targetDateNext - currentDate;
		}

		if (timeRemaining <= 0) {
			// Countdown has ended
			clearInterval(countdownInterval);
			targetElement.querySelector(".theTimer").innerHTML = "Countdown Expired!";
		} else {
			// Calculate days, hours, minutes, and seconds
			const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
			const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
			const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

			// Update the countdown display for the target element
			targetElement.querySelector(".theTimer").innerHTML =
				`<div class="time-box">
                    <div class="number" id="days">${padZeroesUpdated(days)}</div>
                    <div class="label">Days</div>
                </div>
                <div class="time-box">
                    <div class="number" id="hours">${padZeroesUpdated(hours)}</div>
                    <div class="label">Hours</div>
                </div>
                <div class="time-box">
                    <div class="number" id="minutes">${padZeroesUpdated(minutes)}</div>
                    <div class="label">Minutes</div>
                </div>
                <div class="time-box">
                    <div class="number" id="seconds">${padZeroesUpdated(seconds)}</div>
                    <div class="label">Seconds</div>
                </div>`;
		}
	}, 1000);
}

function padZeroesUpdated(num) {
  return num < 10 ? "0" + num : num;
}