// scripts/post.js
import { createSection } from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
  // ✅ Restore theme
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "vaporwave") {
    document.body.classList.add("vaporwave");
    console.log("✨ Vaporwave mode applied on post page");
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

  // 📰 Load post content
  const params = new URLSearchParams(window.location.search);
  const postId = parseInt(params.get("id"));

  fetch("data/posts.json")
    .then((res) => res.json())
    .then((posts) => {
      const post = posts.find((p) => p.id === postId);
      if (!post) {
        document.getElementById("post-title").textContent = "Post Not Found";
        return;
      }

      document.getElementById("post-title").textContent = post.title;
      document.getElementById("post-date").textContent = post.date;

      const content = document.getElementById("post-content");

      if (post.image) {
        const img = document.createElement("img");
        img.src = post.image;
        img.alt = post.title;
        img.className = "post-image";
        content.prepend(img);
      }

      content.appendChild(createSection("✍️ Full Verse", post.verse));
      content.appendChild(createSection("🧠 Writer Mode", post.writerMode));
      content.appendChild(createSection("🎭 Gia Filter", post.giaFilter));
      content.appendChild(createSection("🧰 Code Notes", post.codeNotes));
    });
});