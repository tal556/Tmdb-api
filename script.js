

//https://api.themoviedb.org/3/search/movie?api_key=a514e5022db69ea43b78a8355cc43719&query=

let api = "https://api.themoviedb.org/3/search/movie?api_key=a514e5022db69ea43b78a8355cc43719&query="
let imageApi = "https://image.tmdb.org/t/p/w400/"
let youtube = "https://www.youtube.com/watch?v="

let resultApi
function getApi(inputValue) {
    return fetch(`${api}${inputValue}`)
        .then(res => res.json())
        .catch(err => console.log(err))
}

let getMainDiv = document.getElementById('mainDiv1')

async function printApi(getValue) {
    try {
        mainDiv1.innerHTML = '<img src="/3.gif" alt="loading gif" style = "width:230px ; height:170px;" >'
        await getApi(getValue).then(res => resultApi = res).catch(err => console.log(err));
    }
    catch (err) {
        console.error(err)

    }
    finally {
        mainDiv1.innerHTML = ''

    }
}


async function search() {
    await printApi(searchInput.value)
        .then(() => {
            for (const iterator of resultApi.results) {
                if (iterator.backdrop_path != null){
                    mainDiv1.innerHTML += `<div><h3>${iterator.title} <br>rating: ${iterator.vote_average}</h3><img src="${imageApi}${iterator.backdrop_path}" alt="" onmouseover=""></div>`


                }
                // mainDiv1.innerHTML += `<div>${iterator.overview}</div>`

            }
        }
        )

    // console.log(resultApi);
    // console.log(searchInput.value);

}


//use button when push enter in the keyboard
let inputEnter = document.getElementById('searchInput')

inputEnter.addEventListener('keyup',event=>{
    if(event.key === 'Enter'){
        // event.preventDefault()
        document.getElementById('btn').click()
        console.log(event);
        inputEnter.value = null
    }
})


