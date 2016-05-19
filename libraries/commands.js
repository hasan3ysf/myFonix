   // Let's define our first command. First the text we expect, and then the function it should call
  
  var commands = {
    'hello :name *term': function(name) {
      alert('hello '+name+'');
    },
    
   'items identification': {
         'regexp': /^(What is|What's|Could you please tell me|Could you please give me) the meaning of (TF|FFS|SF|SHF|FF|Tube Film|Shrink Film|Stretch Hood|Stretch Hood Film|Flat Film)$/,
         'callback': itemsIdentification,
   },
   
   'ML SoH': {
         'regexp': /^(What is|What's|Could you please tell me|Could you please give me) the (stock|inventory) of ML$/,
         'callback': mlSOH,
   },
    
    'Report stock on hand': {
         'regexp': /^(What is|What's) (our|the) (stock|inventory|SoH) of (TF|FFS|SF|SHF|FF|Tube Film|Shrink Film|Stretch Hood|Stretch Hood Film|Flat Film)$/,
         'callback': SoH,
        },

     'Basic Mathematical Opertions': {
               // ?\s? can be used instead of space, also could use /i instead of $/,
                'regexp': /^(What is|What's|Calculate|How much is) ([\w.]+) (\+|and|plus|\-|less|minus|\*|\x|by|multiplied by|\/|over|divided by) ([\w.]+)$/,
                'callback': math,
              },
  };
  
