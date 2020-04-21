import { downloadFile, creatCsvFile } from "download-csv"

// example:
// const data = [
//     { name: "yona", phone: "7282" },
//     { name: "mikmek", phone: "827627" },
// ];

// const columns = {
//     name: "שם",
//     phone: "טלפון"
// }

// downloadExcel(data, columns, "names-phones") =>
// names-phones.xlsx
// טלפון         שם
// yona       7282
// mikmek     827627

const downloadExcel = (data, columns, name) => {
    downloadFile(creatCsvFile(data, columns), name + '.xlsx');
};

export default downloadExcel;