import Notice from "../../../models/notice.model";

export default class NoticeRepository {
    public list = async (page?: number, size?: number) => {
        return Notice.findAndCountAll({
            limit: size,
            offset: size * (page - 1),
            order: [["createdAt", "DESC"]],
            where: { deletedAt: null },
        });
    };
}
