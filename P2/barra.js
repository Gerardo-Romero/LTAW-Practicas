
const searchBar = document.getElementById("barra-bus");
const searchBarText = document.getElementById("bar-resultado");
searchBar.addEventListener('input', productSearch)

searchBar.value = ""

function productSearch(){

searchBarText.innerHTML = ""
if (searchBar.value.length > 2){

      search = searchBar.value
      console.log("mandamos al server: " + search)
      const m = new XMLHttpRequest();
      m.open("GET", "/BuscarProducto?producto="+search, true);
      m.onreadystatechange = () => {
        if (m.readyState==4 && m.status == 200) {
          results = JSON.parse(m.responseText)
          console.log(results)

          for (let i = 0; i< results[0].length;i++){
            searchBarText.innerHTML = searchBarText.innerHTML + "<p id='result_search' >"+ results[0][i]+"</p>"
          }
        }
      }
      m.send();
    }
  }