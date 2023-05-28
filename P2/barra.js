
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
          

          for (let i = 0; i< results.length;i++){
            searchBarText.innerHTML = searchBarText.innerHTML + "<p id='result_search' onclick= \"location.href='/" + results[i][1] + ".html';\" > "+ results[i][0] +"  </p>"
            //--onclick =\"location.href='/" + results[i][1] + ".html' >"+ results[i][0]+"</p>"
            console.log(results[i])
            console.log(searchBarText)
          }
        }
      }
      m.send();
    }
  }