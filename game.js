/* =========================================================
   GAME.JS
   MOBILE FPS - MAIN GAME ENGINE
========================================================= */

let scene;
let camera;
let renderer;

let player;

let gameStarted = false;
let gameOver = false;

let playerHealth = 100;
let playerLives = 3;

let playerVelocityY = 0;
let playerOnGround = true;

let playerYaw = 0;
let playerPitch = 0;

let gameClock;
let lastTime = 0;

let score = 0;
let kills = 0;


/* =========================================================
   PLAYER SETTINGS
========================================================= */

const PLAYER = {

    height: 1.7,

    walkSpeed: 5,

    sprintSpeed: 8,

    crouchSpeed: 2.5,

    slideSpeed: 11,

    jumpPower: 6,

    gravity: 18,

    radius: 0.35
};


/* =========================================================
   INITIALIZE THREE.JS
========================================================= */

function initializeGame() {

    scene = new THREE.Scene();

    scene.background =
        new THREE.Color(0x78b7e8);


    /* -------------------------
       CAMERA
    ------------------------- */

    camera = new THREE.PerspectiveCamera(

        75,

        window.innerWidth /
        window.innerHeight,

        0.1,

        1000
    );


    camera.position.set(
        0,
        PLAYER.height,
        20
    );


    /* -------------------------
       RENDERER
    ------------------------- */

    renderer =
        new THREE.WebGLRenderer({
            antialias: true
        });


    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );


    renderer.setPixelRatio(
        Math.min(
            window.devicePixelRatio,
            2
        )
    );


    renderer.shadowMap.enabled = true;


    const gameContainer =
        document.getElementById("game");


    if (gameContainer) {

        gameContainer.appendChild(
            renderer.domElement
        );
    }


    /* -------------------------
       LIGHTING
    ------------------------- */

    const ambientLight =
        new THREE.AmbientLight(
            0xffffff,
            0.65
        );

    scene.add(ambientLight);


    const sun =
        new THREE.DirectionalLight(
            0xffffff,
            1
        );

    sun.position.set(
        20,
        30,
        10
    );

    sun.castShadow = true;

    scene.add(sun);


    /* -------------------------
       PLAYER
    ------------------------- */

    player =
        new THREE.Object3D();

    player.position.set(
        0,
        PLAYER.height,
        20
    );

    player.add(camera);

    scene.add(player);


    gameClock =
        new THREE.Clock();


    window.addEventListener(
        "resize",
        resizeGame
    );


    /*
       Start with map 1.
    */

    loadMap(
        getCurrentMap()
    );


    updateHUD();


    requestAnimationFrame(
        gameLoop
    );
}


/* =========================================================
   LOAD MAP
========================================================= */

function loadMap(map) {

    if (!map || !scene) {
        return;
    }


    /*
       Remove old map objects.
    */

    const objectsToRemove = [];


    scene.children.forEach(
        object => {

            if (
                object.userData &&
                object.userData.mapObject
            ) {

                objectsToRemove.push(
                    object
                );
            }
        }
    );


    objectsToRemove.forEach(
        object => {

            scene.remove(object);
        }
    );


    /*
       Sky
    */

    scene.background =
        new THREE.Color(
            map.sky
        );


    /*
       Ground
    */

    const groundMaterial =
        new THREE.MeshStandardMaterial({
            color: map.ground
        });


    const ground =
        new THREE.Mesh(

            new THREE.PlaneGeometry(
                80,
                80
            ),

            groundMaterial
        );


    ground.rotation.x =
        -Math.PI / 2;


    ground.receiveShadow = true;


    ground.userData.mapObject =
        true;


    scene.add(ground);


    /*
       Walls / obstacles
    */

    map.walls.forEach(
        wallData => {

            const material =
                new THREE.MeshStandardMaterial({
                    color: 0x555555
                });


            const wall =
                new THREE.Mesh(

                    new THREE.BoxGeometry(

                        wallData.w,

                        wallData.h,

                        wallData.d

                    ),

                    material
                );


            wall.position.set(

                wallData.x,

                wallData.h / 2,

                wallData.z

            );


            wall.castShadow = true;

            wall.receiveShadow = true;


            wall.userData.mapObject =
                true;


            scene.add(wall);
        }
    );


    /*
       Player spawn
    */

    player.position.set(

        map.playerSpawn.x,

        map.playerSpawn.y,

        map.playerSpawn.z
    );


    playerYaw = 0;

    playerPitch = 0;


    /*
       Spawn enemies
    */

    spawnEnemies(map);
}


/* =========================================================
   START GAME
========================================================= */

function startGame() {

    gameStarted = true;

    gameOver = false;

    playerLives = 3;

    playerHealth = 100;

    score = 0;

    kills = 0;


    resetWeaponAmmo();


    const mainMenu =
        document.getElementById(
            "mainMenu"
        );


    if (mainMenu) {

        mainMenu.classList.add(
            "hidden"
        );
    }


    const gameOverMenu =
        document.getElementById(
            "gameOverMenu"
        );


    if (gameOverMenu) {

        gameOverMenu.classList.add(
            "hidden"
        );
    }


    loadMap(
        getCurrentMap()
    );


    updateHUD();
}


