/* =========================================================
   ENEMIES.JS
   ENEMY AVATAR + AI SYSTEM
========================================================= */

let enemies = [];

const ENEMY_SETTINGS = {
    maxHealth: 100,
    movementSpeed: 1.5,
    detectionDistance: 35,
    attackDistance: 28,
    attackDamage: 5,
    attackCooldown: 1200
};


/* =========================================================
   CREATE ENEMY AVATAR
========================================================= */

function createEnemyAvatar(x, z) {

    const enemy = new THREE.Group();

    enemy.userData.isEnemy = true;
    enemy.userData.health =
        ENEMY_SETTINGS.maxHealth;

    enemy.userData.lastAttack = 0;

    /* -------------------------
       BODY
    ------------------------- */

    const bodyMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x263f68
        });

    const body = new THREE.Mesh(
        new THREE.BoxGeometry(
            0.8,
            1.25,
            0.5
        ),
        bodyMaterial
    );

    body.position.y = 1.15;

    enemy.add(body);


    /* -------------------------
       HEAD
    ------------------------- */

    const skinMaterial =
        new THREE.MeshStandardMaterial({
            color: 0xffc49b
        });

    const head = new THREE.Mesh(
        new THREE.SphereGeometry(
            0.36,
            20,
            20
        ),
        skinMaterial
    );

    head.position.y = 2.05;

    enemy.add(head);


    /* -------------------------
       HAIR
    ------------------------- */

    const hairMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x151515
        });

    const hair = new THREE.Mesh(
        new THREE.SphereGeometry(
            0.38,
            20,
            10,
            0,
            Math.PI * 2,
            0,
            Math.PI / 2
        ),
        hairMaterial
    );

    hair.position.y = 2.18;

    enemy.add(hair);


    /* -------------------------
       EYES
    ------------------------- */

    const eyeMaterial =
        new THREE.MeshBasicMaterial({
            color: 0x111111
        });

    const leftEye = new THREE.Mesh(
        new THREE.SphereGeometry(
            0.045,
            8,
            8
        ),
        eyeMaterial
    );

    const rightEye = leftEye.clone();

    leftEye.position.set(
        -0.12,
        2.08,
        -0.32
    );

    rightEye.position.set(
        0.12,
        2.08,
        -0.32
    );

    enemy.add(leftEye);
    enemy.add(rightEye);


    /* -------------------------
       MOUTH
    ------------------------- */

    const mouthMaterial =
        new THREE.MeshBasicMaterial({
            color: 0x661111
        });

    const mouth = new THREE.Mesh(
        new THREE.BoxGeometry(
            0.14,
            0.035,
            0.025
        ),
        mouthMaterial
    );

    mouth.position.set(
        0,
        1.94,
        -0.34
    );

    enemy.add(mouth);


    /* -------------------------
       LEFT ARM
    ------------------------- */

    const armMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x263f68
        });

    const leftArm = new THREE.Mesh(
        new THREE.BoxGeometry(
            0.22,
            1.05,
            0.22
        ),
        armMaterial
    );

    leftArm.position.set(
        -0.58,
        1.15,
        0
    );

    enemy.add(leftArm);


    /* -------------------------
       RIGHT ARM
    ------------------------- */

    const rightArm = leftArm.clone();

    rightArm.position.set(
        0.58,
        1.15,
        0
    );

    enemy.add(rightArm);


    /* -------------------------
       LEGS
    ------------------------- */

    const legMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x171717
        });

    const leftLeg = new THREE.Mesh(
        new THREE.BoxGeometry(
            0.27,
            1.05,
            0.3
        ),
        legMaterial
    );

    leftLeg.position.set(
        -0.22,
        0.45,
        0
    );

    enemy.add(leftLeg);


    const rightLeg = leftLeg.clone();

    rightLeg.position.set(
        0.22,
        0.45,
        0
    );

    enemy.add(rightLeg);


    /* -------------------------
       WEAPON
    ------------------------- */

    const weaponMaterial =
        new THREE.MeshStandardMaterial({
            color: 0x111111
        });

    const weapon = new THREE.Mesh(
        new THREE.BoxGeometry(
            0.12,
            0.12,
            0.8
        ),
        weaponMaterial
    );

    weapon.rotation.x =
        Math.PI / 2;

    weapon.position.set(
        0,
        1.2,
        -0.5
    );

    enemy.add(weapon);


    /* -------------------------
       POSITION
    ------------------------- */

    enemy.position.set(
        x,
        0,
        z
    );


    return enemy;
}


/* =========================================================
   SPAWN ENEMIES
========================================================= */

function spawnEnemies(map) {

    /*
       Remove old enemies.
    */

    enemies.forEach(enemy => {

        if (
            enemy.parent
        ) {
            enemy.parent.remove(enemy);
        }

    });

    enemies = [];


    if (
        !map ||
        !map.enemySpawns
    ) {
        return;
    }


    map.enemySpawns.forEach(
        spawn => {

            const enemy =
                createEnemyAvatar(
                    spawn.x,
                    spawn.z
                );

            /*
               Store original spawn.
            */

            enemy.userData.spawnX =
                spawn.x;

            enemy.userData.spawnZ =
                spawn.z;

            enemies.push(enemy);

            /*
               Add to scene.
            */

            if (
                typeof scene !==
                "undefined"
            ) {
                scene.add(enemy);
            }
        }
    );
}


