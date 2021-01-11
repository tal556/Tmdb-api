

//https://api.themoviedb.org/3/search/movie?api_key=a514e5022db69ea43b78a8355cc43719&query=
//https://api.themoviedb.org/3/movie/209112/videos?api_key=a514e5022db69ea43b78a8355cc43719
let api = "https://api.themoviedb.org/3/search/movie?api_key=a514e5022db69ea43b78a8355cc43719&query="
let imageApi = "https://image.tmdb.org/t/p/w400/"
let youtubeApi = "https://www.youtube.com/watch?v="
let videoAddressApi = "https://api.themoviedb.org/3/movie/"
let videoAddressApi2 = "/videos?api_key=a514e5022db69ea43b78a8355cc43719"
let keyOfYoutube = ''

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
                if (iterator.backdrop_path != null) {
                    getVideoId(iterator)
                }
                // mainDiv1.innerHTML += `<div>${iterator.overview}</div>`

            }
        }
        )
   
}

async function getVideoId(arg) {
    let videoPage = `${videoAddressApi}${arg.id}${videoAddressApi2}`
    await fetch(videoPage)
        .then(res => res.json())
        // .then((arg) => { keyOfYoutube = arg.results[0].key })
        .then(res => keyOfYoutube = res.results[0].key )
        .catch(err => console.log(err))
        console.log(keyOfYoutube);
        mainDiv1.innerHTML +=
        `<div><h3>${arg.title} <br>rating: ${arg.vote_average}</h3><a href="${youtubeApi}${keyOfYoutube}" target="_blank">yotube</a><img src="${imageApi}${arg.backdrop_path}" alt="" onmouseover=""></div>`

}


//auto focus faster work on load
window.onload = () =>{

    inputEnter.focus()
}
//use button when push enter in the keyboard
let inputEnter = document.getElementById('searchInput')

inputEnter.addEventListener('keyup', event => {
    if (event.key === 'Enter') {
        // event.preventDefault()
        document.getElementById('btn').click()
       
        console.log(event);
        inputEnter.value = null
    }
})


