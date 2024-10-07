import CategoryRepository from "./category.repository";

export default class CategoryService {
    public list = async () => {
        return new CategoryRepository().list();
    };

    public createCategory = async (categoryData: ICategory) => {
        return new CategoryRepository().create(categoryData);
    };

    public deleteCategory = async (categoryId: number) => {
        return new CategoryRepository().delete(categoryId);
    };

    public updateCategory = async (
        categoryId: number,
        categoryData: Partial<ICategory>
    ) => {
        return new CategoryRepository().update(categoryId, categoryData);
    };
}
