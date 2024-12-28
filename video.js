document.addEventListener("DOMContentLoaded", function () {
    let container = document.createElement("div");
    container.id = "container";
    document.body.appendChild(container);
  
    // Create the upper section with a logo
    let upperbg = document.createElement("div");
    upperbg.id = "upperbg";
    container.appendChild(upperbg);
  
    let logo = document.createElement("img");
    logo.id = "navimg";
    logo.src = "logo.png"; // Replace with your logo path
    logo.alt = "Logo";
    upperbg.appendChild(logo);
    let subContainer = document.createElement("div");
    subContainer.id = "subContainer";
    container.appendChild(subContainer);
    // Create the footer and navigation
    let footer = document.createElement("div");
    footer.id = "footer";
    container.appendChild(footer);
  
    let navigation = document.createElement("div");
    navigation.className = "navigation";
    footer.appendChild(navigation);
  
    let ul = document.createElement("ul");
    navigation.appendChild(ul);
  
    // Navigation items data
    const navItems = [
      { name: "Home", icon: "fa-solid fa-house", link: "./index.html" },
      { name: "Matches", icon: "fa-solid fa-baseball-bat-ball", link: "./match.html" },
      { name: "Videos", icon: "fa-solid fa-circle-play", link: "./video.html" },
      { name: "News", icon: "fa-solid fa-newspaper", link: "./news.html" },
      { name: "More", icon: "fa-solid fa-ellipsis-vertical", link: "./more.html" },
    ];
  
    // Loop through navItems to create the navigation structure
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
  
    // Create the indicator
    let indicator = document.createElement("div");
    indicator.className = "indicator";
    ul.appendChild(indicator);
  
    // Set active link dynamically based on the current page
    const list = document.querySelectorAll(".list");
    const currentPath = window.location.pathname;
  
    list.forEach((item) => {
      const link = item.querySelector("a").getAttribute("href");
      // Check if current path matches the link of the navigation item
      if (currentPath.includes(link.split("./")[1])) {
        item.classList.add("active");
      }
  
      // Add click listener to update active class
      item.addEventListener("click", function () {
        list.forEach((navItem) => navItem.classList.remove("active"));
        this.classList.add("active");
      });
    });
  });