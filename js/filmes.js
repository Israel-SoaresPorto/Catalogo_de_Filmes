const apiKey = "d21a484b"
const formPesquisa = document.querySelector("form")

formPesquisa.onsubmit = (ev) => {
    ev.preventDefault()
    
    const pesquisa = ev.target.pesquisa.value

    if(pesquisa == "") {
        alert("preencha o campo")
        return
    }

    fetch(`https://www.omdbapi.com/?s=${pesquisa}&apikey=${apiKey}`)
        .then(result => result.json())
        .then(json => carregarLista(json))
}

const carregarLista = (json) => {
    const lista = document.querySelector(".lista")
    lista.innerHTML = ""

    if(json.Response == "False") {
        alert("Nenhum filme encontrado")
        return
    }

    json.Search.forEach(element => {
        console.log(element)

        let item = document.createElement("div")
        item.classList.add("item")
        item.innerHTML = `<img src=${element.Poster} /> <h2>${element.Title}</h2>`
        
        lista.appendChild(item)
    });
}