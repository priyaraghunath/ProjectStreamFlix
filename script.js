//  API Gateway endpoint
const apiUrl = "https://ixefjxhpx4.execute-api.us-east-1.amazonaws.com/Test-env/movies";

document.addEventListener("DOMContentLoaded", function () {
  // to get the list of movies from backend
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const movies = JSON.parse(data.body);
      console.log("Parsed movies array:", movies);
      displayMovies(movies);
    })
    .catch(error => {
      console.error("Error fetching movies:", error);
    });

  // Filter movies by search input
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const query = this.value.toLowerCase();
      const allMovies = document.querySelectorAll(".movie");

      allMovies.forEach(div => {
        const title = div.querySelector("h3").textContent.toLowerCase();
        div.style.display = title.includes(query) ? "block" : "none";
      });
    });
  }
});

function displayMovies(movies) {
  const container = document.getElementById("moviesContainer");
  if (!container) return;

  container.innerHTML = "";

  movies.forEach(movie => {
    const div = document.createElement("div");
    div.className = "movie";

    div.innerHTML = `
      <div class="videoWrapper">
        <video src="${movie.VideoURL}" muted loop playsinline></video>
        <div class="playOverlay">
          <span class="playIcon">▶</span>
        </div>
      </div>
      <h3>${movie.Title}</h3>
    `;

    const video = div.querySelector("video");

    div.addEventListener("mouseenter", () => {
      video.play();
      div.classList.add("active");
      container.classList.add("dimOthers");
    });

    div.addEventListener("mouseleave", () => {
      video.pause();
      video.currentTime = 0;
      div.classList.remove("active");
      container.classList.remove("dimOthers");
    });

    div.addEventListener("click", () => {
      window.location.href = `watch.html?videoUrl=${encodeURIComponent(movie.VideoURL)}`;
    });

    container.appendChild(div);
  });
}
