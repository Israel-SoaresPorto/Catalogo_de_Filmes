const apiKey = "d21a484b"
const formPesquisa = document.querySelector("form")

formPesquisa.onsubmit = (ev) => {
    ev.preventDefault()
    
    const pesquisa = ev.target.pesquisa.value

    if(pesquisa == "") {
        alert("preencha o campo")
        return
    }

    fetch(`https://www.omdbapi.com/?s=${pesquisa}&apikey=${apiKey}&type=movie`)
        .then(result => result.json())
        .then(json => carregarLista(json))
}

const carregarLista = (json) => {
    const lista = document.querySelector(".lista")
    lista.innerHTML = ""

    if(json.Response == "False") {
        lista.innerHTML = "<h2>Nenhum filme encontrado</h2>"
        lista.style.color = "lightgray"
        return
    }

    json.Search.forEach(element => {

        console.log(element)

        let item = document.createElement("div")
        item.classList.add("item")

        let itemImg = document.createElement("div")
        itemImg.classList.add("item-img")
        itemImg.innerHTML = `<img src="${element.Poster}" />`
        item.appendChild(itemImg)

        let itemDescricao = document.createElement("div")
        itemDescricao.classList.add("item-descricao")
        itemDescricao.innerHTML = `<h3>${element.Title}</h3><a href="https://www.imdb.com/title/${element.imdbID}/" target="_blank">Ver Mais</a>`
        item.appendChild(itemDescricao)
        
        lista.appendChild(item)

    });
}