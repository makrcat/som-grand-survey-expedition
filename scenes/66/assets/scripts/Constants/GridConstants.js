const CELL_SIZE = 16
const BLOCKED_POSITIONS = new Set();
const INTERACTION_POSITIONS = new Map();
const ENTRANCE_POSITIONS = new Set();
const UPPER_EXIT_POSITIONS = new Set();
const UPPER_EXIT_2_POSITIONS = new Set();
const RIGHT_EXIT_POSITIONS = new Set();
const LOWER_EXIT_POSITIONS = new Set();

// Upper Pillar
BLOCKED_POSITIONS.add("272,352");
BLOCKED_POSITIONS.add("272,336");
BLOCKED_POSITIONS.add("288,352");
BLOCKED_POSITIONS.add("288,336");

// Lower Pillar
BLOCKED_POSITIONS.add("272,432");
BLOCKED_POSITIONS.add("272,448");
BLOCKED_POSITIONS.add("288,432");
BLOCKED_POSITIONS.add("288,448");

// Left entrance
BLOCKED_POSITIONS.add("80,384");
BLOCKED_POSITIONS.add("80,400");
BLOCKED_POSITIONS.add("96,384");
BLOCKED_POSITIONS.add("96,400");

// Lower entrance
BLOCKED_POSITIONS.add("320,576");
BLOCKED_POSITIONS.add("320,592");
BLOCKED_POSITIONS.add("336,576");
BLOCKED_POSITIONS.add("336,592");

// Right entrance
BLOCKED_POSITIONS.add("544,384");
BLOCKED_POSITIONS.add("544,400");
BLOCKED_POSITIONS.add("560,384");
BLOCKED_POSITIONS.add("560,400");

// Walls
for(i = 256; i <= 496; i += CELL_SIZE) {
    BLOCKED_POSITIONS.add("32," + i);
}

for(i = 48; i <= 224; i += CELL_SIZE) {
    BLOCKED_POSITIONS.add(i + ",496");
}

for(i = 512; i <= 672; i += CELL_SIZE) {
    BLOCKED_POSITIONS.add("224," + i);
}

for(i = 240; i <= 432; i += CELL_SIZE) {
    BLOCKED_POSITIONS.add(i + ",672");
}

for(i = 496; i <= 672; i += CELL_SIZE) {
    BLOCKED_POSITIONS.add("448," + i);
}

for(i = 112; i <= 304; i += CELL_SIZE) {
    BLOCKED_POSITIONS.add("656," + i);
}

for(i = 288; i <= 640; i += CELL_SIZE) {
    BLOCKED_POSITIONS.add(i + ",112");
}

for(i = 112; i <= 288; i += CELL_SIZE) {
    BLOCKED_POSITIONS.add("272," + i);
}

BLOCKED_POSITIONS.add("256,288");

BLOCKED_POSITIONS.add("240,288");
BLOCKED_POSITIONS.add("240,272");
BLOCKED_POSITIONS.add("240,256");

for(i = 48; i <= 224; i += CELL_SIZE) {
    BLOCKED_POSITIONS.add(i + ",256");
}

// Special walls
BLOCKED_POSITIONS.add("432,288");
BLOCKED_POSITIONS.add("368,288");
BLOCKED_POSITIONS.add("288,288");

// Holes
for(i = 304; i <= 352; i += CELL_SIZE) {
    BLOCKED_POSITIONS.add(i + ",304");
}

for(i = 448; i <= 640; i += CELL_SIZE) {
    BLOCKED_POSITIONS.add(i + ",304");
}

BLOCKED_POSITIONS.add("448,320");
BLOCKED_POSITIONS.add("448,336");
BLOCKED_POSITIONS.add("352,320");
BLOCKED_POSITIONS.add("352,336");
BLOCKED_POSITIONS.add("304,320");

for(i = 304; i <= 352; i += CELL_SIZE) {
    BLOCKED_POSITIONS.add(i + ",352");
}

