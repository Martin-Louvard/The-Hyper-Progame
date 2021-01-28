import { PageList } from "./PageList";

const PageDetail = (argument) => {
    const preparePage = () => {
        let cleanedArgument = argument.replace(/\s+/g, "-");
        const fetchGame = (url, argument) => {
            let finalURL = url + argument;
            let screenshotsUrl = finalURL + "/screenshots"
            let youtubeUrl = finalURL + "/youtube"
            let similarUrl = finalURL + "/suggested"

            fetch(`${screenshotsUrl}`)
                .then((response) => response.json())
                .then((response) => {
                    let articleDOM = document.querySelector(".page-detail .article");

                    articleDOM.querySelector("div.s1").innerHTML += `<img src = '${response.results[0].image}   ' width="100%" height="auto"></img>`
                    articleDOM.querySelector("div.s2").innerHTML += `<img src = '${response.results[1].image}   ' width="100%" height="auto"></img>`
                    articleDOM.querySelector("div.s3").innerHTML += `<img src = '${response.results[2].image}   ' width="100%" height="auto"></img>`
                    articleDOM.querySelector("div.s4").innerHTML += `<img src = '${response.results[3].image}   ' width="100%" height="auto"></img>`

                });

            fetch(`${youtubeUrl}`)
                .then((response) => response.json())
                .then((response) => {
                    let articleDOM = document.querySelector(".page-detail .article");
                    articleDOM.querySelector("div.yt1").innerHTML += `<iframe width="700" height="394" src="https://www.youtube.com/embed/${response.results[0].external_id}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
                    articleDOM.querySelector("div.yt2").innerHTML += `<iframe width="500" height="282" src="https://www.youtube.com/embed/${response.results[1].external_id}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
                    articleDOM.querySelector("div.yt3").innerHTML += `<iframe width="500" height="282" src="https://www.youtube.com/embed/${response.results[2].external_id}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
                });

            fetch(`${similarUrl}`)
                .then((response) => response.json())
                .then((response) => {
                    let articleDOM = document.querySelector(".page-detail .article");
                    articleDOM.querySelector("div.sg-1").innerHTML += `
                    <div class="cardGames card text-white bg-black">
                    <a href = "#pagedetail/${response.results[0].id}" class="hov">
                    <img class="card-img-top" src="${response.results[0].background_image
                        }" alt="${response.results[0].name} image" width="100%" height="200px">
                    </a>

                    <div class="card-body">
                      <h2>${response.results[0].name}</h2>
                    </div>
                    </div>
                  `;
                    articleDOM.querySelector("div.sg-2").innerHTML += `
                    <div class="cardGames card text-white bg-black">
                    <a href = "#pagedetail/${response.results[1].id}" class="hov">
                    <img class="card-img-top" src="${response.results[1].background_image
                        }" alt="${response.results[1].name} image" width="100%" height="200px">
                    </a>

                    <div class="card-body">
                      <h2>${response.results[1].name}</h2>
                    </div>
                    </div>
                  `;
                    articleDOM.querySelector("div.sg-3").innerHTML += `
                    <div class="cardGames card text-white bg-black">
                    <a href = "#pagedetail/${response.results[2].id}" class="hov">
                    <img class="card-img-top" src="${response.results[2].background_image
                        }" alt="${response.results[2].name} image" width="100%" height="200px">
                    </a>

                    <div class="card-body">
                      <h2>${response.results[2].name}</h2>
                    </div>
                    </div>
                  `;
                    articleDOM.querySelector("div.sg-4").innerHTML += `
                    <div class="cardGames card text-white bg-black">
                    <a href = "#pagedetail/${response.results[3].id}" class="hov">
                    <img class="card-img-top" src="${response.results[3].background_image
                        }" alt="${response.results[3].name} image" width="100%" height="200px">
                    </a>

                    <div class="card-body">
                      <h2>${response.results[3].name}</h2>
                    </div>
                    </div>
                  `;
                    articleDOM.querySelector("div.sg-5").innerHTML += `
                    <div class="cardGames card text-white bg-black">
                    <a href = "#pagedetail/${response.results[4].id}" class="hov">
                    <img class="card-img-top" src="${response.results[4].background_image
                        }" alt="${response.results[4].name} image" width="100%" height="200px">
                    </a>

                    <div class="card-body">
                      <h2>${response.results[4].name}</h2>
                    </div>
                    </div>
                  `;
                    articleDOM.querySelector("div.sg-6").innerHTML += `
                    <div class="cardGames card text-white bg-black">
                    <a href = "#pagedetail/${response.results[5].id}" class="hov">
                    <img class="card-img-top" src="${response.results[5].background_image
                        }" alt="${response.results[5].name} image" width="100%" height="200px">
                    </a>

                    <div class="card-body">
                      <h2>${response.results[5].name}</h2>
                    </div>
                    </div>
                  `;

                });

            fetch(`${finalURL}`)
                .then((response) => response.json())
                .then((response) => {
                    let { name, released, description, background_image, developers, tags, genres, publishers, platforms, website, clip, rating, ratings_count, stores } = response;
                    let studios = []
                    developers.forEach(element => {
                        studios.push(element.name)
                    });
                    let tagsList = []
                    tags.forEach(element => {
                        tagsList.push(`<a class="tag intern"> ${element.name}</a>`)
                    });
                    let genresList = []
                    genres.forEach(element => {
                        genresList.push(`<a class="genre intern"> ${element.name}</a>`)
                    })
                    let publishersList = []
                    publishers.forEach(element => {
                        publishersList.push(element.name)
                    })
                    let platformsList = []
                    platforms.forEach(element => {
                        platformsList.push(element.platform.name)
                    })

                    let articleDOM = document.querySelector(".page-detail .article");
                    articleDOM.querySelector("img").src = background_image;
                    articleDOM.querySelector("h1.title").innerHTML += name + ",";
                    articleDOM.querySelector("p.release-date span").innerHTML += released;
                    articleDOM.querySelector("p.description").innerHTML = description;
                    articleDOM.querySelector("p.studio").innerHTML += ` ${studios.join(" , ")}`;
                    articleDOM.querySelector("p.tags").innerHTML += ` ${tagsList}`;
document.querySelectorAll(".tag").forEach((tag) => {
                        tag.addEventListener("click", () => PageList(tag.innerHTML))
                    });
                    articleDOM.querySelector("div.genres").innerHTML += ` ${genresList}`;
                    document.querySelectorAll(".genre").forEach((genre) => {
                        genre.addEventListener("click", () => PageList(genre.innerHTML))
                    });
                    articleDOM.querySelector("p.publishers").innerHTML += ` ${publishersList.join(" , ")}`;
                    articleDOM.querySelector("p.platforms").innerHTML += ` ${platformsList.join(" , ")}`;
                    articleDOM.querySelector("a.website").href = `${website}`;
                    articleDOM.querySelector("div.video").innerHTML += `<video controls width="100%">               
                    <source src=${clip.clip}
                            type="video/mp4">
                    Sorry, your browser doesn't support embedded videos.
                </video>`;
                    articleDOM.querySelector("h2.rating").innerHTML = `${rating}/5 -  ${ratings_count} votes`;
                    stores.forEach(element => {
                        articleDOM.querySelector("div.stores").innerHTML += `<a href="${element.url}" class="outer-link">${element.store.name}</a><br>`
                    })
                });
        };

        fetchGame("https://api.rawg.io/api/games/", cleanedArgument);
    };

    const render = () => {
        pageContent.innerHTML = `
    <div class="container">
        <section class="page-detail">
          <div class="article">
            <img class="cov mb-4 mt-4" src="" width="100%" height="100%">
            <a class="btn btn-red text-white website" href="">Check Website</a>
            <h2 class="rating"></h2>
            <h1 class="title"></h1><br><br>
            <h6>Plot</h6>
            <p class="description"></p><br>
            <div class ="row m-3">
                <div class ="col-3">
                    <h6>Release Date</h6>
                    <p class="release-date"> <span></span></p>  
                </div>
                <div class ="col-3">
                    <h6>Developers</h6>
                    <p class="studio"></p>
                </div>
                <div class ="col-3">   
                    <h6>Platforms</h6>
                <p class="platforms"></p> 
                </div>
                <div class ="col-3">
                    <h6>Publishers</h6>
                    <p class="publishers"></p>
                </div>
            </div>
            <div class="row m-3">
                <div class ="col-6">
                    <h6>Genres</h6>
                    <div class="genres"></div>
                </div>
                <div class ="col-6">
                    <h6>Tags </h6>
                    <p class="tags"></p>
                </div>            
            </div>
            <h1 class="text-red">Buy</h1>
            <div class="stores m-3"></div>
            <h1 class="text-red">TRAILER</h1>
            <div class="video"> </div><br>
            <h1 class="text-red m-3">SCREENSHOTS</h1>
            <div class="row m-3">
                <div class ="col-6 mb-4 s1">                   
                </div>
                <div class ="col-6 mb-4 s2">                   
                </div>
                <div class ="col-6 mb-4 s3">                  
                </div>
                <div class ="col-6 mb-4 s4">                   
                </div>              
            </div>
            <h1 class="text-red m-3">YOUTUBE</h1>
            <div class="row m-3">
                <div class ="yt1">                  
                </div>
            </div>
            <div class="row m-3">
                <div class ="col-6 mb-4 yt2">                 
                </div>
                <div class ="col-6 mb-4 yt3">                  
                </div>                        
            </div>
            <h1 class="text-red m-3">SIMILAR GAMES</h1>
            <div class="row m-3">
                <div class ="col-4 mb-4 sg-1">                
                </div>
                <div class ="col-4 mb-4 sg-2">          
                </div>
                <div class ="col-4 mb-4 sg-3">
                </div>  
            </div>
            <div class="row m-3">
                <div class ="col-4 mb-4 sg-4">                
                </div>
                <div class ="col-4 mb-4 sg-5">          
                </div>
                <div class ="col-4 mb-4 sg-6">
                </div>  
            </div>            
          </div>
        </section>
    </div>
      `;

        preparePage();
    };

    render();
};

export { PageDetail };