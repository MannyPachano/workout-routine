// Arnold Schwarzenegger's prime double split, reconstructed.
// reps holds one target per set, so pyramids show set by set.

export type Move = { name: string; reps: string[] };

export type Block =
    | { kind: "superset"; letter: string; rest: number; restLabel: string; a: Move; b: Move }
    | { kind: "straight"; name: string; reps: string[]; rest: number; restLabel: string; extra?: boolean; note?: string };

export type Section = { label?: string; blocks: Block[] };

export type Session = {
    when: "morning" | "afternoon";
    title: string;
    time: string;
    sections: Section[];
};

export type Workout = { key: "A" | "B"; sessions: Session[] };

const times = (n: number, r: string) => Array.from({ length: n }, () => r);
const list = (s: string) => s.split(",").map((r) => r.trim());

const ss = (letter: string, a: Move, b: Move): Block => ({ kind: "superset", letter, rest: 60, restLabel: "60 sec after each round", a, b });
const st = (name: string, reps: string[], rest: number, restLabel: string): Block => ({ kind: "straight", name, reps, rest, restLabel });
const extra = (name: string, reps: string, note: string): Block => ({ kind: "straight", name, reps: [reps], rest: 0, restLabel: "", extra: true, note });

export const workouts: Record<"A" | "B", Workout> = {
    A: {
        key: "A",
        sessions: [
            {
                when: "morning",
                title: "chest & back",
                time: "60 to 90 min",
                sections: [
                    {
                        label: "warm-up",
                        blocks: [
                            extra("Light Barbell Bench Press", "30–45", "warm-up, not counted"),
                            extra("Chin-Ups", "15", "warm-up, not counted"),
                        ],
                    },
                    {
                        label: "supersets",
                        blocks: [
                            ss("A", { name: "Barbell Bench Press", reps: list("15, 15, 12, 8, 6") }, { name: "Wide-Grip Chin-Ups", reps: list("15, 15, 12, 8, 6") }),
                            ss("B", { name: "Incline Barbell Press", reps: list("15, 12, 12, 10, 10") }, { name: "T-Bar Rows", reps: list("15, 12, 12, 10, 10") }),
                            ss("C", { name: "Dumbbell Flyes", reps: times(5, "10–15") }, { name: "Barbell Rows", reps: times(5, "10–15") }),
                            ss("D", { name: "Chest Dips", reps: times(5, "15") }, { name: "Close-Grip Chin-Ups", reps: times(5, "12") }),
                        ],
                    },
                    {
                        label: "straight sets",
                        blocks: [
                            st("Dumbbell Pullovers", times(5, "15–20"), 60, "60 sec"),
                            extra("Chest and Back Posing", "3–5 min", "finish, not counted"),
                        ],
                    },
                ],
            },
            {
                when: "afternoon",
                title: "legs, calves & abs",
                time: "90 to 120 min",
                sections: [
                    {
                        label: "legs",
                        blocks: [
                            st("Barbell Squats", times(5, "8"), 150, "2 to 3 min"),
                            st("Front Squats", times(5, "8–10"), 150, "2 to 3 min"),
                            st("Leg Press", times(5, "10"), 120, "2 min"),
                            st("Leg Extensions", times(5, "10"), 60, "60 sec"),
                            st("Lying Leg Curls", times(8, "10"), 60, "60 sec"),
                        ],
                    },
                    {
                        label: "calves",
                        blocks: [
                            st("Donkey Calf Raises", times(4, "10"), 60, "60 sec"),
                            st("Standing Calf Raises", list("15, 10, 8, 8"), 60, "60 sec"),
                        ],
                    },
                    {
                        label: "abs",
                        blocks: [
                            st("Crunches", times(3, "25"), 30, "30 sec"),
                            st("Bent-Over Torso Twists", ["100/side"], 30, "30 sec"),
                            st("Machine Crunches", times(3, "25"), 30, "30 sec"),
                            st("Crunches", ["50"], 0, ""),
                        ],
                    },
                ],
            },
        ],
    },
    B: {
        key: "B",
        sessions: [
            {
                when: "morning",
                title: "shoulders & arms",
                time: "100 to 150 min",
                sections: [
                    {
                        label: "shoulders",
                        blocks: [
                            extra("Clean and Press", "20–30", "warm-up, not counted · rest 90 sec"),
                            st("Arnold Press", times(5, "6"), 120, "2 min"),
                            st("Bent-Over Lateral Raises", times(5, "8–10"), 60, "60 sec"),
                            st("Side-Lying Lateral Raises", times(5, "12"), 60, "60 sec"),
                            st("Cable Lateral Raises", times(5, "12"), 60, "60 sec"),
                            st("Dumbbell Front Raises", times(3, "12"), 60, "60 sec"),
                        ],
                    },
                    {
                        label: "biceps & triceps supersets",
                        blocks: [
                            ss("A", { name: "Incline Dumbbell Curls", reps: list("12, 10, 8, 6, 5") }, { name: "Cable Triceps Pushdowns", reps: times(5, "10") }),
                            ss("B", { name: "Alternating Dumbbell Curls", reps: list("12, 10, 8, 8, 8") }, { name: "Overhead Dumbbell Extensions", reps: times(5, "10") }),
                            ss("C", { name: "EZ-Bar Preacher Curls", reps: times(5, "10") }, { name: "Lying Dumbbell Extensions", reps: times(5, "10") }),
                            ss("D", { name: "Concentration Curls", reps: times(5, "10") }, { name: "Bench Dips", reps: times(5, "10") }),
                        ],
                    },
                    {
                        label: "forearms",
                        blocks: [
                            st("Reverse-Grip Preacher Curls", times(5, "10"), 60, "60 sec"),
                            st("Barbell Wrist Curls", times(5, "10"), 45, "45 sec"),
                            st("Reverse Wrist Curls", times(3, "10"), 45, "45 sec"),
                            extra("Shoulder and Arm Posing", "3–5 min", "finish, not counted"),
                        ],
                    },
                ],
            },
            {
                when: "afternoon",
                title: "calves & abs",
                time: "25 to 40 min",
                sections: [
                    {
                        blocks: [
                            st("Seated Calf Raises", times(4, "10"), 60, "60 sec"),
                            st("Reverse Crunches", times(4, "25"), 30, "30 sec"),
                            st("Seated Torso Twists", ["100/side"], 30, "30 sec"),
                            st("Vertical Bench Crunches", times(4, "25"), 30, "30 sec"),
                        ],
                    },
                ],
            },
        ],
    },
};

export const week = [
    { key: "mon", name: "monday", workout: "A" },
    { key: "tue", name: "tuesday", workout: "B" },
    { key: "wed", name: "wednesday", workout: "A" },
    { key: "thu", name: "thursday", workout: "B" },
    { key: "fri", name: "friday", workout: "A" },
    { key: "sat", name: "saturday", workout: "B" },
] as const;

// Working sets only; warm-ups and posing are not counted.
export const countSets = (blocks: Block[]) =>
    blocks.reduce((n, b) => n + (b.kind === "superset" ? b.a.reps.length * 2 : b.extra ? 0 : b.reps.length), 0);

export const sessionSets = (s: Session) => countSets(s.sections.flatMap((x) => x.blocks));
