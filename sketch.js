var torre, torreImagem
var fantasma, fantasmaImagem, fantasmaImagemPulando
var portaImagem
var cercaImagem
var grupoPorta, grupoCerca, grupoCercaInvisivel
var estadoJogo = "inicial"
var som

function criaPorta() { 
   if(frameCount %150 === 0){ 
    var porta = createSprite(300,-100)
    porta.x = Math.round(random(100,500))
    porta.addImage(portaImagem)
    porta.velocityY = 3
    porta.depth = fantasma.depth
    fantasma.depth = fantasma.depth +1
    grupoPorta.add(porta)
    porta.lifeTime = 800

    var cerca = createSprite(300,-35)
    cerca.addImage(cercaImagem)
    cerca.velocityY = 3
    cerca.x = porta.x
    grupoCerca.add(cerca)
    cerca.lifeTime = 800

    var cercaInvisivel = createSprite(300,-30,70,2)
    cercaInvisivel.velocityY = 3
    cercaInvisivel.x = cerca.x
    cercaInvisivel.visible = false
    grupoCercaInvisivel.add(cercaInvisivel)
    cercaInvisivel.lifeTime = 800
  }
 
}

function preload() {
  torreImagem = loadImage("tower.png")
  
  fantasmaImagem = loadAnimation("ghost-standing.png")
  fantasmaImagemPulando = loadAnimation("ghost-jumping.png")

  portaImagem = loadImage("door.png")

  cercaImagem = loadImage("climber.png")

  som = loadSound("spooky.wav")
}

function setup() {
  createCanvas(600,600);
  torre = createSprite(300,300)
  torre.addImage(torreImagem)
  
  fantasma = createSprite(300,300)
  fantasma.addAnimation("normal",fantasmaImagem)
  fantasma.addAnimation("pulando",fantasmaImagemPulando)
  fantasma.scale = 0.3

  grupoCerca = new Group()
  grupoCercaInvisivel = new Group()
  grupoPorta = new Group()

  som.loop()
  som.setVolume(0.2)
}

function draw() {
  background("black")


  if (estadoJogo === "inicial"){
    if(mousePressedOver(torre)){
      estadoJogo = "jogando"
    }
  } else if(estadoJogo === "jogando"){
    torre.velocityY = 3

    if(torre.y >400){
      torre.y = 300
    }
  
  if(keyDown("left")&& fantasma.x >100){
    fantasma.x = fantasma.x -3
  }
  
  if(keyDown("right")&& fantasma.x <500){
    fantasma.x = fantasma.x +3
  }
  
  if(keyDown("space")){
    fantasma.velocityY = -10
    fantasma.changeAnimation("pulando",fantasmaImagemPulando)
  }

  if(keyWentUp("space")){
    fantasma.changeAnimation("normal",fantasmaImagem)
  }

  if(fantasma.isTouching(grupoCercaInvisivel)||fantasma.y >600){
    estadoJogo = "final"
  }
  
  fantasma.velocityY = fantasma.velocityY +0.8
  
    criaPorta()
  
    fantasma.collide(grupoCerca)
  } else{
    torre.velocityY = 0
    grupoPorta.setVelocityYEach(0)
    grupoCerca.setVelocityYEach(0)
    grupoCercaInvisivel.setVelocityYEach(0)
    fantasma.velocityY = 0
  }
  
    drawSprites()
}
