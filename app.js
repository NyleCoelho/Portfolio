document.addEventListener("mousemove", function(event) {
    let x = event.clientX / window.innerWidth * 100;
    let y = event.clientY / window.innerHeight * 100;
    document.body.style.background = `radial-gradient(circle at ${x}% ${y}%,rgb(17, 0, 29), #000000)`;
});