export const UI = $('#UI');
// export const Canvas = $('#Canvas')

export function ById(id) {
    return document.getElementById(id);
}

export function CreateMenu(name, ...buttonData) {
    let menu = $(`<div class="GameMenu"><h2>${name}</h2></div>`);

    buttonData.forEach(b => {
        menu.append($(`<button class="MenuButton">${b.title}</button>`).on('click', b.on));
    })

    return menu;
}

export function CreateList(name, data, onCreate, onClick) {
    let menu = $(`<div style="display: grid; grid-template-rows: auto 1fr" class="GameMenu"><h2>${name}</h2></div>`);
    let contents = $(`<div class="Scrollable"></div>`)
    let selected = null;
    for (let i = 0; i < data.length; i++) {
        let button = onCreate(data[i]);
        contents.append(button.on('click', () => {
            if (selected != null) {
                selected.removeClass('selected');
            }
            selected = button;
            button.addClass('selected');
            onClick(data[i], i);
        }))
    }
    menu.append(contents);
    return menu;
}

export function NewButtonData(title, on) {
    return {
        title,
        on
    }
}

export function CreateButton(text, on) {
    return $(`<button>${text}</button>`).on('click', on);
}

export function CreateEdgeContainers() {
    let mainContainer = $('<div style="display: grid; grid-template-rows: 1fr 1fr; grid-template-columns: 1fr 1fr"></div>');
    let topLeft = $('<div></div>')
    let topRight = $('<div style="text-align: right"></div>')
    let bottomLeft = $('<div style="display: grid; grid-template-rows: 1fr auto"><div>&nbsp;</div></div>')
    let bottomRight = $('<div style="display: grid; grid-template-rows: 1fr auto; text-align: right"><div>&nbsp;</div></div>')
    mainContainer.append(topLeft, topRight, bottomLeft, bottomRight);
    UI.append(mainContainer);
    return {
        topLeft,
        topRight,
        bottomLeft,
        bottomRight
    }
}