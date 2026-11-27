// Shared shape for anything shown as a card with one button per set or round.

export type Move = { name: string; reps: string[]; note?: string };

export type Block =
    | { kind: "superset"; letter: string; rest: number; restLabel: string; a: Move; b: Move }
    | { kind: "straight"; name: string; reps: string[]; rest: number; restLabel: string; extra?: boolean; note?: string };

// Working sets in a list of blocks. A superset round counts as two sets.
export const countSets = (blocks: Block[]) =>
    blocks.reduce((n, b) => n + (b.kind === "superset" ? b.a.reps.length * 2 : b.extra ? 0 : b.reps.length), 0);
