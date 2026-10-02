const genres = [
  "Todos", "Pop", "Reguetón", "Rock", "K-pop",
  "Rap", "Electrónica", "Salsa", "Bachata",
  "Romántica", "Clásica", "Jazz", "Lo-fi"
];

const songs = [
  { title: "Dreams", artist: "SoundHelix", genre: "Pop",
    cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  { title: "Night Vibes", artist: "SoundHelix", genre: "Reguetón",
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
  { title: "Electric Soul", artist: "SoundHelix", genre: "Rock",
    cover: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
  { title: "Blue Sky", artist: "SoundHelix", genre: "K-pop",
    cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
  { title: "Neon Lights", artist: "SoundHelix", genre: "Electrónica",
    cover: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=400",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" },
  { title: "Golden Hour", artist: "SoundHelix", genre: "Romántica",
    cover: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3" },
  { title: "Urban Beat", artist: "SoundHelix", genre: "Rap",
    cover: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=400",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3" },
  { title: "Summer Dance", artist: "SoundHelix", genre: "Salsa",
    cover: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" },
  { title: "Moonlight", artist: "SoundHelix", genre: "Jazz",
    cover: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=400",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3" },
  { title: "Soft Rain", artist: "SoundHelix", genre: "Lo-fi",
    cover: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=400",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3" },
  { title: "Latin Rhythm", artist: "SoundHelix", genre: "Bachata",
    cover: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3" },
  { title: "Piano Dreams", artist: "SoundHelix", genre: "Clásica",
    cover: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=400",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3" }
];

const audio = document.getElementById("audio");
const musicGrid = document.getElementById("musicGrid");
const genreContainer = document.getElementById("genres");
const search = document.getElementById("search");

let selectedGenre = "Todos";
let currentIndex = -1;
let isPlaying = false;

const playButton = document.getElementById("play");

function renderGenres() {
  genreContainer.innerHTML = genres.map(genre => `
    <button class="genre ${genre === selectedGenre ? "active" : ""}"
      onclick="selectGenre('${genre}')">
      ${genre}
    </button>
  `).join("");
}

function selectGenre(genre) {
  selectedGenre = genre;
  renderGenres();
  renderMusic();
}

function showAll() {
  selectedGenre = "Todos";
  search.value = "";
  renderGenres();
  renderMusic();
  document.getElementById("biblioteca").scrollIntoView({
    behavior: "smooth"
  });
}

function renderMusic() {
  const query = search.value.toLowerCase();

  const filtered = songs.map((song, index) => ({
    ...song,
    index
  })).filter(song => {
    const genreMatch =
      selectedGenre === "Todos" ||
      song.genre === selectedGenre;

    const textMatch =
      song.title.toLowerCase().includes(query) ||
      song.artist.toLowerCase().includes(query) ||
      song.genre.toLowerCase().includes(query);

    return genreMatch && textMatch;
  });

  document.getElementById("listTitle").textContent =
    selectedGenre === "Todos" ? "Música para ti" : selectedGenre;

  document.getElementById("resultCount").textContent =
    `${filtered.length} canciones`;

  musicGrid.innerHTML = filtered.length
    ? filtered.map(song => `
      <article class="music-card">
        <div class="cover">
          <img src="${song.cover}" alt="${song.title}">
          <button onclick="playSong(${song.index})">▶</button>
        </div>
        <h3>${song.title}</h3>
        <p>${song.artist} · ${song.genre}</p>
      </article>
    `).join("")
    : '<p class="empty">No se encontraron canciones.</p>';
}

function playSong(index) {
  currentIndex = index;
  const song = songs[index];

  audio.src = song.audio;
  document.getElementById("playingTitle").textContent = song.title;
  document.getElementById("playingArtist").textContent = song.artist;
  document.getElementById("playingCover").src = song.cover;

  audio.play().then(() => {
    isPlaying = true;
    playButton.textContent = "⏸";
  }).catch(() => {
    isPlaying = false;
    playButton.textContent = "▶";
    alert("No se pudo reproducir la pista de demostración.");
  });
}

playButton.addEventListener("click", () => {
  if (currentIndex === -1) {
    playSong(0);
  } else if (isPlaying) {
    audio.pause();
    isPlaying = false;
    playButton.textContent = "▶";
  } else {
    audio.play().then(() => {
      isPlaying = true;
      playButton.textContent = "⏸";
    }).catch(() => {
      alert("No se pudo reproducir el audio.");
    });
  }
});

function nextSong() {
  playSong((currentIndex + 1) % songs.length);
}

function previousSong() {
  playSong((currentIndex - 1 + songs.length) % songs.length);
}

document.getElementById("next").addEventListener("click", nextSong);
document.getElementById("previous").addEventListener("click", previousSong);

audio.addEventListener("ended", nextSong);

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${String(sec).padStart(2, "0")}`;
}

audio.addEventListener("loadedmetadata", () => {
  document.getElementById("total").textContent =
    formatTime(audio.duration);
});

audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    document.getElementById("progress").value =
      audio.currentTime / audio.duration * 100;
    document.getElementById("time").textContent =
      formatTime(audio.currentTime);
  }
});

document.getElementById("progress").addEventListener("input", e => {
  if (audio.duration) {
    audio.currentTime = e.target.value / 100 * audio.duration;
  }
});

document.getElementById("volume").addEventListener("input", e => {
  audio.volume = Number(e.target.value);
});

audio.volume = 0.7;

search.addEventListener("input", renderMusic);

// Buscar música real en YouTube Music
document.getElementById("youtubeSearch").addEventListener("click", () => {
  const query = search.value.trim() ||
    (selectedGenre === "Todos" ? "música" : selectedGenre + " música");

  const url = "https://music.youtube.com/search?q=" +
    encodeURIComponent(query);

  window.open(url, "_blank", "noopener,noreferrer");
});

renderGenres();
renderMusic();
