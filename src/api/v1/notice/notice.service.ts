import NoticeRepository from "./notice.repository";

export default class NoticeService {
    public list = (page?: number, size?: number) => {
        return new NoticeRepository().list(page, size);
    };

    public detail = (noticeId: INotice["_id"]) => {
        return new NoticeRepository().detail(noticeId);
    };

    public create = (noticeData: INotice) => {
        return new NoticeRepository().create(noticeData);
    };

    public delete = (noticeId: INotice["_id"]) => {
        return new NoticeRepository().delete(noticeId);
    };
}
