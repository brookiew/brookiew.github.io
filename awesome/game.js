class Boot {
  preload(){
    console.log("Boot.preload")
  }
  create(){
    console.log("Boot.create")
    game.state.start("Load")
  }
}

class Load{
  preload(){
    console.log("Loading...")
    this.load.spritesheet("blob", "assets/sprite.png" , 32, 32, 1)
    this.load.spritesheet("blob1", "assets/sprite1.png" , 32, 32, 1)
    this.load.spritesheet("backround", "assets/animatedBackround.png", 320,568,2)
}
  create(){
    console.log("Loaded.")
    //game.stage.backgroundColor = "#00FFFF"
    game.state.start("Play")
  }
}

class Play {
  preload(){
    this.bg = this.add.sprite(0,0, "backround","bg00")
    this.bg.animations.add("rainbg")
    this.bg.animations.play("rainbg",3,true)
  }

  create() {
    console.log("Playing...")

    game.physics.startSystem(Phaser.Physics.ARCADE)

    //blob
    this.blob = this.add.sprite(10,200, "blob")
    game.physics.arcade.enable(this.blob)
    this.blob.body.collideWorldBounds = true
    this.blob.body.gravity.y = 1000
    this.blob.body.bounce.setTo(1.001)
    this.blob.body.drag.setTo(500)

    this.blob.body.velocity.y = -400
    this.blob.body.velocity.x= 400

    //blob1
    this.blob1 = this.add.sprite(30,100, "blob1")
    game.physics.arcade.enable(this.blob1)
    this.blob1.body.collideWorldBounds = true
    this.blob1.body.gravity.y = 1000
    this.blob1.body.bounce.setTo(1.00)
    this.blob1.body.velocity.y = -400
    this.blob1.body.velocity.x= 400

    this.cursors = game.input.keyboard.createCursorKeys()
  }

  update() {
    game.physics.arcade.collide(this.blob,this.blob1,this.handleCollision)

    if (this.cursors.left.isDown) {
      this.blob.body.velocity.x = -100
    }
    if(this.cursors.right.isDown) {
      this.blob.body.velocity.x = 100
    }
    if(this.cursors.up.isDown) {
      this.blob.body.velocity.y = -1000
    }
    if(this.cursors.down.isDown) {
      this.blob.body.velocity.y = 100
    }
  }

  handleCollision(obj1,obj2){
    console.log("OW!"+ obj2.name + " You hit me.")
  }
}


var game = new Phaser.Game(320,568);
game.state.add("Boot", Boot)
game.state.add("Load",Load)
game.state.add("Play",Play)
game.state.start("Boot")
