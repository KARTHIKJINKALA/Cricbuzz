document.addEventListener("DOMContentLoaded", function () {
    let container = document.createElement("div");
    container.id = "container";
    document.body.appendChild(container);
    let upperbg = document.createElement("div");
    upperbg.id = "upperbg";
    container.appendChild(upperbg);
    let subContainer = document.createElement("div");
    subContainer.id = "subContainer";
    container.appendChild(subContainer);
    // renderSquad();
    let footer = document.createElement("div");
    footer.id = "footer";
    container.appendChild(footer);
    let navigation = document.createElement("div");
    navigation.className = "navigation";
    footer.appendChild(navigation);
    let ul = document.createElement("ul");
    navigation.appendChild(ul);
    const navItems = [
      { name: "Home", icon: "fa-solid fa-house", link: "./index.html" },
      {
        name: "Matches",
        icon: "fa-solid fa-baseball-bat-ball",
        link: "./match.html",
      },
      { name: "Videos", icon: "fa-solid fa-circle-play", link: "./video.html" },
      { name: "News", icon: "fa-solid fa-newspaper", link: "./news.html" },
      {
        name: "More",
        icon: "fa-solid fa-ellipsis-vertical",
        link: "./more.html",
      },
    ];
    navItems.forEach((item) => {
      let li = document.createElement("li");
      li.className = "list";
      let a = document.createElement("a");
      a.href = item.link;
      let iconSpan = document.createElement("span");
      iconSpan.className = "icon";
      iconSpan.innerHTML = `<i class="${item.icon}"></i>  `;
      let textSpan = document.createElement("span");
      textSpan.className = "text";
      textSpan.textContent = item.name;
      a.appendChild(iconSpan);
      a.appendChild(textSpan);
      li.appendChild(a);
      ul.appendChild(li);
    });
    let indicator = document.createElement("div");
    indicator.className = "indicator";
    ul.appendChild(indicator);
    const list = document.querySelectorAll(".list");
    const currentPath = window.location.pathname;
    list.forEach((item) => {
      const link = item.querySelector("a").getAttribute("href");
      if (currentPath.includes(link.split("./")[1])) {
          item.classList.add("active");
        }
      item.addEventListener("click", function () {
          list.forEach((navItem) => navItem.classList.remove("active"));
        this.classList.add("active");
      });
    });
    const urlMatch = 'https://cricbuzz-cricket.p.rapidapi.com/matches/v1/recent';
  const optionsMatch = {
      method: 'GET',
      headers: {
          'x-rapidapi-key': '441edb6b75mshd2f9035327dd8b0p1e6bf0jsnd5d822dfa551',
          'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
      }
  };
  async function matchHome() {
    
    try {
      const response = await fetch(urlMatch, optionsMatch);
      const result = await response.json();
      localStorage.setItem("Match",JSON.stringify(result))
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
  matchHome()
  function formatISTDate(timestamp) {
      if (!timestamp) return "N/A";
    const date = new Date(parseInt(timestamp, 10));
    const options = {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };
    return date.toLocaleString("en-IN", options);
  }
  function fetchMatchData(filterType) {
    // Clear existing logo if it exists
    let existingLogo = document.getElementById("navimg");
    if (!existingLogo) {
      existingLogo = document.createElement("p");
      existingLogo.id = "navimg";
      upperbg.appendChild(existingLogo);
    }
    existingLogo.innerHTML = "Current Matches";
  
    // Clear the previous content in subContainer
    subContainer.innerHTML = "";
  
    let storedMatches = JSON.parse(localStorage.getItem("Match"));
  if (!storedMatches || !storedMatches.filters || !storedMatches.filters.matchType) {
    subContainer.innerHTML = "<p>No valid match data available</p>";
    return;
  }
  
    let matchCategories = ["All"];
    storedMatches["filters"]["matchType"].forEach((matchType) => {
      matchCategories.push(matchType);
    });
  
    let categoryContainer = document.createElement("div");
    categoryContainer.id = "category-container"; 
    subContainer.appendChild(categoryContainer);
  
    matchCategories.forEach((category) => {
      let categoryElement = document.createElement("p");
      categoryElement.className = "category-item"; 
      categoryElement.innerHTML = category;
      categoryElement.addEventListener("click", () => {
        const allCategories = document.querySelectorAll(".category-item"); 
        allCategories.forEach((item) => item.classList.remove("active"));
        categoryElement.classList.add("active");
        fetchMatchData(category); // Fetch and render data based on category
      });
  
      categoryContainer.appendChild(categoryElement);
    });
  
    const filterMatchTypes =
      filterType === "All"
      ? ["International", "Domestic", "Women", "League"]
      : [filterType];
  
    storedMatches["typeMatches"].forEach((matchGroup) => {
      if (filterMatchTypes.includes(matchGroup["matchType"])) {
        let seriesMatches = matchGroup["seriesMatches"];
        let matchSection = document.createElement("div");
        matchSection.className = "match-type-section";
        subContainer.appendChild(matchSection);
  
        seriesMatches.forEach((series) => {
          let seriesDetails = series["seriesAdWrapper"];
          if (seriesDetails) {
            let seriesNameElement = document.createElement("p");
            seriesNameElement.innerText = seriesDetails["seriesName"];
            seriesNameElement.id = "series-name";
            matchSection.appendChild(seriesNameElement);
  
            seriesDetails["matches"].forEach((match) => {
              let matchDetails = match["matchInfo"];
              let matchScore = match["matchScore"];
  
              if (matchDetails) {
                let matchCard = document.createElement("div");
                matchCard.className = "match-card";
  
                const team1 = matchDetails["team1"]?.["teamName"] || "N/A";
                const team2 = matchDetails["team2"]?.["teamName"] || "N/A";
                const shortTeam1 = matchDetails["team1"]?.["teamSName"] || "N/A";
                const shortTeam2 = matchDetails["team2"]?.["teamSName"] || "N/A";
                const startDate = formatISTDate(matchDetails["startDate"]);
                const endDate = formatISTDate(matchDetails["endDate"]);
                const venueCity = matchDetails["venueInfo"]?.["city"] || "N/A";
                const venueGround = matchDetails["venueInfo"]?.["ground"] || "N/A";
                const matchStatus = matchDetails["status"] || "N/A";
                const team1Score = matchScore ? matchScore["team1Score"] : {};
                const team2Score = matchScore ? matchScore["team2Score"] : {};
                const team1Innings1 = team1Score?.inngs1?.runs || 0;
                const team1Innings2 = team1Score?.inngs2?.runs || 0;
                const team2Innings1 = team2Score?.inngs1?.runs || 0;
                const team2Innings2 = team2Score?.inngs2?.runs || 0;
  
                matchCard.innerHTML =` 
                  <strong>${team1} vs ${team2}</strong><br>
                  ${startDate} - ${endDate} • ${venueCity}, ${venueGround}<br>
                  ${shortTeam1} ${team1Innings1} & ${team1Innings2}<br>
                  ${shortTeam2} ${team2Innings1} & ${team2Innings2}<br>
                  <p style="color: red;">${matchStatus}</p>`
                ;
                matchSection.appendChild(matchCard);
              }
            });
          }
        });
      }
    });
  }
  
  
  fetchMatchData("All");
  
  const urlSquad = 'https://cricbuzz-cricket.p.rapidapi.com/mcenter/v1/35878/team/9';
  const optionsSquad = {
      method: 'GET',
      headers: {
          'x-rapidapi-key': '441edb6b75mshd2f9035327dd8b0p1e6bf0jsnd5d822dfa551',
          'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
      }
  };
  async function matchSquad() {
    
    try {
      const response = await fetch(urlSquad, optionsSquad);
      const result = await response.json();
      localStorage.setItem("matchSquad",JSON.stringify(result))
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
  matchSquad()
  
  function renderSquad() {
    subContainer.innerHTML = "";
    const squadData = JSON.parse(localStorage.getItem("matchSquad"));
    // console.log(squadData)
    subContainer.innerHTML = `
      <div id="playing-xi-container">
        <h3>Playing XI</h3>
      </div>
      <div id="bench-container">
        <h3>Bench</h3>
      </div>`
    ;
  
    const playingXIContainer = document.getElementById("playing-xi-container");
  squadData["players"]["playing XI"].forEach((player) => {
    const playerCard = document.createElement("div");
    playerCard.className = "player-card";
    playerCard.innerHTML = `
      <img src="https://www.cricbuzz.com/a/img/v1/75x75/i1/c${player["faceImageID"]}.jpg" alt="${player["fullName"]}" />
      <div class="player-info">
        <p><strong>${player["fullName"]}</strong></p>
        <p>${player["role"]}</p>
      </div>`
    ;
    playingXIContainer.appendChild(playerCard);
  });
  
  const benchContainer = document.getElementById("bench-container");
  squadData["players"]["bench"].forEach((player) => {
    const playerCard = document.createElement("div");
    playerCard.className = "player-card";
    playerCard.innerHTML = `
      <img src="https://www.cricbuzz.com/a/img/v1/75x75/i1/c${player["faceImageID"]}.jpg" alt="${player["fullName"]}" />
      <div class="player-info">
        <p><strong>${player["fullName"]}</strong></p>
        <p>${player["role"]}</p>
      </div>`
    ;
    benchContainer.appendChild(playerCard);
  });
  }
  
  
  
  
  
  
  const urlInfo = 'https://cricbuzz-cricket.p.rapidapi.com/mcenter/v1/41881';
  const optionsInfo = {
      method: 'GET',
      headers: {
          'x-rapidapi-key': '7a065f4400msh45e4001974ce383p1a3af2jsn92bf2a0a8a06',
          'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
      }
  };
  async function info() {
    try {
      const response = await fetch(urlInfo, optionsInfo);
      const result = await response.json();
      localStorage.setItem("info",JSON.stringify(result));
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
  // info()
  
  
  
  function renderInfo() {
    subContainer.innerHTML="";
    let infoData = JSON.parse(localStorage.getItem("info"));
    const matchInfo = infoData["matchInfo"];
    const venueInfo = infoData["venueInfo"];
    let infocon=document.createElement("div");
    infocon.className="infocon"
    subContainer.appendChild(infocon)
    const htmlContent =` 
      <h1>Match Information</h1>
      <p><strong>Match Format:</strong> ${matchInfo["matchFormat"]}</p>
      <p><strong>Series:</strong> ${matchInfo["series"]["name"]}</p>
      <p><strong>Date:</strong> ${new Date(matchInfo["matchStartTimestamp"]).toLocaleString()}</p>
      <p><strong>Venue:</strong> ${matchInfo["venue"]["country"]}, ${matchInfo["venue"]["city"]}</p>
      <p><strong>Umpires:</strong> ${matchInfo["umpire1"]["name"]}, ${matchInfo["umpire2"]["name"]}</p>
      <p><strong>Referee:</strong> ${matchInfo["referee"]["name"]}</p>
  
      <h2>Venue Guide</h2>
      <p><strong>Stadium:</strong> ${venueInfo["ground"]}</p>
      <p><strong>City:</strong> ${venueInfo["city"]}</p>
      <p><strong>Ends:</strong> ${venueInfo["ends"]}</p>
      <p><strong>Hosts to:</strong> ${venueInfo["homeTeam"]}</p>`
    ;
    infocon.innerHTML = htmlContent;
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  const urlScard = 'https://cricbuzz-cricket.p.rapidapi.com/mcenter/v1/40381/scard';
  const optionsScard = {
      method: 'GET',
      headers: {
          'x-rapidapi-key': '7a065f4400msh45e4001974ce383p1a3af2jsn92bf2a0a8a06',
          'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
      }
  };
  async function scard() {
    try {
      const response = await fetch(urlScard, optionsScard);
      const result = await response.json();
      localStorage.setItem("scard",JSON.stringify(result));
      // console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
  function renderScard() {
    // Clear the content of subContainer
    subContainer.innerHTML = "";
  
    // Parse scorecard data from localStorage
    let scardData = JSON.parse(localStorage.getItem("scard"));
  
    // Create a table for the scorecard
    const table = document.createElement("table");
    table.className = "scorecard-table";
  
    // Add table header for batters
    const headerRow = document.createElement("tr");
    headerRow.innerHTML = `
      <th>Batter</th>
      <th>R</th>
      <th>B</th>
      <th>4s</th>
      <th>6s</th>
      <th>SR</th>`
    ;
    table.appendChild(headerRow);
  
    // Iterate over the scorecard data to populate batter information
    scardData["scoreCard"].forEach((ele) => {
      const batsmenData = ele?.batTeamDetails?.batsmenData;
      if (!batsmenData) {
        console.error("Batsmen data not found for this scorecard entry");
        return;
      }
  
      // Render batting data
      Object.values(batsmenData).forEach((batsman) => {
        const batterName = batsman.isCaptain ? `${batsman.batName} (c)` : batsman.batName;
        const batsmanRow = document.createElement("tr");
        const nameCell = document.createElement("td");
        nameCell.innerHTML = `
          <p><strong>${batterName}</strong></p>
          <p style="font-size: smaller; color: gray;">${batsman.outDesc || "Not Out"}</p>`
        ;
        batsmanRow.appendChild(nameCell);
        batsmanRow.innerHTML += `
          <td>${batsman.runs || 0}</td>
          <td>${batsman.balls || 0}</td>
          <td>${batsman.fours || 0}</td>
          <td>${batsman.sixes || 0}</td>
          <td>${batsman.strikeRate || "-"}</td>`
        ;
        table.appendChild(batsmanRow);
      });
  
      // Bowling data (Ensure bowlTeamDetails is available and valid)
      const bowlersData = ele?.bowlTeamDetails?.bowlersData;
  
      // Check if bowlersData exists and is an object
      if (bowlersData && typeof bowlersData === 'object') {
        const bowlingHeaderRow = document.createElement("tr");
        bowlingHeaderRow.innerHTML = `
          <th>Bowler</th>
          <th>O</th>
          <th>M</th>
          <th>R</th>
          <th>W</th>
          <th>Eco</th>`
        ;
        table.appendChild(bowlingHeaderRow);
  
        // Loop through the bowlersData (it has keys like "bowl_1", "bowl_2", ...)
        Object.values(bowlersData).forEach((bowler) => {
          
          if (!bowler.bowlName) {
            console.warn("Invalid bowler data:", bowler);
            return; // Skip if bowler name is missing
          }
  
          const bowlerName = bowler.isCaptain ? `${bowler.bowlName} (c)` : bowler.bowlName;
          const bowlerRow = document.createElement("tr");
  
          bowlerRow.innerHTML = `
            <td><strong>${bowlerName}</strong></td>
            <td>${bowler.overs || 0}</td>
            <td>${bowler.maidens || 0}</td>
            <td>${bowler.runs || 0}</td>
            <td>${bowler.wickets || 0}</td>
            <td>${bowler.economy ? bowler.economy.toFixed(1) : "-"}</td>`
          ;
  
          table.appendChild(bowlerRow);
        });
      } else {
        console.error("No valid bowling data found");
      }
      
      const partnershipsData = {
        "pat_1": {
          "bat1Name": "Stirling",
          "bat1Runs": 5,
          "bat2Name": "Balbirnie",
          "bat2Runs": 1,
          "totalRuns": 6,
          "totalBalls": 6
        },
        "pat_2": {
          "bat1Name": "Lorcan Tucker",
          "bat1Runs": 5,
          "bat2Name": "Balbirnie",
          "bat2Runs": 9,
          "totalRuns": 14,
          "totalBalls": 6
        }
        // Add other partnerships data here
      };
      
      // Check if partnershipsData exists and is an object
      if (partnershipsData && typeof partnershipsData === 'object') {
        // Add header for batting stats
        const battingHeaderRow = document.createElement("tr");
        battingHeaderRow.innerHTML = `
          <th>Bat 1</th>
          <th>Runs</th>
          <th>Total Runs (Balls)</th>
          <th>Bat 2</th>
          <th>Runs</th>`
        ;
        table.appendChild(battingHeaderRow);
      
        // Iterate over partnershipsData and add rows
        Object.values(partnershipsData).forEach((partnership) => {
          if (!partnership.bat1Name || !partnership.bat2Name) {
            console.warn("Invalid partnership data:", partnership);
            return; // Skip if bat names are missing
          }
      
          const bat1Name = partnership.bat1Name;
          const bat1Runs = partnership.bat1Runs;
          const bat2Name = partnership.bat2Name;
          const bat2Runs = partnership.bat2Runs;
          const totalRuns = partnership.totalRuns;
          const totalBalls = partnership.totalBalls;
      
          const partnershipRow = document.createElement("tr");
      
          partnershipRow.innerHTML = `
            <td><strong>${bat1Name}</strong></td>
            <td>${bat1Runs}</td>
            <td>${totalRuns} (${totalBalls})</td>
            <td><strong>${bat2Name}</strong></td>
            <td>${bat2Runs}</td>`
          ;
          
          table.appendChild(partnershipRow);
        });
      } else {
        console.error("No valid batting data found");
      }
    });
  
    // Append the created table to subContainer
    subContainer.appendChild(table);
  }
  
  
  
  
  
  
  
  
  
  subContainer.addEventListener("click", (e) => {
    const matchCard = e.target.closest(".match-card");
    if (matchCard) {
      renderHeader("AUS vs UAE"); 
      renderSquad(); 
    }
  });
  function renderHeader(matchTitle) {
    upperbg.innerHTML = `
    <a id="navele" href="./match.html">
        <i class="fa-solid fa-arrow-left"></i> ${matchTitle}
      </a>
      <div id="sub-nav">
        <span class="tab" data-tab="info">Info</span> | 
        <span class="tab" data-tab="live">Live</span> | 
        <span class="tab" data-tab="scoreboard">scoreboard</span> | 
        <span class="tab" data-tab="squads">Squads</span> | 
        <span class="tab" data-tab="overs">Overs</span> | 
        <span class="tab" data-tab="highlights">Highlights</span>
        </div>`
        ;
    document.querySelectorAll("#sub-nav .tab").forEach((tab) => {
      tab.addEventListener("click", (e) => {
        const selectedTab = e.target.getAttribute("data-tab");
        if (selectedTab === "squads") {
          renderSquad();
        } 
        else if(selectedTab==="scoreboard"){
          renderScard();
        }
        else if(selectedTab==="info"){
          renderInfo();
        }
          else {
          subContainer.innerHTML = `<p>Rendering ${selectedTab} data...</p>`;
        }
      });
    });
  }
  const matchCard = document.createElement("div");
  matchCard.className = "match-card";
  matchCard.textContent = "Click here to load match details";
  subContainer.appendChild(matchCard);
  });
  
  info();
  scard();