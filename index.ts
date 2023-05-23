import path from 'path'
import { excelToObject, excelToMongoDB, saveExcelFile } from './lib'
import { Mongo_Credentials } from './config'


const file_path = path.join('data', 'test.xlsx')


/*** if you wanna see the result in terminal uncomment bellow lines and run ```npm run save``` ***/

// const result = excelToObject(file_path)
// console.log(result)



/*** if you wanna save file in DB uncomment the bellow lines and run ```npm run save```

    note: I wanted the data in my DB to be unique so you cannot save duplicated data in DB
    and it tells you which data is already stored in DB!

***/


const { Mongo_URI, DB_Name, Collection_Name } = Mongo_Credentials
excelToMongoDB(file_path, Mongo_URI, DB_Name, Collection_Name)


/*** if you wanna read a file in a directory and save it else where, uncomment the bellow lines and run ```npm run save``` ***/

// const inputFilePath = path.join('data', 'test.txt')
// const outputFilePath = path.join('static', 'main.txt')

// saveExcelFile(inputFilePath, outputFilePath);