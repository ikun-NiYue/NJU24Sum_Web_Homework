export interface Member {
    username: string;
    isOnline: boolean;
}

export interface CircleBody {
    id : number;
    name : string;
    description : string;
    creator : string;
    numTotalMembers : number;
    numTotalOnline : number;
    members: Member[];
}