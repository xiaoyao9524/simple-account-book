export interface InsertCategoryProps {
  categoryType: number;
  title: string;
  icon: string;
  isDefault: number;
}

export interface CategoryItemProps extends InsertCategoryProps {
  readonly id: number;
}