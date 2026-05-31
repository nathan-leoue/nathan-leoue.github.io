import { PROJECTS } from "../data/projects_data.js";

const latest = PROJECTS[0];

const html = `
    <h2>${latest.title}</h2>
    <p>${latest.description}</p>
`;

document.getElementById("project-preview").innerHTML = html;