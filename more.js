document.addEventListener("DOMContentLoaded", function () {

    let container = document.createElement("div");
    container.id = "container";
    document.body.appendChild(container);
    
    let upperbg = document.createElement("div");
    upperbg.id = "upperbg";
    container.appendChild(upperbg);
    
    let logo = document.createElement("p");
    logo.id = "navimg";
    logo.innerHTML = " More ";
    upperbg.appendChild(logo);
    
    let subContainer = document.createElement("div");
    subContainer.id = "subContainer";
    container.appendChild(subContainer);
    
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
  
    // Create navigation menu
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
  
    // Add indicator to navigation
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
    let arr = [
      "Browse Series", "Browse Team", "Browse Players", "Schedule", "Archives", "Photos", 
      "Quotes", "ICC Rankings - Men", "ICC Rankings - Women", "Records", "ICC World Test Championship", 
      "ICC World Cup Super League", "Rate the App", "Feedback", "About Cricbuzz"
    ];
  
    let emoji = [
      "fa-solid fa-trophy", "fa-sharp fa-solid fa-user-group", "fa-solid fa-user", "fa-solid fa-calendar", 
      "fa-solid fa-arrows-rotate", "fa-solid fa-photo-film", "fa-solid fa-quote-right", "fa-solid fa-chart-line", 
      "fa-solid fa-chart-line", "fa-solid fa-chart-gantt", "fa-solid fa-door-open", "fa-solid fa-door-open", 
      "fa-regular fa-star", "fa-regular fa-message", "fa-solid fa-gear", "fa-solid fa-eject"
    ];
  
    arr.forEach((item, index) => {
      let newElement = document.createElement('div');
      newElement.id = item.replace(/\s+/g, '_'); 
      newElement.className = "menu-item"; 
      
      let icon = document.createElement('i');
      icon.className = emoji[index]; 
      
      let text = document.createElement('span');
      text.innerText = item;
      
      newElement.appendChild(icon);
      newElement.appendChild(text);
      subContainer.appendChild(newElement);
  
      // Add event listener for "Browse Series"
      if (item === "Browse Series") {
        newElement.addEventListener("click", function () {
          seriesAll(); // Call the function to load the series data
        });
      }
      if (item === "Browse Team") {
        newElement.addEventListener("click", function () {
          displayTeams(); 
        });
      }
      if(item=="Browse Players"){
        newElement.addEventListener("click",function(){
          renderBowlingStats();
        });
      }
      if(item=="Schedule"){
        newElement.addEventListener("click",function(){
          renderMatchSchedule();
        })
      }
      if(item=="ICC Rankings - Men"){
        newElement.addEventListener("click",function(){
          menRank();
        })
      }
      if(item=="Records"){
        newElement.addEventListener("click",function(){
          renderRecords("Batting");
        })
      }
    });
  
    // API call to fetch series data and store in local storage
    const url6 = 'https://cricbuzz-cricket.p.rapidapi.com/series/v1/international';
    const options6 = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '7a065f4400msh45e4001974ce383p1a3af2jsn92bf2a0a8a06',
        'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
      }
    };
  
    async function series() {
      try {
        const storeTeamponse = await fetch(url6, options6);
        const storeTeamult = await storeTeamponse.json();
        localStorage.setItem("series", JSON.stringify(storeTeamult));
      } catch (error) {
        console.error(error);
      }
    }
  
  series()
    function formatISTDate(timestamp) {
      if (!timestamp) return "N/A";
      const date = new Date(parseInt(timestamp, 10));
      const options = {
        timeZone: "Asia/Kolkata",
        day: "numeric",
        month: "short",
        hour12: false,
      };
      return date.toLocaleString("en-IN", options);
    }
  
    function seriesAll() {
      logo.innerHTML = "";
      let navname=document.createElement("p");
      navname.innerHTML="Browse Series";
      navname.id="navname"
      upperbg.appendChild(navname)
      subContainer.innerHTML = "";
    
      // Create a navigation element
      let navele = document.createElement("div");
      navele.id = "navele";
      upperbg.appendChild(navele);
    
      // Fetch series data from localStorage
      let series = JSON.parse(localStorage.getItem("series"));
    
      // Create an input element
      let input = document.createElement("input");
      input.id = "inp";
      subContainer.appendChild(input);
    
      // Iterate over series data
      series["seriesMapProto"].forEach((seriesData) => {
        let date = seriesData["date"];
        let count = seriesData["series"];
    
        // Add date as a paragraph
        let date1 = document.createElement("p");
        date1.innerHTML = date;
        date1.id = "date";
        subContainer.appendChild(date1);
    
        count.forEach((series) => {
          let name = series["name"];
          let sDate = series["startDt"];
          let eDate = series["endDt"];
    
          // Create a wrapper for each series
          let wrap = document.createElement("div");
          wrap.classList.add("wrap");
          subContainer.appendChild(wrap);
    
          let wrapele = document.createElement("p");
          wrapele.classList.add("wrapele");
          wrapele.innerHTML = name;
          wrap.appendChild(wrapele);
    
          let wrapele2 = document.createElement("p");
          wrapele2.classList.add("wrapele2");
          wrapele2.innerHTML = `${formatISTDate(sDate)} - ${formatISTDate(eDate)}`;
          wrap.appendChild(wrapele2);
    
          // Add click event listener to the wrapper
          wrap.addEventListener("click", () => {
            navname.href="./more.html"
            navname.innerHTML = `<a href="./more.html" class="nav"><i class="fa-solid fa-arrow-left"></i> ${name}</a>`;
  
            // Update navigation links
            navele.innerHTML = `
              <a href="#" id="matches">Matches</a>
              <a href="#" id="table">Table</a>
              <a href="#" id="squads">Squads</a>
              <a href="#" id="stats">Stats</a>
              <a href="#" id="venues">Venues</a>
              <a href="#" id="news">News</a>
            `;
            renderSeriesMatches();
            document.getElementById("matches").addEventListener("click", renderSeriesMatches);
            document.getElementById("squads").addEventListener("click", renderMatchSquads);
            document.getElementById("stats").addEventListener("click", renderMatchStats);
            document.getElementById("news").addEventListener("click", renderMatchNews);
            document.getElementById("venues").addEventListener("click", renderMatchVenue);
            document.getElementById("table").addEventListener("click", renderMatchTable);
          });
        });
      });
    }
    const urlMatch = 'https://cricbuzz-cricket.p.rapidapi.com/series/v1/3641';
    const optionsMatch = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '7a065f4400msh45e4001974ce383p1a3af2jsn92bf2a0a8a06',
        'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
      }
    };
    async function seriesMtch() {
      
      try {
        const response = await fetch(urlMatch, optionsMatch);
        const result = await response.json();
        localStorage.setItem("seriesMAtch",JSON.stringify(result));
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    }
    seriesMtch();
    
    function renderSeriesMatches() {
      subContainer.innerHTML = ""; 
      // logo.innerHTML=""; 
      let seriesMatchData = JSON.parse(localStorage.getItem("seriesMAtch"));
    let matchSeries=document.createElement("div");
    matchSeries.id="matchSeries"
    subContainer.appendChild(matchSeries);
      seriesMatchData["matchDetails"].forEach((ele) => {
        if (ele["matchDetailsMap"]) {
          const matchDetailsMap = ele["matchDetailsMap"];
          const match = matchDetailsMap["match"][0];
          const matchInfo = match["matchInfo"];
          const matchDiv = document.createElement("div");
          matchDiv.classList.add("match-container");
          matchDiv.id="matchDiv"
          matchDiv.innerHTML = `
            <h3>${matchDetailsMap["key"]}</h3>
            <p><strong>Match:</strong> ${matchInfo["matchDesc"]} @ ${matchInfo["venueInfo"]["city"]}</p>
            <div class="team-container">
              <img src="https://example.com/images/${matchInfo["team1"]["imageId"]}.png" alt="${matchInfo["team1"]["teamSName"]} Logo" class="team-logo">
              <span class="team-name">${matchInfo["team1"]["teamSName"]}</span>
            </div>
            <div class="team-container">
              <img src="https://example.com/images/${matchInfo["team2"]["imageId"]}.png" alt="${matchInfo["team2"]["teamSName"]} Logo" class="team-logo">
              <span class="team-name">${matchInfo["team2"]["teamSName"]}</span>
            </div>
            <p class="status">${matchInfo["status"]}</p>
          `;
          matchSeries.appendChild(matchDiv);
        }
      });
    } 
  
    function renderMatchTable() {
      subContainer.innerHTML = "";
      let box = document.createElement("p");
      box.id = "loading-message";
      box.innerHTML = "Hooo sorry, data is loading.....!!!!!!";
      subContainer.appendChild(box);
    }
    
  
  
  
  
    const urlSquads = 'https://cricbuzz-cricket.p.rapidapi.com/series/v1/3718/squads';
  const optionsSquads = {
      method: 'GET',
      headers: {
          'x-rapidapi-key': '7a065f4400msh45e4001974ce383p1a3af2jsn92bf2a0a8a06',
          'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
      }
  };
  async function MatchSquads() {
    
    try {
      const response = await fetch(urlSquads, optionsSquads);
      const result = await response.json();
      localStorage.setItem("matchSquads",JSON.stringify(result))
    } catch (error) {
      console.error(error);
    }
  }
  MatchSquads()
  function renderMatchSquads() {
    // Clear the previous content in subContainer
    subContainer.innerHTML = "";
      logo.innerHTML=""; 
  
    // Fetch match squads data from localStorage
    let matchSquadsData = JSON.parse(localStorage.getItem("matchSquads"));
  
    // Iterate through squads and render them
    matchSquadsData["squads"].forEach((ele, index) => {
      if (index === 0) {
        // Render the first element as a heading
        const heading = document.createElement("h2");
        heading.id="heading"
        heading.innerText = ele["squadType"];
        subContainer.appendChild(heading);
      } else {
        // Render other squad types as regular content
        const squadType = document.createElement("p");
        squadType.id="squadType"
        squadType.innerText = ele["squadType"];
        subContainer.appendChild(squadType);
      }
    });
  }
  // renderMatchSquads();
  
  
  const urlStats = 'https://cricbuzz-cricket.p.rapidapi.com/stats/v1/series/3718';
  const optionsStats = {
      method: 'GET',
      headers: {
          'x-rapidapi-key': '7a065f4400msh45e4001974ce383p1a3af2jsn92bf2a0a8a06',
          'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
      }
  };
  async function matchStats() {
    
    try {
      const response = await fetch(urlStats, optionsStats);
      const result = await response.json();
      localStorage.setItem("matchStats",JSON.stringify(result));
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
  matchStats()
  function renderMatchStats() {
    // Clear previous content in subContainer
    subContainer.innerHTML = "";
  
    // Fetch match stats data from localStorage
    let matchStatsData = JSON.parse(localStorage.getItem("matchStats"));
    console.log(matchStatsData);
    matchStatsData["types"].forEach((ele, index) => {
        const heading = document.createElement("h2");
        heading.innerText = ele["header"];
        heading.id = "stats-heading";
        subContainer.appendChild(heading);
    });
  }
  
  
  
  
  const urlMatchNews = 'https://cricbuzz-cricket.p.rapidapi.com/news/v1/series/3636';
  const optionsMatchNews = {
      method: 'GET',
      headers: {
          'x-rapidapi-key': '7a065f4400msh45e4001974ce383p1a3af2jsn92bf2a0a8a06',
          'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
      }
  };
  async function matchNews() {
    
    try {
      const response = await fetch(urlMatchNews, optionsMatchNews);
      const result = await response.json();
      localStorage.setItem("matchnews",JSON.stringify(result))
    } catch (error) {
      console.error(error);
    }
  }
  matchNews()
  function renderMatchNews() {
    // Clear the previous content in subContainer
    subContainer.innerHTML = "";
  
    // Fetch match news data from localStorage
    let matchnewsData = JSON.parse(localStorage.getItem("matchnews"));
    console.log(matchnewsData);
  
    // Iterate through the storyList and render stories
    matchnewsData["storyList"].forEach((ele, index) => {
      if (ele["story"]) {
        const { imageId, hline, intro } = ele["story"];
  
        // Create a container for each news story
        const newsContainer = document.createElement("div");
        newsContainer.id = `news-container-${index}`;
        newsContainer.classList.add("news-container");
  
        // Add news image
        const newsImage = document.createElement("img");
        newsImage.src = `https://example.com/images/${imageId}.png`; 
        newsImage.classList.add("news-image");
  
        // Add news details
        const newsDetails = document.createElement("div");
        newsDetails.classList.add("news-details");
  
        // Headline
        const newsHeadline = document.createElement("h3");
        newsHeadline.id = `news-headline-${index}`;
        newsHeadline.innerText = hline;
        newsDetails.appendChild(newsHeadline);
  
        // Intro
        const newsIntro = document.createElement("p");
        newsIntro.id = `news-intro-${index}`;
        newsIntro.innerText = intro;
        newsDetails.appendChild(newsIntro);
  
        // Append image and details to the news container
        newsContainer.appendChild(newsImage);
        newsContainer.appendChild(newsDetails);
  
        // Append the news container to subContainer
        subContainer.appendChild(newsContainer);
      }
    });
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  const urlVenue = 'https://cricbuzz-cricket.p.rapidapi.com/series/v1/3718/venues';
  const optionsVenue = {
      method: 'GET',
      headers: {
          'x-rapidapi-key': '7a065f4400msh45e4001974ce383p1a3af2jsn92bf2a0a8a06',
          'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
      }
  };
  async function MatchVenue() {
    
    try {
      const response = await fetch(urlVenue, optionsVenue);
      const result = await response.json();
      localStorage.setItem("matchVenue",JSON.stringify(result))
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
  MatchVenue()
  function renderMatchVenue() {
    // Clear the previous content in subContainer
    subContainer.innerHTML = "";
  
    // Fetch match venue data from localStorage
    let matchVenueData = JSON.parse(localStorage.getItem("matchVenue"));
    console.log(matchVenueData);
  
    // Iterate through the seriesVenue array and render venue details
    matchVenueData["seriesVenue"].forEach((ele, index) => {
      // Create a container for each venue
      const venueContainer = document.createElement("div");
      venueContainer.id = `venue-container-${index}`;
      venueContainer.classList.add("venue-container");
  
      // Add venue image
      const venueImage = document.createElement("img");
      venueImage.src = `https://example.com/images/${ele["imageId"]}.png`; 
      // venueImage.alt = `${ele["ground"]} Image`;
      venueImage.classList.add("venue-image");
  
      // Add venue details
      const venueDetails = document.createElement("div");
      venueDetails.classList.add("venue-details");
  
      // Ground and city
      const venueName = document.createElement("h3");
      venueName.id = `venue-name-${index}`;
      venueName.innerText = `${ele["ground"]}, ${ele["city"]}`;
      venueDetails.appendChild(venueName);
  
      // Country
      const venueCountry = document.createElement("p");
      venueCountry.id = `venue-country-${index}`;
      venueCountry.innerText = `${ele["country"]}`;
      venueDetails.appendChild(venueCountry);
  
      // Append image and details to the venue container
      venueContainer.appendChild(venueImage);
      venueContainer.appendChild(venueDetails);
  
      // Append the venue container to subContainer
      subContainer.appendChild(venueContainer);
    });
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  const urla = 'https://cricbuzz-cricket.p.rapidapi.com/teams/v1/international';
  const optionsa = {
      method: 'GET',
      headers: {
          'x-rapidapi-key': '441edb6b75mshd2f9035327dd8b0p1e6bf0jsnd5d822dfa551',
          'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
      }
  };
    async function team() {
      try {
        const storeTeamponse = await fetch(urla, optionsa);
        const storeTeamult = await storeTeamponse.json();
        localStorage.setItem("team",JSON.stringify(storeTeamult))
      } catch (error) {
        console.error(error);
      }
    }
  team()
  function displayTeams() {
    let navele = document.createElement("a");
    navele.href = "./more.html";
    navele.innerHTML = `<i class="fa-solid fa-arrow-left-long"></i> Browse Teams`;
    navele.id = "navele";
    upperbg.innerHTML = "";
    upperbg.appendChild(navele);
    subContainer.innerHTML = "";
  
    let storedTeams = JSON.parse(localStorage.getItem("team"));
    if (!storedTeams || !storedTeams["list"]) {
      let errorMsg = document.createElement("p");
      errorMsg.textContent = "No teams available.";
      subContainer.appendChild(errorMsg);
      return;
    }
  
    let categories = {
      International: [],
      Domestic: [],
      League: [],
      Women: [],
    };
  
    // Categorize teams based on logic
    storedTeams["list"].forEach((teamData) => {
      let category = "International"; // Example categorization logic
      categories[category].push(teamData);
    });
  
    for (let category in categories) {
      let categoryTitle = document.createElement("h3");
      categoryTitle.textContent = category;
      categoryTitle.className = "categoryTitle";
      subContainer.appendChild(categoryTitle);
  
      let teamGrid = document.createElement("div");
      teamGrid.className = "teamGrid";
      subContainer.appendChild(teamGrid);
  
      categories[category].forEach((teamData) => {
        let teamContainer = document.createElement("div");
  
        // Different classes based on presence of imageId
        if (teamData["imageId"]) {
          teamContainer.className = "teamContainerWithImage"; // Class for teams with imageId
          let teamImage = document.createElement("img");
          teamImage.className = "teamImage";
          teamImage.src = `https://cricbuzz-cricket.p.rapidapi.com/img/v1/i1/c${teamData["imageId"]}/i.jpg`;
          teamContainer.appendChild(teamImage);
        } else {
          teamContainer.className = "teamContainerWithoutImage"; 
        }
  
        let teamNameElement = document.createElement("p");
        teamNameElement.className = "teamName";
        teamNameElement.innerHTML = teamData["teamName"];
  
        teamContainer.appendChild(teamNameElement);
  
        teamGrid.appendChild(teamContainer);
      });
    }
  }
  const urlb = 'https://cricbuzz-cricket.p.rapidapi.com/stats/v1/player/trending';
  const optionsb = {
      method: 'GET',
      headers: {
          'x-rapidapi-key': '441edb6b75mshd2f9035327dd8b0p1e6bf0jsnd5d822dfa551',
          'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
      }
  };
  async function player() {
    
    try {
      const response = await fetch(urlb, optionsb);
      const result = await response.text();
      localStorage.setItem("player",(result))
    } catch (error) {
      console.error(error);
    }
  }
  player()
  function renderBowlingStats() {
    let navele = document.createElement("a");
    navele.href = "./more.html";
    navele.innerHTML = `<i class="fa-solid fa-arrow-left-long"></i> &ensp;Browse Players`;
    navele.id = "navele";
    upperbg.innerHTML = "";
    upperbg.appendChild(navele);
    subContainer.innerHTML = "";
    const storedBowlingStats = JSON.parse(localStorage.getItem("player"));
    console.log("Retrieved Data:", storedBowlingStats);
    if (
      !storedBowlingStats ||
      !storedBowlingStats.category ||
      !Array.isArray(storedBowlingStats.player)
    ) {
      console.error("Invalid data structure:", storedBowlingStats);
      return;
    }
    let bowlingTableContainer = document.createElement("div");
    bowlingTableContainer.className = "bowlingTable";
    let inputElement = document.createElement("input");
    inputElement.type = "text";
    inputElement.placeholder = "Search Players";
    inputElement.className = "searchInput";
    bowlingTableContainer.appendChild(inputElement);
    let category = document.createElement("p");
    category.id = "category";
    category.innerHTML = ` ${storedBowlingStats["category"]}`;
    bowlingTableContainer.appendChild(category);
    storedBowlingStats["player"].forEach(player => {
      let playerRow = document.createElement("div");
      playerRow.className = "playerRow";
      let image = document.createElement("img");
      image.className = "playerImage";
      image.src = `https://example.com/images/${player["faceImageId"]}`;
      playerRow.appendChild(image);
      let playerInfo = document.createElement("div");
      playerInfo.className = "playerInfo";
      let name = document.createElement("p");
      name.className = "playerName";
      name.innerHTML = `${player["name"]}`;
      playerInfo.appendChild(name);
      let team = document.createElement("p");
      team.className = "playerTeam";
      team.innerHTML = `${player["teamName"]}`;
      playerInfo.appendChild(team);
      playerRow.appendChild(playerInfo);
      bowlingTableContainer.appendChild(playerRow);
    });
    subContainer.appendChild(bowlingTableContainer);
  }
  
  const urlSchedule = 'https://cricbuzz-cricket.p.rapidapi.com/schedule/v1/international';
  const optionsSchedule = {
      method: 'GET',
      headers: {
          'x-rapidapi-key': '7a065f4400msh45e4001974ce383p1a3af2jsn92bf2a0a8a06',
          'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
      }
  };
  async function schedule() {
    
    try {
      const response = await fetch(urlSchedule, optionsSchedule);
      const result = await response.text();
      localStorage.setItem("schedule",(result))
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
  schedule()
  function renderMatchSchedule() {
    let navele = document.createElement("a");
    navele.href = "./more.html";
    navele.innerHTML = `<i class="fa-solid fa-arrow-left-long"></i> &ensp;Schedules`;
    navele.id = "navele";
    upperbg.innerHTML = "";
    upperbg.appendChild(navele);
    subContainer.innerHTML = "";
  
    // Retrieve schedule data from localStorage
    const storedSchedule = JSON.parse(localStorage.getItem("schedule"));
    console.log("Stored Schedule Data:", storedSchedule);
  
    if (!storedSchedule || !storedSchedule.matchScheduleMap) {
      console.error("Invalid or missing schedule data.");
      return;
    }
  
    // Iterate through the schedule array
    storedSchedule.matchScheduleMap.forEach(entry => {
      if (!entry.scheduleAdWrapper || !entry.scheduleAdWrapper.matchScheduleList) {
        console.warn("Skipping non-schedule entry:", entry);
        return;
      }
  
      let scheduleAdWrapper = entry.scheduleAdWrapper;
  
      // Date
      let date = scheduleAdWrapper.date || "Unknown Date";
      let dateElement = document.createElement("h3");
      dateElement.textContent = date;
      subContainer.appendChild(dateElement);
  
      // Iterate through match schedule list
      scheduleAdWrapper.matchScheduleList.forEach(match => {
        if (!match || !match.matchInfo || !Array.isArray(match.matchInfo)) {
          console.warn("Skipping invalid match entry:", match);
          return;
        }
  
        // Series name
        let seriesName = match.seriesName || "Unknown Series";
        let seriesElement = document.createElement("h4");
        seriesElement.textContent = seriesName;
        subContainer.appendChild(seriesElement);
  
        // Iterate through match details
        match.matchInfo.forEach(matchDetails => {
          if (!matchDetails.team1 || !matchDetails.team2 || !matchDetails.venueInfo) {
            console.warn("Skipping incomplete matchDetails:", matchDetails);
            return;
          }
  
          // Match container
          let matchContainer = document.createElement("div");
          matchContainer.className = "match-container";
  
          // Match description and venue city
          let matchInfoElement = document.createElement("p");
          matchInfoElement.textContent = `${matchDetails.matchDesc}. ${matchDetails.venueInfo.city}`;
          matchInfoElement.className = "match-info";
          matchContainer.appendChild(matchInfoElement);
  
          // Team 1 details
          let team1Container = document.createElement("div");
          team1Container.className = "team-container";
  
          let team1Img = document.createElement("img");
          team1Img.src = `https://example.com/team-images/${matchDetails.team1.imageId}.png`;
          // team1Img.alt = matchDetails.team1.teamName;
          team1Img.className = "team-logo";
  
          let team1Name = document.createElement("p");
          team1Name.textContent = matchDetails.team1.teamName;
          team1Name.className = "team-name";
  
          team1Container.appendChild(team1Img);
          team1Container.appendChild(team1Name);
  
          // Match time (placed between teams)
          let startTime = formatISTDate(matchDetails.startDate);
          let startTimeElement = document.createElement("p");
          startTimeElement.textContent = startTime;
          startTimeElement.className = "match-time";
  
          // Team 2 details
          let team2Container = document.createElement("div");
          team2Container.className = "team-container";
  
          let team2Img = document.createElement("img");
          team2Img.src = `https://example.com/team-images/${matchDetails.team2.imageId}.png`;
          // team2Img.alt = matchDetails.team2.teamName;
          team2Img.className = "team-logo";
  
          let team2Name = document.createElement("p");
          team2Name.textContent = matchDetails.team2.teamName;
          team2Name.className = "team-name";
  
          team2Container.appendChild(team2Img);
          team2Container.appendChild(team2Name);
  
          // Append teams and time
          matchContainer.appendChild(team1Container);
          matchContainer.appendChild(startTimeElement);  // Time is between teams
          matchContainer.appendChild(team2Container);
  
          // Append to subContainer
          subContainer.appendChild(matchContainer);
        });
      });
    });
  }
  const urlRank = 'https://cricbuzz-cricket.p.rapidapi.com/stats/v1/rankings/batsmen?formatType=test';
  const optionsRank = {
      method: 'GET',
      headers: {
          'x-rapidapi-key': '7a065f4400msh45e4001974ce383p1a3af2jsn92bf2a0a8a06',
          'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
      }
  };
  async function Ranking() {
    
    try {
      const response = await fetch(urlRank, optionsRank);
      const result = await response.text();
      localStorage.setItem("rank",result)
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
  Ranking()
  function menRank() {
    let navele = document.createElement("a");
    navele.href = "./more.html";
    navele.innerHTML = `<i class="fa-solid fa-arrow-left-long"></i> &ensp;ICC Rankings - Men`;
    navele.id = "navele";
    upperbg.innerHTML = "";
    upperbg.appendChild(navele);
    subContainer.innerHTML = "";
  
    let headerRow = document.createElement("div");
    headerRow.id = "headerRow";
    subContainer.appendChild(headerRow);
    let rankHeader = document.createElement("p");
    rankHeader.textContent = "Rank";
    rankHeader.id = "rankHeader";
    headerRow.appendChild(rankHeader);
  
    let imageHeader = document.createElement("p");
    imageHeader.textContent = "Image";
    imageHeader.id = "imageHeader";
    headerRow.appendChild(imageHeader);
  
    let playerHeader = document.createElement("p");
    playerHeader.textContent = "Player";
    playerHeader.id = "playerHeader";
    headerRow.appendChild(playerHeader);
  
    let pointsHeader = document.createElement("p");
    pointsHeader.textContent = "Points";
    pointsHeader.id = "pointsHeader";
    headerRow.appendChild(pointsHeader);
    let rankingData = JSON.parse(localStorage.getItem("rank"));
    console.log(rankingData);
    for (let i = 0; i < rankingData["rank"].length; i++) {
      let rankElement = document.createElement("div");
      subContainer.appendChild(rankElement);
      rankElement.id = "rankElement";
      let rank = document.createElement("p");
      rank.textContent = i + 1;
      rank.id = "rank";
      rankElement.appendChild(rank);
      let rankImage = document.createElement("img");
      rankImage.id = "rankImage";
      let id = rankingData["rank"][i]["faceImageId"];
      rankImage.src = `https://cricbuzz-cricket.p.rapidapi.com/img/v1/i1/c${id}/i.jpg`;
      rankElement.appendChild(rankImage);
      let con = document.createElement("div");
      con.id = "con";
      rankElement.appendChild(con);
      let name = document.createElement("p");
      name.innerHTML = rankingData["rank"][i]["name"];
      name.id = "name";
      con.appendChild(name);
  
      let country = document.createElement("p");
      country.id = "country";
      country.innerHTML = rankingData["rank"][i]["country"];
      con.appendChild(country);
  
      // Player Points
      let points = document.createElement("p");
      points.id = "points";
      points.innerHTML = rankingData["rank"][i]["points"];
      rankElement.appendChild(points);
    }
  }
  const urlRecords = 'https://cricbuzz-cricket.p.rapidapi.com/stats/v1/topstats';
  const optionsRecords = {
      method: 'GET',
      headers: {
          'x-rapidapi-key': '7a065f4400msh45e4001974ce383p1a3af2jsn92bf2a0a8a06',
          'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
      }
  };
  async function records() {
    
    try {
      const response = await fetch(urlRecords, optionsRecords);
      const result = await response.text();
      localStorage.setItem("Rcords",result)
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
  records()
  function renderRecords(category = "Batting") {
    let navele = document.createElement("a");
    navele.href = "./more.html";
    navele.innerHTML = `<i class="fa-solid fa-arrow-left-long"></i> &ensp;ICC Rankings - Men`;
    navele.id = "navele";
    upperbg.innerHTML = "";
    upperbg.appendChild(navele);
    let box=document.createElement("div");
    upperbg.appendChild(box);
    let btn1 = document.createElement("button");
    btn1.innerHTML = "Batting";
    btn1.id="recs";
    let btn2 = document.createElement("button");
    btn2.innerHTML = "Bowling";
    btn2.id="recs"
    box.append(btn1, btn2);
    btn1.addEventListener("click", () => renderRecords("Batting"));
    btn2.addEventListener("click", () => renderRecords("Bowling"));
    subContainer.innerHTML = "";
    const statsData = JSON.parse(localStorage.getItem("Rcords"));
    console.log(statsData["statsTypesList"]);
    statsData["statsTypesList"].forEach((ele) => {
      ele["types"].forEach((item) => {
        if (item["category"] === category) {
          const recordElement = document.createElement("div");
          recordElement.classList.add("record-element");
          const statValue = document.createElement("p");
          statValue.textContent = item["value"];
          statValue.classList.add("stat-value");
          recordElement.appendChild(statValue);
          subContainer.appendChild(recordElement);
        }
      });
    });
  }
  
  
  });