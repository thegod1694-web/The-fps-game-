/* =========================================================
   WEAPONS.JS
   9-GUN WEAPON SYSTEM
========================================================= */

const WEAPONS = [
    {
        id: "pistol",
        name: "Pistol",
        icon: "🔫",
        damage: 25,
        fireRate: 400,
        magazine: 12,
        ammo: 12,
        reloadTime: 900,
        automatic: false
    },

    {
        id: "deagle",
        name: "Desert Eagle",
        icon: "🔫",
        damage: 55,
        fireRate: 650,
        magazine: 7,
        ammo: 7,
        reloadTime: 1100,
        automatic: false
    },

    {
        id: "smg",
        name: "SMG",
        icon: "🔫",
        damage: 14,
        fireRate: 90,
        magazine: 35,
        ammo: 35,
        reloadTime: 1000,
        automatic: true
    },

    {
        id: "rifle",
        name: "Assault Rifle",
        icon: "🔫",
        damage: 22,
        fireRate: 130,
        magazine: 30,
        ammo: 30,
        reloadTime: 1200,
        automatic: true
    },

    {
        id: "ak",
        name: "AK Rifle",
        icon: "🔫",
        damage: 30,
        fireRate: 160,
        magazine: 30,
        ammo: 30,
        reloadTime: 1300,
        automatic: true
    },

    {
        id: "shotgun",
        name: "Shotgun",
        icon: "🔫",
        damage: 75,
        fireRate: 800,
        magazine: 6,
        ammo: 6,
        reloadTime: 1500,
        automatic: false
    },

    {
        id: "sniper",
        name: "Sniper",
        icon: "🎯",
        damage: 100,
        fireRate: 1200,
        magazine: 5,
        ammo: 5,
        reloadTime: 1700,
        automatic: false
    },

    {
        id: "lmg",
        name: "LMG",
        icon: "🔫",
        damage: 18,
        fireRate: 80,
        magazine: 60,
        ammo: 60,
        reloadTime: 1900,
        automatic: true
    },

    {
        id: "plasma",
        name: "Plasma Rifle",
        icon: "⚡",
        damage: 35,
        fireRate: 180,
        magazine: 40,
        ammo: 40,
        reloadTime: 1500,
        automatic: true
    }
];


/* =========================================================
   CURRENT WEAPON
========================================================= */

let currentWeaponIndex = 0;

let weaponReloading = false;

let lastWeaponShot = 0;

let weaponSwitchLocked = false;


/* =========================================================
   GET CURRENT WEAPON
========================================================= */

function getCurrentWeapon() {

    return WEAPONS[currentWeaponIndex];
}


/* =========================================================
   UPDATE WEAPON HUD
========================================================= */

function updateWeaponHUD() {

    const weapon = getCurrentWeapon();

    const weaponElement =
        document.getElementById("weapon");

    const ammoElement =
        document.getElementById("ammo");

    if (weaponElement) {

        weaponElement.textContent =
            weapon.icon + " " + weapon.name;
    }

    if (ammoElement) {

        ammoElement.textContent =
            weapon.ammo +
            " / " +
            weapon.magazine;
    }
}


/* =========================================================
   SWITCH TO NEXT WEAPON
========================================================= */

function switchWeapon() {

    if (weaponReloading) return;

    if (weaponSwitchLocked) return;

    weaponSwitchLocked = true;

    currentWeaponIndex++;

    if (
        currentWeaponIndex >=
        WEAPONS.length
    ) {

        currentWeaponIndex = 0;
    }

    updateWeaponHUD();

    /*
       Small delay prevents accidental
       multiple switches from one touch.
    */

    setTimeout(() => {

        weaponSwitchLocked = false;

    }, 200);
}


/* =========================================================
   SWITCH TO SPECIFIC WEAPON
========================================================= */

function selectWeapon(index) {

    if (weaponReloading) return;

    if (
        index < 0 ||
        index >= WEAPONS.length
    ) {
        return;
    }

    currentWeaponIndex = index;

    updateWeaponHUD();
}


/* =========================================================
   SHOOT
========================================================= */

function fireWeapon() {

    if (
        typeof gameStarted !== "undefined" &&
        !gameStarted
    ) {
        return;
    }

    if (weaponReloading) return;

    const weapon = getCurrentWeapon();

    const now = Date.now();

    /*
       Fire-rate protection
    */

    if (
        now - lastWeaponShot <
        weapon.fireRate
    ) {
        return;
    }

    /*
       Empty magazine
    */

    if (weapon.ammo <= 0) {

        reloadWeapon();

        return;
    }

    lastWeaponShot = now;

    weapon.ammo--;

    updateWeaponHUD();


    /*
       The actual hit detection will be
       connected in game.js.
    */

    if (
        typeof performWeaponRaycast ===
        "function"
    ) {

        performWeaponRaycast(
            weapon
        );
    }


    /*
       Sound will be connected later.
    */

    if (
        typeof playGunSound ===
        "function"
    ) {

        playGunSound(
            weapon.id
        );
    }
}


/* =========================================================
   RELOAD
========================================================= */

function reloadWeapon() {

    if (weaponReloading) return;

    if (typeof playReloadSound === "function") {
        playReloadSound();
    }

    const weapon = getCurrentWeapon();

    /*
       Already full
    */

    if (
        weapon.ammo >=
        weapon.magazine
    ) {
        return;
    }

    weaponReloading = true;


    /*
       Wait for reload time
    */

    setTimeout(() => {

        weapon.ammo =
            weapon.magazine;

        weaponReloading = false;

        updateWeaponHUD();

    }, weapon.reloadTime);
}


/* =========================================================
   RESET ALL WEAPON AMMO
========================================================= */

function resetWeaponAmmo() {

    WEAPONS.forEach(
        weapon => {

            weapon.ammo =
                weapon.magazine;
        }
    );

    updateWeaponHUD();
}


/* =========================================================
   WEAPON BUTTONS
========================================================= */

const switchWeaponButton =
    document.getElementById(
        "switchWeaponButton"
    );

if (switchWeaponButton) {

    switchWeaponButton.addEventListener(
        "touchstart",
        function(event) {

            event.preventDefault();

            switchWeapon();
        }
    );
}


const reloadButton =
    document.getElementById(
        "reloadButton"
    );

if (reloadButton) {

    reloadButton.addEventListener(
        "touchstart",
        function(event) {

            event.preventDefault();

            reloadWeapon();
        }
    );
}


const shootButton =
    document.getElementById(
        "shootButton"
    );

if (shootButton) {

    /*
       Single-shot weapons:
       one shot per touch.
    */

    shootButton.addEventListener(
        "touchstart",
        function(event) {

            event.preventDefault();

            fireWeapon();
        }
    );
}


/* =========================================================
   INITIALIZE
========================================================= */

updateWeaponHUD();
