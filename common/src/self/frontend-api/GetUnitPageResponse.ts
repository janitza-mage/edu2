export interface RegularUnitPageResponse {
    authorId: number;
    title: string;
    // TODO rename to contentUrl since it now also shows the unit description
    contentUrl: string | null;
}

// TODO rename to GetUnitPageFrameResponse
// The backend returns the string "finish" for the "finish course" page, i.e. when the unitIndex is equal to the
// number of units. The caller can't know this in advance without loading the number of units.
export type GetUnitPageResponse = RegularUnitPageResponse | "finish";
