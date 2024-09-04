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

function mapObjectProperties<T extends object, K extends keyof T>(
  data: T[],
  columns: K[]
): Pick<T, K>[] {
  return data.map((item) => {
    const mappedItem: Partial<T> = {}
    columns.forEach((column) => {
      if (Object.prototype.hasOwnProperty.call(item, column)) {
        mappedItem[column] = item[column]
      }
    })
    return mappedItem as Pick<T, K>
  })
}

export { mapTableData, mapObjectProperties }
