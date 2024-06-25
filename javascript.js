const apiKey = "69c5a78be0b34b4dbe9bfa243878d6db";
// const apiKey = "38623b07e7a84259bdd833a22acddbe7";
const newsSection = document.querySelector(".news-container");
const categories = document.querySelectorAll(".header-nav li:not(:last-child)");
let apiUrl;
let reports;
let catQuery;
let total = 0;
let page = 1;
let category = "awawa";

// ////////// Bring News From Api //////////
const bringNews = async function (query, page) {
  apiUrl = `https://newsapi.org/v2/everything?q=${query}&page=${page}&apiKey=${apiKey}`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(response.status);
    }
    console.log(query);
    const newReports = await response.json();
    console.log(newReports);
    reports = [newReports][0].articles; //  Reports = [0-100]
    console.log(apiUrl);
  } catch (err) {
    console.error(err);
  }
};

// Create HTML Elements
const createNewsDiv = function (news) {
  const newsContainer = document.createElement("div");

  newsContainer.classList.add("news");
  newsContainer.innerHTML = `
  <a href="${reports[news].url}">
    <div class="news-img-container">
      <img src="${
        reports[news].urlToImage
          ? (src = reports[news].urlToImage)
          : (src = "noimage.jpg")
      }" alt="" srcset="" />
    </div>
    
    <div class="news-text-container">
      <h4>${reports[news].title}</h4>
      <p>${
        reports[news].description
          ? reports[news].description
          : (reports[news].description = "Click For Details")
      }
      </p>
    </div></div></a>
    
      `;
  newsSection.appendChild(newsContainer);
};

// Add Data On Page Load Or Category Selection
const indexNews = async function (query, page) {
  category = query;
  await bringNews(category, page);
  for (let i = 0; i <= 11; i++) {
    // console.log("first indexNews:", total);
    createNewsDiv(i);
    total++;
    // console.log("last indexNews:", total);
  }
};

// Choosing a Category And Uploading Data
categories.forEach((cat) => {
  cat.addEventListener("click", (e) => {
    category = e.target.classList[0];
    resetNews();
    indexNews(category, 1);
  });
});

const input = document.querySelector(".input-search");

// User Search News With Using Query
const searchWithQuery = function () {
  if (input.value !== "") {
  category = input.value;
  resetNews();
  indexNews(category, 1);
  input.value = "";
  }
};

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    searchWithQuery();
  }
});

// Add Data With Scroll
const addNewsWithScroll = async function (cat) {
  // console.log("first addNewsWithScroll:", total);
  let x = total; //12
  let y = total + 5; // 14

  for (x; x <= y; x++) {
    createNewsDiv(x);
    total++;
    console.log();
    // console.log("after for addwithScroll", total);
    if (total >= 100) {
      total = 0;
      reports = [];
      page++;
      console.log(page);
      await bringNews(cat, page);
      addNewsWithScroll();
    }
  }

  // console.log("last addNewsWithScroll:", total);
};

// Reset all datas
let resetNews = () => {
  while (newsSection.firstChild) {
    newsSection.removeChild(newsSection.firstChild);
  }
  page = 1;
  total = 0;
  reports = [];
};

window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight) {
    addNewsWithScroll(category);
  }
});

window.addEventListener("load", indexNews("global", page));
};

asd();
