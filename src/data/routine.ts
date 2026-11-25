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

// Forearm exercises, done as supersets with abs or oblique exercises
const forearm = {
    wristCurls: move("Wrist Curls", "12–20"),
    reverseWristCurls: move("Reverse Wrist Curls", "12–20"),
    pronationSupination: move("Dumbbell Pronation and Supination", "10–15", "per direction"),
    deviations: move("Ulnar and Radial Deviations", "12–20", "per direction"),
    fingerExtensions: move("Finger Extensions", "15–25", undefined, "rubber band"),
    plateHolds: move("Plate Pinch Holds", "30–45 sec"),
};

// Hip strengtheners, done as supersets with abs or oblique exercises
const hip = {
    sideLyingAbduction: move("Side-Lying Hip Abductions", "15–20", "per side"),
    clamshells: move("Clamshells", "15–25", "per side", "mini band"),
    hipFlexion: move("Standing Single-Leg Hip Flexion", "10–15", "per leg", "knee raises against a band"),
    lateralWalks: move("Banded Lateral Walks", "10–15 steps", "per direction"),
    cableAbduction: move("Standing Cable Hip Abductions", "12–15", "per side"),
};

// Trap exercises, done as supersets with abs or oblique exercises
const trap = {
    dumbbellShrugs: move("Dumbbell Shrugs", "12–20"),
    kelsoShrugs: move("Kelso Shrugs", "10–15"),
    barbellShrugs: move("Barbell Shrugs", "6–10"),
    lowTrapRaises: move("Single-Arm Cable Lower Trap Raises", "10–15", "per side", "cable strapped around the elbow"),
};

// Rear delt exercises, done as supersets with abs exercises
const rearDelt = {
    reversePecDeck: move("Reverse Pec Deck Flyes", "12–20"),
    facePulls: move("Face Pulls", "12–20"),
    reverseFlyes: move("Bent-Over Dumbbell Reverse Flyes", "12–20"),
};

// The abs and oblique exercises. These stay as they are.
type Base = { sets: number; move: Move };

const absBase: Base[] = [
    { sets: 5, move: move("Hanging Knee Raises", "max") },
    { sets: 3, move: move("Roll-Outs", "10–15") },
    { sets: 3, move: move("Weighted Twisting Crunches", "15–25") },
];

const obliqueBase: Base[] = [
    { sets: 5, move: move("Side Hanging Knee Raises", "max") },
    { sets: 3, move: move("Machine Ab Rotations", "12–15", "per side") },
    { sets: 3, move: move("Cable Oblique Raises", "12–15", "per side") },
];

// Slots one accessory beside each abs exercise, in order. null means that abs
// exercise is done on its own. The superset uses the abs exercise's set count.
const coreSession = (base: Base[], partners: (Move | null)[]): Item[] => [
    ...base.map((b, i) => {
        const partner = partners[i];
        return partner
            ? superset(b.sets, b.move, partner)
            : single(b.move.name, b.sets, b.move.reps, b.move.unit, b.move.detail);
    }),
    timed("Ab Finisher (Pilates)", "5 min"),
];

const stretch5 = (name: string) => timed(name, "5 min");

// Main workouts: plain exercises only. Supersets live in the abs sessions below.
export const chest: Record<"mid" | "incline" | "lower", Item[]> = {
    mid: [
        single("Chest Press", 5, "12–15"),
        single("DB Press", 3, "6–10"),
        single("Incline DB Press", 3, "8–12"),
        single("Tricep Pushdowns", 3, "8–12"),
        single("Rope Pushdowns", 3, "10–15"),
        single("Neck Flexor Circuit", 3, "30", "per exercise"),
        single("Chest Press", 3, "5–8"),
        stretch5("Dumbbell Chest Flye Stretch"),
    ],
    incline: [
        single("Incline Chest Press", 5, "12–15"),
        single("Flat DB Flyes", 3, "6–10"),
        single("Underhand Incline DB Press", 3, "8–12"),
        single("One-Leg Glute Bridge w/ Opposite-Arm DB Press", 3, "6–10", "per side"),
        single("Neck Flexor Circuit", 3, "30", "per exercise"),
        single("Incline Chest Press", 3, "5–8"),
        stretch5("Dumbbell Chest Flye Stretch"),
    ],
    lower: [
        single("Decline Chest Press", 5, "12–15"),
        single("Decline DB Press", 3, "6–10"),
        single("Dips", 3, "8–12"),
        single("Neck Flexor Circuit", 3, "30", "per exercise"),
        single("Decline Chest Press", 3, "5–8"),
        stretch5("Dumbbell Chest Flye Stretch"),
    ],
};

export const back: Item[] = [
    single("Seated Machine Rows", 5, "12–15"),
    single("Single-Arm Cable Pulldowns", 3, "6–12", "per side"),
    single("Dumbbell Rows", 3, "8–12"),
    single("Bicep Curls", 3, "8–12"),
    single("Reverse Barbell Curls", 3, "8–12"),
    single("Rear Neck Circuit", 3, "30", "per station", "Flexions · Rotations · Lateral Flexions"),
    single("Seated Machine Rows", 3, "5–8"),
    stretch5("Doorway Lat/Shoulders Stretch"),
];

export const quads: Item[] = [
    single("Leg Extensions", 5, "12–15"),
    single("Squat Jumps", 2, "5–10"),
    single("Heiden Jumps", 2, "3–6", "per direction"),
    single("Pistol Squats", 3, "5–10", "per leg"),
    single("Reverse Nordic Curls", 3, "5–10"),
    single("Side Lunges", 3, "6–10", "per leg"),
    single("Tibialis Raises", 3, "12–20"),
    single("Leg Extensions", 3, "5–8"),
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
    single("Barbell Shoulder Press", 3, "6–10"),
    single("Lu Raises", 3, "12–20"),
    single("Isometric Dumbbell Lateral Raise Holds", 3, "20–30 sec"),
    single("Bent Over DB Lateral Raises", 3, "12–20"),
    single("Machine Lateral Raises", 3, "5–8"),
    stretch5("Supported Hangs"),
];

export const glutes: Item[] = [
    single("Hamstring Curls", 5, "12–15"),
    single("Hip Thrusts", 3, "6–12"),
    single("Single-Leg Deadlifts", 3, "6–10", "per leg"),
    single("Calf Raises", 3, "10–15"),
    single("Hyperextensions", 3, "10–15"),
    single("Seated Calf Raises", 3, "15–25"),
    single("Hamstring Curls", 3, "5–8"),
    stretch5("Folded Over Hamstring Stretch"),
];

// Abs and oblique sessions, one per day. Hanging raises are paired with
// exercises that need no grip, or that work the muscles opposite to the grip.
export const core = {
    d1: coreSession(absBase, [forearm.reverseWristCurls, forearm.wristCurls, forearm.pronationSupination]),
    d2: coreSession(obliqueBase, [trap.lowTrapRaises, trap.kelsoShrugs, null]),
    d3: coreSession(absBase, [hip.sideLyingAbduction, hip.clamshells, hip.hipFlexion]),
    d4: coreSession(obliqueBase, [forearm.fingerExtensions, forearm.deviations, forearm.plateHolds]),
    d5: coreSession(absBase, [rearDelt.reversePecDeck, rearDelt.facePulls, rearDelt.reverseFlyes]),
    d6: coreSession(obliqueBase, [null, trap.barbellShrugs, trap.dumbbellShrugs]),
    d7: coreSession(absBase, [hip.lateralWalks, hip.cableAbduction, null]),
};

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