/* =========================================================
   PLAYER DAMAGE
========================================================= */

function damagePlayer(
    amount
) {

    if (!gameStarted) {
        return;
    }


    if (gameOver) {
        return;
    }


    playerHealth -= amount;

    if (typeof playDamageSound === "function") {
    playDamageSound();
    }

    if (playerHealth < 0) {

        playerHealth = 0;
    }


    updateHUD();


    if (playerHealth <= 0) {

        loseLife();
    }
}


/* =========================================================
   LOSE LIFE
========================================================= */

function loseLife() {

    playerLives--;


    if (playerLives <= 0) {

        endGame();

        return;
    }


    /*
       New life.
    */

    playerHealth = 100;


    resetWeaponAmmo();


    const map =
        getCurrentMap();


    player.position.set(

        map.playerSpawn.x,

        map.playerSpawn.y,

        map.playerSpawn.z
    );


    /*
       Re-spawn enemies.
    */

    spawnEnemies(map);


    updateHUD();
}


/* =========================================================
   END GAME
========================================================= */

function endGame() {

    gameOver = true;

    gameStarted = false;


    const gameOverMenu =
        document.getElementById(
            "gameOverMenu"
        );


    if (gameOverMenu) {

        gameOverMenu.classList.remove(
            "hidden"
        );
    }


    const message =
        gameOverMenu ?
        gameOverMenu.querySelector("p") :
        null;


    if (message) {

        message.textContent =
            "Score: " +
            score +
            " | Kills: " +
            kills;
    }
}


/* =========================================================
   ADD KILL SCORE
========================================================= */

function addKillScore() {

    kills++;

    score += 100;

    updateHUD();
}


/* =========================================================
   PLAYER JUMP
========================================================= */

function playerJump() {

    if (!gameStarted) {
        return;
    }


    if (!playerOnGround) {
        return;
    }


    if (
        controls &&
        controls.crouching
    ) {

        return;
    }


    playerVelocityY =
        PLAYER.jumpPower;

    playerOnGround =
        false;
}


/* =========================================================
   CROUCH
========================================================= */

function setPlayerCrouch(
    crouching
) {

    if (!player) {
        return;
    }


    if (crouching) {

        player.position.y =
            PLAYER.height *
            0.65;

    } else {

        player.position.y =
            PLAYER.height;
    }
}


/* =========================================================
   SLIDE
========================================================= */

function setPlayerSlide(
    sliding
) {

    if (!player) {
        return;
    }


    if (sliding) {

        player.position.y =
            PLAYER.height *
            0.55;

    } else {

        player.position.y =
            PLAYER.height;
    }
}


/* =========================================================
   CAMERA ROTATION
========================================================= */

function rotatePlayerCamera(
    deltaX,
    deltaY
) {

    if (!gameStarted) {
        return;
    }


    playerYaw -=
        deltaX *
        0.003;


    playerPitch -=
        deltaY *
        0.003;


    const maxPitch =
        Math.PI / 2.2;


    playerPitch =
        Math.max(

            -maxPitch,

            Math.min(
                maxPitch,
                playerPitch
            )
        );


    player.rotation.y =
        playerYaw;


    camera.rotation.x =
        playerPitch;
}


/* =========================================================
   MOVEMENT
========================================================= */

function updatePlayerMovement(
    deltaTime
) {

    if (!gameStarted) {
        return;
    }


    const input =
        getMovementInput();


    let speed =
        PLAYER.walkSpeed;


    if (input.sprinting) {

        speed =
            PLAYER.sprintSpeed;
    }


    if (input.crouching) {

        speed =
            PLAYER.crouchSpeed;
    }


    if (input.sliding) {

        speed =
            PLAYER.slideSpeed;
    }


    const movement =
        new THREE.Vector3();


    /*
       Forward/backward
    */

    const forward =
        new THREE.Vector3(
            0,
            0,
            -1
        );


    forward.applyQuaternion(
        player.quaternion
    );


    /*
       Left/right
    */

    const right =
        new THREE.Vector3(
            1,
            0,
            0
        );


    right.applyQuaternion(
        player.quaternion
    );


    movement.addScaledVector(

        forward,

        input.forward *
        speed *
        deltaTime

    );


    movement.addScaledVector(

        right,

        input.strafe *
        speed *
        deltaTime

    );


    /*
       Sliding gets extra forward movement.
    */

    if (
        input.sliding &&
        input.forward > 0
    ) {

        movement.addScaledVector(

            forward,

            3 *
            deltaTime
        );
    }


    player.position.add(
        movement
    );


    /*
       Gravity
    */

    playerVelocityY -=
        PLAYER.gravity *
        deltaTime;


    player.position.y +=
        playerVelocityY *
        deltaTime;


    /*
       Ground
    */

    const standingHeight =
        input.sliding ||
        input.crouching
            ? PLAYER.height * 0.55
            : PLAYER.height;


    if (
        player.position.y <=
        standingHeight
    ) {

        player.position.y =
            standingHeight;

        playerVelocityY = 0;

        playerOnGround = true;

    } else {

        playerOnGround = false;
    }


    /*
       Map boundaries
    */

    player.position.x =
        THREE.MathUtils.clamp(

            player.position.x,

            -38,

            38
        );


    player.position.z =
        THREE.MathUtils.clamp(

            player.position.z,

            -38,

            38
        );
}


