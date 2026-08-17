/* =========================================================
   MAPS.JS
   9 MAP SYSTEM
========================================================= */

const MAPS = [

    /* =====================================================
       MAP 1
    ===================================================== */

    {
        id: 1,
        name: "Training Base",
        sky: "#78b7e8",
        ground: "#4b4b4b",

        playerSpawn: {
            x: 0,
            y: 1.7,
            z: 18
        },

        enemySpawns: [
            { x: -12, z: -12 },
            { x: 12, z: -12 },
            { x: -15, z: 2 },
            { x: 15, z: 2 },
            { x: 0, z: -20 }
        ],

        walls: [
            { x: 0, z: -10, w: 25, h: 4, d: 1 },
            { x: -12, z: 0, w: 1, h: 4, d: 20 },
            { x: 12, z: 0, w: 1, h: 4, d: 20 },

            { x: -5, z: 5, w: 5, h: 2, d: 3 },
            { x: 6, z: 2, w: 4, h: 2, d: 4 }
        ]
    },


    /* =====================================================
       MAP 2
    ===================================================== */

    {
        id: 2,
        name: "Desert Outpost",
        sky: "#e8c27a",
        ground: "#c99b4b",

        playerSpawn: {
            x: 0,
            y: 1.7,
            z: 20
        },

        enemySpawns: [
            { x: -15, z: -15 },
            { x: 15, z: -15 },
            { x: -20, z: 0 },
            { x: 20, z: 0 },
            { x: 0, z: -25 }
        ],

        walls: [
            { x: -10, z: -8, w: 5, h: 3, d: 5 },
            { x: 10, z: -8, w: 5, h: 3, d: 5 },
            { x: -10, z: 8, w: 5, h: 3, d: 5 },
            { x: 10, z: 8, w: 5, h: 3, d: 5 },

            { x: 0, z: -15, w: 8, h: 4, d: 2 }
        ]
    },


    /* =====================================================
       MAP 3
    ===================================================== */

    {
        id: 3,
        name: "City Streets",
        sky: "#8fa4b8",
        ground: "#444444",

        playerSpawn: {
            x: 0,
            y: 1.7,
            z: 25
        },

        enemySpawns: [
            { x: -20, z: -20 },
            { x: 20, z: -20 },
            { x: -25, z: 0 },
            { x: 25, z: 0 },
            { x: 0, z: -30 }
        ],

        walls: [
            { x: -12, z: -12, w: 7, h: 7, d: 7 },
            { x: 12, z: -12, w: 7, h: 7, d: 7 },

            { x: -12, z: 5, w: 7, h: 7, d: 7 },
            { x: 12, z: 5, w: 7, h: 7, d: 7 },

            { x: 0, z: -22, w: 10, h: 8, d: 6 }
        ]
    },


    /* =====================================================
       MAP 4
    ===================================================== */

    {
        id: 4,
        name: "Forest",
        sky: "#7db7e8",
        ground: "#315b31",

        playerSpawn: {
            x: 0,
            y: 1.7,
            z: 20
        },

        enemySpawns: [
            { x: -18, z: -15 },
            { x: 18, z: -15 },
            { x: -20, z: 5 },
            { x: 20, z: 5 },
            { x: 0, z: -25 }
        ],

        walls: [
            { x: -12, z: -10, w: 2, h: 5, d: 2 },
            { x: -4, z: -18, w: 2, h: 5, d: 2 },
            { x: 8, z: -10, w: 2, h: 5, d: 2 },
            { x: 15, z: 5, w: 2, h: 5, d: 2 },
            { x: -15, z: 8, w: 2, h: 5, d: 2 }
        ]
    },


    /* =====================================================
       MAP 5
    ===================================================== */

    {
        id: 5,
        name: "Factory",
        sky: "#555555",
        ground: "#303030",

        playerSpawn: {
            x: 0,
            y: 1.7,
            z: 22
        },

        enemySpawns: [
            { x: -15, z: -15 },
            { x: 15, z: -15 },
            { x: -18, z: 0 },
            { x: 18, z: 0 },
            { x: 0, z: -25 }
        ],

        walls: [
            { x: -12, z: -10, w: 6, h: 5, d: 4 },
            { x: 12, z: -10, w: 6, h: 5, d: 4 },

            { x: -12, z: 5, w: 6, h: 5, d: 4 },
            { x: 12, z: 5, w: 6, h: 5, d: 4 },

            { x: 0, z: -18, w: 12, h: 6, d: 3 }
        ]
    },


    /* =====================================================
       MAP 6
    ===================================================== */

    {
        id: 6,
        name: "Bunker",
        sky: "#202020",
        ground: "#252525",

        playerSpawn: {
            x: 0,
            y: 1.7,
            z: 20
        },

        enemySpawns: [
            { x: -10, z: -10 },
            { x: 10, z: -10 },
            { x: -15, z: 0 },
            { x: 15, z: 0 },
            { x: 0, z: -20 }
        ],

        walls: [
            { x: 0, z: -15, w: 35, h: 5, d: 2 },
            { x: 0, z: 15, w: 35, h: 5, d: 2 },

            { x: -18, z: 0, w: 2, h: 5, d: 30 },
            { x: 18, z: 0, w: 2, h: 5, d: 30 },

            { x: 0, z: 0, w: 5, h: 3, d: 5 }
        ]
    },


    /* =====================================================
       MAP 7
    ===================================================== */

    {
        id: 7,
        name: "Snow Base",
        sky: "#d9efff",
        ground: "#dce8ef",

        playerSpawn: {
            x: 0,
            y: 1.7,
            z: 20
        },

        enemySpawns: [
            { x: -15, z: -12 },
            { x: 15, z: -12 },
            { x: -20, z: 5 },
            { x: 20, z: 5 },
            { x: 0, z: -25 }
        ],

        walls: [
            { x: -10, z: -10, w: 5, h: 4, d: 5 },
            { x: 10, z: -10, w: 5, h: 4, d: 5 },

            { x: -10, z: 8, w: 5, h: 4, d: 5 },
            { x: 10, z: 8, w: 5, h: 4, d: 5 }
        ]
    },


    /* =====================================================
       MAP 8
    ===================================================== */

    {
        id: 8,
        name: "Night City",
        sky: "#090b16",
        ground: "#181818",

        playerSpawn: {
            x: 0,
            y: 1.7,
            z: 25
        },

        enemySpawns: [
            { x: -20, z: -15 },
            { x: 20, z: -15 },
            { x: -25, z: 0 },
            { x: 25, z: 0 },
            { x: 0, z: -30 }
        ],

        walls: [
            { x: -12, z: -10, w: 7, h: 10, d: 7 },
            { x: 12, z: -10, w: 7, h: 10, d: 7 },

            { x: -12, z: 8, w: 7, h: 8, d: 7 },
            { x: 12, z: 8, w: 7, h: 8, d: 7 },

            { x: 0, z: -22, w: 8, h: 12, d: 8 }
        ]
    },


    /* =====================================================
       MAP 9
    ===================================================== */

    {
        id: 9,
        name: "Battle Arena",
        sky: "#7195ad",
        ground: "#505050",

        playerSpawn: {
            x: 0,
            y: 1.7,
            z: 0
        },

        enemySpawns: [
            { x: -20, z: -20 },
            { x: 20, z: -20 },
            { x: -20, z: 20 },
            { x: 20, z: 20 },
            { x: 0, z: -25 }
        ],

        walls: [
            { x: 0, z: -30, w: 60, h: 6, d: 2 },
            { x: 0, z: 30, w: 60, h: 6, d: 2 },

            { x: -30, z: 0, w: 2, h: 6, d: 60 },
            { x: 30, z: 0, w: 2, h: 6, d: 60 },

            { x: 0, z: 0, w: 8, h: 4, d: 8 },

            { x: -12, z: 0, w: 4, h: 3, d: 4 },
            { x: 12, z: 0, w: 4, h: 3, d: 4 }
        ]
    }

];


