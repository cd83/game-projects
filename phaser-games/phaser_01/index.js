// Following along the 'Making your first Phaser Game tutorial'
// from: http://phaser.io/tutorials/making-your-first-phaser-game/index
// next: http://phaser.io/tutorials/making-your-first-phaser-game/part7

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });

function preload() {
    game.load.image('sky', './assets/sky.png');
    game.load.image('ground', './assets/platform.png');
    game.load.image('star', './assets/star.png');
    game.load.spritesheet('dude', './assets/dude.png', 32, 48);
}

var platforms;

function create() {

    // physics
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // background
    game.add.sprite(0,0,'sky');

    // platforms group
    platforms = game.add.group();

    // physics for objects created in platforms group
    platforms.enableBody = true;

    // say hello to the ground
    var ground = platforms.create(0, game.world.height - 64, 'ground');

    // scale ground to fit width of game
    ground.scale.setTo(2,2);

    // ground don't fall when you jump on it
    ground.body.immovable = true;

    // create ledges
    var ledge = platforms.create(400, 400, 'ground');
    ledge.body.immovable = true;

    ledge = platforms.create(-150, 250, 'ground');
    ledge.body.immovable = true;

    // player and settings
    player = game.add.sprite(32, game.world.height -200, 'dude');

    // player physics
    game.physics.arcade.enable(player);

    // use physics to give player a little bounce
    player.body.bounce.y = 0.4;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;

    // walking animations left and right
    player.animations.add('left', [0,1,2,3], 10, true);
    player.animations.add('right', [5,6,7,8], 10, true);

    // add cursor listener
    cursors = game.input.keyboard.createCursorKeys();

}

function update() {

    // check for collisions between platforms and players, stars
    game.physics.arcade.collide(player, platforms);

    // reset players velocity
    player.body.velocity.x =0;

    if (cursors.left.isDown)
    {
        // move to left
        player.body.velocity.x = -150;
        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        // move to right
        player.body.velocity.x = 150;
        player.animations.play('right');
    }
    else
    {
        player.animations.stop();
        player.frame = 4;
    }

    // allow jump if player is touching the ground
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.body.velocity.y = -325
    }

}