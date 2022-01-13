const scene = new Scene();
const hero = new Hero();
const poop = new Poop();
const crazy = new Crazy();
const biker = new Biker ();
const pfand = new Pfand();


document.addEventListener('keydown', event => {
    const pressedKey = event.key;
    switch(pressedKey) {
        case 'ArrowUp':
            hero.moveUp();
            break;
        case 'ArrowDown':
            hero.moveDown();
            break;
    }

})

function update() {
    scene.clear();
    scene.animate();
    hero.draw();
    poop.draw();
    crazy.draw();
    biker.draw();
    pfand.draw();
    requestAnimationFrame(update);
}

update()