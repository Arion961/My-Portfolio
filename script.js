

"use strict";

document.addEventListener("DOMContentLoaded", () => {
    

    const yearElement = document.getElementById("current-year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }



    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");
    const navigationLinks = document.querySelectorAll(".nav-link");

    if (menuToggle && navLinks) {
        const openMenu = () => {
            navLinks.classList.add("is-open");
            menuToggle.setAttribute("aria-expanded", "true");
            menuToggle.setAttribute("aria-label", "Close navigation menu");

            document.body.classList.add("menu-open");
        };

        const closeMenu = () => {
            navLinks.classList.remove("is-open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");

            document.body.classList.remove("menu-open");
        };

        const toggleMenu = () => {
            const isOpen =
                menuToggle.getAttribute("aria-expanded") === "true";

            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        };

        menuToggle.addEventListener("click", toggleMenu);

        // Close the menu when a navigation link is selected.
        navigationLinks.forEach((link) => {
            link.addEventListener("click", closeMenu);
        });

        // Close the menu when the user presses Escape.
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                closeMenu();
            }
        });

        // Close the menu when clicking outside the navigation.
        document.addEventListener("click", (event) => {
            const clickedInsideMenu = navLinks.contains(event.target);
            const clickedToggle = menuToggle.contains(event.target);

            if (!clickedInsideMenu && !clickedToggle) {
                closeMenu();
            }
        });

        // Return the menu to its desktop state when resizing.
        window.addEventListener("resize", () => {
            if (window.innerWidth > 760) {
                closeMenu();
            }
        });
    }



    const revealElements = document.querySelectorAll(".reveal");

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (revealElements.length > 0 && !prefersReducedMotion) {
        if ("IntersectionObserver" in window) {
            // Hide animated elements only after JavaScript is ready.
            document.documentElement.classList.add("motion-ready");

            const revealObserver = new IntersectionObserver(
                (entries, observer) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add("is-visible");

                            // Reveal each element only once.
                            observer.unobserve(entry.target);
                        }
                    });
                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -35px 0px"
                }
            );

            revealElements.forEach((element) => {
                revealObserver.observe(element);
            });
        } else {
            // Older browsers display the content without animation.
            revealElements.forEach((element) => {
                element.classList.add("is-visible");
            });
        }
    } else {
        // Keep all content visible when reduced motion is preferred.
        revealElements.forEach((element) => {
            element.classList.add("is-visible");
        });
    }


    

    const pageSections = document.querySelectorAll("main section[id]");

    if ("IntersectionObserver" in window && pageSections.length > 0) {
        const sectionObserver = new IntersectionObserver(
            (entries) => {
                // Consider only the section most recently entering view.
                const visibleSections = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort(
                        (a, b) =>
                            b.intersectionRatio - a.intersectionRatio
                    );

                if (visibleSections.length === 0) {
                    return;
                }

                const currentSectionId = visibleSections[0].target.id;

                navigationLinks.forEach((link) => {
                    const linkTarget = link.getAttribute("href");

                    const isActive =
                        linkTarget === `#${currentSectionId}`;

                    link.classList.toggle("active", isActive);

                    if (isActive) {
                        link.setAttribute("aria-current", "location");
                    } else {
                        link.removeAttribute("aria-current");
                    }
                });
            },
            {
                rootMargin: "-20% 0px -55% 0px",
                threshold: [0, 0.15, 0.35, 0.6]
            }
        );

        pageSections.forEach((section) => {
            sectionObserver.observe(section);
        });
    }


    const projectDialog = document.getElementById("project-dialog");
    const dialogTitle = document.getElementById("dialog-title");
    const dialogDescription = document.getElementById(
        "dialog-description"
    );

    const dialogClose = document.getElementById("dialog-close");
    const dialogDone = document.getElementById("dialog-done");

    const projectButtons = document.querySelectorAll(
        "[data-project]"
    );

    const projectDetails = {
        portfolio: {
            title: "Personal Portfolio",
            description:
                "My personal portfolio introduces me, shares my education " +
                "and skills, and highlights my completed work."
        }
    };

    if (
        projectDialog &&
        dialogTitle &&
        dialogDescription &&
        typeof projectDialog.showModal === "function"
    ) {
        const closeDialog = () => {
            if (projectDialog.open) {
                projectDialog.close();
            }
        };

        projectButtons.forEach((button) => {
            button.addEventListener("click", () => {
                const projectKey = button.dataset.project;
                const project = projectDetails[projectKey];

                if (!project) {
                    return;
                }

                dialogTitle.textContent = project.title;
                dialogDescription.textContent = project.description;

                projectDialog.showModal();

                document.body.classList.add("dialog-open");
            });
        });

        if (dialogClose) {
            dialogClose.addEventListener("click", closeDialog);
        }

        if (dialogDone) {
            dialogDone.addEventListener("click", closeDialog);
        }

        // Restore normal page scrolling after the dialog closes.
        projectDialog.addEventListener("close", () => {
            document.body.classList.remove("dialog-open");
        });

        // Close the dialog when clicking its backdrop.
        projectDialog.addEventListener("click", (event) => {
            if (event.target === projectDialog) {
                closeDialog();
            }
        });
    } else {
        // Provide a simple fallback if dialog support is unavailable.
        projectButtons.forEach((button) => {
            button.addEventListener("click", () => {
                const project = projectDetails[button.dataset.project];

                if (project) {
                    window.alert(
                        `${project.title}\n\n${project.description}`
                    );
                }
            });
        });
    }


    

    const projectCards = document.querySelectorAll(".project-card");

    projectCards.forEach((card) => {
        card.addEventListener("pointerenter", () => {
            card.classList.add("is-hovered");
        });

        card.addEventListener("pointerleave", () => {
            card.classList.remove("is-hovered");
        });
    });


    

    const emailLinks = document.querySelectorAll(
        'a[href^="mailto:"]'
    );

    emailLinks.forEach((link) => {
        link.setAttribute("rel", "noopener");
    });


    

    console.log(
        "%cHello, welcome to Marion Mwikali's portfolio! ♡",
        "color: #c94d88; font-size: 16px; font-weight: bold;"
    );

    console.log(
        "Portfolio loaded successfully."
    );
});