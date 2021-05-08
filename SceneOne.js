var player;
var cadre;
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
var changementZone3;
var changementZone2;
var positionX=100;
var positionY=450;

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
    this.load.spritesheet('dudedos', 'assets/statiquedos.png', { frameWidth: 115, frameHeight: 152 });
    this.load.spritesheet('dudemarchea', 'assets/marcheavant.png', { frameWidth: 115, frameHeight: 152 });
    this.load.spritesheet('dudemarched', 'assets/marchedos.png', { frameWidth: 115, frameHeight: 152 });
    this.load.image('ascenseur', 'assets/ascenseur.png');
    this.load.image('murhaut', 'assets/murhaut.png');
    this.load.spritesheet('platform', 'assets/platform.png', { frameWidth: 230.75, frameHeight: 69 });
}

    create(){

        this.cursors = this.input.keyboard.createCursorKeys();

        this.player = this.physics.add.sprite(200, 300, 'statiquedos');
        this.player = this.physics.add.sprite(200, 100, 'marcheavant');
        this.player = this.physics.add.sprite(200, 100, 'marchedos');

        this.player.setCollideWorldBounds(true);
    
    //  background
    this.add.image(640, 360, 'background');
    
    platforms = this.physics.add.staticGroup();

    //  Now let's create some ledges
    platforms.create(50, 250, 'platform');
    platforms.create(640, 60, 'murhaut');
        
    maison = this.physics.add.staticGroup();
        
     platforms.create(900,50,'ascenseur');
        
    // The player and its settings
    player = this.physics.add.sprite(positionX,positionY, 'dudedos');
    
    //vie
    coeur1= this.add.sprite(52,190,'coeur').setScrollFactor(0).setAlpha(1);
    coeur2= this.add.sprite(52,350,'coeur').setScrollFactor(0).setAlpha(1);
    coeur3= this.add.sprite(52,520,'coeur').setScrollFactor(0).setAlpha(1);
    coeurv1= this.add.sprite(52,190,'coeur').setScrollFactor(0).setAlpha(0);
    coeurv2= this.add.sprite(52,350,'coeur').setScrollFactor(0).setAlpha(0);
    coeurv3= this.add.sprite(52,520,'coeur').setScrollFactor(0).setAlpha(0);
        
        
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
        frames: this.anims.generateFrameNumbers('dudedos', { start: 0, end: 4 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: this.anims.generateFrameNumbers('dudedos', { start: 0, end: 4 }),
        frameRate: 10
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dudedos', { start: 0, end: 4 }),
        frameRate: 10,
        repeat: -1
    });
    
    this.anims.create({
        key: 'up',
        frames: this.anims.generateFrameNumbers('dudemarched', { start: 0., end: 3 }),
        frameRate: 5,
    });
        
        this.anims.create({
        key: 'down',
        frames: this.anims.generateFrameNumbers('dudemarchea', { start: 0., end: 3 }),
        frameRate: 5,
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
        
        if (cursors.right.isUp && cursors.left.isUp && cursors.up.isUp && cursors.down.isUp){
                player.setVelocityY(0);
                player.anims.play('turn', true);
            }

            if (cursors.right.isDown){
                if (cursors.up.isDown){
                player.setVelocityX(50);
                player.setVelocityY(-50);
                player.anims.play('up', true);
                }
                else if (cursors.down.isDown){
                player.setVelocityX(50);
                player.setVelocityY(50);
                player.anims.play('down', true);
                }
                else {
                player.setVelocityX(100);
                player.anims.play('right', true);
                }
            }
            else if (cursors.left.isDown){
                if (cursors.up.isDown){
                player.setVelocityX(-50);
                player.setVelocityY(50);
                player.anims.play('up', true);
                }
                else if (cursors.down.isDown){
                player.setVelocityX(-50);
                player.setVelocityY(-50);
                player.anims.play('down', true);
                }
                else {
                player.setVelocityX(-100);
                player.anims.play('left', true);
                }

            }
            else if (cursors.right.isUp && cursors.left.isUp){
                player.setVelocityX(0);
            }
            if (cursors.up.isDown){
                player.setVelocityY(-100);
                player.anims.play('up', true);
            }
            else if (cursors.down.isDown){
                player.setVelocityY(100);
                player.anims.play('down', true); 
            } 
            else if (cursors.up.isUp && cursors.down.isUp){
                player.setVelocityY(0);
            }
       
        //changement scene

    if (player.y==213&&player.x>827&&player.x<975){
        this.scene.start("sceneTrois");
        changementZone3 = true;
    }
        
        if (player.x>1180){
        this.scene.start("sceneDeux");
        changementZone2 = true;
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