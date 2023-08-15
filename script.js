const accessKey = "nFjyQyq7vR_I-bu2hEmOTm1MK-se8guuHPsxBGCxlIs";  //This is the access key for the API

const formElem = document.querySelector("form");  //getting access of the form element
const input = document.getElementById("search-input");//getting access of the input space
const searchResults = document.querySelector(".search-results");//getting access of the result display space
const showMore = document.getElementById("show-more-button");//getting access of the show more button


let inputData = ""; ///data from the search bar
let page = 1;   //default result page   (before clicking on show more button)

 async function searchImages(){
    inputData = input.value;

    //it is a URL for making a request to the Unsplash API to search for photos based on certain criteria. 

    // `https://api.unsplash.com` : This is the base URL of the Unsplash API. All API requests will start with this URL.
    // `/search/photos`: This is the specific endpoint of the API that you are targeting. It indicates that you want to perform a search for photos.
    // `?page=${page}`: Here page is the variable which reperesents the pagee number you want to retrieve the data fronm ${page} expression will be replaced with the actual page value
    // $query=${inputData} :  Adds a query parameter that takes the input data and searches using the api
    // &client=${accessKey}: Adds a seperate cliient parameter which typically represents the api access key
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`

    const response = await fetch(url) //fetching the data from the API and waiting for it to be stored in response
    const data = await response.json();//reading the response body and parsing it as json file

    const results = data.results;

    if(page === 1){
        searchResults.innerHTML = " ";
    }
    results.map((result) => {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add('search-result')
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image)
        imageWrapper.appendChild(imageLink)
        searchResults.appendChild(imageWrapper)
    })

    page++;
    if(page > 1)
    {
        showMore.style.display = "block"
        
    }
}

formElem.addEventListener('submit',(event)=>{
    event.preventDefault();
    page = 1;
    searchImages();
})

showMore.addEventListener('click',()=>{
    searchImages();
})