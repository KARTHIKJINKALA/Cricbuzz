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
    let nav=document.createElement("div");
    nav.id="nav"
    upperbg.appendChild(nav)
    let arr = ["All stories", "Premium Editorials", "Categories","Topics"];
    arr.forEach((sectionTitle) => {
      let section = document.createElement("div");
      section.className = "section";
      let title = document.createElement("h2");
      title.innerHTML = sectionTitle;
      section.appendChild(title);
  
      // Add click events for respective functions
      section.addEventListener("click", function () {
        switch (sectionTitle) {
          case "All stories":
            fetchAndRenderStories();
            break;
          case "Premium":
            displayPremiumEditorials();
            break;
          case "Categories":
            displayCategories();
            break;
          case "Topics":
            displayTopics();
            break;
          default:
            subContainer.innerHTML = "Content not available.";
        }
      });
  
      nav.appendChild(section);
    });
    
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
  
    const urlNews = 'https://cricbuzz-cricket.p.rapidapi.com/news/v1/index';
    const optionsNews = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '7a065f4400msh45e4001974ce383p1a3af2jsn92bf2a0a8a06',
        'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
      }
    };
    async function newsList() {
      try {
        const response = await fetch(urlNews, optionsNews);
        const result = await response.text();
        localStorage.setItem("allStories",result)
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    }
    newsList()
    function fetchAndRenderStories() {
      subContainer.innerHTML = ""; 
      let storiesData = JSON.parse(localStorage.getItem("allStories"));
      console.log(storiesData);
      let storyList = storiesData["storyList"];
      storyList.forEach((story) => {
          if (story["story"] && story["story"]["hline"]) {
              let storyWrapper = document.createElement("div");
              storyWrapper.id = "storyWrapper";
              subContainer.appendChild(storyWrapper);
  
              let storyTitle = document.createElement("p");
              storyTitle.id = "storyTitle";
              storyTitle.innerHTML = story["story"]["hline"];
              let storyImage = document.createElement("img");
              storyImage.src=story["story"]["imageId"]
              storyImage.id="storyImage";
              storyWrapper.appendChild(storyImage)
              let storyDescription = document.createElement("p");
              storyDescription.id = "storyDescription";
              storyDescription.innerHTML = story["story"]["intro"];
  
              storyWrapper.appendChild(storyTitle);
              storyWrapper.appendChild(storyDescription);
          }
      });
  }
  fetchAndRenderStories();
    function displayPremiumEditorials() {
        subContainer.innerHTML = ""; 
        let premiumDiv = document.createElement("div");
        premiumDiv.innerText = "Premium Editorials will be available soon.";
        subContainer.appendChild(premiumDiv);
    }
  displayPremiumEditorials()
  const url = 'https://cricbuzz-cricket.p.rapidapi.com/news/v1/topics';
  const options = {
      method: 'GET',
      headers: {
          'x-rapidapi-key': '7a065f4400msh45e4001974ce383p1a3af2jsn92bf2a0a8a06',
          'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
      }
  };
  async function renderTopics() {
    
    try {
      const response = await fetch(url, options);
      const result = await response.text();
      localStorage.setItem("news1",result)
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
  renderTopics()
  function displayTopics() {
    subContainer.innerHTML="";
    let topicsData = JSON.parse(localStorage.getItem("news1"));
    let topicsList = topicsData ? topicsData["topics"] : [];
    topicsList.forEach((topic) => {
        let topicWrapper = document.createElement("div");
        topicWrapper.className = "topicWrapper";
        subContainer.appendChild(topicWrapper);
        let topicTitle = document.createElement("p");
        topicTitle.className = "topicTitle";
        topicTitle.innerHTML = topic.headline;
        topicTitle.addEventListener("click", () => {
            if (topicTitle.innerHTML.toLowerCase() === "inside story") {
                displayInsideStory();
            }
        });
        let topicDescription = document.createElement("p");
        topicDescription.className = "topicDescription";
        topicDescription.innerHTML = topic.description;
        topicWrapper.appendChild(topicTitle);
        topicWrapper.appendChild(topicDescription);
        
    });
    
  }
  displayTopics()
  const urlCate = 'https://cricbuzz-cricket.p.rapidapi.com/news/v1/cat';
  const optionscate = {
      method: 'GET',
      headers: {
          'x-rapidapi-key': '7a065f4400msh45e4001974ce383p1a3af2jsn92bf2a0a8a06',
          'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
      }
  };
  async function renderCategories() {
    
    try {
      const response = await fetch(url, options);
      const result = await response.text();
      localStorage.setItem("categories2",result)
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
  renderCategories()
  function displayCategories() {
    subContainer.innerHTML=""
    let categoriesData = JSON.parse(localStorage.getItem("categories2"));
    console.log(categoriesData)
    categoriesData ? categoriesData["topics"].forEach((category) => {
        let categoryWrapper = document.createElement("div");
        categoryWrapper.className = "categoryWrapper"; 
        subContainer.appendChild(categoryWrapper);
        let categoryTitle = document.createElement("p");
        categoryTitle.className = "categoryTitle";
        categoryTitle.innerHTML = category.headline;
        categoryTitle.addEventListener("click", () => {
          console.log("hello")
            if (category.name.toLowerCase() === "specials") {
                displaySpecials();
            } else {
                alert(`You clicked on ${category.name}`);
            }
        });
        let categoryDescription = document.createElement("p");
        categoryDescription.className = "categoryDescription";
        categoryDescription.innerHTML = category.description;
        categoryWrapper.appendChild(categoryTitle);
        categoryWrapper.appendChild(categoryDescription);
        if (category.headline.toLowerCase() === "inside story") {
          categoryTitle.addEventListener("click", function () {
            inside();
          });
        }
    }) : [];
    
  }
  displayCategories()
  const urlSpecial = 'https://cricbuzz-cricket.p.rapidapi.com/news/v1/cat/5';
  const optionsSpecial = {
      method: 'GET',
      headers: {
          'x-rapidapi-key': '7a065f4400msh45e4001974ce383p1a3af2jsn92bf2a0a8a06',
          'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
      }
  };
  async function renderSpecial() {
    
    try {
      const response = await fetch(url, options);
      const result = await response.text();
      localStorage.setItem("special",result)
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
  renderSpecial()
  function displaySpecialsData() {
    subContainer.innerHTML = ""; 
    const specialsData = JSON.parse(localStorage.getItem("special"));
    if (specialsData && specialsData["topics"]) {
        const specialsWrapper = document.createElement("div");
        specialsWrapper.id = "specialsWrapper";
        subContainer.appendChild(specialsWrapper);
        specialsData["topics"].forEach((topic) => {
            const topicBox = document.createElement("div");
            topicBox.className = "topicBox";
  
            const topicHeadline = document.createElement("p");
            topicHeadline.className = "topicHeadline";
            topicHeadline.textContent = topic["headline"];
  
            const topicDescription = document.createElement("p");
            topicDescription.className = "topicDescription";
            topicDescription.textContent = topic["description"];
  
            topicBox.appendChild(topicHeadline);
            topicBox.appendChild(topicDescription);
            specialsWrapper.appendChild(topicBox);
        });
    }
  }
  
  displaySpecialsData()
  const urlInside = 'https://cricbuzz-cricket.p.rapidapi.com/news/v1/topics/349';
  const optionsInside = {
      method: 'GET',
      headers: {
          'x-rapidapi-key': '7a065f4400msh45e4001974ce383p1a3af2jsn92bf2a0a8a06',
          'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com'
      }
  };
  async function insideStory() {
      
      try {
          const response = await fetch(url, options);
          const result = await response.json();
          localStorage.setItem("Story",JSON.stringify(result));
      } catch (error) {
          console.error(error);
      }
  }
  insideStory();
  function inside() {
      let res = JSON.parse(localStorage.getItem("Story"));
      clearDisplayArea(); 
      let wrapper2 = document.createElement("div");
      wrapper2.id = "wrapper2";
      displayArea.appendChild(wrapper2); 
  
      if (res && res["storyList"]) {
          for (var i = 0; i < res["storyList"].length; i++) {
              if (res["storyList"][i]["story"]) {
                  let hline2 = res["storyList"][i]["story"]["hline"];
                  let intro2 = res["storyList"][i]["story"]["intro"];
                  let wrapperele1 = document.createElement("div");
                  wrapperele1.id = "wrapperele";
                  wrapper2.appendChild(wrapperele1);
  
                  let hlines = document.createElement("p");
                  hlines.id = "hline";
                  hlines.innerHTML = hline2;
                  wrapperele1.appendChild(hlines);
  
                  let intros = document.createElement("p");
                  intros.id = "intro1";
                  intros.innerHTML = intro2;
                  wrapperele1.appendChild(intros);
              }
          }
      }
  }
  fetchAndRenderStories();
  });