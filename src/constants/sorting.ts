export const SORT_DIRECTIONS: Record<string, string> = {
  ASC: 'asc',
  DESC: 'desc',
};

export type SortableValue = number;
export type GenericObject = Record<string, any>;

interface GenericSelector<T> {
  (item: T): SortableValue;
}

interface GenericSorter<T> {
  (selector: GenericSelector<T>): (a: T, b: T) => number;
}

export const SORT_FUNCTIONS: Record<string, GenericSorter<any>> = {
  [SORT_DIRECTIONS.ASC]:
    (selector: GenericSelector<any>) =>
    (_a: GenericObject, _b: GenericObject) => {
      if (_a === _b) return 0;
      return selector(_a) > selector(_b) ? 1 : -1;
    },
  [SORT_DIRECTIONS.DESC]:
    (selector: GenericSelector<any>) =>
    (_a: GenericObject, _b: GenericObject) => {
      if (_a === _b) return 0;
      return selector(_a) < selector(_b) ? 1 : -1;
    },
};
