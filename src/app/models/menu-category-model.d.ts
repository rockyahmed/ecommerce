export interface menuCategory {
  categoryName: string | null | undefined;
  categoryID: number | null | undefined;
  fkParentID?: number | undefined | '';
  subsections?:menuCategory[];
}
// export interface childItems {
//   id: number;
//   subSections?: childItems[];
// }