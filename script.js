let maze = [
    [0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1],
    [0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1],
    [0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1],
    [0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
    [0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1],
    [0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1],
    [0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1],
    [0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1],
    [0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 3, 1, 0, 0, 3, 0, 1, 0, 0, 1, 0, 0, 1]
];

let player = [0, 0];
let bag = 0;

const ROWS = 12;
const COLS = 24;

const EMPTY = 0;
const WALL = 1;
const PLAYER = 2;
const EXIT = 3;
const EXIT_READY = 6;
const DIAMOND = 4;
const DIAMOND_COUNT = 12;

const DOWN = 40;
const UP = 38;
const LEFT = 37;
const RIGHT = 39;

window.onload = () => {
    generateDiamond();
    createBoard();
    renderMaze();
};

const generateDiamond = () => {
    let count = 0;

    do {
        let row = Math.floor(Math.random() * ROWS);
        let col = Math.floor(Math.random() * COLS);
        if (
            maze[row][col] === EMPTY &&
            row !== 0 &&
            col !== 0 &&
            row !== ROWS - 1 &&
            col !== COLS - 1
        ) {
            maze[row][col] = DIAMOND;
            count++;
        }
    } while (count !== DIAMOND_COUNT);
};

const createBoard = () => {
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const block = document.createElement("div");
            block.id = `id-${col}-${row}`;
            document.querySelector(".board").appendChild(block);
        }
    }
};

const renderMaze = () => {
    if (bag < DIAMOND_COUNT) {
        document.querySelector(".info").textContent = "";
    } else {
        maze[ROWS - 1][COLS - 1] = EXIT_READY;
        document.querySelector(".info").textContent = "";
    }

    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            let itemClass = "";
            switch (maze[row][col]) {
                case PLAYER:
                    itemClass = "player";
                    break;
                // case WALL:
                //     itemClass = "wall";
                //     break;
                case PLAYER:
                    itemClass = "human";
                    break;
                case EXIT:
                    itemClass = "exit";
                    break;
                case EXIT_READY:
                    itemClass = "exit show";
                    break;
                case DIAMOND:
                    itemClass = "diamond";
                    break;
                default:
                    itemClass = "empty";
            }
            const id = `#id-${col}-${row}`;

            document.querySelector(id).className = `block ${itemClass}`;
        }
    }
    const id = `#id-${player[1]}-${player[0]}`;
    if (
        !(
            bag === DIAMOND_COUNT &&
            player[1] === COLS - 1 &&
            player[0] === ROWS - 1
        )
    ) {
        document.querySelector(id).className = "block player";
    } else {
        document.querySelector(id).className = "block player bye";
        document.querySelector(".info").textContent = "bye!";
    }

    document.querySelector(
        ".diamond-count"
    ).textContent = `${bag} / ${DIAMOND_COUNT}`;
};

window.onkeydown = event => {
    switch (event.keyCode) {
        case DOWN:
            direction = DOWN;
            break;
        case UP:
            direction = UP;
            break;
        case LEFT:
            direction = LEFT;
            break;
        case RIGHT:
            direction = RIGHT;
            break;
        default:
            direction = 0;
    }

    if (direction !== 0) {
        changePlayerPos(direction);
    }
};

