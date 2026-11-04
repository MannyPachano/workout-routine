// All exercises live here. Edit a name, set count or rep range in this file
// and every page picks it up.

export type Move = {
    name: string;
    reps: string;
    unit?: string;
    detail?: string;
};

export type Single = {
    kind: "single";
    name: string;
    sets: number;
    reps: string;
    unit?: string;
    detail?: string;
};

export type Superset = {
    kind: "superset";
    sets: number;
    a: Move;
    b: Move;
};

export type Timed = {
    kind: "timed";
    name: string;
    time: string;
};

export type Item = Single | Superset | Timed;

const move = (name: string, reps: string, unit?: string, detail?: string): Move => ({ name, reps, unit, detail });
const single = (name: string, sets: number, reps: string, unit?: string, detail?: string): Single => ({ kind: "single", name, sets, reps, unit, detail });
const superset = (sets: number, a: Move, b: Move): Superset => ({ kind: "superset", sets, a, b });
const timed = (name: string, time: string): Timed => ({ kind: "timed", name, time });

// Forearm exercises paired with chest movements
const forearm = {
    wristCurls: move("Wrist Curls", "12–20"),
    reverseWristCurls: move("Reverse Wrist Curls", "12–20"),
    pronationSupination: move("Dumbbell Pronation and Supination", "10–15", "per direction"),
    deviations: move("Ulnar and Radial Deviations", "12–20", "per direction"),
    fingerCurls: move("Finger Curls", "12–20"),
    fingerExtensions: move("Finger Extensions", "15–25", undefined, "rubber band"),
    plateHolds: move("Plate Pinch Holds", "30–45 sec"),
};

// Hip strengtheners paired with leg movements
const hip = {
    sideLyingAbduction: move("Side-Lying Hip Abductions", "15–20", "per side"),
    sideLyingAbductionHeavy: move("Side-Lying Hip Abductions", "8–12", "per side", "ankle weight"),
    clamshells: move("Clamshells", "15–25", "per side", "mini band"),
    hipFlexion: move("Standing Single-Leg Hip Flexion", "10–15", "per leg", "knee raises against a band"),
    fireHydrants: move("Fire Hydrants", "12–20", "per side", "mini band"),
    copenhagen: move("Copenhagen Planks", "20–30 sec", "per side"),
    lateralWalks: move("Banded Lateral Walks", "10–15 steps", "per direction"),
    cableAbduction: move("Standing Cable Hip Abductions", "12–15", "per side"),
};

// Trap exercises paired with back movements
const trap = {
    dumbbellShrugs: move("Dumbbell Shrugs", "12–20"),
    kelsoShrugs: move("Kelso Shrugs", "10–15"),
    barbellShrugs: move("Barbell Shrugs", "6–10"),
    lowTrapRaises: move("Single-Arm Cable Lower Trap Raises", "10–15", "per side", "cable strapped around the elbow"),
};

// Rear delt exercises paired with day 5 lower chest movements
const rearDelt = {
    reversePecDeck: move("Reverse Pec Deck Flyes", "12–20"),
    facePulls: move("Face Pulls", "12–20"),
    reverseFlyes: move("Bent-Over Dumbbell Reverse Flyes", "12–20"),
    cableRows: move("Seated Cable Rear Delt Rows", "8–12"),
};

const stretch5 = (name: string) => timed(name, "5 min");

export const chest: Record<"mid" | "incline" | "lower", Item[]> = {
    mid: [
        superset(5, move("Chest Press", "12–15"), forearm.wristCurls),
        superset(3, move("DB Press", "6–10"), forearm.reverseWristCurls),
        superset(3, move("Incline DB Press", "8–12"), forearm.pronationSupination),
        single("Tricep Pushdowns", 3, "8–12"),
        single("Rope Pushdowns", 3, "10–15"),
        single("Neck Flexor Circuit", 3, "30", "per exercise"),
        superset(3, move("Chest Press", "5–8"), forearm.plateHolds),
        stretch5("Dumbbell Chest Flye Stretch"),
    ],
    incline: [
        superset(5, move("Incline Chest Press", "12–15"), forearm.fingerCurls),
        superset(3, move("Flat DB Flyes", "6–10"), forearm.reverseWristCurls),
        superset(3, move("Underhand Incline DB Press", "8–12"), forearm.deviations),
        superset(3, move("One-Leg Glute Bridge w/ Opposite-Arm DB Press", "6–10", "per side"), forearm.fingerExtensions),
        single("Neck Flexor Circuit", 3, "30", "per exercise"),
        superset(3, move("Incline Chest Press", "5–8"), forearm.plateHolds),
        stretch5("Dumbbell Chest Flye Stretch"),
    ],
    lower: [
        superset(5, move("Decline Chest Press", "12–15"), rearDelt.reversePecDeck),
        superset(3, move("Decline DB Press", "6–10"), rearDelt.facePulls),
        superset(3, move("Dips", "8–12"), rearDelt.reverseFlyes),
        single("Neck Flexor Circuit", 3, "30", "per exercise"),
        superset(3, move("Decline Chest Press", "5–8"), rearDelt.cableRows),
        stretch5("Dumbbell Chest Flye Stretch"),
    ],
};

