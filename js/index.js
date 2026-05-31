import { PROJECTS } from "../data/projects_data.js";

const latest = PROJECTS[0];

const tagsHtml = latest.tags.map(tag => `<li>${tag}</li>`).join("");

const html = `
    <div class="title-project-card">
        <h5>${latest.title}</h5>
        <p>${latest.date}</p>
    </div>
    <div class="content-project-card">
        <img src="${latest.image}" alt="Project preview picture">
        <div class="text-content">
            <div class="text-content-top">
                <ul>
                    ${tagsHtml}
                </ul>
                <p>${latest.description}</p>
            </div>

            <a href="${latest.url}" class="button github-link">See it on GitHub <i class="fa-brands fa-github"></i></a>
        </div>
    </div>
`;

document.getElementById("project-preview").innerHTML = html;