import { IClub } from "../../../@types/club";
import ClubRepository from "./club.repository";
import * as Yup from "yup";

export default class ClubService {
    public getClubDetail = (clubId: number) => {
        return new ClubRepository().detail(clubId);
    };

    public getClubList = (page: number, size: number) => {
        return new ClubRepository().list(page, size);
    };

    public searchClub = (
        page: number,
        size: number,
        keyword: string,
        category?: string
    ) => {
        return new ClubRepository().search(keyword, category, page, size);
    };

    public createClub = (clubData: IClub) => {
        return new ClubRepository().create(clubData);
    };

    public deleteClub = (clubId: IClub["_id"]) => {
        return new ClubRepository().delete(clubId);
    };

    public updateClub = (clubId: IClub["_id"], clubData: Partial<IClub>) => {
        return new ClubRepository().update(clubId, clubData);
    };
}
