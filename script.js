let searchString = 'avengers'



const url = ('https://api.themoviedb.org/3/search/movie?api_key=0adbb34bf81e230a73e19aaaeee72637&query=')
let obj


//api call to get results
function getResults() {
    fetch(url + searchString, { cache: "force-cache" })
        .then(response => response.json())
        .then(data => {
            obj = data

        });
}

//loader gif function

var loader = document.getElementById("loader");

function toggleLoader() {

    loader.classList.toggle("none");

}
//function on display noyhing

function displayNoting() {
    var lil = document.querySelectorAll('.container ul')[0]
    lil.innerHTML = ``;
    let div = document.createElement("div")
    let inn = 'Nothing to show';
    lil.append(div)
    document.querySelectorAll('.container ul div')[0].innerHTML = inn;
}


//Show results of a search

var lil = document.querySelectorAll('.container ul')[0]

function showResults() {

    toggleLoader()
    setTimeout(toggleLoader, 200);
    lil.innerHTML = ``;
    obj.results.forEach(function(item, index) {
        // console.log(item, index);


        let li = document.createElement("li")


        let inn = `
  
            <figure>
            <figcaption>
                <h3>${obj.results[index].title}</h3>
            </figcaption>
            <img src="https://image.tmdb.org/t/p/w300_and_h450_bestv2${obj.results[index].poster_path}" alt="" />
            </figure>
            <div class="overview">
            <h3>Overview</h3>
            <p>
            ${obj.results[index].overview}
            </p>
            </div>


            `;
        lil.append(li)

        document.querySelectorAll('.container ul li')[index].innerHTML = inn;


    });

}

//First render on page load
setTimeout(getResults, 100);
setTimeout(showResults, 300);

var timerId;
var debounceFunction = function(func, delay) {

    clearTimeout(timerId)
    timerId = setTimeout(func, delay)
}

//search function
const search_input = document.getElementById('search');
search_input.addEventListener('input', e => {
    // saving the input value
    searchString = document.getElementById('search').value;
    let len = document.getElementById('search').value.length;
    console.log(searchString);
    console.log(url);

    //display results if typed more then 2 letters
    if (len > 2) {

        debounceFunction(getResults, 600);
        setTimeout(showResults, 700);

    }
    //display "Nothing to show"
    if (len == 2 || len == 1) {
        displayNoting()
    }

    //display starting page - default results
    if (len == 0) {
        searchString = 'avengers';
        debounceFunction(getResults, 100);
        setTimeout(showResults, 200);
    }
});