for(i = 448; i <= 608; i += CELL_SIZE) {
    BLOCKED_POSITIONS.add(i + ",352");
}

for(i = 368; i <= 416; i += CELL_SIZE) {
    BLOCKED_POSITIONS.add("608," + i);
}

for(i = 304; i <= 352; i += CELL_SIZE) {
    BLOCKED_POSITIONS.add(i + ",432");
}

for(i = 448; i <= 608; i += CELL_SIZE) {
    BLOCKED_POSITIONS.add(i + ",432");
}

for(i = 448; i <= 512; i += CELL_SIZE) {
    BLOCKED_POSITIONS.add("352," + i);
}

BLOCKED_POSITIONS.add("448,448");
BLOCKED_POSITIONS.add("448,464");
BLOCKED_POSITIONS.add("448,480");

BLOCKED_POSITIONS.add("304,464");
BLOCKED_POSITIONS.add("304,480");

for(i = 240; i <= 304; i += CELL_SIZE) {
    BLOCKED_POSITIONS.add(i + ",496");
}

for(i = 240; i <= 336; i += CELL_SIZE) {
    BLOCKED_POSITIONS.add(i + ",512");
}

// Blocking object cells
// Upper room - middle graves
BLOCKED_POSITIONS.add("448,192");
BLOCKED_POSITIONS.add("464,192");
BLOCKED_POSITIONS.add("480,192");
BLOCKED_POSITIONS.add("496,192");
BLOCKED_POSITIONS.add("448,208");
BLOCKED_POSITIONS.add("464,208");
BLOCKED_POSITIONS.add("480,208");
BLOCKED_POSITIONS.add("496,208");

// Upper room - left graves
BLOCKED_POSITIONS.add("288,192");
BLOCKED_POSITIONS.add("304,192");
BLOCKED_POSITIONS.add("320,192");
BLOCKED_POSITIONS.add("288,208");
BLOCKED_POSITIONS.add("304,208");
BLOCKED_POSITIONS.add("320,208");

// Upper room - right graves
BLOCKED_POSITIONS.add("608,192");
BLOCKED_POSITIONS.add("624,192");
BLOCKED_POSITIONS.add("640,192");
BLOCKED_POSITIONS.add("608,208");
BLOCKED_POSITIONS.add("624,208");
BLOCKED_POSITIONS.add("640,208");
BLOCKED_POSITIONS.add("608,240");
BLOCKED_POSITIONS.add("624,240");
BLOCKED_POSITIONS.add("640,240");

// First Room
// Upper grave
BLOCKED_POSITIONS.add("48,304");
BLOCKED_POSITIONS.add("64,304");
BLOCKED_POSITIONS.add("48,320");
BLOCKED_POSITIONS.add("64,320");

// Lower graves
for(i = 64; i <= 192; i += CELL_SIZE) {
    BLOCKED_POSITIONS.add(i + ",480");
}

// Lower Room
BLOCKED_POSITIONS.add("384,640");
BLOCKED_POSITIONS.add("400,640");
BLOCKED_POSITIONS.add("416,640");
BLOCKED_POSITIONS.add("384,656");
BLOCKED_POSITIONS.add("400,656");
BLOCKED_POSITIONS.add("416,656");
BLOCKED_POSITIONS.add("240,528");

// Interaction spots

