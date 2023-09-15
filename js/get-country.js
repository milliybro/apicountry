function getCountry(url) {
   let promise = new Promise((resolve, reject) => {
     let request = new XMLHttpRequest();
 
     request.onreadystatechange = function () {
       if (request.readyState === 4 && request.status === 200) {
         let dataJson = request.response;
         data = JSON.parse(dataJson);
         resolve(data);
       } else if (request.readyState === 4) {
         reject(request.statusText);
       }
     };
 
     request.timeout = 10000;
 
     request.open("GET", url);
 
     request.send();
   });
 
   return promise;
 }
 