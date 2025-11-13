window.addEventListener("DOMContentLoaded", (event) => {
	// Navbar shrink function
	var navbarShrink = function () {
		const navbarCollapsible = document.body.querySelector("#mainNav");
		if (!navbarCollapsible) {
			return;
		}
		if (window.scrollY === 0) {
			navbarCollapsible.classList.remove("navbar-shrink");
		} else {
			navbarCollapsible.classList.add("navbar-shrink");
		}
	};

	// Shrink the navbar
	navbarShrink();

	// Shrink the navbar when page is scrolled
	document.addEventListener("scroll", navbarShrink);

	// Activate Bootstrap scrollspy on the main nav element
	const mainNav = document.body.querySelector("#mainNav");
	if (mainNav) {
		new bootstrap.ScrollSpy(document.body, {
			target: "#mainNav",
			offset: 74,
		});
	}

	// Collapse responsive navbar when toggler is visible
	const navbarToggler = document.body.querySelector(".navbar-toggler");
	const responsiveNavItems = [].slice.call(
		document.querySelectorAll("#navbarResponsive .nav-link")
	);
	responsiveNavItems.map(function (responsiveNavItem) {
		responsiveNavItem.addEventListener("click", () => {
			if (window.getComputedStyle(navbarToggler).display !== "none") {
				navbarToggler.click();
			}
		});
	});
});


const currentLocation = location.pathname;
document.querySelectorAll('.nav-item a.nav-link').forEach(link => {
    if (link.getAttribute('href') === currentLocation) {
        link.parentElement.classList.add('active');
    }
});


const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        
        navLinks.forEach(navLink => navLink.classList.remove('active'));
        
        this.classList.add('active');
        
        // Get the URL from the clicked link's 'href' attribute
        const linkUrl = this.getAttribute('href');
        
        // Navigate to the linked page
        window.location.href = linkUrl;
    });
});


// IntersectionObserver for animate-on-scroll elements (fade/slide in)
document.addEventListener('DOMContentLoaded', function () {
	const observer = new IntersectionObserver((entries, obs) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				// add in-view to the observed element
				entry.target.classList.add('in-view');

				// if it's the process grid, reveal children with a small stagger
				if (entry.target.classList.contains('process-grid')) {
					const steps = entry.target.querySelectorAll('.process-step');
					steps.forEach((s, i) => {
						setTimeout(() => s.classList.add('in-view'), i * 90);
					});
				}

				obs.unobserve(entry.target);
			}
		});
	}, { threshold: 0.18 });

	document.querySelectorAll('.animate-on-scroll, .process-grid').forEach(el => observer.observe(el));
});
