const countryRow = document.querySelector(".country-row");
const searchInput = document.querySelector("input");
const totalPosts = document.querySelector(".total-posts");
const pagination = document.querySelector(".pagination");

// const ENDPOINT = "https://restcountries.com/v3.1/";
const ENDPOINT = "https://ap-countries-api.vercel.app/";

let searcha = "";
let activePage = 1;

async function getPosts() {
  try {
    countryRow.innerHTML = "Loading...";

    let posts = await getData(`https://ap-countries-api.vercel.app/all?`);
    let postsData = posts.data;
    let pgtnPosts = await getData(
      `https://ap-countries-api.vercel.app/name/${
        searcha ? searcha : "a"
      }?All&page=${activePage}&limit=20`
    );
    let pgtnData = pgtnPosts.data;

    let pages = Math.ceil(postsData.length / 20);

    if (pages) {
      pagination.innerHTML = `
        <li class="page-item ${activePage === 1 ? "disabled" : ""}">
          <button onClick="getPage('-')" class="page-link">Previous</button>
        </li>
      `;
      for (let i = 1; i <= pages; i++) {
        pagination.innerHTML += `
        <li class="page-item ${i === activePage ? "active" : ""}">
          <button onClick="getPage(${i})" class="page-link">${i}</button>
        </li>
      `;
      }

      pagination.innerHTML += `
        <li class="page-item ${activePage === pages ? "disabled" : ""}">
          <button onClick="getPage('+')" class="page-link">Next</button>
        </li>
      `;
    } else {
      pagination.innerHTML = "";
    }

    totalPosts.textContent = pgtnPosts.total;
    console.log(pgtnData.total);
    countryRow.innerHTML = "";
    if (postsData.length) {
      pgtnData.map((post) => {
        countryRow.innerHTML += `
        <a href="pages.html?name=${post.name.common}">
        <div class="country">
        <img src="${post.flags.png}" alt="flag">
        <div class="country-text">
           <h2>${post.name.common}</h2>
           <h4>Population: <span class="population">${post.population}</span></h4>
           <h4>Region: <span class="region">${post.region}</span></h4>
           <h4>Capital <span class="capital">${post.capital}</span></h4>
        </div>
     </div>
            </a>
        `;
      });
    } else {
      countryRow.innerHTML = "No posts";
    }
  } catch (err) {
    alert(err);
  }
}

getPosts();

searchInput.addEventListener("keyup", function () {
  searcha = this.value;
  console.log(searcha);
  activePage = 1;
  getPosts();
});

function getPage(page) {
  if (page === "+") {
    activePage++;
  } else if (page === "-") {
    activePage--;
  } else {
    activePage = page;
  }
  getPosts();
}

// country page
const typeRegion = document.querySelector(".type-region");

const region = ["Africa", "America", "Asia", "Europe", "Oceania"]

typeRegion.innerHTML = "<option>Region</option>";

region.map((region) => {
  
  typeRegion.innerHTML += `<option>${region}</option>`;
});
