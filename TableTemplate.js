class TableTemplate {
    static fillIn(id, dict, columnName) {
      // Get the table element by its id
      const table = document.getElementById(id);
  
      // If the table doesn't exist, return early
      if (!table) {
        return;
      }
  
      // Get the header row of the table
      const headerRow = table.rows[0];
  
      // Replace template strings in the header row
      for (const cell of headerRow.cells) {
        cell.textContent = this.replaceTemplateStrings(cell.textContent, dict);
      }
  
      // If columnName is specified, find the column index
      let columnIndex = -1;
      if (columnName) {
        for (let i = 0; i < headerRow.cells.length; i++) {
          if (headerRow.cells[i].textContent === columnName) {
            columnIndex = i;
            break;
          }
        }
      }
  
      // If columnName is specified and found, fill in the column
      if (columnIndex !== -1) {
        for (let i = 1; i < table.rows.length; i++) {
          const cell = table.rows[i].cells[columnIndex];
          cell.textContent = this.replaceTemplateStrings(cell.textContent, dict);
        }
      }
  
      // Make the table visible if it was hidden
      if (table.style.visibility === 'hidden') {
        table.style.visibility = 'visible';
      }
    }
  
    static replaceTemplateStrings(text, dict) {
      // Use regular expressions to find and replace template strings
      return text.replace(/\{\{(\w+)\}\}/g, (match, property) => {
        // If the property exists in the dictionary, replace with its value; otherwise, replace with an empty string
        return dict[property] !== undefined ? dict[property] : '';
      });
    }
  }
  