export const core: Record<"abs" | "obliques", Item[]> = {
    abs: [
        single("Hanging Knee Raises", 5, "max"),
        single("Roll-Outs", 3, "10–15"),
        single("Weighted Twisting Crunches", 3, "15–25"),
        timed("Ab Finisher (Pilates)", "5 min"),
    ],
    obliques: [
        single("Side Hanging Knee Raises", 5, "max"),
        single("Machine Ab Rotations", 3, "12–15", "per side"),
        single("Cable Oblique Raises", 3, "12–15", "per side"),
        timed("Ab Finisher (Pilates)", "5 min"),
    ],
};

export const back: Item[] = [
    superset(5, move("Seated Machine Rows", "12–15"), trap.dumbbellShrugs),
    superset(3, move("Single-Arm Cable Pulldowns", "6–12", "per side"), trap.lowTrapRaises),
    superset(3, move("Dumbbell Rows", "8–12"), trap.kelsoShrugs),
    single("Bicep Curls", 3, "8–12"),
    single("Reverse Barbell Curls", 3, "8–12"),
    single("Rear Neck Circuit", 3, "30", "per station", "Flexions · Rotations · Lateral Flexions"),
    superset(3, move("Seated Machine Rows", "5–8"), trap.barbellShrugs),
    stretch5("Doorway Lat/Shoulders Stretch"),
];

export const quads: Item[] = [
    superset(5, move("Leg Extensions", "12–15"), hip.sideLyingAbduction),
    superset(2, move("Squat Jumps", "5–10"), hip.clamshells),
    superset(2, move("Heiden Jumps", "3–6", "per direction"), hip.hipFlexion),
    superset(3, move("Pistol Squats", "5–10", "per leg"), hip.fireHydrants),
    superset(3, move("Reverse Nordic Curls", "5–10"), hip.copenhagen),
    superset(3, move("Side Lunges", "6–10", "per leg"), hip.lateralWalks),
    superset(3, move("Tibialis Raises", "12–20"), hip.cableAbduction),
    superset(3, move("Leg Extensions", "5–8"), hip.sideLyingAbductionHeavy),
    stretch5("Supported Hip Flexor Stretch"),
];

export const arms: Item[] = [
    single("Tricep Extensions", 5, "12–15"),
    single("Tricep Pushdowns", 3, "8–12"),
    single("DB Overhead Tricep Extensions", 3, "10–15"),
    single("Barbell Bicep Curls", 3, "8–12"),
    single("Reverse Barbell Curls", 3, "8–12"),
    single("Lateral Neck Circuit", 3, "20", "per station, both sides", "Lateral Flexions · Rotations · Isometric Holds"),
    single("Tricep Extensions", 3, "5–8"),
    stretch5("Frog Stretch"),
];

export const shoulders: Item[] = [
    single("Machine Lateral Raises", 5, "12–15"),
    single("Low Cable Shoulder Press", 3, "6–10"),
    single("Lu Raises", 3, "12–20"),
    single("Incline Bench DB Lateral Raises", 3, "12–20"),
    single("Bent Over DB Lateral Raises", 3, "12–20"),
    single("Machine Lateral Raises", 3, "5–8"),
    stretch5("Supported Hangs"),
];

export const glutes: Item[] = [
    superset(5, move("Hamstring Curls", "12–15"), hip.lateralWalks),
    superset(3, move("Hip Thrusts", "6–12"), hip.clamshells),
    superset(3, move("Single-Leg Deadlifts", "6–10", "per leg"), hip.sideLyingAbduction),
    superset(3, move("Calf Raises", "10–15"), move("Hyperextensions", "10–15")),
    superset(3, move("Seated Calf Raises", "15–25"), hip.fireHydrants),
    superset(3, move("Hamstring Curls", "5–8"), hip.hipFlexion),
    stretch5("Folded Over Hamstring Stretch"),
];

export const mobility: string[] = [
    "Pigeon Stretch",
    "90/90 Lift Offs",
    "Frog Stretch",
    "Internal Hip Lift Offs",
    "Nordic Curl Stretch",
    "Single Leg Nordic Curl Pulls",
    "QL Raises",
    "Split Work",
    "Slow Sumo Squats",
];
