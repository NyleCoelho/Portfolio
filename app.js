document.addEventListener("mousemove", function(event) {
    let x = event.clientX / window.innerWidth * 100;
    let y = event.clientY / window.innerHeight * 100;
    document.body.style.background = `radial-gradient(circle at ${x}% ${y}%,rgb(216, 169, 255),rgb(251, 228, 214))`;
});