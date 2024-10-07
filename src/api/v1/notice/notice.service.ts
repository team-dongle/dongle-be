import NoticeRepository from "./notice.repository";

export default class NoticeService {
    public list = (page?: number, size?: number) => {
        return new NoticeRepository().list(page, size);
    };
}
