import { PROJECTS } from "../data/projects_data.js";

PROJECTS.forEach((project) => project_card(project));

function project_card(project) {
    const tagsHtml = project.tags.map(tag => `<li>${tag}</li>`).join("");

    let html = `
        <div class="title-project-card">
            <h5>${project.title}</h5>
            <p>${project.date}</p>
        </div>
        <div class="content-project-card">
            <img src="${project.image}" alt="Project preview picture">
            <div class="text-content">
                <div class="text-content-top">
                    <ul>
                        ${tagsHtml}
                    </ul>
                    <p>${project.description}</p>
                </div>

                <a href="${project.url}"  target="_blank" class="button github-link">See it on GitHub <i class="fa-brands fa-github"></i></a>
            </div>
        </div>
    `;

    const card = document.createElement("div");
    card.classList.add("project-card");
    card.innerHTML = html;
    document.getElementById("projects-grid").appendChild(card);
}