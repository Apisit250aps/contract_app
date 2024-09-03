type RowData = Record<string, unknown>;

function mapTableData(
  columns: string[] | undefined,
  properties: string[],
  data: RowData[]
): RowData[] {
  return data.map((row) => {
    const newRow: RowData = {};
    
    properties.forEach((property, index) => {
      const key = columns ? columns[index] : property;
      if (property) {
        newRow[key] = row[property];
      }
    });

    return newRow;
  });
}

export { mapTableData };
