import Notice from "../../../models/notice.model";

export default class NoticeRepository {
    public list = async (page?: number, size?: number) => {
        return Notice.findAndCountAll({
            limit: size,
            offset: size * (page - 1),
            order: [["createdAt", "DESC"]],
            where: { deletedAt: null },
            attributes: { exclude: ["content"] },
        });
    };

    public detail = async (noticeId: INotice["_id"]) => {
        return Notice.findOne({ where: { _id: noticeId } });
    };

    public create = async (noticeData: INotice) => {
        return Notice.create({ ...noticeData });
    };

    public delete = async (noticeId: INotice["_id"]) => {
        return Notice.destroy({ where: { _id: noticeId } });
    };
}
