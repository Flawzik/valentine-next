import { useEffect, useRef } from 'react';

export default function Home() {
    const audioRef = useRef(null);

    useEffect(() => {
        // Только на клиенте
        let heartInterval;
        let cryInterval;

        function playMusic() {
            const audio = audioRef.current;
            if (audio) {
                audio.play()
                    .then(() => {
                        document.getElementById("playMusicBtn").style.display = "none";
                    })
                    .catch((error) => {
                        console.error("Playback failed:", error);
                        alert("Не удалось запустить музыку. Возможно, браузер заблокировал автовоспроизведение.");
                    });
            }
        }

        window.playMusic = playMusic;

        function createHearts() {
            const container = document.body;
            return setInterval(() => {
                const heart = document.createElement("div");
                heart.classList.add("heart");
                heart.style.left = Math.random() * window.innerWidth + "px";
                heart.style.animationDuration = (Math.random() * 3 + 3) + "s";
                container.appendChild(heart);

                setTimeout(() => {
                    heart.remove();
                }, 6000);
            }, 300);
        }

        window.chooseYes = function() {
            document.getElementById("mainContainer").innerHTML = `
                <h1>С Днём Святого Валентина, Вероника!</h1>
                <p>Никогда не думал что смогу влюбиться в кого-то так сильно .<br>
                   Ты — моя муза, моя зая, и просто МОЯ!.<br>
                                    Люблю тебя.</p>
                <img src="/valentine.jpg" alt="Valentine" class="valentine-image">
                <p><strong>🤍</strong></p>
            `;
            document.querySelector('.buttons').classList.add('hidden');
        };

        window.chooseNo = function() {
            clearInterval(heartInterval);
            document.querySelectorAll('.heart').forEach(el => el.remove());

            document.getElementById("mainContainer").innerHTML = `
                <h1>Неправильный ответ</h1>
                <div class="buttons">
                    <button onclick="tryAgain()">Еще попытка</button>
                </div>
            `;
            document.body.style.backgroundColor = '#add8e6';

            const container = document.body;
            cryInterval = setInterval(() => {
                const cry = document.createElement("div");
                cry.classList.add("cry");
                cry.innerHTML = "😢";
                cry.style.left = Math.random() * window.innerWidth + "px";
                container.appendChild(cry);

                setTimeout(() => {
                    cry.remove();
                }, 6000);
            }, 300);
        };

        window.tryAgain = function() {
            if (cryInterval) {
                clearInterval(cryInterval);
            }
            document.querySelectorAll('.cry').forEach(el => el.remove());

            document.getElementById("mainContainer").innerHTML = `
                <h1>Будешь моей валентинкой?</h1>
                <div class="buttons">
                    <button onclick="chooseYes()">Да</button>
                    <button onclick="chooseNo()">Нет</button>
                </div>
            `;
            document.body.style.backgroundColor = '#ffe6f2';

            heartInterval = createHearts();
        };

        window.onload = function() {
            heartInterval = createHearts();
        };

    }, []); // Пустой массив зависимостей означает выполнение только при монтировании

    return (
        <>
            <style>{`
                body {
                    margin: 0;
                    padding: 0;
                    font-family: Arial, sans-serif;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    transition: background-color 1s;
                    overflow: hidden;
                    background-color: #ffe6f2;
                }
                .container {
                    text-align: center;
                    z-index: 10;
                }
                h1 {
                    color: #cc0052;
                    font-size: 3em;
                }
                .buttons {
                    margin-top: 20px;
                }
                button {
                    margin: 0 10px;
                    padding: 10px 20px;
                    font-size: 1.2em;
                    cursor: pointer;
                    border-radius: 50px;
                    border: none;
                    background-color: #ff3399;
                    color: white;
                }
                button:hover {
                    background-color: #e60073;
                }
                .cry {
                    position: absolute;
                    font-size: 40px;
                    animation: fallCry 5s infinite linear;
                }
                .heart {
                    position: absolute;
                    width: 20px;
                    height: 20px;
                    background-color: #ff3399;
                    transform: rotate(-45deg);
                    border-radius: 50%;
                    animation: float 5s infinite ease-in-out;
                }
                .heart::before, .heart::after {
                    content: '';
                    position: absolute;
                    width: 20px;
                    height: 20px;
                    background-color: #ff3399;
                    border-radius: 50%;
                }
                .heart::before {
                    top: -10px;
                    left: 0;
                }
                .heart::after {
                    top: 0;
                    left: 10px;
                }
                .valentine-image {
                    margin: 20px auto;
                    max-width: 300px;
                    border-radius: 10px;
                    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
                }
                .hidden {
                    display: none;
                }
                #playMusicBtn {
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    background-color: #ffccdd;
                    color: #cc0052;
                    border: none;
                    border-radius: 50%;
                    width: 50px;
                    height: 50px;
                    font-size: 1.5em;
                    cursor: pointer;
                }

                @keyframes float {
                    0% { transform: translateY(100vh) rotate(-45deg); opacity: 1; }
                    100% { transform: translateY(-100px) rotate(-45deg); opacity: 0; }
                }
                @keyframes fallCry {
                    0% { transform: translateY(-50px); opacity: 1; }
                    100% { transform: translateY(100vh); opacity: 0; }
                }
            `}</style>

            <audio ref={audioRef} loop preload="auto">
                <source src="/music.mp3" type="audio/mpeg" />
            </audio>

            <div className="container" id="mainContainer">
                <h1>Будешь моей валентинкой?</h1>
                <div className="buttons">
                    <button onClick={() => window.chooseYes && window.chooseYes()}>Да</button>
                    <button onClick={() => window.chooseNo && window.chooseNo()}>Нет</button>
                </div>
            </div>

            <button id="playMusicBtn" onClick={() => window.playMusic && window.playMusic()}>🎵</button>
        </>
    );
}