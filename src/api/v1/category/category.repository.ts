import Category from "../../../models/category.model";

export default class CategoryRepository {
    public list = async () => {
        return Category.findAndCountAll({ where: { deletedAt: null } });
    };

    public create = async (categoryData: ICategory) => {
        return Category.create({ ...categoryData });
    };

    public delete = async (categoryId: number) => {
        return Category.destroy({ where: { _id: categoryId } });
    };

    public update = async (
        categoryId: number,
        categoryData: Partial<ICategory>
    ) => {
        return Category.update(
            { ...categoryData },
            { where: { _id: categoryId } }
        );
    };
}
