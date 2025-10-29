
// The global XLSX object is loaded from a CDN script in index.html
declare var XLSX: any;

export const parseExcelFile = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        if (!e.target?.result) {
            return reject(new Error("FileReader failed to read the file."));
        }

        const data = e.target.result;
        // Options:
        // - cellFormula: true ->
        //   - cell.f contains formula text
        // - cellHTML: false -> Prevent XSS; we only want the text content
        const workbook = XLSX.read(data, { type: 'array', cellFormula: true, cellHTML: false });

        let textualRepresentation = '';
        
        workbook.SheetNames.forEach((sheetName: string) => {
          textualRepresentation += `--- Sheet: "${sheetName}" ---\n\n`;
          const worksheet = workbook.Sheets[sheetName];
          const range = XLSX.utils.decode_range(worksheet['!ref'] || 'A1:A1');

          for (let R = range.s.r; R <= range.e.r; ++R) {
            for (let C = range.s.c; C <= range.e.c; ++C) {
              const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
              const cell = worksheet[cellAddress];
              
              if (cell && cell.v !== undefined) {
                let cellContent = `${cellAddress}: `;
                if (cell.f) { // If there is a formula
                  // Format value to 2 decimal places if it's a number
                  const formattedValue = typeof cell.v === 'number' ? cell.v.toFixed(2) : cell.v;
                  cellContent += `Formula= ${cell.f}, Value= ${formattedValue}`;
                } else { // Just a value
                  cellContent += `${cell.v}`;
                }
                textualRepresentation += cellContent + '\n';
              }
            }
          }
          textualRepresentation += '\n';
        });

        if (textualRepresentation.trim() === '') {
            reject(new Error("The Excel file seems to be empty or could not be read."));
        } else {
            resolve(textualRepresentation);
        }

      } catch (error) {
        console.error("Error parsing Excel file:", error);
        reject(new Error("Failed to parse the Excel file. It might be corrupted or in an unsupported format."));
      }
    };

    reader.onerror = (error) => {
        console.error("FileReader error:", error);
        reject(new Error("There was an error reading the file."));
    };
    
    reader.readAsArrayBuffer(file);
  });
};
