# OSTISConferenceTableComponent
Installation instruction

1. Check, if OSTIS system is installed

    (otherwise):
    
      git clone https://github.com/ShunkevichDV/ostis.git
    
      cd ostis/scripts
      
      ./prepare.sh
      

2.git clone https://github.com/ivanChernik/OSTISConferenceTableComponent.git in any place

3.Put 'update_conference_table_component.sh' script into ostis/scripts folder

4.Copy 'conference_application_table.component' folder into ostis folder

5.Copy 'conference_application_table_code.scs', 'format_conference_application_table.scs' files into ostis/kb folder

6.Put links below if they don't exist in '/ostis/sc-web/client/templates/base.html' file


    <!-- jquery data table plugin -->
    <script src="https://cdn.datatables.net/1.10.15/js/jquery.dataTables.min.js"></script>
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.15/css/jquery.dataTables.min.css" />


#Start OSTIS system with integrated component:

cd ostis/scripts

chmod +x update_conference_table_component.sh

./update_conference_table_component.sh

./build_kb.sh

./run_sctp.sh

In new terminal tab in ostis/scripts folder (Ctrl+Shift+T):

./run_scweb.sh

Open localhost:8000 in browser and choose conference_application_table_code in external languages tab (second button above search input).

More details about ui-component development and integration see in: https://github.com/MikhailSadovsky/ostis-UI-component-sample/wiki

