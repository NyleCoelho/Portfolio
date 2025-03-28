document.addEventListener("mousemove", function(event) {
    let x = event.clientX / window.innerWidth * 100;
    let y = event.clientY / window.innerHeight * 100;
    document.body.style.background = `radial-gradient(circle at ${x}% ${y}%,rgb(18, 17, 20),rgb(26, 26, 34))`;
});

document.addEventListener("mousemove", (event) => {
    let x = ((event.clientX / window.innerWidth) - 0.5) * 10 + "px";
    let y = ((event.clientY / window.innerHeight) - 0.5) * 10 + "px";
    
    document.documentElement.style.setProperty("--x", x);
    document.documentElement.style.setProperty("--y", y);
});
