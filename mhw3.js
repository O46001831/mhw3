//AGGIUNTA DI N DIV CHE CONTERRANNO I PRODOTTI:
for(let i=0; i<contenuti.length; i++){
    let contenitore=document.createElement("div");
    let titolo=document.createElement("h1");
    let img=document.createElement("img");
    let Prezzo=document.createElement("strong");
    let descrizione=document.createElement("p");
    let mostraDettagli=document.createElement("h2");    
    let nascondiDettagli=document.createElement("h2");
    let button=document.createElement("button");

    contenitore.className="box";
    mostraDettagli.id="mostra";
    nascondiDettagli.id="nascondi";
    descrizione.className="hide";
    nascondiDettagli.className="hide";

    titolo.textContent=contenuti[i].titolo;
    img.src=contenuti[i].immagine;
    Prezzo.textContent=contenuti[i].Prezzo;
    descrizione.textContent=contenuti[i].descrizione;
    mostraDettagli.textContent="Mostra dettagli";
    nascondiDettagli.textContent="Nascondi dettagli";
    button.textContent="Aggiungi al carrello";
    

    contenitore.appendChild(titolo);
    contenitore.appendChild(img);
    contenitore.appendChild(Prezzo);
    contenitore.appendChild(descrizione);   
    contenitore.appendChild(mostraDettagli);
    contenitore.appendChild(nascondiDettagli);
    contenitore.appendChild(button);
 
    
    list.appendChild(contenitore);
}

//FUNZIONI PER MOSTRARE O NASCONDERE LA DESCRIZIONE DEI PRODOTTI:
function mostraDesc(event){
    const container = event.currentTarget.parentNode.childNodes[3];
    container.classList.remove("hide");
    event.currentTarget.parentNode.childNodes[4].classList.add("hide");
    event.currentTarget.parentNode.childNodes[5].classList.remove("hide");

}

function hideDesc(event){
    const container = event.currentTarget.parentNode.childNodes[3];
    container.classList.add("hide");
    event.currentTarget.parentNode.childNodes[4].classList.remove("hide");
    event.currentTarget.parentNode.childNodes[5].classList.add("hide");
}

//aggiungo l'eventListener a tutti i blocchi con scritto "mostra dettagli"
const mostra = document.querySelectorAll("#mostra");
for(const m of mostra){
    m.addEventListener('click', mostraDesc);
}

//aggiungo l'eventListener a tutti i blocchi con scritto "nascondi dettagli"
const nascondi = document.querySelectorAll("#nascondi");
for(const n of nascondi){
    n.addEventListener('click', hideDesc);
}


//FUNZIONI PER GESTIRE IL CARRELLO:
//creo una variabile che tiene conto di quanti elementi ho nel carrello in modo che, se vuoto, il div non viene visualizzato.
var nCarrello = 0;

function rimuoviDalCarrello(event){ 
    //rimuovo il div desiderato dal carrello:
    let bloccoCorrente = event.currentTarget.parentNode;
    bloccoCorrente.parentNode.removeChild(bloccoCorrente);
    //riaggiungo l'event listener a tutti i bottoni "aggiungi al carrello" in modo da rimetterlo al bottone a cui l'avevo tolto
    const bottoniAdd= document.querySelectorAll('#list button');
    for (const bottoneAdd of bottoniAdd){
        bottoneAdd.addEventListener('click', aggiungiAlCarrello);
    }
    //decremento la variabile che tiene conto degli elementi presenti nel carrello.
    nCarrello = nCarrello - 1;
    checkCarrello();
}

function aggiungiAlCarrello(event){    
    //inserisco nel carrello una copia del div presente nella lista completa:
    let elementoAggiunto = event.currentTarget.parentNode;
    let copy=elementoAggiunto.cloneNode(true);
    document.getElementById('basket').appendChild(copy);
    event.currentTarget.removeEventListener('click', aggiungiAlCarrello);
    //aggiungo una classe 'aggiunto' agli elementi che inserisco nel carrello per modificarne il css.
    copy.classList.add('aggiunto');
    //nascondo tutto lasciando solo il titolo, l'immagine e il prezzo.
    copy.childNodes[3].classList.add('hide');
    copy.childNodes[4].classList.add('hide');
    copy.childNodes[5].classList.add('hide');
    //trasformo la scritta "aggiungi al carrello" in "rimuovi dal carrello" ed associo l'eventListener per eseguire questa operazione.
    copy.childNodes[6].textContent="Rimuovi dal carrello";
    copy.childNodes[6].addEventListener('click', rimuoviDalCarrello);
    //incremento la variabile che tiene conto degli elementi presenti nel carrello.
    nCarrello = nCarrello + 1;
    checkCarrello();
}

//aggiungo un eventListener a tutti i bottoni "aggiungi al carrello" e chiamo la funzione che gestisce l'evento
const bottoniAdd= document.querySelectorAll('button');
for (const bottoneAdd of bottoniAdd){
    bottoneAdd.addEventListener('click', aggiungiAlCarrello);
}

//creo la funzione che fa scomparire il blocco che contiene il carrello se esso è vuoto:
function checkCarrello(){
    if (nCarrello == 0){
        let contenitoreCarrello = document.querySelector('#Carrello');
        contenitoreCarrello.classList.add('hide');
    }

    if (nCarrello > 0){
        let contenitoreCarrello = document.querySelector('#Carrello');
        contenitoreCarrello.classList.remove('hide');
    }
}

//FUNZIONE DI RICERCA:
function ricerca(event){

    const listaProdotti = document.getElementById("list")
    const ricerca = document.getElementById("ricerca");

    //Prendiamo la sottostringa che vogliamo cercare nel titolo dei prodotti
    let testoRicerca=ricerca.value;   
    for(let i=0; i<listaProdotti.childNodes.length; i++){
        //A turno controlliamo tutti i prodotti presenti nella lista
        let prodottoLista=listaProdotti.childNodes[i];  

        //Prendiamo il titolo del prodotto
        let titoloProdotto=prodottoLista.childNodes[0].textContent;  
        
        //Trasformiamo entrame le stringhe in minuscolo in maniera tale da non essere Case Sensitive
        titoloProdotto= titoloProdotto.toLowerCase();
        testoRicerca= testoRicerca.toLowerCase();

        //Ritorna la posizione della sottostringa cercata nel titolo (Se non è presente ritorna -1)
        let result=titoloProdotto.indexOf(testoRicerca);    
        //infine eseguo il controllo che mi determina se tenere o far scomparire il blocco in questione.
        if(result===-1){
            prodottoLista.classList.remove("box");
            prodottoLista.classList.add("hide");
        }
        else{
            prodottoLista.classList.add("box");
            prodottoLista.classList.remove("hide");
        }
    }
}