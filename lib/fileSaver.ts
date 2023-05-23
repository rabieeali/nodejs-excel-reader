import { MongoClient } from 'mongodb';
import * as xlsx from 'xlsx';

export async function excelToMongoDB(filePath: string, mongoURI: string, dbName: string, collectionName: string): Promise<void> {
    const workbook: xlsx.WorkBook = xlsx.readFile(filePath);
    const sheetName: string = workbook.SheetNames[0];
    const worksheet: xlsx.WorkSheet = workbook.Sheets[sheetName];
    const data: any[][] = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

    const headers: any[] = data.shift() as any[];
    const documents: { [key: string]: any }[] = [];

    data.forEach((row: any[]) => {
        const obj: { [key: string]: any } = {};
        headers.forEach((header, index) => {
            obj[header] = row[index];
        });
        documents.push(obj);
    });

    const client: MongoClient = new MongoClient(mongoURI);

    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        const savedDocuments: { [key: string]: any }[] = [];
        const existingDocuments: { [key: string]: any }[] = [];

        for (const document of documents) {
            const existingDoc = await collection.findOne(document);

            if (existingDoc) {
                existingDocuments.push(document);
            } else {
                savedDocuments.push(document);
                await collection.insertOne(document);
            }
        }

        if (savedDocuments.length > 0) {
            console.log(`${savedDocuments.length} new record(s) saved to MongoDB successfully:`);
            console.log(savedDocuments);
        } else {
            console.log('No new records to save.');
        }

        if (existingDocuments.length > 0) {
            console.log(`${existingDocuments.length} record(s) already exist in the database and will not be saved:`);
            console.log(existingDocuments);
        }
    } catch (error) {
        console.error('Error saving data to MongoDB:', error);
    } finally {
        client.close();
    }
}