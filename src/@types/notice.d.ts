interface INotice {
    _id: number;
    title: string;
    content: string;
    attachment: Array<string>;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
