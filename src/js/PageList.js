const PageList = (argument = "") => {
  const preparePage = () => {
    let cleanedArgument = argument.replace(/\s+/g, "-");
    let articles = "";

    const fetchList = (url, argument) => {
      let finalURL = url;
      if (argument) {
        finalURL =
          url + "?search=" + argument + "&page_size=27&ordering=-added";
      } else {
        finalURL =
          url + "?dates=2021-01-01,2022-10-10&page_size=27&ordering=-added";
      }

      fetch(`${finalURL}`)
        .then((response) => response.json())
        .then((response) => {
          if (response.results.length > 0) {
            response.results.forEach((article) => {
              let logos = [];
              let genres = [];
              article.parent_platforms.forEach((platform) => {
                logos.push(platform.platform.name);
              });
              article.genres.forEach((genre) => {
                genres.push(genre.name);
              });
              let newLogos = logos.map(logo => {
                if (logo == "PC") {
                  logo = "<img src='src/logos/windows.svg' class='m-1'> </img>";
                  return logo
                } else if (logo == "Xbox") {
                  logo = "<img src='src/logos/xbox.svg' class='m-1'> </img>"
                  return logo
                } else if (logo == "PlayStation") {
                  logo = "<img src='src/logos/ps4.svg' class='m-1'> </img>"
                  return logo
                } else if (logo == "Nintendo") {
                  logo = "<img src='src/logos/switch.svg' class='m-1'> </img>"
                  return logo
                } else if (logo == "Linux") {
                  logo = "<img src='src/logos/linux.svg' class='m-1''> </img>"
                  return logo
                }else if (logo == "Apple Macintosh"){
                  logo = "<img src='src/logos/macos.svg' class='m-1''> </img>"
                  return logo
                } else if (logo == "iOS" || logo == "Android") {
                  logo = "<img src='src/logos/mobile.svg' class='m-1'> </img>"
                  return logo
                }
                else { return logo }
              });
              articles += `
                    <div class="cardGames hidden card text-white bg-black col-4">
                    <a href = "#pagedetail/${article.id}" class="hov">
                    <img class="card-img-top" src="${article.background_image
                }" alt="${article.name} image" width="100%" height="200px">
                    <div class="card-img-top hidden" width="100%" height="200px">
                    <p>Released : ${article.released}</p>
                    <p>Rating : ${article.rating}</p>
                    <p>Ratings count : ${article.ratings_count}</p>
                    <p>Genres : ${genres}</p>
                    </div>
                    </a>

                    <div class="card-body">
                      <h2>${article.name}</h2>
                      <div class="logos">${newLogos.join(" ")}</div>
                    </div>
                    </div>
                  `;
            });
            document.querySelector(".page-list .articles").innerHTML = articles;
            let items = document.querySelectorAll(".cardGames");
            for (let i = 0; i < 9; i++) {
              items[i].classList.remove("hidden");
            }

            document.querySelectorAll(".hov").forEach((element) => {
              element.addEventListener("mouseenter", () => {
                element.childNodes[1].classList.toggle("hidden");
                element.childNodes[3].classList.toggle("hidden");
              });
            });

            document.querySelectorAll(".hov").forEach((element) => {
              element.addEventListener("mouseleave", () => {
                element.childNodes[1].classList.toggle("hidden");
                element.childNodes[3].classList.toggle("hidden");
              });
            });

            document
              .querySelector(".page-list .articles")
              .insertAdjacentHTML(
                "beforeend",
                '<button class="btn btn-red" id="seeMore">See more</button>'
              );
            let seeMore = document.getElementById("seeMore");
            let clickCounter = 0;
            seeMore.addEventListener("click", () => {
              clickCounter++;
              if (clickCounter == 1) {
                items = document.querySelectorAll(".cardGames");
                for (let i = 8; i < 18; i++) {
                  items[i].classList.remove("hidden");
                }
              } else if (clickCounter >= 2) {
                items = document.querySelectorAll(".cardGames");
                for (let i = 0; i < items.length; i++) {
                  items[i].classList.remove("hidden");
                }
                seeMore.classList.add("hidden");
              }
            });
            document
              .querySelectorAll("option.dropdown-item")
              .forEach((element) => {
                element.addEventListener("click", () => {
                  articles = "";
                  fetchList(finalURL, "&platforms=" + element.value);
                });
              });
          } else {
            document.querySelector(".page-list .articles").innerHTML = "";
            document.querySelector(
              ".page-list .articles"
            ).innerHTML += `<h1>No results</h1>`;
          }
        });
    };

    fetchList("https://api.rawg.io/api/games", cleanedArgument);
  };

  const render = () => {
    pageContent.innerHTML = `
<h1>Welcome,</h1>
        <p>The Hyper Progame is the world’s premier event for computer and video games and related products. At The Hyper Progame, the video game industry’s top talent pack the Los Angeles Convention Center, connecting tens of thousands of the best, brightest,
            and most innovative in the interactive entertainment industry. For three exciting days, leading-edge companies, groundbreaking new technologies, and never-before-seen products will be showcased. The Hyper Progame connects you with both new
            and existing partners, industry executives, gamers, and social influencers providing unprecedented exposure </p>
        <section class="page-list">
        <div class="dropdown m-3">
          <button class="btn btn-red dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Platform: Any
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <option class="dropdown-item" value="1">Xbox One</option>
            <option class="dropdown-item" value="186">Xbox Series S/X</option>
            <option class="dropdown-item" value="187">PlayStation 5</option>
            <option class="dropdown-item" value="18">PlayStation 4</option>
            <option class="dropdown-item" value="7">Nintendo Switch</option>
            <option class="dropdown-item" value="4">PC</option>
            <option class="dropdown-item" value="5">macOS</option>
            <option class="dropdown-item" value="6">Linux</option>
            <option class="dropdown-item" value="3,21">Mobile</option>
          </div>
        </div>
          <div class="articles row justify-content-center">...loading</div>
        </section>
      `;

    preparePage();
  };

  render();
};

export { PageList };
