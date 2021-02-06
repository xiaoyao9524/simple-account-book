export interface InsertCategoryProps {
  categoryType: number;
  title: string;
  icon: string;
}

export interface CategoryItemProps extends InsertCategoryProps {
  readonly id: number;
}