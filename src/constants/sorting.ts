export const SORT_DIRECTIONS: Record<string, string> = {
  ASC: "asc",
  DESC: "desc",
};

export type SortableValue = number;
export type GenericObject = Record<string, any>;

export const SORT_FUNCTIONS = {
  [SORT_DIRECTIONS.ASC]:
    (selector: (obj: any) => SortableValue) =>
    (a: GenericObject, b: GenericObject) =>
      selector(a) - selector(b),
  [SORT_DIRECTIONS.DESC]:
    (selector: (obj: any) => SortableValue) =>
    (a: GenericObject, b: GenericObject) =>
      selector(b) - selector(a),
};
