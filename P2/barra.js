
const searchBar = document.getElementById("barra-bus");
searchBar.addEventListener('input', productSearch)

function productSearch(){

    search = searchBar.value
    console.log(search)
    const m = new XMLHttpRequest();
    m.open("GET", "/BuscarProducto?producto="+search, true);
    m.onreadystatechange = () => {
      if (m.readyState==4 && m.status == 200) {
        results = JSON.parse(m.responseText)
        console.log(results)
      }
    }
    m.send(); 
  }