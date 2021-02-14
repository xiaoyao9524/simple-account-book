import { CategoryItemProps } from "../types/category";

export function classifyCategory (categoryList: CategoryItemProps[]) {
  const expenditureList: CategoryItemProps[] = [];
  const incomeList: CategoryItemProps[] = [];

  for (let item of categoryList) {
    if (item.categoryType === 0) {
      incomeList.push(item);
    } else {
      expenditureList.push(item);
    }
  }

  return {
    expenditureList,
    incomeList
  }
}

// 根据id列表排序类别
export function sortCategoryList (idList: number[], categoryList: CategoryItemProps[]): CategoryItemProps[] {
  const ret: CategoryItemProps[] = [];

  for (let id of idList) {
    const item = categoryList.find(i => i.id === id);

    if (item) {
      ret.push(item);
    }
  }

  return ret;
}