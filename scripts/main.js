// scripts/main.js
import { createSection } from "./utils.js";

const keysPressed = new Set();

document.addEventListener("DOMContentLoaded", () => {
  // ✅ Restore theme properly on load
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "vaporwave") {
    document.body.classList.add("vaporwave");
    console.log("✨ Vaporwave mode restored from storage.");
  }

  // 🎨 Triple-click on logo toggles theme
  const logo = document.getElementById("userverse-logo");
  if (logo) {
    let clickCount = 0;
    let timer = null;

    logo.addEventListener("click", () => {
      clickCount++;

      if (clickCount === 3) {
        const isActive = document.body.classList.toggle("vaporwave");

        if (isActive) {
          localStorage.setItem("theme", "vaporwave");
          console.log("🌸 Vaporwave mode activated!");
        } else {
          localStorage.removeItem("theme");
          console.log("🖤 Vaporwave mode deactivated!");
        }

        clickCount = 0;
        clearTimeout(timer);
      } else {
        clearTimeout(timer);
        timer = setTimeout(() => {
          clickCount = 0;
        }, 500);
      }
    });
  }

  // 📰 Load posts
  fetch("data/posts.json")
    .then((res) => res.json())
    .then((posts) => {
      const feed = document.getElementById("post-feed");

      posts.forEach((post) => {
        const postEl = document.createElement("div");
        postEl.className = "post-preview";

        postEl.innerHTML = `
          ${post.image ? `<img src="${post.image}" alt="${post.title}" class="post-thumb">` : ""}
          <h2>${post.title}</h2>
          <small>${post.date}</small>
          <p>${post.excerpt}</p>
        `;

        postEl.addEventListener("click", () => {
          window.location.href = post.url;
        });

        feed.appendChild(postEl);
      });
    });
});

// 🎹 Shift + O + D trigger
document.addEventListener("keydown", (e) => {
  keysPressed.add(e.key.toLowerCase());

  if (
    keysPressed.has("shift") &&
    keysPressed.has("o") &&
    keysPressed.has("d")
  ) {
    const isActive = document.body.classList.toggle("vaporwave");

    if (isActive) {
      localStorage.setItem("theme", "vaporwave");
      console.log("🌸 Vaporwave mode activated!");
    } else {
      localStorage.removeItem("theme");
      console.log("🖤 Vaporwave mode deactivated!");
    }
  }
});

document.addEventListener("keyup", (e) => {
  keysPressed.delete(e.key.toLowerCase());
});