/* =========================================================
   CURRENT MAP
========================================================= */

let currentMapId = 1;


/* =========================================================
   GET MAP
========================================================= */

function getCurrentMap() {

    return MAPS.find(
        map => map.id === currentMapId
    );
}


/* =========================================================
   SELECT MAP
========================================================= */

function selectMap(mapId) {

    const map = MAPS.find(
        item => item.id === mapId
    );

    if (!map) return;

    currentMapId = mapId;

    /*
       If the game is already running,
       rebuild the current map.
    */

    if (
        typeof loadMap === "function"
    ) {

        loadMap(map);
    }

    /*
       Close map menu.
    */

    const mapMenu =
        document.getElementById("mapMenu");

    if (mapMenu) {

        mapMenu.classList.add("hidden");
    }
}


/* =========================================================
   MAP BUTTONS
========================================================= */

const mapButtons =
    document.querySelectorAll(
        "#mapMenu button[data-map]"
    );

mapButtons.forEach(button => {

    button.addEventListener(
        "touchstart",
        function(event) {

            event.preventDefault();

            const mapId =
                Number(
                    button.dataset.map
                );

            selectMap(mapId);
        }
    );
});


/* =========================================================
   MAP MENU
========================================================= */

const mapButton =
    document.getElementById(
        "mapButton"
    );

const mapMenu =
    document.getElementById(
        "mapMenu"
    );

const mapBackButton =
    document.getElementById(
        "mapBackButton"
    );

if (mapButton) {

    mapButton.addEventListener(
        "click",
        function() {

            mapMenu.classList.remove(
                "hidden"
            );
        }
    );
}


if (mapBackButton) {

    mapBackButton.addEventListener(
        "click",
        function() {

            mapMenu.classList.add(
                "hidden"
            );
        }
    );
          }
