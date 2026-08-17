/* =========================================================
   CONTROLS.JS
   MOBILE FPS CONTROLS
   Joystick + Aim + Sprint + Jump + Crouch + Slide
========================================================= */

const controls = {

    forward: 0,
    strafe: 0,

    sprinting: false,
    crouching: false,
    sliding: false,

    slideTimer: 0,

    lookSensitivity: 1,

    joystickActive: false,

    joystickX: 0,
    joystickY: 0,

    lookActive: false,
    lastLookX: 0,
    lastLookY: 0
};


/* =========================================================
   JOYSTICK
========================================================= */

const joystick =
    document.getElementById("joystick");

const joystickStick =
    document.getElementById(
        "joystick-stick"
    );


function updateJoystick(
    clientX,
    clientY
) {

    if (!joystick) return;

    const rect =
        joystick.getBoundingClientRect();

    const centerX =
        rect.left +
        rect.width / 2;

    const centerY =
        rect.top +
        rect.height / 2;

    let dx =
        clientX - centerX;

    let dy =
        clientY - centerY;

    const maxDistance =
        rect.width * 0.34;

    const distance =
        Math.sqrt(
            dx * dx +
            dy * dy
        );

    if (
        distance >
        maxDistance
    ) {

        dx =
            dx / distance *
            maxDistance;

        dy =
            dy / distance *
            maxDistance;
    }


    controls.joystickX =
        dx / maxDistance;

    controls.joystickY =
        dy / maxDistance;


    /*
       Forward is negative Y.
    */

    controls.forward =
        -controls.joystickY;

    controls.strafe =
        controls.joystickX;


    if (joystickStick) {

        joystickStick.style.transform =
            "translate(calc(-50% + " +
            dx +
            "px), calc(-50% + " +
            dy +
            "px))";
    }
}


/* =========================================================
   JOYSTICK START
========================================================= */

if (joystick) {

    joystick.addEventListener(
        "touchstart",
        function(event) {

            event.preventDefault();

            controls.joystickActive =
                true;

            const touch =
                event.touches[0];

            updateJoystick(
                touch.clientX,
                touch.clientY
            );

        },
        { passive: false }
    );


    joystick.addEventListener(
        "touchmove",
        function(event) {

            event.preventDefault();

            if (
                !controls.joystickActive
            ) {
                return;
            }

            const touch =
                event.touches[0];

            updateJoystick(
                touch.clientX,
                touch.clientY
            );

        },
        { passive: false }
    );


    joystick.addEventListener(
        "touchend",
        function(event) {

            event.preventDefault();

            resetJoystick();

        },
        { passive: false }
    );


    joystick.addEventListener(
        "touchcancel",
        function() {

            resetJoystick();

        }
    );
}


/* =========================================================
   RESET JOYSTICK
========================================================= */

function resetJoystick() {

    controls.joystickActive =
        false;

    controls.forward = 0;

    controls.strafe = 0;

    controls.joystickX = 0;

    controls.joystickY = 0;


    if (joystickStick) {

        joystickStick.style.transform =
            "translate(-50%, -50%)";
    }
}


/* =========================================================
   TOUCH CAMERA / AIM
========================================================= */

if (
    typeof document !==
    "undefined"
) {

    document.addEventListener(
        "touchstart",
        function(event) {

            /*
               Ignore touches on UI controls.
            */

            if (
                event.target.closest(
                    "#controls"
                ) ||
                event.target.closest(
                    ".menu"
                )
            ) {
                return;
            }


            if (
                event.touches.length !== 1
            ) {
                return;
            }


            controls.lookActive =
                true;

            controls.lastLookX =
                event.touches[0].clientX;

            controls.lastLookY =
                event.touches[0].clientY;

        },
        { passive: true }
    );


    document.addEventListener(
        "touchmove",
        function(event) {

            if (
                !controls.lookActive
            ) {
                return;
            }


            if (
                event.touches.length !== 1
            ) {
                return;
            }


            const touch =
                event.touches[0];


            const x =
                touch.clientX;

            const y =
                touch.clientY;


            const dx =
                x -
                controls.lastLookX;

            const dy =
                y -
                controls.lastLookY;


            controls.lastLookX = x;
            controls.lastLookY = y;


            /*
               Connect camera rotation
               to the main game.
            */

            if (
                typeof rotatePlayerCamera ===
                "function"
            ) {

                rotatePlayerCamera(
                    dx *
                    controls.lookSensitivity,

                    dy *
                    controls.lookSensitivity
                );
            }

        },
        { passive: true }
    );


    document.addEventListener(
        "touchend",
        function(event) {

            /*
               Stop looking when
               finger leaves screen.
            */

            if (
                event.touches.length === 0
            ) {

                controls.lookActive =
                    false;
            }

        }
    );
}


/* =========================================================
   JUMP
========================================================= */

