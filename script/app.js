document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("#playerForm");
    const inputs = document.querySelectorAll(".formInput");
    const playerList = document.querySelector("#playerList");
    const clubFilter = document.querySelector(".clubFilter");

    const ALL_FOOTBALL_PLAYERS = JSON.parse(localStorage.getItem("players")) || [];

    function Player(image, name, club) {
        this.image = image;
        this.name = name;
        this.club = club;
    }

    const renderPlayers = (players) => {
        while (playerList.firstChild) {
            playerList.removeChild(playerList.firstChild);
        }
        players.forEach(player => {
            const playerItemDiv = document.createElement("div");
            playerItemDiv.classList.add("playerCard");
            playerItemDiv.innerHTML = `
                <img src="${player.image}" >
                <div class="playerInfo">
                    <h3>${player.name}</h3>
                    <strong>${player.club}</strong>
                </div>
            `;
            playerList.appendChild(playerItemDiv);
        });
    };

    const addNewFootballPlayer = (e) => {
        e.preventDefault();

        let values = Array.from(inputs).map(input => input.value.trim());
        if (values.includes("") || values[2] === "Select the club") {
            Toastify({
                text: "Input is empty or select the club",
                duration: 2000,
                newWindow: true,
                close: true,
                gravity: "top",
                position: "right",
                stopOnFocus: true,
                style: {
                  background: "red",
                  borderRadius: "16px",
                  display: "flex",
                  alignItems: "center",
                  fontFamily: "Jost",
                },
              }).showToast();
              return;
        }
        
        const player = new Player(values[0], values[1], values[2]);
        ALL_FOOTBALL_PLAYERS.push(player);
        localStorage.setItem("players", JSON.stringify(ALL_FOOTBALL_PLAYERS));
        renderPlayers(ALL_FOOTBALL_PLAYERS);
        inputs.forEach(input => {
            input.value = "";
        });
        inputs[2].selectedIndex = 0;
    };

    const filterPlayers = () => {
        const selectedClub = clubFilter.value;
        if (selectedClub === "Select the club") {
            renderPlayers(ALL_FOOTBALL_PLAYERS);
        } else {
            const filteredPlayers = ALL_FOOTBALL_PLAYERS.filter(player => player.club === selectedClub);
            renderPlayers(filteredPlayers);
        }
    };

    renderPlayers(ALL_FOOTBALL_PLAYERS);

    form.addEventListener("submit", addNewFootballPlayer);
    clubFilter.addEventListener("change", filterPlayers);
});
