$(document).ready(function() {
	   let tables = ['.etuk-table'];
	   for(var i=0; i<tables.length;i++){
		   //console.log(`making ${tables[i]} data-table`);
          $(tables[i]).DataTable();
        }
    });
    $('#example23').DataTable({
        dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ]
    });
