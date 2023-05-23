import * as xlsx from 'xlsx';

export function excelToObject(filePath: string): { [key: string]: any }[] {
  const workbook: xlsx.WorkBook = xlsx.readFile(filePath);
  const sheetName: string = workbook.SheetNames[0];
  const worksheet: xlsx.WorkSheet = workbook.Sheets[sheetName];
  const data: any[][] = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

  const headers: string[] = data.shift() as string[];
  const result: { [key: string]: any }[] = [];

  data.forEach((row: any[]) => {
    const obj: { [key: string]: any } = {};
    headers.forEach((header, index) => {
      obj[header] = row[index];
    });
    result.push(obj);
  });

  return result;
}