const jumpButton =
    document.getElementById(
        "jumpButton"
    );


if (jumpButton) {

    jumpButton.addEventListener(
        "touchstart",
        function(event) {

            event.preventDefault();

            if (
                typeof playerJump ===
                "function"
            ) {

                playerJump();
            }

        },
        { passive: false }
    );
}


/* =========================================================
   CROUCH
========================================================= */

const crouchButton =
    document.getElementById(
        "crouchButton"
    );


if (crouchButton) {

    crouchButton.addEventListener(
        "touchstart",
        function(event) {

            event.preventDefault();

            toggleCrouch();

        },
        { passive: false }
    );
}


function toggleCrouch() {

    controls.crouching =
        !controls.crouching;


    /*
       Do not stay crouched
       while sliding.
    */

    if (
        controls.sliding
    ) {

        controls.crouching =
            false;
    }


    if (
        typeof setPlayerCrouch ===
        "function"
    ) {

        setPlayerCrouch(
            controls.crouching
        );
    }
}


/* =========================================================
   SPRINT
========================================================= */

const sprintButton =
    document.getElementById(
        "sprintButton"
    );


if (sprintButton) {

    sprintButton.addEventListener(
        "touchstart",
        function(event) {

            event.preventDefault();

            controls.sprinting =
                true;

        },
        { passive: false }
    );


    sprintButton.addEventListener(
        "touchend",
        function(event) {

            event.preventDefault();

            controls.sprinting =
                false;

        },
        { passive: false }
    );


    sprintButton.addEventListener(
        "touchcancel",
        function() {

            controls.sprinting =
                false;

        }
    );
}


/* =========================================================
   SLIDE
========================================================= */

const slideButton =
    document.getElementById(
        "slideButton"
    );


if (slideButton) {

    slideButton.addEventListener(
        "touchstart",
        function(event) {

            event.preventDefault();

            startSlide();

        },
        { passive: false }
    );
}


function startSlide() {

    /*
       Slide requires sprinting
       and forward movement.
    */

    if (
        !controls.sprinting
    ) {
        return;
    }


    if (
        controls.forward <= 0.25
    ) {
        return;
    }


    if (
        controls.sliding
    ) {
        return;
    }


    controls.sliding =
        true;

    controls.slideTimer =
        650;


    if (
        typeof setPlayerSlide ===
        "function"
    ) {

        setPlayerSlide(
            true
        );
    }


    /*
       Automatically finish
       after 650 milliseconds.
    */

    setTimeout(
        function() {

            stopSlide();

        },
        controls.slideTimer
    );
}


function stopSlide() {

    controls.sliding =
        false;


    if (
        typeof setPlayerSlide ===
        "function"
    ) {

        setPlayerSlide(
            false
        );
    }
}


/* =========================================================
   MOVEMENT UPDATE
========================================================= */

function getMovementInput() {

    return {

        forward:
            controls.forward,

        strafe:
            controls.strafe,

        sprinting:
            controls.sprinting,

        crouching:
            controls.crouching,

        sliding:
            controls.sliding
    };
}


/* =========================================================
   SET SENSITIVITY
========================================================= */

function setControlSensitivity(
    value
) {

    controls.lookSensitivity =
        Number(value);
}


/* =========================================================
   KEYBOARD SUPPORT
   Useful if the game is opened
   on a computer later.
========================================================= */

document.addEventListener(
    "keydown",
    function(event) {

        switch (event.code) {

            case "KeyW":
            case "ArrowUp":
                controls.forward = 1;
                break;

            case "KeyS":
            case "ArrowDown":
                controls.forward = -1;
                break;

            case "KeyA":
            case "ArrowLeft":
                controls.strafe = -1;
                break;

            case "KeyD":
            case "ArrowRight":
                controls.strafe = 1;
                break;

            case "ShiftLeft":
            case "ShiftRight":
                controls.sprinting = true;
                break;

            case "Space":

                if (
                    typeof playerJump ===
                    "function"
                ) {

                    playerJump();
                }

                break;

            case "KeyC":

                toggleCrouch();

                break;
        }
    }
);


document.addEventListener(
    "keyup",
    function(event) {

        switch (event.code) {

            case "KeyW":
            case "ArrowUp":

                if (
                    controls.forward > 0
                ) {
                    controls.forward = 0;
                }

                break;

            case "KeyS":
            case "ArrowDown":

                if (
                    controls.forward < 0
                ) {
                    controls.forward = 0;
                }

                break;

            case "KeyA":
            case "ArrowLeft":

                if (
                    controls.strafe < 0
                ) {
                    controls.strafe = 0;
                }

                break;

            case "KeyD":
            case "ArrowRight":

                if (
                    controls.strafe > 0
                ) {
                    controls.strafe = 0;
                }

                break;

            case "ShiftLeft":
            case "ShiftRight":

                controls.sprinting =
                    false;

                break;
        }
    }
);
