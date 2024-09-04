type RowData = Record<string, unknown>

function mapTableData(
  columns: string[] | undefined,
  properties: string[],
  data: RowData[]
): RowData[] {
  return data.map((row) => {
    const newRow: RowData = {}

    properties.forEach((property, index) => {
      const key = columns ? columns[index] : property
      if (property) {
        newRow[key] = row[property]
      }
    })

    return newRow
  })
}
type WithOptionalId<T> = T & { _id?: string };

function mapObjectProperties<T extends WithOptionalId<object>, K extends keyof T>(
  data: T[],
  columns: K[]
): Pick<T, K | '_id'>[] {
  return data.map((item) => {
    const mappedItem: Partial<T> = {};
    
    // Always include _id if it exists
    if ('_id' in item && item._id !== undefined) {
      mappedItem._id = item._id;
    }

    columns.forEach((column) => {
      if (Object.prototype.hasOwnProperty.call(item, column)) {
        mappedItem[column] = item[column];
      }
    });

    return mappedItem as Pick<T, K | '_id'>;
  });
}

export { mapTableData, mapObjectProperties }
