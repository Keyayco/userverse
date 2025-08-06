// scripts/utils.js

export function createSection(label, text) {
  const section = document.createElement("section");
  section.className = "post-block";

  const heading = document.createElement("h2");
  heading.textContent = label;

  const paragraph = document.createElement("pre");
  paragraph.textContent = text;

  section.appendChild(heading);
  section.appendChild(paragraph);

  return section;
}
