const app = document.getElementById('container');
const searchbar = document.getElementById('searchbar');
searchbar.value='';

searchbar.addEventListener('input', function(){
    const filter = searchbar.value.toLowerCase();
    const listItems = document.querySelectorAll('.container__spells__spell')

    listItems.forEach((item) =>{
        let text = item.textContent;
        !text.toLowerCase().includes(filter.toLowerCase()) ? item.classList.add('container__spells__spell-hidden') : item.classList.remove('container__spells__spell-hidden') ;
    });

});

const API_URL = 'https://www.dnd5eapi.co/api/spells';

fetch(API_URL)
.then(response => response.json())
.then(data => {
    data.results.forEach(spell => {
        const spellName = document.createElement('li');
        spellName.classList.add('container__spells__spell')
        spellName.setAttribute('index', spell.index);
        spellName.innerHTML = spell.name;
        spellName.addEventListener('click', function(){
            window.location.href = url = `./spell.html?index=${spell.index}`
        })
        app.appendChild(spellName);
    });
})