const changePlayerPos = direction => {
    let [dy, dx] = [0, 0];
    switch (direction) {
        case UP:
            dy = -1;
            break;
        case RIGHT:
            dx = 1;
            break;
        case LEFT:
            dx = -1;
            break;
        case DOWN:
            dy = 1;
            break;
        default:
            return state;
    }

    // the used links
    var links = [
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/600%20Green%20Lanes.m4a",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/180227_0035_01.wav",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/180228_0040_01.wav",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/180228_0056_01.wav",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/191212_0083.MP3",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/191212_0085.MP3",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/191212_0086.MP3",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/191212_0087.MP3",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/191212_0088.MP3",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/Anaelle.mp4",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/AUDIO-2020-02-07-09-36-02.m4a",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/audioclip-1580823310000-46277.mp4",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/audioclip-1580834119876-50681.mp4",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/audioclip-1581002240830-35378.mp4",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/audioclip-1581076640964-45569.aac",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/Bentham%20House%20UCL%202.m4a",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/Birds_01.wav",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/Bus.m4a",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/Frogs%20and%20crickets%20at%20night%20-%20Marojejy%20NP%2C%20Madagascar.ogx",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/Fur%20seals.m4a",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/Glasgow%2C%20Royal%20Concert%20Hall%2C%202%20February.m4a",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/Gorgie%20Road%2C%2029%20Jan%2C%208.43pm.m4a",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/Kata%20Tjuta.m4a",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/New%20Recording%202.m4a",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/sanj23.m4a",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/Song%20To%20Shazam%20From%20Bus.m4a",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/STE-011.wav",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/Emma%20Rixhon%20recordings/1bicycle.wav",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/Emma%20Rixhon%20recordings/2moped.wav",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/Emma%20Rixhon%20recordings/3moped.wav",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/Emma%20Rixhon%20recordings/4restaurant.wav",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/Emma%20Rixhon%20recordings/5train.wav",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/Emma%20Rixhon%20recordings/6bikebell.wav",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/Emma%20Rixhon%20recordings/7truckbackingupindistance.wav",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/Emma%20Rixhon%20recordings/8cornershopmusic.wav",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/Emma%20Rixhon%20recordings/9oystercard.wav",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/Emma%20Rixhon%20recordings/10train.wav",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/Emma%20Rixhon%20recordings/11overgroundannouncement.wav",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/Emma%20Rixhon%20recordings/12overgroundjourney.wav",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/Emma%20Rixhon%20recordings/13overgroundjourneycont.wav",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/Emma%20Rixhon%20recordings/15moremarket.wav",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/Emma%20Rixhon%20recordings/16bollywoodtypemusicatmarket.wav",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/Emma%20Rixhon%20recordings/17traffic.wav",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/Emma%20Rixhon%20recordings/18tescolol.wav",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/Emma%20Rixhon%20recordings/19idkbutikindalikeit.wav",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/Emma%20Rixhon%20recordings/20kidsplaying(theresagreatburp)(sorrymymickepthittingsomething).wav",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/Emma%20Rixhon%20recordings/21playground.wav",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/Emma%20Rixhon%20recordings/22roadandrestaurants.wav",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/Emma%20Rixhon%20recordings/23justpeopletalking(againmymicishittingsomethingimsorry).wav",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/Emma%20Rixhon%20recordings/24babycryingonbus.wav",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/Will%20Pritchard%20-%20Sounds%20for%20Sanjana/Barge%20exhaust%20with%20footsteps.WAV",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/Will%20Pritchard%20-%20Sounds%20for%20Sanjana/Barge%20exhaust.WAV",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/Will%20Pritchard%20-%20Sounds%20for%20Sanjana/Billy%20you_re%20the%20boy%20for%20it.WAV",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/Will%20Pritchard%20-%20Sounds%20for%20Sanjana/Bird%20with%20cows%202.wav",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/Will%20Pritchard%20-%20Sounds%20for%20Sanjana/Bird%20with%20cows%203.wav",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/Will%20Pritchard%20-%20Sounds%20for%20Sanjana/Bird%20with%20cows%204.wav",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/Will%20Pritchard%20-%20Sounds%20for%20Sanjana/Bird%20with%20cows.wav",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/Will%20Pritchard%20-%20Sounds%20for%20Sanjana/Birds%20in%20rain%202.WAV",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/Will%20Pritchard%20-%20Sounds%20for%20Sanjana/Birds%20in%20rain.WAV",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/Will%20Pritchard%20-%20Sounds%20for%20Sanjana/Brodgar%20ambience%202.wav",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/Will%20Pritchard%20-%20Sounds%20for%20Sanjana/Brodgar%20ambience.wav",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/Will%20Pritchard%20-%20Sounds%20for%20Sanjana/Chatter%20on%20the%20fishing%20boat%20bridge%20%5Bexplicit%5D.WAV",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/Will%20Pritchard%20-%20Sounds%20for%20Sanjana/Dawn%20chorus.wav",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/Will%20Pritchard%20-%20Sounds%20for%20Sanjana/Driving%20the%20fishing%20boat.WAV",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/Will%20Pritchard%20-%20Sounds%20for%20Sanjana/Engine%20hum.WAV",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/Will%20Pritchard%20-%20Sounds%20for%20Sanjana/Football%202.wav",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/Will%20Pritchard%20-%20Sounds%20for%20Sanjana/Gulls%20nesting.WAV",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/Will%20Pritchard%20-%20Sounds%20for%20Sanjana/Harbour%20waves.wav",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/Will%20Pritchard%20-%20Sounds%20for%20Sanjana/Inside%20Skara%20Brae%202.WAV",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/Will%20Pritchard%20-%20Sounds%20for%20Sanjana/Inside%20the%20distillery.wav",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/Will%20Pritchard%20-%20Sounds%20for%20Sanjana/Kirkwall%20high%20street%202.WAV",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/Will%20Pritchard%20-%20Sounds%20for%20Sanjana/Metal%20salmon%20feed%20tubes.WAV",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/Will%20Pritchard%20-%20Sounds%20for%20Sanjana/Pub%202.wav",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/Will%20Pritchard%20-%20Sounds%20for%20Sanjana/Pub.wav",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/Will%20Pritchard%20-%20Sounds%20for%20Sanjana/Rain%20on%20window.wav",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/Will%20Pritchard%20-%20Sounds%20for%20Sanjana/Roar%20of%20waves%20and%20fishing%20boat%20engine.WAV",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/Will%20Pritchard%20-%20Sounds%20for%20Sanjana/Salmon%20feeder%20in%20distance.WAV",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/Will%20Pritchard%20-%20Sounds%20for%20Sanjana/Seabirds.WAV",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/Will%20Pritchard%20-%20Sounds%20for%20Sanjana/Tour%20bus%202.wav",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/Will%20Pritchard%20-%20Sounds%20for%20Sanjana/Tourist%20photo%20op.wav",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/Will%20Pritchard%20-%20Sounds%20for%20Sanjana/Turbine%20blades.WAV",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/Will%20Pritchard%20-%20Sounds%20for%20Sanjana/Walking%20at%20Brodgar.WAV",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/Will%20Pritchard%20-%20Sounds%20for%20Sanjana/Walking%20with%20bee.wav",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/Will%20Pritchard%20-%20Sounds%20for%20Sanjana/Whisky%20grains.wav",
        "https://s3.amazonaws.com/external-pages/sanjana-varghese/sanjana-audio-recordings/Will%20Pritchard%20-%20Sounds%20for%20Sanjana/Yesnaby.WAV"
    ];

    openStuff = function() {
        // get a random number between 0 and the number of links
        var randIdx = Math.random() * links.length;
        // round it, so it can be used as array index
        randIdx = parseInt(randIdx, 10);
        // construct the link to be opened
        var link = links[randIdx];
        // open it in a new window / tab (depends on browser setting)
        window.open(link);
    };

    const x = player[1] + dx;
    const y = player[0] + dy;

    // if (x >= 0 && x < COLS && y >= 0 && y < ROWS && maze[y][x] !== WALL) {
    player = [y, x];

    if (maze[y][x] === DIAMOND) {
        maze[y][x] = EMPTY;
        bag++;
        openStuff();
    }

    renderMaze();
};
