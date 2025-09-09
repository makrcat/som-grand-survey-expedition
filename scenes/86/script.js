/// <reference path="ref.d.ts"
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
    return Math.floor(Math.random() * max)

function loadVideos() {
    /**
     * @type {{name: string, author: string, projectId: number, thumbnail: string}[]}
     */
    /** @type {Video[]} */
    const sidebarVids = [
        {
            name: 'Splorgon 5',
            author: 'Utkarsh Kumar',
            projectId: 1,
            thumbnail: `/scenes/86/assets/neighbors/01.png`,
        },
        {
            name: 'Just a Real Nice Pond',
            author: 'Irtaza',
            projectId: 22,
            thumbnail: `https://picsum.photos/seed/${getRandomInt(212894126948)}/1280/720`,
        },
    ]

    for (const video of sidebarVids) {
        const element =
            `<a class="thumbnail" href="/scenes/${video.projectId}">` +
            `<img src="${video.thumbnail}" height="128"/>` +
            `<div class="textcontent">` +
            `<span class="title">&lbrack;${video.projectId}&rbrack; ${video.name}</span>` +
            `<span class="author">${video.author}</span>` +
            `</div>` +
            `</a>`
        const videosList = document.getElementById('recommended')
        videosList.innerHTML += element
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadVideos()
})