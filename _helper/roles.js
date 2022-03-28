const roles = {

    superAdmin: {
        key: '300',
        value: 'Super Admin',
        permissions: [
            // DASHBOARD
            'view-dashboard',


            //Work Flow

            'create-workflow',
             


            //Template Listing

            'view-all-template-listing',

            //User Listing
            'view-company-users-listing',
            
            //Document Listing 


            'view-document-listing',
            
        ],
    },

    // Company Admin
    admin: {
        key: '301',
        value: 'Admin',
        permissions: [
                // DASHBOARD
                'view-dashboard',


                //Work Flow
    
                'create-workflow',
                 
    
    
                //Template Listing
    
                'view-all-template-listing',
    


                  //User Listing

                  'view-company-users-listing',
    
                //Document Listing 
    
    
                'view-document-listing',
        ],
    },

    manager: {
        key: '302',
        value: 'Manager',
        permissions: [
                 // DASHBOARD
                 'view-dashboard',


                 //Work Flow
     
                 'create-workflow',
                  
     
     
                 //Template Listing
     
                 'view-all-template-listing',
     

                  //User Listing

                  'view-company-users-listing',
     
                 //Document Listing 
     
     
                 'view-document-listing',
        ],
    },

    employee: {
        key: '303',
        value: 'Employee',
        permissions: [
                  // DASHBOARD
                  'view-dashboard',


                  //Work Flow
      
                  'create-workflow',
                   
      
      
                  //Template Listing
      
                  'view-all-template-listing',
      
      
                  //User Listing

                  'view-company-users-listing',

                  //Document Listing 
      
      
                  'view-document-listing',

                  
        ],
    }

};

module.exports = roles;
