let newsArray=[];
const defultImg ="../jk-placeholder-image.jpg"
currentCountry = "us";
currentCategory = "general"
async function getNews(country,category) {
    let respone = await fetch(`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=300c319fc6334a27bd2f32d335ee4679`);
    let data = await respone.json();
    console.log(data.articles);
    // newsArray.push(data.articles)
    // console.log(newsArray);
    newsArray=data.articles
    displayNews()
}
getNews(currentCountry,currentCategory);
function displayNews() {
    let car = ``;
    for (let i = 0; i < newsArray.length; i++) {
        car += `
        <div class="col-md-4">
        <div class="card w-100">
          <img src="${newsArray[i].urlToImage||defultImg}" class="card-img-top">
          <div class="card-body d-flex flex-column justify-content-center">
            <h5 class="card-title">${newsArray[i].title}</h5>
            <p class="card-text">${newsArray[i].description?.split(" ").slice(0,10).join(" ")||""}</p>
            <a href="${newsArray[i].url}" target="_blank" class="btn btn-primary" >Read More</a>
          </div>
        </div>
    </div>
        `
    }
    document.getElementById("newsContainer").innerHTML=car
}

let links = document.querySelectorAll("nav div div ul li a");
for(let i=0; i<links.length; i++){
    links[i].addEventListener("click",function(){
        let activeLink = document.querySelector("nav div div ul li a.active");
        activeLink.classList.remove("active");
        links[i].classList.add("active");
        currentCountry = links[i].dataset.country;
        getNews(currentCountry,currentCategory);
    })
}

let activeCategory=document.querySelectorAll("div aside ul li a");
for(let i=0; i<activeCategory.length; i++){
    activeCategory[i].addEventListener("click",function(){
        let activeCat = document.querySelector("div aside ul li a.active");
        activeCat.classList.remove("active");
        activeCategory[i].classList.add("active");
        currentCategory = activeCategory[i].dataset.catrgory;
        getNews(currentCountry,currentCategory);
    })
}