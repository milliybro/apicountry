const countryPage = document.querySelector(".country-page");

const query = new URLSearchParams(location.search);

const countryName = query.get("name");


async function getCountries() {
  try {
    countryPage.innerHTML = "Loading...";

    let pgtnPosts = await getCountry(
      `https://ap-countries-api.vercel.app/name/${countryName}`
    );
    let pgtnData = pgtnPosts.data;
console.log(pgtnData);
    countryPage.innerHTML = "";
    pgtnData.map((post) => {
      countryPage.innerHTML += `
      <div class="countre">
      <img class="country-image" src="${post.flags.png}" alt="flag">
      <div class="country-text">
         <h2>${post.name.common}</h2>
         <div class="infor">
            <div class="first-infor">
               <h4>Native Name: <span class="native">${post.name.nativeName.common}</span></h4>
               <h4>Population: <span class="population">${post.population}</span></h4>
               <h4>Region: <span class="region">${post.region}</span></h4>
               <h4>Sub Region: <span class="subregion">${post.subregion}</span></h4>
               <h4>Capital <span class="capital">${post.capital}</span></h4>
            </div>
            <div class="second-infor">
               <h4>Top Level Domain: <span class="domain">${post.tld}</span></h4>
               <h4>Currencies: <span class="currencies">${post.currencies.name}</span></h4>
               <h4>Languages: <span class="lang">${post.languages.uzb}</span></h4>
            </div>
            </div>
            <h4>Border Countries: <span class="lang">${post.borders}</span></h4>
      </div>
   </div>
            `;
    });
  } catch (err) {
    alert(err);
  }
}

getCountries();
