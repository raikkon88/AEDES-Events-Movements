/**
 * Permet carregar el contingut d'un fitxer file en html a dins d'un element amb id toElement
 * file : fitxer que es vol carregar
 * toElement : Identificador de l'element que vol ser substituït.
 */
function changeContent(file, toElement) {
  console.log(file);
  var z, i, elmnt, xhttp;
  /* Loop through a collection of all HTML elements: */
  elmnt = document.getElementById(toElement);
  if (elmnt) {
    /* Make an HTTP request using the attribute value as the file name: */
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status == 200) {elmnt.innerHTML = this.responseText;}
        if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
        /* Remove the attribute, and call this function once more: */
        elmnt.removeAttribute(toElement);
      }
    }
    xhttp.open("GET", file, true);
    xhttp.send();
    /* Exit the function: */
    return;
  }
}

/**
 * Peremet incloure tots els continguts assignats a tots els elements html que contenen l'atribut w3-includes-html.
 * L'atribut ha de tenir com a valor el fitxer que es vol carregar. 
 */
function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /*loop through a collection of all HTML elements:*/
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /*make an HTTP request using the attribute value as the file name:*/
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
          /*remove the attribute, and call this function once more:*/
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
      /*exit the function:*/
      return;
    }
  }
}
