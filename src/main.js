import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initHero3D } from "./hero-3d";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
    initHero3D();

    // Navbar Toggle
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener("click", () => {
            mobileMenu.classList.toggle("hidden");
        });
    }

    // GSAP Animations

    // Hero Animation
    gsap.from(".hero-content", {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: "power3.out",
        delay: 0.2
    });

    gsap.from(".hero-3d", {
        duration: 1.5,
        scale: 0.8,
        opacity: 0,
        ease: "elastic.out(1, 0.5)",
        delay: 0.5
    });

    // Scramble Text Animation
    const scrambleTextElement = document.getElementById("scramble-text");
    if (scrambleTextElement) {
        const words = ["Innovation", "Intelligence", "Revolution", "Future"];
        let currentWordIndex = 0;
        const chars = "!<>-_\\/[]{}—=+*^?#________";

        const scramble = (newWord) => {
            const oldWord = scrambleTextElement.innerText;
            const length = Math.max(oldWord.length, newWord.length);
            const promise = new Promise((resolve) => {
                const tl = gsap.timeline();
                let progress = 0;

                tl.to({ p: 0 }, {
                    duration: 1,
                    p: 1,
                    ease: "power4.inOut",
                    onUpdate: function () {
                        progress = this.targets()[0].p;
                        let output = "";
                        for (let i = 0; i < length; i++) {
                            if (progress === 1 || i < Math.floor(progress * length)) {
                                output += newWord[i] || "";
                            } else {
                                output += chars[Math.floor(Math.random() * chars.length)];
                            }
                        }
                        scrambleTextElement.innerText = output;
                    },
                    onComplete: resolve
                });
            });
            return promise;
        };

        const cycleWords = async () => {
            while (true) {
                await new Promise(r => setTimeout(r, 2000)); // Wait 2 seconds
                currentWordIndex = (currentWordIndex + 1) % words.length;
                await scramble(words[currentWordIndex]);
            }
        };

        cycleWords();
    }

    // Section Reveals
    gsap.utils.toArray(".reveal-section").forEach((section) => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        });
    });

    // Staggered List Items
    gsap.utils.toArray(".stagger-list").forEach((list) => {
        gsap.from(list.children, {
            scrollTrigger: {
                trigger: list,
                start: "top 90%",
            },
            y: 30,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out"
        });
    });

    // Scroll Expanding Video
    const videoSection = document.querySelector("#video-section");
    const videoContainer = document.querySelector("#video-container");

    if (videoSection && videoContainer) {
        gsap.fromTo(videoContainer,
            {
                width: "60%",
                borderRadius: "24px" // Matches rounded-3xl
            },
            {
                scrollTrigger: {
                    trigger: videoSection,
                    start: "top 80%", // Start when top of section hits 80% of viewport
                    end: "center center", // End when center of section hits center of viewport
                    scrub: 1,
                    markers: false
                },
                width: "100%",
                height: "100vh", // Expand height to full viewport height
                borderRadius: "0px",
                ease: "none"
            }
        );
    }

    // Process Section Animation
    const steps = [
        { id: "#process-step-1", img: "#process-img-1" },
        { id: "#process-step-2", img: "#process-img-2" },
        { id: "#process-step-3", img: "#process-img-3" }
    ];

    steps.forEach((step, index) => {
        ScrollTrigger.create({
            trigger: step.id,
            start: "top center",
            end: "bottom center",
            onEnter: () => {
                gsap.to(".sticky img", { opacity: 0, duration: 0.5 });
                gsap.to(step.img, { opacity: 1, duration: 0.5 });
            },
            onEnterBack: () => {
                gsap.to(".sticky img", { opacity: 0, duration: 0.5 });
                gsap.to(step.img, { opacity: 1, duration: 0.5 });
            }
        });
    });
});
