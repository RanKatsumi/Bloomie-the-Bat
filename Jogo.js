/* --Informações sobre o código:
	*Jogo produzido por: Wendell Paulino da Silva
	*Projeto da disciplina Lógica de Programação, lecionado por Rumennige Dantas e Aquiles.
	
	* Atualizações:
		- Versão 0.1: Início do projeto - 
			* Implementação de objeto, jogador e controles básicos.
		
		- versão 0.1.5:  Proposta de plataforma - 
			* Mecânica de pulo implementada: Ao pressionar espaço, o jogador pula até uma certa altura e desce ao chão.
			* Mecânica de corrida implementada: Ao pressionar Shift, o jogador movimenta-se mais rápido
			* Controles reduzidos(Jogador preso ao eixo X);
		
		- Versão 0.2: Mudança da proposta inicial, mudando algumas mecânicas e adicionando novas - 
			* Mecânica de pulo retirada 
			* Mecânica de corrida alterada: Agora, ao pressionar o botão, o jogador movimenta-se rapidamente tanto no eixo X como no Y
			* Controles aprimorados e acrescentados: Agora pode-se movimentar para cima e para baixo 
			* Adicionada mecânica de surgimento para o inimigo
			* Adicionada mecânica de tiro ao jogador: Ao pressionar espaço, um projétil é lançado
			* Adicionado colisão entre jogador e inimigo
			* Informações na tela adicionadas
		
		- Versão 0.5: HUD inteligente, vetores de inimigos e bônus - 
			* Adicionado um vetor de inimigos, tornando-os mais númerosos
			* Adicionado a informação "Pontos" assim como sua mecânica no HUD
			* Adicionado alteração de valor de fase e aumento de dificuldade(os inimigos se movem mais rápido quanto mais alto o nível)
			* Background adicionado e alterado
			* Mecânica de corrida alterada: Agora ela é ativada quando o jogador entra em colisão com o bônus
			* Bugs corrigidos: 
				- Inimigos morrendo do nada e consequentemente pontos subindo
			* Bugs conhecidos e ainda não solucionados: 
				- Pulo do nível um para o três (não encontrei solução lógica para esse problema, e as booleanas não deveriam permitir isto)
		
		- Versão 1.0(atual): Sprites, animações, menus, história, e muito mais -
			* Sprites feitos e implementados nos diversos objetos do jogo
			* Background animado e atualizado
			* Menu, tela de introdução, tela de game over e tela final adicionados
			* Sons adicionados, porém, por problemas de performance, foram retirados do código 
			
	* Créditos:
		- Programação e arte por Wendell Paulino
		- Parallax Mountain Pack by ansimuz
			link: https://ansimuz.itch.io/mountain-dusk-parallax-background
		- Músicas por Heatley Brothers
			link: https://www.youtube.com/user/HeatleyBros
		- Original Character Glub gentilmente oferecido por Yukinare
		   
		\\   --Espaço para próximas atualizações--   //
				
 */
var sc1=true , sc2=false, sc3=false, sc4=false, sc5=false, holder = 0;					//Booleanas de troca de telas (Obs.: Holder)
var bloomie = [], echo, bicon, ghost, wing, bmenu, bintro, bgameover, bending;			//Variáveis das imagens
var num_sprite = 2, sprite = 0, animeSpeed = 10, time = 0, path = "image/bloomie";		//Variáveis da animação
var echo_sound, up_sound, wing_sound, ghost_sound, time_sound, music1, music2;			//Variáveis de efeitos sonoros
var posX, posY, rJ = 40, shoX, shoY, shot=false; 										//Variáveis do jogador
var mount, mount_2, trees, trees_2, bgmoon, mX, mY, m2X, m2Y, tX, tY, t2X, t2Y;			//Variáveis do background
var sprX, sprY, rS = 30, upX, upY, up=false, sprint=false, Sbonus=false, Ubonus=false;  //Variáveis dos bônus
var objX=[], objY=[], speed, rI = 40; 													//Variáveis do objeto
var life = 3, level = 1, points = 0, aux, hit=false, levelUp=true, lifeUp=false; 		//Variáveis do HUD
function preload(){
	bgmoon = loadImage("image/parallax_mountain_pack/layers/bgmoon.png");
	mount = loadImage("image/parallax_mountain_pack/layers/mount.png");
	mount_2 = loadImage("image/parallax_mountain_pack/layers/mount_2.png");
	trees = loadImage("image/parallax_mountain_pack/layers/trees.png");
	trees_2 = loadImage("image/parallax_mountain_pack/layers/trees_2.png");
	for(i=0; i<num_sprite; i++){
		bloomie[i] = loadImage(path+i+".png");
		}
	echo = loadImage("image/Echo_sprite.png");
	ghost = loadImage("image/Ghost_sprite.png");
	bicon = loadImage("image/Bloomie_icon.png");
	wing = loadImage("image/Wing_sprite.png");
	bmenu = loadImage("image/bloomie_thebat_title.png");
	bintro = loadImage("image/bloomie_intro_screen.png");
	bgameover = loadImage("image/bloomie_gameover.png");
	bending = loadImage("image/bloomie_final_screen.png");
	echo_sound = loadSound("sound/echo_sound.wav");
	up_sound = loadSound("sound/1_up_sound.wav");
	wing_sound = loadSound("sound/wing_sound.wav");
	ghost_sound = loadSound("sound/ghost_sound.wav");
	time_sound = loadSound("sound/time_sound.wav");
	music1 = loadSound("sound/Press Start! By HeatleyBros.mp3");
	music2 = loadSound("sound/Wonderful Life! By HeatleyBros.mp3");
	}
	
