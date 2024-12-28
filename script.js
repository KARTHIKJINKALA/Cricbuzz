document.addEventListener("DOMContentLoaded", function () {
    let container = document.createElement("div");
    container.id = "container";
    document.body.appendChild(container);
  
    let upperbg = document.createElement("div");
    upperbg.id = "upperbg";
    container.appendChild(upperbg);
  
    let logo = document.createElement("img");
    logo.id = "navimg";
    logo.src = './image.png';
    logo.alt = "Logo";
    upperbg.appendChild(logo);
  
    let subContainer = document.createElement("div");
    subContainer.id = "subContainer";
    subContainer.innerHTML="Matches";
    container.appendChild(subContainer);
  
    let matchesWrapper = document.createElement("div");
    matchesWrapper.id = "matchesWrapper";
    subContainer.appendChild(matchesWrapper);
  
    let storiesWrapper = document.createElement("div");
    storiesWrapper.id = "storiesWrapper";
    subContainer.appendChild(storiesWrapper);
  
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
      { name: "Matches", icon: "fa-solid fa-baseball-bat-ball", link: "./match.html" },
      { name: "Videos", icon: "fa-solid fa-circle-play", link: "./video.html" },
      { name: "News", icon: "fa-solid fa-newspaper", link: "./news.html" },
      { name: "More", icon: "fa-solid fa-ellipsis-vertical", link: "./more.html" },
    ];
    navItems.forEach((item) => {
      let li = document.createElement("li");
      li.className = "list";
  
      let a = document.createElement("a");
      a.href = item.link;
  
      let iconSpan = document.createElement("span");
      iconSpan.className = "icon";
      iconSpan.innerHTML = `<i class="${item.icon}"></i>`;
  
      let textSpan = document.createElement("span");
      textSpan.className = "text";
      textSpan.textContent = item.name;
  
      a.appendChild(iconSpan);
      a.appendChild(textSpan);
      li.appendChild(a);
      ul.appendChild(li);
    });
  
    // Create and append "Matches" header before the matches section
  
    // Create and append "Top Stories" header before the stories section
    let storiesHead = document.createElement("p");
    storiesHead.innerHTML = "Top Stories";
    storiesWrapper.appendChild(storiesHead);
  
    function fetchMatchData() {
      let storedMatches = JSON.parse(localStorage.getItem("Match"));
      if (!storedMatches) {
        console.error("No match data found in local storage.");
        return;
      }
  
      storedMatches["typeMatches"].forEach((matchGroup) => {
        let seriesMatches = matchGroup["seriesMatches"];
        seriesMatches.forEach((series) => {
          let seriesDetails = series["seriesAdWrapper"];
          if (seriesDetails) {
            seriesDetails["matches"].forEach((match) => {
              let matchDetails = match["matchInfo"];
              let matchScore = match["matchScore"];
  
              if (matchDetails) {
                let matchCard = document.createElement("div");
                matchCard.className = "match-card";
  
                const matchDesc = matchDetails["matchDesc"] || "N/A";
                const seriesName = seriesDetails["seriesName"] || "N/A";
                const team1 = matchDetails["team1"]?.["teamName"] || "N/A";
                const team1Image = matchDetails["team1"]?.["teamImageId"] || "";
                const team1Score = matchScore ? formatScore(matchScore["team1Score"]) : "N/A";
                const team2 = matchDetails["team2"]?.["teamName"] || "N/A";
                const team2Image = matchDetails["team2"]?.["teamImageId"] || "";
                const team2Score = matchScore ? formatScore(matchScore["team2Score"]) : "N/A";
                const matchStatus = matchDetails["status"] || "N/A";
  
                matchCard.innerHTML = `
                  <div class="card">
                    <div class="match-card-header">
                        <p class="series-name">${seriesName}</p>
                        <p class="match-desc">${matchDesc}</p>
                    </div>
                    <div class="teams-info">
                        <div class="team">
                            <img src="${team1Image}" class="team-image">
                            <p class="team-name">${team1}</p>
                            <p class="team-score">${team1Score}</p>
                        </div>
                        <div class="team">
                            <img src="${team2Image}" class="team-image">
                            <p class="team-name">${team2}</p>
                            <p class="team-score">${team2Score}</p>
                        </div>
                    </div>
                    <div class="match-status">
                        <p>${matchStatus}</p>
                    </div>
                  </div>`;
                matchesWrapper.appendChild(matchCard);
              }
            });
          }
        });
      });
    }
  
    function fetchAndRenderHomeStories() {
      let homeData = JSON.parse(localStorage.getItem("allStories"));
      let homeList = homeData["storyList"];
      homeList.forEach((home) => {
        if (home["story"] && home["story"]["hline"]) {
          let homeWrapper = document.createElement("div");
          homeWrapper.id = "homeWrapper";
  
          let homeTitle = document.createElement("p");
          homeTitle.id = "homeTitle";
          homeTitle.innerHTML = home["story"]["hline"];
  
          let homeImage = document.createElement("img");
          homeImage.src = home["story"]["imageId"];
          homeImage.id = "homeImage";
  
          let homeDescription = document.createElement("p");
          homeDescription.id = "homeDescription";
          homeDescription.innerHTML = home["story"]["intro"];
  
          homeWrapper.appendChild(homeImage);
          homeWrapper.appendChild(homeTitle);
          homeWrapper.appendChild(homeDescription);
  
          storiesWrapper.appendChild(homeWrapper);
        }
      });
    }
  
    function formatScore(score) {
      if (score && typeof score === 'object') {
        const innings1 = score["inngs1"]?.runs || 0;
        const innings2 = score["inngs2"]?.runs || 0;
        return `${innings1} & ${innings2}`;
      }
      return score || "N/A";
    }
  
    fetchMatchData();
    fetchAndRenderHomeStories();
  });