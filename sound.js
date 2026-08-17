/* =========================================================
   SOUND.JS
   MOBILE FPS SOUND SYSTEM
========================================================= */

let audioContext = null;
let masterGain = null;


/* =========================================================
   START AUDIO
========================================================= */

function initializeAudio() {

    if (audioContext) return;

    try {

        audioContext =
            new (
                window.AudioContext ||
                window.webkitAudioContext
            )();

        masterGain =
            audioContext.createGain();

        masterGain.gain.value =
            typeof masterVolume !== "undefined"
                ? masterVolume
                : 1;

        masterGain.connect(
            audioContext.destination
        );

    } catch (error) {

        console.log(
            "Audio is not supported."
        );
    }
}


/* =========================================================
   UNLOCK AUDIO ON PHONE
========================================================= */

document.addEventListener(
    "touchstart",
    function() {

        initializeAudio();

        if (
            audioContext &&
            audioContext.state === "suspended"
        ) {

            audioContext.resume();
        }

    },
    {
        once: true
    }
);


/* =========================================================
   CREATE SIMPLE SOUND
========================================================= */

function createSound(
    frequency,
    duration,
    type = "square",
    volume = 0.15
) {

    initializeAudio();

    if (!audioContext) return;

    const oscillator =
        audioContext.createOscillator();

    const gain =
        audioContext.createGain();


    oscillator.type = type;

    oscillator.frequency.value =
        frequency;


    gain.gain.setValueAtTime(
        volume,
        audioContext.currentTime
    );


    gain.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime +
        duration
    );


    oscillator.connect(gain);

    gain.connect(masterGain);


    oscillator.start();

    oscillator.stop(
        audioContext.currentTime +
        duration
    );
}


/* =========================================================
   GUN SOUNDS
========================================================= */

function playGunSound(
    weaponId
) {

    initializeAudio();

    if (!GAME_SETTINGS.sound) {
        return;
    }


    switch (weaponId) {

        case "pistol":

            createSound(
                180,
                0.12,
                "square",
                0.20
            );

            break;


        case "deagle":

            createSound(
                110,
                0.18,
                "sawtooth",
                0.30
            );

            break;


        case "smg":

            createSound(
                220,
                0.07,
                "square",
                0.13
            );

            break;


        case "rifle":

            createSound(
                150,
                0.09,
                "sawtooth",
                0.18
            );

            break;


        case "ak":

            createSound(
                120,
                0.10,
                "sawtooth",
                0.22
            );

            break;


        case "shotgun":

            createSound(
                80,
                0.25,
                "sawtooth",
                0.35
            );

            break;


        case "sniper":

            createSound(
                70,
                0.30,
                "square",
                0.40
            );

            break;


        case "lmg":

            createSound(
                170,
                0.06,
                "square",
                0.14
            );

            break;


        case "plasma":

            createSound(
                600,
                0.15,
                "sine",
                0.18
            );

            break;


        default:

            createSound(
                180,
                0.10
            );
    }
}


/* =========================================================
   RELOAD SOUND
========================================================= */

function playReloadSound() {

    if (
        !GAME_SETTINGS.sound
    ) {
        return;
    }


    createSound(
        300,
        0.08,
        "sine",
        0.10
    );


    setTimeout(
        function() {

            createSound(
                500,
                0.10,
                "sine",
                0.10
            );

        },
        150
    );
}


/* =========================================================
   JUMP SOUND
========================================================= */

function playJumpSound() {

    if (
        !GAME_SETTINGS.sound
    ) {
        return;
    }


    createSound(
        400,
        0.12,
        "sine",
        0.12
    );
}


/* =========================================================
   DAMAGE SOUND
========================================================= */

function playDamageSound() {

    if (
        !GAME_SETTINGS.sound
    ) {
        return;
    }


    createSound(
        100,
        0.18,
        "sawtooth",
        0.22
    );
}


/* =========================================================
   ENEMY HIT SOUND
========================================================= */

function playEnemyHitSound() {

    if (
        !GAME_SETTINGS.sound
    ) {
        return;
    }


    createSound(
        250,
        0.08,
        "square",
        0.12
    );
}


/* =========================================================
   ENEMY DEATH SOUND
========================================================= */

function playEnemyDeathSound() {

    if (
        !GAME_SETTINGS.sound
    ) {
        return;
    }


    createSound(
        90,
        0.35,
        "sawtooth",
        0.20
    );
}


/* =========================================================
   SLIDE SOUND
========================================================= */

function playSlideSound() {

    if (!GAME_SETTINGS.sound) {
        return;
    }

    createSound(
        120,
        0.25,
        "sawtooth",
        0.08
    );
}


/* =========================================================
   SET MASTER VOLUME
========================================================= */

function updateMasterVolume(
    value
) {

    if (!masterGain) {
        return;
    }


    masterGain.gain.value =
        Number(value);
              }