function player(){	
	time++
	noStroke();
	noFill();
	ellipse(posX, posY, rJ*2, rJ*2);
	imageMode(CENTER);
	image(bloomie[sprite], posX, posY, 159, 126);
	if(time%animeSpeed===0){
		sprite++
		if(sprite===num_sprite){
			sprite=0;
			}
		}
	}
		
function setup(){
	createCanvas(1024, 630);
	aux=1500;
	posX=50;
	posY=315;
	sprX=random(3000, 5000);
	sprY=random(10, 630); 
	upX=random(3000, 5000);
	upY=random(10, 630);
	mX=1024;
	mY=300;
	m2X=1024;
	m2Y=300;
	tX=1024;
	tY=330;
	t2X=1024;
	t2Y=330;
	for(i=0;i<10;i++){
		objX[i] = random(2000, 6000);
		objY[i] = random(10, 600);
		}
	speed=4; 
	frameRate(60);	
	}
	
function draw(){
	//Screen test
		if(sc1){
			setMenu();
			}
		else if(sc2){
			setIntro();
			}
		else if(sc3){
			setPlay();
			}
		else if(sc4){
			setOver();
			}
		else if(sc5){
			setEnd();
			}
	//Random test
		if(!sprint&&!Sbonus){
			if(round(Math.random()*100)<35){
				Sbonus = true;
				}
			}
		if(!up&&!Ubonus){
			if(round(Math.random()*100)<10){
				Ubonus = true;
				}
			}
	//orientation
		if(posX>=1024){
			posX=1024;
			}
		if(posX<=0){
			posX=0;
			}
		if(posY>=630){
			posY=630;
			}
		if(posY<=0){
			posY=0;
			}
	//colision
		for(i=0; i<10; i++){
			var d = dist(posX, posY, objX[i], objY[i]);
			if(d < rI+rJ){
				if(hit == false){
					hit = true
					}
				if(hit == true){
					objX[i] = random(3000, 5000);
					objY[i] = random(10, 600);
					posX = 50;
					posY = 315;
					life = life-1;
					}
				}
			else {
				hit = false;
				} 
			if(dist(objX[i], objY[i], shoX, shoY) < rI+7.5){
				shot = false;
				points +=100;
				//ghost_sound.play();
				objX[i] = random(3000, 5000);
				objY[i] = random(10, 600);			
				}
			if(dist(posX, posY, sprX, sprY) < rJ+rS){
				sprint = true;
				Sbonus = false;
				//wing_sound.play();
				}
			if(dist(posX, posY, upX, upY) < rJ+rS){
				lifeUp = true;
				Ubonus = false;
				//up_sound.play();
				}
			}

	//Screen 1 
		function setMenu(){
			clear();
			imageMode(CORNER);
			image(bmenu, 0, 0, 1024, 630);
			if(keyIsPressed&&keyCode === ENTER){
				time_sound.play();
				sc1 = false;
				sc2 = true;
				}
			}
	//Screen 2 
		function setIntro(){
			clear();
			holder++
			imageMode(CORNER);
			image(bintro, 0, 0, 1024, 630);
			if(holder>5){
				if(keyIsPressed&&keyCode === ENTER){
					time_sound.play();
					sc2 = false;
					sc3 = true;
					}
				}
			}
	//Screen 3
		function setPlay(){
		clear();
		//controls
			if(keyIsDown(RIGHT_ARROW)){
				posX+=6;
				}
			if(keyIsDown(LEFT_ARROW)){
				posX-=6;
				}
			if(keyIsDown(UP_ARROW)){
				posY-=6;
				}
			if(keyIsDown(DOWN_ARROW)){
				posY+=6;
				}
		//sprint
			if(sprint){
				if(keyIsDown(68)){
					posX+=5;
					}
				if(keyIsDown(65)){
					posX-=5;
					}
				if(keyIsDown(87)){
					posY-=5;
					}
				if(keyIsDown(83)){
					posY+=5;
					}
				setTimeout(function(){sprint = false; Sbonus = true}, 10000);
				}
		//echo shot
			if(keyIsDown(32)&&!shot){
				shot = true;
				shoX = posX;
				shoY = posY;
				}
			if(shot){
				shoX+=30;
				echo_sound.play;
				}
			if(shoX>width){
				shoX = -height;
				shoY = -width;
				shot = false;
				}
		//Ghost movement and orientation
			for(i=0; i<10; i++){
				if(objX[i]>= -10){	
					objX[i] -= speed;
					}
				else{
					objX[i]=random(3000, 5000);
					objY[i]=random(10, 600);
					}
				}
		//background
			imageMode(CORNER);
			image(bgmoon, 0, 0, 1024, 630);
		//HUD
			noStroke();
			fill(255);
			textFont("Verdana");
			textSize(32);
			text("Life: "+life, 10, 30);
			if(level<10){
				text("Level: "+level, 880, 30);
			}
			else{
				text("Level: FINAL STAGE", 780, 30);
				}
			text("Points: "+points, 400, 30);
			if(points%1500==0 && points!=0 && levelUp==true){
				levelUp = false;
				level += 1;
				speed = speed*1.2;
				}
			if(aux==points){
				aux = aux+1500;
				levelUp = true;
				}
			if(lifeUp){
				lifeUp = false
				life += 1;
				}
			//Game Over
				if(life<0&&sc3){
					sc3=false;
					sc4=true;
					}
			//Final screen
				if(level>8){
					sc3=false;
					sc5=true;
					}
		//parallax mountain bg
			imageMode(CENTER);
			image(mount, mX, mY, 1024, 600);
			image(mount_2, m2X, m2Y, 2048, 600);
			image(trees, tX, tY, 2048, 600);
			//mount animation	
				if(mX > -50){
					mX -= 0.5; 
					}
				else{
					mX = 1200;
					}
			//mount_2 animation
				if(m2X > -10){
					m2X -= 2; 
					}
				else{
					m2X = 1012;
					}
			//tree animation
				if(tX > -10){
					tX -= 8; 
					}
				else{
					tX = 1000;
					}
			//tree_2 animation
				if(t2X > -10){
					t2X -= 15; 
					}
				else{
					t2X = 980;
					}
		//shot draw
			if(shot){
				image(echo, shoX, shoY, 30, 30);
				}
		//sprint bonus
			if(!Sbonus){
				sprX=random(3000, 5000);
				sprY=random(10, 620);
					}
			else if(Sbonus&&sprX>=-10){
				sprX -= 3;
				noStroke();
				noFill();
				ellipse(sprX, sprY, rS*2, rS*2);
				image(wing, sprX, sprY, rS+20, rS+20);
				if(sprX<-10){
					sprX=random(3000, 5000);
					sprY=random(10,600);
					}
				}
			if(!Ubonus){
				upX=random(3000, 5000);
				upY=random(10,620);
				}
			else if(Ubonus&&upX>=-10){
				upX -=3;
				noFill();
				noStroke();
				ellipse(upX, upY, rS*2, rS*2);
				image(bicon, upX, upY, rS+20, rS+20);
				if(upX<-10){
					sprX=random(3000, 5000);
					sprY=random(10,600);
					}
				}
		//bloomie
			player();
		//ghosts
			for(i=0; i<10; i++){
				noStroke();
				noFill;
				ellipse(objX[i], objY[i], rI*2, rI*2);
				image(ghost, objX[i], objY[i], rI*2, rI*2);
				}
		//Front trees
			image(trees_2, t2X, t2Y, 2048, 600);
			}
	//Screen 4
		function setOver(){
			clear()
			imageMode(CORNER);
			image(bgameover, 0, 0, 1024, 630);		    
			life = 3; 
			points = 0; 
			aux = 1500;
			level = 1; 
			speed = 4; 
			if(keyIsPressed&&keyCode === ENTER){
				sc4=false;
				sc3=true;
				}
			}
	//Screen 5
		function setEnd(){
			clear()
			music2.loop();
			imageMode(CORNER);
			image(bending, 0, 0, 1024, 630);
			}
		}
