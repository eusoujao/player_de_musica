const player = document.querySelector("#player");
const musicName = document.querySelector("#musicName");
const playPauseButton = document.querySelector("#playPauseButton");
const prevButton = document.querySelector("#prevButton");
const nextButton = document.querySelector("#nextButton");
const currentTime = document.querySelector("#currentTime");
const duration = document.querySelector("#duration");
const progressBar = document.querySelector(".progress-bar");
const progress = document.querySelector(".progress");

const songs = [
    {
      src: "./src/1_Lets_Go_4.mp3",
      name: "Let's Go 4",
    },
    {
      src: "./src/2_Dentro_Da_Hilux.mp3",
      name: "Dentro da Hilux",
    },
    {
      src: "./src/3_Lapada_Dela_Ao_Vivo.mp3",
      name: "Lapada Dela - (Ao Vivo)",
    },
    {
      src: "./src/4_Toca_O_Trompete.mp3",
      name: "Toca o Trompete",
    },
    {
      src: "./src/5_Solteiro_Forcado_Boiadeira_Internacional.mp3",
      name: "Solteiro Forçado - Boiadeira Internacional",
    },
    {
      src: "./src/6_Faz_Um_Vuk_Vuk_Teto_Espelhado.mp3",
      name: "Faz um Vuk Vuk - Teto Espelhado",
    },
    {
        src: "./src/7_Canudinho_Ao_Vivo.mp3",
        name: "Canudinho - (Ao Vivo)",
    },
    {
        src: "./src/8_Halls_Na_Lingua.mp3",
        name: "Halls na Lingua",
    },
    {
        src: "./src/9_Ballena.mp3",
        name: "Ballena",
    },
    {
        src: "./src/10_Nosso_Quadro.mp3",
        name: "Nosso Quadro",
    },
];


const textButtonPlay = "<i class='bx bx-caret-right'></i>";
const textButtonPause = "<i class='bx bx-pause'></i>";

let index = 0;

prevButton.onclick = () => prevNextMusic("prev");
nextButton.onclick = () => prevNextMusic();

playPauseButton.onclick = () => playPause();

const playPause = () => {
  if (player.paused) {
    player.play();
    playPauseButton.innerHTML = textButtonPause;
  } else {
    player.pause();
    playPauseButton.innerHTML = textButtonPlay;
  }
};

player.ontimeupdate = () => updateTime();

const updateTime = () => {
  const currentMinutes = Math.floor(player.currentTime / 60);
  const currentSeconds = Math.floor(player.currentTime % 60);
  currentTime.textContent = currentMinutes + ":" + formatZero(currentSeconds);

  const durationFormatted = isNaN(player.duration) ? 0 : player.duration;
  const durationMinutes = Math.floor(durationFormatted / 60);
  const durationSeconds = Math.floor(durationFormatted % 60);
  duration.textContent = durationMinutes + ":" + formatZero(durationSeconds);

  const progressWidth = durationFormatted
    ? (player.currentTime / durationFormatted) * 100
    : 0;

  progress.style.width = progressWidth + "%";
};

const formatZero = (n) => (n < 10 ? "0" + n : n);

progressBar.onclick = (e) => {
  const newTime = (e.offsetX / progressBar.offsetWidth) * player.duration;
  player.currentTime = newTime;
};

const prevNextMusic = (type = "next") => {
  if ((type == "next" && index + 1 === songs.length) || type === "init") {
    index = 0;
  } else if (type == "prev" && index === 0) {
    index = songs.length;
  } else {
    index = type === "prev" && index ? index - 1 : index + 1;
  }

  player.src = songs[index].src;
  musicName.innerHTML = songs[index].name;
  if (type !== "init") playPause();

  updateTime();
};

prevNextMusic("init");