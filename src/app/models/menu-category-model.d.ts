export interface menuCategory {
  categoryName: string | null | undefined;
  categoryID: number | null | undefined;
  fkParentID?: number | null | undefined | '';
  subsections?:menuCategory[];
}
// export interface childItems {
//   id: number;
//   subSections?: childItems[];
// }