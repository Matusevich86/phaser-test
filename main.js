
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.spritesheet('br_start1', 'img/bri_big_anim_start.png', 392, 372, 4);
    game.load.spritesheet('br_start2', 'img/bri_big_anim_middle.png', 449, 432, 4);
    game.load.spritesheet('br_start3', 'img/bri_big_anim_finish.png', 326, 337, 4);

}

var pictureA;
var pictureB;
var timer;
var current = 3;

function create() {


    pictureA = game.add.sprite(game.world.centerX, game.world.centerY, 'br_start1');
    pictureA.anchor.setTo(0.5, 0.5);
    pictureA.scale.setTo(0.2, 0.2);

    pictureB = game.add.sprite(game.world.centerX, game.world.centerY, 'br_start2');
    pictureB.anchor.setTo(0.5, 0.5);
    pictureB.scale.setTo(0.5, 0.5);
    pictureB.alpha = 0;

    //  Create our Timer
    timer = game.time.create(false);

    //  Set a TimerEvent to occur after 2 seconds
    timer.add(2000, fadePictures, this);

    //  Start the timer running - this is important!
    //  It won't start automatically, allowing you to hook it to button events and the like.
    timer.start();
    
    pictureB.animations.add('shine');
    pictureB.animations.play('shine', 10, true);
    pictureA.animations.add('min_shine');
    pictureA.animations.play('min_shine', 1, true);
    game.add.tween(pictureA.scale).to( { x: 0.5, y: 0.5 }, 2000, Phaser.Easing.Linear.None, true);

}

function fadePictures() {

    //  Cross-fade the two pictures
    var tween;

    if (pictureA.alpha === 1)
    {
        tween = game.add.tween(pictureA).to( { alpha: 0 }, 800, Phaser.Easing.Linear.None, true);
        game.add.tween(pictureB).to( { alpha: 1 }, 800, Phaser.Easing.Linear.None, true);
    }
    else
    {
        game.add.tween(pictureA).to( { alpha: 1 }, 800, Phaser.Easing.Linear.None, true);
        tween = game.add.tween(pictureB).to( { alpha: 0 }, 800, Phaser.Easing.Linear.None, true);
    }

    //  When the cross-fade is complete we swap the image being shown by the now hidden picture
    tween.onComplete.add(changePicture, this);

}

function changePicture() {

    if (pictureA.alpha === 0)
    {
        pictureA.loadTexture('br_start' + current);
    }
    else
    {
        pictureB.loadTexture('br_start' + current);
    }

    current++;

    if (current > 4)
    {
        timer.stop();
        game.add.tween(pictureA.scale).to( { x: 0.2, y: 0.2 }, 1000, Phaser.Easing.Linear.None, true);
        game.add.tween(pictureA).to({ x: 400, y:120 }, 1000, Phaser.Easing.Linear.None, true);
    }

    //  And set a new TimerEvent to occur after 1 seconds
    timer.add(1000, fadePictures, this);

}