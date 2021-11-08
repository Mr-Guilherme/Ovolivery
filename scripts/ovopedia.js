let dataEgg = new Array();
let id = 0;

function collectData(name, amount, price) {
    id += 1;
    let egg = {
        id: id,
        name: name,
        amount: amount,
        price: price,
    }
    
    window.localStorage.setItem('dataEgg', JSON.stringify(dataEgg));
    dataEgg = JSON.parse(localStorage.getItem('dataEgg'));
    dataEgg.push(egg);
    window.localStorage.setItem('dataEgg', JSON.stringify(dataEgg));
    
}

