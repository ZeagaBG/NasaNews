// script.js

const RSS_URL =
"https://www.nasa.gov/rss/dyn/breaking_news.rss";

const API =
`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_URL)}`;

fetch(API)
.then(response => response.json())
.then(data => {

    let html = "";

    data.items.slice(0, 9).forEach(item => {

        const image =
            item.thumbnail ||
            "https://images-assets.nasa.gov/image/PIA12235/PIA12235~orig.jpg";

        const description =
            item.description
                .replace(/<[^>]*>/g, "")
                .substring(0, 180);

        html += `
        <article class="news-card">

            <img
                src="${image}"
                alt="${item.title}"
                class="news-image">

            <div class="news-content">

                <div class="news-date">
                    ${new Date(item.pubDate).toLocaleDateString()}
                </div>

                <h2 class="news-title">
                    ${item.title}
                </h2>

                <p class="news-description">
                    ${description}...
                </p>

                <a
                    href="${item.link}"
                    target="_blank"
                    class="read-more">
                    Прочети повече →
                </a>

            </div>

        </article>`;
    });

    document.getElementById("news-container").innerHTML = html;
})
.catch(() => {
    document.getElementById("news-container").innerHTML =
    '<div class="loading">Неуспешно зареждане на новините.</div>';
});