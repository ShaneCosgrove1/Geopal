var extrafield5 = [];
//  extrafield5.name1=  'v2123al'
//  extrafield5.name2=  '123l'

function g5(name, val) {
  //this[anObjectName]

  extrafield5[name] = val;
}

g5('test1', 123);
g5('test2', 12223);

console.log(extrafield5);

extrafield5;
/*
  var extrafield5 = function(name,val) {
  this.name = val
}
new extrafield5("hello", 123); 
new extrafield5("hello2", 1223); 

 
c
dc*/
