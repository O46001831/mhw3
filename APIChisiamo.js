
/*------------------------------------  INTRODUZIONE API PUNTI VENDITA -------------------------------*/ 
function onJson(json){
    console.log(json);
    const containerResponse = document.getElementById('response');
    containerResponse.innerHTML = '';

    const doc2 = json.postalCodes[0];
    console.log(doc2);
    //genero un numero random fra 0 e 5:
    let num = parseInt(Math.round(Math.random()*5));
    const response = document.createElement('div');
    response.classList.add('Error');
    response.textContent='A ' + doc2.placeName + ' sono presenti ' + num + ' punti vendita';
    containerResponse.appendChild(response);


}

function onResponse(response){  
    return response.json();
}

function search(event){
    event.preventDefault();
    const codicePostale = document.querySelector('#CP');
    const CAP = encodeURIComponent(codicePostale.value);
    rest_url= 'http://api.geonames.org/postalCodeSearchJSON?postalcode=' + CAP + '&maxRows=10&username=ciao';
    //ora eseguiamo il fetch:
    fetch(rest_url).then(onResponse).then(onJson);
}

const formCP = document.getElementById('formCP');
formCP.addEventListener('submit', search);