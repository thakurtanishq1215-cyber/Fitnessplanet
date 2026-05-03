gsap.to("#nav", {
    backgroundColor: "#000",  // we can access any css property here but we use Camel case here that is instead of - use a capital letter
    height: "90px",
    duration: 0.5,
    scrollTrigger: {
        trigger: "#nav",
        scroller: "body",
        // markers:true,
        start: "top -10%",
        end: "top -11%",
        scrub: 1 // for this it will repeat when we scroll otherwise it won't


    }

})