/* =========================================================
   ENEMY DISTANCE
========================================================= */

function getEnemyDistance(enemy) {

    if (
        typeof player ===
        "undefined"
    ) {
        return Infinity;
    }

    return enemy.position.distanceTo(
        player.position
    );
}


/* =========================================================
   ENEMY LOOK AT PLAYER
========================================================= */

function enemyLookAtPlayer(enemy) {

    if (
        typeof player ===
        "undefined"
    ) {
        return;
    }

    enemy.lookAt(
        player.position.x,
        enemy.position.y + 1,
        player.position.z
    );
}


/* =========================================================
   ENEMY MOVEMENT
========================================================= */

function updateEnemyMovement(
    enemy,
    deltaTime
) {

    if (
        typeof player ===
        "undefined"
    ) {
        return;
    }

    const distance =
        getEnemyDistance(enemy);

    /*
       Don't chase from too far away.
    */

    if (
        distance >
        ENEMY_SETTINGS.detectionDistance
    ) {
        return;
    }

    /*
       Stop when close enough to attack.
    */

    if (
        distance <=
        ENEMY_SETTINGS.attackDistance
    ) {
        return;
    }


    const direction =
        new THREE.Vector3();

    direction.subVectors(
        player.position,
        enemy.position
    );

    direction.y = 0;

    if (
        direction.lengthSq() === 0
    ) {
        return;
    }

    direction.normalize();


    enemy.position.addScaledVector(
        direction,
        ENEMY_SETTINGS.movementSpeed *
        deltaTime
    );

    enemyLookAtPlayer(enemy);
}


/* =========================================================
   ENEMY ATTACK
========================================================= */

function enemyAttack(enemy) {

    if (
        typeof player ===
        "undefined"
    ) {
        return;
    }

    const now = Date.now();

    if (
        now -
        enemy.userData.lastAttack <
        ENEMY_SETTINGS.attackCooldown
    ) {
        return;
    }

    enemy.userData.lastAttack = now;


    /*
       Enemy has line-of-sight
       simplified for this prototype.
    */

    if (
        typeof damagePlayer ===
        "function"
    ) {

        damagePlayer(
            ENEMY_SETTINGS.attackDamage
        );
    }
}


/* =========================================================
   UPDATE ENEMY AI
========================================================= */

function updateEnemies(
    deltaTime
) {

    enemies.forEach(enemy => {

        if (
            !enemy ||
            enemy.userData.health <= 0
        ) {
            return;
        }

        const distance =
            getEnemyDistance(enemy);


        if (
            distance <=
            ENEMY_SETTINGS.attackDistance
        ) {

            enemyLookAtPlayer(enemy);

            enemyAttack(enemy);

        } else {

            updateEnemyMovement(
                enemy,
                deltaTime
            );
        }

    });
}


/* =========================================================
   DAMAGE ENEMY
========================================================= */

function damageEnemy(
    enemy,
    damage
) {

    if (!enemy) return;

    if (
        !enemy.userData.isEnemy
    ) {
        return;
    }


    enemy.userData.health -= damage;

    if (enemy.userData.health > 0) {

    if (typeof playEnemyHitSound === "function") {
        playEnemyHitSound();
    }

} else {

    if (typeof playEnemyDeathSound === "function") {
        playEnemyDeathSound();
    }
    }
    /*
       Hit flash
    */

    enemy.traverse(object => {

        if (
            object.isMesh &&
            object.material &&
            object.material.emissive
        ) {

            object.material.emissive
                .setHex(0x330000);
        }

    });


    setTimeout(() => {

        enemy.traverse(object => {

            if (
                object.isMesh &&
                object.material &&
                object.material.emissive
            ) {

                object.material.emissive
                    .setHex(0x000000);
            }

        });

    }, 80);


    /*
       Enemy death
    */

    if (
        enemy.userData.health <= 0
    ) {

        killEnemy(enemy);
    }
}


/* =========================================================
   KILL ENEMY
========================================================= */

function killEnemy(enemy) {

    enemy.userData.health = 0;

    const index =
        enemies.indexOf(enemy);

    if (index !== -1) {

        enemies.splice(
            index,
            1
        );
    }


    if (enemy.parent) {

        enemy.parent.remove(
            enemy
        );
    }


    /*
       Future:
       - death animation
       - score
       - kill sound
       - blood/hit effect
    */

    if (
        typeof addKillScore ===
        "function"
    ) {

        addKillScore();
    }
}


/* =========================================================
   INITIALIZE ENEMIES
========================================================= */

function initializeEnemies() {

    if (
        typeof getCurrentMap !==
        "function"
    ) {
        return;
    }

    const map =
        getCurrentMap();

    spawnEnemies(map);
          }
