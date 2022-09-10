const container = document.getElementById('spell');

const getUrl = new URLSearchParams(window.location.search);

index = getUrl.get('index');

const url = 'https://www.dnd5eapi.co/api/spells';

fetch(`${url}/${index}`)
.then(res => res.json())
.then(data => {
        document.title = `Wizard's Spellbook | ` + data.name;

        const name = document.createElement('p');
        name.classList.add('card__spell');
        name.innerHTML = data.name;
        container.appendChild(name);

        const classes = document.createElement('p');
        classes.classList.add('card__text');
        classes.innerHTML = `<span class="card__text-bold">Classes:</span>`;

        const subclasses = document.createElement('p');
        subclasses.classList.add('card__text');
        subclasses.innerHTML = `<span class="card__text-bold">Subclasses:</span>`;

        const spellLevel = document.createElement('p');
        subclasses.classList.add('card__text');
        spellLevel.classList.add('card__text-italic');

        switch(data.level){
            case 1:
                spellLevel.innerHTML = data.level + 'st - level ' + data.school.name;
                break;
            case 2:
                spellLevel.innerHTML = data.level + 'nd - level ' + data.school.name;
                break;
            case 3:
                spellLevel.innerHTML = data.level + 'rd - level ' + data.school.name;
                break;
            default:
                spellLevel.innerHTML = data.level + 'th - level ' + data.school.name;
                break;
        }
        if(data.level === 0){
            spellLevel.innerHTML = data.school.name + ' cantrip';
        }
        if(data.ritual === true){
            spellLevel.innerHTML += ' (ritual)';
        }
        container.appendChild(spellLevel);

        const castingTime = document.createElement('p');
        castingTime.classList.add('card__text');
        castingTime.innerHTML = `<span class="card__text-bold">Casting Time: </span>` + data.casting_time;
        container.appendChild(castingTime);

        const range = document.createElement('p');
        range.classList.add('card__text');
        range.innerHTML = `<span class="card__text-bold">Range: </span>` + data.range;
        container.appendChild(range);

        const components = document.createElement('p');
        components.classList.add('card__text');
        components.innerHTML = `<span class="card__text-bold">Components:</span>`;
        data.components.forEach(componentsElement => {
            components.innerHTML += ' ' + componentsElement + ',';
            container.appendChild(components);
            
        });
        components.innerHTML = components.innerHTML.replace(/.$/, ' ');
        if(data.material != null){
            components.innerHTML += '(' + data.material + ') ';
        }

        const duration = document.createElement('p');
        duration.classList.add('card__text');
        duration.innerHTML = `<span class="card__text-bold">Duration: </span>` + data.duration;
        container.appendChild(duration);

        const separator = document.createElement('hr');
        separator.classList.add('card__separator');
        container.appendChild(separator);

        data.desc.forEach(descriptionElement => {
            let description = document.createElement('p');
            description.classList.add('card__text');
            description.innerHTML = descriptionElement;
            if(description.innerHTML.includes('***')){
                description.innerHTML = description.innerHTML.replace("***", `<span class = "card__text-bold">`);
            }
            if(description.innerHTML.includes('.***')){
                description.innerHTML = description.innerHTML.replace("***", "</span>");
            }
            container.appendChild(description);
        });

        container.appendChild(separator.cloneNode(true));

        data.classes.forEach(classElement => {
            classes.innerHTML += ' ' + classElement.name + ',';
            container.appendChild(classes);
        });
        classes.innerHTML = classes.innerHTML.replace(/.$/, '');

        data.subclasses.forEach(subclassElement => {
            subclasses.innerHTML += ' ' + subclassElement.name + ',';
            container.appendChild(subclasses);
        });
        subclasses.innerHTML = subclasses.innerHTML.replace(/.$/, '');

        const ending = document.createElement('p');
        ending.classList.add('card__text');
        ending.innerHTML = `<span class="card__text-bold">Source: </span>Player's Handbook`
        container.appendChild(ending);
})