/* =========================================================
   WEAPON RAYCAST
========================================================= */

function performWeaponRaycast(
    weapon
) {

    if (!camera || !scene) {
        return;
    }


    const raycaster =
        new THREE.Raycaster();


    raycaster.setFromCamera(

        new THREE.Vector2(
            0,
            0
        ),

        camera
    );


    const hitObjects =
        raycaster.intersectObjects(
            scene.children,
            true
        );


    for (
        let i = 0;
        i < hitObjects.length;
        i++
    ) {

        const object =
            hitObjects[i].object;


        let enemy =
            object;


        /*
           Find the enemy parent.
        */

        while (
            enemy &&
            !enemy.userData.isEnemy
        ) {

            enemy =
                enemy.parent;
        }


        if (
            enemy &&
            enemy.userData.isEnemy
        ) {

            damageEnemy(

                enemy,

                weapon.damage

            );

            break;
        }
    }
}


/* =========================================================
   HUD
========================================================= */

function updateHUD() {

    const health =
        document.getElementById(
            "health"
        );


    const lives =
        document.getElementById(
            "lives"
        );


    if (health) {

        health.textContent =
            "❤️ " +
            playerHealth;
    }


    if (lives) {

        lives.textContent =
            "Lives: " +
            playerLives;
    }


    updateWeaponHUD();
}


/* =========================================================
   PLAY BUTTON
========================================================= */

const playButton =
    document.getElementById(
        "playButton"
    );


if (playButton) {

    playButton.addEventListener(
        "click",
        startGame
    );
}


/* =========================================================
   RESTART BUTTON
========================================================= */

const restartButton =
    document.getElementById(
        "restartButton"
    );


if (restartButton) {

    restartButton.addEventListener(
        "click",
        startGame
    );
}


/* =========================================================
   GAME OVER MENU BUTTON
========================================================= */

const gameOverMenuButton =
    document.getElementById(
        "gameOverMenuButton"
    );


if (gameOverMenuButton) {

    gameOverMenuButton.addEventListener(
        "click",
        function() {

            const gameOverMenu =
                document.getElementById(
                    "gameOverMenu"
                );


            if (gameOverMenu) {

                gameOverMenu.classList.add(
                    "hidden"
                );
            }


            const mainMenu =
                document.getElementById(
                    "mainMenu"
                );


            if (mainMenu) {

                mainMenu.classList.remove(
                    "hidden"
                );
            }
        }
    );
}


/* =========================================================
   SHOOT HOLD FOR AUTOMATIC WEAPONS
========================================================= */

let shootingHeld = false;


if (shootButton) {

    shootButton.addEventListener(
        "touchstart",
        function(event) {

            event.preventDefault();

            shootingHeld = true;

            fireWeapon();

        },
        { passive: false }
    );


    shootButton.addEventListener(
        "touchend",
        function(event) {

            event.preventDefault();

            shootingHeld = false;

        },
        { passive: false }
    );


    shootButton.addEventListener(
        "touchcancel",
        function() {

            shootingHeld = false;

        }
    );
}


/* =========================================================
   AUTOMATIC FIRE
========================================================= */

function updateWeaponFire() {

    if (!shootingHeld) {
        return;
    }


    const weapon =
        getCurrentWeapon();


    if (weapon.automatic) {

        fireWeapon();
    }
}


/* =========================================================
   GAME LOOP
========================================================= */

function gameLoop(time) {

    requestAnimationFrame(
        gameLoop
    );


    if (!lastTime) {
        lastTime = time;
    }


    let deltaTime =
        (time - lastTime) /
        1000;


    lastTime = time;


    /*
       Prevent huge jumps after
       the browser pauses.
    */

    deltaTime =
        Math.min(
            deltaTime,
            0.05
        );


    if (gameStarted) {

        updatePlayerMovement(
            deltaTime
        );


        updateEnemies(
            deltaTime
        );


        updateWeaponFire();
    }


    if (renderer && scene && camera) {

        renderer.render(
            scene,
            camera
        );
    }
}


/* =========================================================
   RESIZE
========================================================= */

function resizeGame() {

    if (!camera || !renderer) {
        return;
    }


    camera.aspect =
        window.innerWidth /
        window.innerHeight;


    camera.updateProjectionMatrix();


    renderer.setSize(

        window.innerWidth,

        window.innerHeight
    );
}


/* =========================================================
   INITIALIZE
========================================================= */

window.addEventListener(
    "load",
    function() {

        initializeGame();

    }
);
