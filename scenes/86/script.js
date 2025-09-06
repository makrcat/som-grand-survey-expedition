function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

function loadVideos() {
    /**
     * @type {{name: string, author: string, projectId: number, thumbnail: string}[]}
     */
    const sidebarVids = [
        {
            name: 'Splorgon 5',
            author: 'Unassigned',
            projectId: 1,
            thumbnail: `https://picsum.photos/seed/${getRandomInt(38164912416)}/1280/720`,
        },
        {
            name: 'Just a Real Nice Pond',
            author: 'Unassigned',
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