/* =========================================================
   SETTINGS.JS
   GAME SETTINGS SYSTEM
========================================================= */

const GAME_SETTINGS = {

    sensitivity: 1.0,

    volume: 1.0,

    graphics: "HIGH",

    music: true,

    sound: true
};


/* =========================================================
   SETTINGS ELEMENTS
========================================================= */

const sensitivitySlider =
    document.getElementById(
        "sensitivity"
    );

const volumeSlider =
    document.getElementById(
        "volume"
    );

const graphicsButton =
    document.getElementById(
        "graphicsButton"
    );

const settingsButton =
    document.getElementById(
        "settingsButton"
    );

const menuSettingsButton =
    document.getElementById(
        "menuSettingsButton"
    );

const settingsMenu =
    document.getElementById(
        "settingsMenu"
    );

const settingsBackButton =
    document.getElementById(
        "settingsBackButton"
    );


/* =========================================================
   OPEN SETTINGS
========================================================= */

function openSettings() {

    if (!settingsMenu) {
        return;
    }

    settingsMenu.classList.remove(
        "hidden"
    );
}


/* =========================================================
   CLOSE SETTINGS
========================================================= */

function closeSettings() {

    if (!settingsMenu) {
        return;
    }

    settingsMenu.classList.add(
        "hidden"
    );
}


/* =========================================================
   SETTINGS BUTTON
========================================================= */

if (settingsButton) {

    settingsButton.addEventListener(
        "touchstart",
        function(event) {

            event.preventDefault();

            openSettings();

        },
        { passive: false }
    );
}


if (menuSettingsButton) {

    menuSettingsButton.addEventListener(
        "click",
        function() {

            openSettings();

        }
    );
}


if (settingsBackButton) {

    settingsBackButton.addEventListener(
        "click",
        function() {

            closeSettings();

        }
    );
}


/* =========================================================
   SENSITIVITY
========================================================= */

if (sensitivitySlider) {

    sensitivitySlider.addEventListener(
        "input",
        function() {

            GAME_SETTINGS.sensitivity =
                Number(
                    sensitivitySlider.value
                );


            /*
               Send sensitivity to
               mobile controls.
            */

            if (
                typeof setControlSensitivity ===
                "function"
            ) {

                setControlSensitivity(
                    GAME_SETTINGS.sensitivity
                );
            }

        }
    );
}


/* =========================================================
   VOLUME
========================================================= */

if (volumeSlider) {

    volumeSlider.addEventListener(
        "input",
        function() {

            GAME_SETTINGS.volume =
                Number(
                    volumeSlider.value
                );

            setGameVolume(
                GAME_SETTINGS.volume
            );

        }
    );
}


/* =========================================================
   GRAPHICS
========================================================= */

if (graphicsButton) {

    graphicsButton.addEventListener(
        "click",
        function() {

            if (
                GAME_SETTINGS.graphics ===
                "HIGH"
            ) {

                GAME_SETTINGS.graphics =
                    "MEDIUM";

            } else if (
                GAME_SETTINGS.graphics ===
                "MEDIUM"
            ) {

                GAME_SETTINGS.graphics =
                    "LOW";

            } else {

                GAME_SETTINGS.graphics =
                    "HIGH";
            }


            graphicsButton.textContent =
                "Graphics: " +
                GAME_SETTINGS.graphics;


            applyGraphicsSettings();

        }
    );
}


/* =========================================================
   APPLY GRAPHICS
========================================================= */

function applyGraphicsSettings() {

    /*
       Connect to Three.js renderer
       when game.js is loaded.
    */

    if (
        typeof renderer ===
        "undefined"
    ) {
        return;
    }


    if (
        GAME_SETTINGS.graphics ===
        "HIGH"
    ) {

        renderer.setPixelRatio(
            Math.min(
                window.devicePixelRatio,
                2
            )
        );

        renderer.shadowMap.enabled =
            true;

    } else if (
        GAME_SETTINGS.graphics ===
        "MEDIUM"
    ) {

        renderer.setPixelRatio(1.25);

        renderer.shadowMap.enabled =
            true;

    } else {

        renderer.setPixelRatio(1);

        renderer.shadowMap.enabled =
            false;
    }
}


/* =========================================================
   VOLUME
========================================================= */

let masterVolume =
    GAME_SETTINGS.volume;


function setGameVolume(
    value
) {

    masterVolume =
        Number(value);

    /*
       Audio system will use this
       value when sounds are added.
    */

    if (
        typeof audioListener !==
        "undefined"
    ) {

        audioListener.setMasterVolume(
            masterVolume
        );
    }
}


/* =========================================================
   SOUND
========================================================= */

function setSoundEnabled(
    enabled
) {

    GAME_SETTINGS.sound =
        Boolean(enabled);
}


/* =========================================================
   MUSIC
========================================================= */

function setMusicEnabled(
    enabled
) {

    GAME_SETTINGS.music =
        Boolean(enabled);
}


/* =========================================================
   SAVE SETTINGS
========================================================= */

function saveSettings() {

    try {

        localStorage.setItem(
            "mobileFPSSettings",
            JSON.stringify(
                GAME_SETTINGS
            )
        );

    } catch (error) {

        console.log(
            "Could not save settings."
        );
    }
}


/* =========================================================
   LOAD SETTINGS
========================================================= */

function loadSettings() {

    try {

        const saved =
            localStorage.getItem(
                "mobileFPSSettings"
            );


        if (!saved) {
            return;
        }


        const settings =
            JSON.parse(saved);


        if (
            typeof settings.sensitivity ===
            "number"
        ) {

            GAME_SETTINGS.sensitivity =
                settings.sensitivity;

            if (sensitivitySlider) {

                sensitivitySlider.value =
                    settings.sensitivity;
            }
        }


        if (
            typeof settings.volume ===
            "number"
        ) {

            GAME_SETTINGS.volume =
                settings.volume;

            masterVolume =
                settings.volume;

            if (volumeSlider) {

                volumeSlider.value =
                    settings.volume;
            }
        }


        if (
            settings.graphics
        ) {

            GAME_SETTINGS.graphics =
                settings.graphics;

            if (graphicsButton) {

                graphicsButton.textContent =
                    "Graphics: " +
                    settings.graphics;
            }
        }


        if (
            typeof setControlSensitivity ===
            "function"
        ) {

            setControlSensitivity(
                GAME_SETTINGS.sensitivity
            );
        }

    } catch (error) {

        console.log(
            "Could not load settings."
        );
    }
}


/* =========================================================
   SAVE WHEN SETTINGS CHANGE
========================================================= */

if (sensitivitySlider) {

    sensitivitySlider.addEventListener(
        "change",
        saveSettings
    );
}


if (volumeSlider) {

    volumeSlider.add
