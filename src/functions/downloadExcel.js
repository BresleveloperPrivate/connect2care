import { downloadFile, creatCsvFile } from "download-csv"

const downloadExcel = (datas, columns, name) => {
    downloadFile(creatCsvFile(datas, columns), name + '.xlsx');
};

export default downloadExcel;