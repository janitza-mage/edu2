export interface RegularUnitPageFrameResponse {
    authorId: number;
    title: string;
    contentUrl: string | null;
}

// The backend returns the string "finish" for the "finish course" page, i.e. when the unitIndex is equal to the
// number of units. The caller can't know this in advance without loading the number of units.
export type GetUnitPageFrameResponse = RegularUnitPageFrameResponse | "finish";
