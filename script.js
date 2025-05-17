function copyScript() {
  const script = 'loadstring(game:HttpGet("https://pastebin.com/raw/Piw5bqGq"))()';
  navigator.clipboard.writeText(script).then(() => {
    alert("Script kopyalandı!");
  });
}

// Basit bir arka plan efekti (daha gelişmiş versiyon yaparız)
const canvas = document.getElementById("background");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

for (let i = 0; i < 100; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 3,
    speedX: (Math.random() - 0.5) * 2,
    speedY: (Math.random() - 0.5) * 2
  });
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let p of particles) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();

    // Kaçma efekti (mouse'a yakınsa itilir)
    if (mouse.x && mouse.y) {
      let dx = p.x - mouse.x;
      let dy = p.y - mouse.y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 100) {
        p.x += dx / distance;
        p.y += dy / distance;
      }
    }

    p.x += p.speedX;
    p.y += p.speedY;

    if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
    if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
  }

  requestAnimationFrame(animate);
}

let mouse = { x: null, y: null };
window.addEventListener("mousemove", function (e) {
  mouse.x = e.x;
  mouse.y = e.y;
});

animate();
