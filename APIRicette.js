
/*------------------------------------ API RICETTE -------------------------------*/ 
function onJson(json){
    const vistaRicette = document.querySelector('#vista-ricette');
    vistaRicette.innerHTML = '';
    let maxRisultati = 9;
    //creiamo il box ad ogni risultato trovato:
    for(let i=0; i<maxRisultati; i++){
        const doc = json[i];
        //controlliamo che il json sia valido:
        if (doc===undefined) {
            const Errore = document.createElement('div');
            Errore.classList.add('Error');
            Errore.textContent='Nessun risultato trovato! Prova a scrivere in inglese!';
            vistaRicette.appendChild(Errore);
            break;
        }
        //creiamo i blocchi in cui appendere le stringhe:
        const titolo=doc.title;        
        const boxRicetta = document.createElement('div');
        boxRicetta.classList.add('ricetta');
        const img = document.createElement('img');
        const testo = document.createElement('h1');
        testo.textContent='Ingredienti:';
        img.src = doc.image;
        const titoloRicetta = document.createElement('div');
        titoloRicetta.textContent=titolo;
        //appendiamo tutto:
        boxRicetta.appendChild(titoloRicetta);
        boxRicetta.appendChild(img);
        boxRicetta.appendChild(testo);
        vistaRicette.appendChild(boxRicetta);
        //aggiungiamo gli ingredienti della ricetta nel blocco:
        //creiamo un mini box in cui mettere tutti gli ingredienti:
        const boxIngredienti = document.createElement('span');
        boxIngredienti.classList.add('boxIngredienti');
        boxRicetta.appendChild(boxIngredienti);
        for(let k=0; k<doc.missedIngredients.length; k++){
            const ingrediente = doc.missedIngredients[k].original;
            const ingrBox = document.createElement('p');
            ingrBox.classList.add('ingrediente');
            ingrBox.textContent=ingrediente;
            boxIngredienti.appendChild(ingrBox);
        }
    }
}

function onResponse(response){  
    return response.json();
}

function search(event){
    event.preventDefault();
    const ingrediente_input = document.querySelector('#ingrediente');
    const ingrediente_value = encodeURIComponent(ingrediente_input.value);
    rest_url= 'https://api.spoonacular.com/recipes/findByIngredients?apiKey=ab622dfba5f249f79fcec8aee38c8a2b&ingredients=' + ingrediente_value;
    //ora eseguiamo il fetch:
    fetch(rest_url).then(onResponse).then(onJson);
}

const form = document.getElementById('ricetta');
form.addEventListener('submit', search);