(async () => {
    await resources.waitForTexts();

    // First Room
    INTERACTION_POSITIONS.set("80,272", resources.texts.stories[1]);
    INTERACTION_POSITIONS.set("96,272", resources.texts.stories[1]);

    INTERACTION_POSITIONS.set("208,272", resources.texts.stories[0]);
    INTERACTION_POSITIONS.set("224,272", resources.texts.stories[0]);

    INTERACTION_POSITIONS.set("256,304", resources.texts.facts[3]);

    INTERACTION_POSITIONS.set("48,480", resources.texts.stories[7]);
    INTERACTION_POSITIONS.set("64,464", resources.texts.stories[7]);
    INTERACTION_POSITIONS.set("80,464", resources.texts.stories[7]);
    INTERACTION_POSITIONS.set("96,464", resources.texts.stories[7]);
    INTERACTION_POSITIONS.set("112,464", resources.texts.stories[8]);
    INTERACTION_POSITIONS.set("128,464", resources.texts.stories[8]);
    INTERACTION_POSITIONS.set("144,464", resources.texts.stories[8]);
    INTERACTION_POSITIONS.set("160,464", resources.texts.stories[7]);
    INTERACTION_POSITIONS.set("176,464", resources.texts.stories[7]);
    INTERACTION_POSITIONS.set("192,464", resources.texts.stories[7]);
    INTERACTION_POSITIONS.set("208,480", resources.texts.stories[7]);

    INTERACTION_POSITIONS.set("48,288", resources.texts.stories[9]);
    INTERACTION_POSITIONS.set("64,288", resources.texts.stories[9]);
    INTERACTION_POSITIONS.set("80,304", resources.texts.stories[9]);
    INTERACTION_POSITIONS.set("80,320", resources.texts.stories[9]);
    INTERACTION_POSITIONS.set("64,336", resources.texts.stories[9]);
    INTERACTION_POSITIONS.set("48,336", resources.texts.stories[9]);

    INTERACTION_POSITIONS.set("208,400", resources.texts.facts[9]);

    // Upper Room
    INTERACTION_POSITIONS.set("288,256", resources.texts.facts[2]);
    INTERACTION_POSITIONS.set("288,272", resources.texts.facts[2]);
    
    INTERACTION_POSITIONS.set("304,128", resources.texts.facts[7]);
    INTERACTION_POSITIONS.set("320,128", resources.texts.facts[7]);

    INTERACTION_POSITIONS.set("384,128", resources.texts.facts[4]);
    INTERACTION_POSITIONS.set("400,128", resources.texts.facts[4]);
    INTERACTION_POSITIONS.set("416,128", resources.texts.facts[4]);

    INTERACTION_POSITIONS.set("560,128", resources.texts.facts[5]);
    INTERACTION_POSITIONS.set("576,128", resources.texts.facts[5]);

    INTERACTION_POSITIONS.set("608,128", resources.texts.stories[10]);
    INTERACTION_POSITIONS.set("624,128", resources.texts.stories[10]);

    INTERACTION_POSITIONS.set("288,176", resources.texts.facts[0]);
    INTERACTION_POSITIONS.set("304,176", resources.texts.facts[0]);
    INTERACTION_POSITIONS.set("320,176", resources.texts.facts[0]);
    INTERACTION_POSITIONS.set("336,192", resources.texts.facts[0]);

    INTERACTION_POSITIONS.set("336,208", resources.texts.stories[11]);
    INTERACTION_POSITIONS.set("320,224", resources.texts.stories[11]);
    INTERACTION_POSITIONS.set("304,224", resources.texts.stories[11]);
    INTERACTION_POSITIONS.set("288,224", resources.texts.stories[11]);

    INTERACTION_POSITIONS.set("448,176", resources.texts.stories[13]);
    INTERACTION_POSITIONS.set("464,176", resources.texts.stories[13]);
    INTERACTION_POSITIONS.set("480,176", resources.texts.stories[13]);
    INTERACTION_POSITIONS.set("496,176", resources.texts.stories[13]);
    INTERACTION_POSITIONS.set("512,192", resources.texts.stories[13]);
    INTERACTION_POSITIONS.set("512,208", resources.texts.stories[13]);
    INTERACTION_POSITIONS.set("496,224", resources.texts.stories[13]);
    INTERACTION_POSITIONS.set("480,224", resources.texts.stories[13]);
    INTERACTION_POSITIONS.set("464,224", resources.texts.stories[13]);
    INTERACTION_POSITIONS.set("448,224", resources.texts.stories[13]);
    INTERACTION_POSITIONS.set("432,208", resources.texts.stories[13]);
    INTERACTION_POSITIONS.set("432,192", resources.texts.stories[13]);

    INTERACTION_POSITIONS.set("640,176", resources.texts.stories[12]);
    INTERACTION_POSITIONS.set("624,176", resources.texts.stories[12]);
    INTERACTION_POSITIONS.set("608,176", resources.texts.stories[12]);
    INTERACTION_POSITIONS.set("592,192", resources.texts.stories[12]);
    INTERACTION_POSITIONS.set("592,208", resources.texts.stories[12]);
    
    INTERACTION_POSITIONS.set("640,224", resources.texts.facts[1]);
    INTERACTION_POSITIONS.set("624,224", resources.texts.facts[1]);
    INTERACTION_POSITIONS.set("608,224", resources.texts.facts[1]);
    INTERACTION_POSITIONS.set("592,240", resources.texts.facts[1]);
    INTERACTION_POSITIONS.set("608,256", resources.texts.facts[1]);
    INTERACTION_POSITIONS.set("624,256", resources.texts.facts[1]);
    INTERACTION_POSITIONS.set("640,256", resources.texts.facts[1]);

    INTERACTION_POSITIONS.set("608,288", resources.texts.facts[8]);
    INTERACTION_POSITIONS.set("624,288", resources.texts.facts[8]);
    INTERACTION_POSITIONS.set("640,288", resources.texts.facts[8]);

    // Lower Room
    INTERACTION_POSITIONS.set("272,640", resources.texts.stories[2]);

    INTERACTION_POSITIONS.set("256,528", resources.texts.stories[3]);
    INTERACTION_POSITIONS.set("256,544", resources.texts.stories[3]);
    INTERACTION_POSITIONS.set("240,544", resources.texts.stories[3]);

    INTERACTION_POSITIONS.set("368,656", resources.texts.stories[4]);
    INTERACTION_POSITIONS.set("368,640", resources.texts.stories[4]);
    INTERACTION_POSITIONS.set("384,624", resources.texts.stories[4]);
    INTERACTION_POSITIONS.set("416,624", resources.texts.stories[5]);
    INTERACTION_POSITIONS.set("432,640", resources.texts.stories[5]);
    INTERACTION_POSITIONS.set("432,656", resources.texts.stories[5]);

    // Corridor
    INTERACTION_POSITIONS.set("384,384", resources.texts.stories[6]);
    INTERACTION_POSITIONS.set("400,384", resources.texts.stories[6]);
    INTERACTION_POSITIONS.set("416,384", resources.texts.stories[6]);
    INTERACTION_POSITIONS.set("384,400", resources.texts.stories[6]);
    INTERACTION_POSITIONS.set("400,400", resources.texts.stories[6]);
    INTERACTION_POSITIONS.set("416,400", resources.texts.stories[6]);

    INTERACTION_POSITIONS.set("448,416", resources.texts.facts[6]);
    INTERACTION_POSITIONS.set("464,416", resources.texts.facts[6]);
    INTERACTION_POSITIONS.set("480,416", resources.texts.facts[6]);
    INTERACTION_POSITIONS.set("496,416", resources.texts.facts[6]);
    INTERACTION_POSITIONS.set("512,416", resources.texts.facts[6]);
})();

// Upper Exit interaction positions
UPPER_EXIT_POSITIONS.add("144,272");
UPPER_EXIT_POSITIONS.add("160,272");

// Second upper exit interaction positions
UPPER_EXIT_2_POSITIONS.add("448,128");
UPPER_EXIT_2_POSITIONS.add("464,128");
UPPER_EXIT_2_POSITIONS.add("480,128");

// right exit interaction positions
RIGHT_EXIT_POSITIONS.add("528,384");
RIGHT_EXIT_POSITIONS.add("528,400");

// lower exit interaction positions
LOWER_EXIT_POSITIONS.add("320,560");
LOWER_EXIT_POSITIONS.add("336,560");

// entrance interaction positions
ENTRANCE_POSITIONS.add("112,384");
ENTRANCE_POSITIONS.add("112,400");