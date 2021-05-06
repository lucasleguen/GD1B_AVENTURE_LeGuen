var player;
var cadre
var platforms;
var pdv = 3;
var coeur1;
var coeur2;
var coeur3;
var coeurv1;
var coeurv2;
var coeurv3;
var comptinv=100;
var invincible=false;
var balle;
var cursors;
var maison;

var changementZone3 = false

class SceneOne extends Phaser.Scene{
    constructor(){
        super("sceneOne");
    }
    init(data){
    }
    preload(){
    this.load.image('background', 'assets/background.png');
    this.load.image('backgroundmaison', 'assets/backgroundmaison.png');
    this.load.image('coeur', 'assets/coeur.png');
    this.load.image('coeurvide', 'assets/coeurvide.png')
    this.load.image('balle', 'assets/balle.png');
    this.load.image('cadre', 'assets/cadreui.png');
    this.load.image('dude', 'assets/astartes.png');
    this.load.image('maison', 'assets/maison.png');
    this.load.spritesheet('platform', 'assets/platform.png', { frameWidth: 230.75, frameHeight: 69 });
}

    create(){
         //  Set the camera and physics bounds to be the size of 4x4 bg images
        //this.cameras.main.setBounds(0, 0, 945 * 2, 531 * 2);
        //this.physics.world.setBounds(0, 0, 945 * 2, 531 * 2);

        //  Mash 4 images together to create our background

        this.cursors = this.input.keyboard.createCursorKeys();

        this.player = this.physics.add.image(400, 300, 'astartes');
        
        this.player = this.physics.add.image(400, 300, 'astartes');

        this.player.setCollideWorldBounds(true);
    
    //  background
    this.add.image(640, 360, 'background');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = this.physics.add.staticGroup();

    //  Now let's create some ledges
    platforms.create(500, 400, 'platform');
    platforms.create(50, 250, 'platform');
    platforms.create(800, 220, 'platform');
    platforms.create(10, 100, 'platform');
        
    // The player and its settings
    player = this.physics.add.sprite(100, 450, 'dude');
    
    //vie
    coeur1= this.add.sprite(52,190,'coeur').setScrollFactor(0).setAlpha(1);
    coeur2= this.add.sprite(52,350,'coeur').setScrollFactor(0).setAlpha(1);
    coeur3= this.add.sprite(52,520,'coeur').setScrollFactor(0).setAlpha(1);
    coeurv1= this.add.sprite(52,190,'coeur').setScrollFactor(0).setAlpha(0);
    coeurv2= this.add.sprite(52,350,'coeur').setScrollFactor(0).setAlpha(0);
    coeurv3= this.add.sprite(52,520,'coeur').setScrollFactor(0).setAlpha(0);
        
        //maison
    maison= this.add.sprite(900,520,'maison')
        
        //cadre
    cadre= this.add.sprite(640, 360,'cadre');

    //  Player physics properties. Give the little guy a slight bounce.
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    balle=this.physics.add.image(500,200,'balle');
    balle.setCollideWorldBounds(true);
    balle.body.setAllowGravity(false);
    
    this.tweens.add({
        targets: balle,
        props: {
            y:{value: 500,duration:1000},
        },
        yoyo:false,
        repeat:-1
    });
    
  
    
    

    //  Our player animations, turning, walking left and walking right.
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 3, end: 5 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 1 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 2 }),
        frameRate: 10,
        repeat: -1
    });
    
    this.anims.create({
        key: 'up',
        frames: this.anims.generateFrameNumbers('dude', { start: 1., end: 3 }),
        frameRate: 10,
        repeat: -1
    });
    

    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();

    //  Collide the player and the stars with the platforms
    this.physics.add.collider(player, platforms);


    this.physics.add.collider(player,balle,hitballe,null,this);
        
        
        function hitballe(player,balle) {
        if (invincible==false){
            pdv-=1;
       
            
            if (pdv==2){
                coeur3.setVisible(false);
                coeurv3.setVisible(true);
            }
            if (pdv==1){
                coeur2.setVisible(false);
                coeurv2.setVisible(true);
            }
            if (pdv==0){
                coeur1.setVisible(false);
                coeurv1.setVisible(true);
                this.physics.pause();
                player.setTint(0xff0000);
                this.add.text(200, 280, 'You died, press F5 to try again !', { font: "48px Arial Black", fill: "#000" }).setScrollFactor(0)
            }
        }
        invincible=true;
        setTimeout(function(){invincible=false},5000);
    }
}
    
    update(){
     if (invincible==true) {
        comptinv--;
        if (comptinv==0){
            comptinv=100;
            invincible==false;
        }
    }

    if (cursors.left.isDown)
    {
        player.setVelocityX(-120);

    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(120);

    }
    else
    {
        player.setVelocityX(0);

    }

    if (cursors.up.isDown)
    {
        
        player.setVelocityY(-120);
    }
    
    else if (cursors.down.isDown)
    {
        
        player.setVelocityY(120);
    }
    
    else {
        player.setVelocityY(0);
    }
        
    if (player.x>1100){
        this.scene.start("sceneDeux");
    }
    if (player.x>848&&player.x<954&&player.y==604){
        this.scene.start("sceneTrois");
        changementZone3 = true;
        console.log("maison");
    }
    if (changementZone3==true){
        player.setX(900)
        player.setY(604)
    }
        if (pdv==2){
                coeur3.setVisible(false);
                coeurv3.setVisible(true);
            }
            if (pdv==1){
                coeur2.setVisible(false);
                coeurv2.setVisible(true);
            }
            if (pdv==0){
                coeur1.setVisible(false);
                coeurv1.setVisible(true);
                this.physics.pause();
                player.setTint(0xff0000);
                this.add.text(200, 280, 'You died, press F5 to try again !', { font: "48px Arial Black", fill: "#000" }).setScrollFactor(0);
    }
  }
}