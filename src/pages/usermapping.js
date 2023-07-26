const userMappings = [
    {
        ////// Afaq Ahmad
    //   signUpUserId: 'U123', // Unique ID for the signed-up user
      rbUserId: 6237218, // Redbooth ID
      cfUserId: '643d520bb3a5a87f7326e713' // Clockify userID 
    },

    ///// Ali Nasir
    {
        rbUserId: 2277126, // Redbooth ID
        cfUserId: '6450e2fbe3a70a72f83171b6' // Clockify userID
    },

    //////// Amir
    {
        rbUserId: null, // Redbooth ID
        cfUserId: '643396ff3571b66d0266969d' // Clockify userID
    },

    ///////Asim khan
    {
        rbUserId: 6237221, // Redbooth ID
        cfUserId: '643d52dbe07f9c73389f5c21' // Clockify userID
    },

    ///////Haider Ali
    {
        rbUserId: 1298545 , // Redbooth ID
        cfUserId: '643d15ffd00ede21e7bb9e20' // Clockify userID
    },

    ////////Amandeep kaur
    {
        rbUserId: null ,// Redbooth ID
        cfUserId: '643d4556b3a5a87f732441c8' // Clockify userID
    },

    ///////Mohammad Amir
    {
        rbUserId: 407079, // Redbooth ID
        cfUserId: '643c7ec9e07f9c733889986f' // Clockify userID
    },

    /////// Manoj Chauhan
    {
        rbUserId: 684974,// Redbooth ID
        cfUserId: '643d1616fdce3522c8a839cf' // Clockify userID
    },

    ////// Muhammad Sohail
    {
        rbUserId: 6237185, // Redbooth ID
        cfUserId: '643d4e6fd00ede21e7c4d83b' // Clockify userID
    },

    /////// Naeem ul Wahhab
    {
        rbUserId: 1297628, // Redbooth ID
        cfUserId: '643d15ffd00ede21e7bb9e23' // Clockify userID
    },

    /////// Nauman Faisal
    {
        rbUserId: 6237395, // Redbooth ID
        cfUserId: '643d5492cba3264fa79eefde' // Clockify userID
    },

    ////// Rakesh thakur
    {
        rbUserId: null , // Redbooth ID
        cfUserId: '643d5657fdce3522c8b32578' // Clockify userID
    },

    ////// Shehryar
    {
        rbUserId: 6240655,// Redbooth ID
        cfUserId: '643d4556b3a5a87f732441c9' // Clockify userID
    },

     ////// Sohaib Shah
     {
        rbUserId: 6237217,// Redbooth ID
        cfUserId: '643d538cb3a5a87f73273770' // Clockify userID
    },

     ////// Sohaib Ahmad
     {
        rbUserId: 1350763,// Redbooth ID
        cfUserId: '643d15ffd00ede21e7bb9e21' // Clockify userID
    },

     ////// Sunil Rawat
     {
        rbUserId: 1226545,// Redbooth ID
        cfUserId: '643d15ffd00ede21e7bb9e24' // Clockify userID
    },

     ////// Tayiba Batool
     {
        rbUserId: 6244588,// Redbooth ID
        cfUserId: '6447c22360d9e515477cf841' // Clockify userID
    },

     ////// Umair Shah
     {
        rbUserId: 1226167,// Redbooth ID
        cfUserId: '643d15ffd00ede21e7bb9e22' // Clockify userID
    },

     ////// VIjay
     {
        rbUserId: 6241288,// Redbooth ID
        cfUserId: '643d576dfdce3522c8b35c6c' // Clockify userID
    },
      
    ////// vishal
    {
        rbUserId: null,// Redbooth ID
        cfUserId: '643d4f60fdce3522c8b1a8d5' // Clockify userID
    },

    // Add more mappings here as needed
  ];
  
  // Function to get Redbooth ID for a signed-up user
  function getrbUserId(signUpUserId) {
    const mapping = userMappings.find((user) => user.signUpUserId === signUpUserId);
    return mapping ? mapping.rbUserId : null;
  }
  
  // Function to get Clockify username for a signed-up user
  function getcfUserId(signUpUserId) {
    const mapping = userMappings.find((user) => user.signUpUserId === signUpUserId);
    return mapping ? mapping.cfUserId : null;
  }
  
  // Example usage:
  const signedUpUserId = 'U123';
  const rbUserId = getrbUserId(signedUpUserId);
  const cfUserId = getcfUserId(signedUpUserId);
  
  console.log(`Signed up user ID: ${signedUpUserId}`);
  console.log(`Corresponding Redbooth ID: ${rbUserId}`);
  console.log(`Corresponding Clockify UserID: ${cfUserId}`);
  
