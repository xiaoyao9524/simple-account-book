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