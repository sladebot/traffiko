var fs = require('fs')


fs.readFile('public/parallelCoordinates.json', (err, data) => {
  var jsonData = JSON.parse(data)
  jsonData.map(d => {
    if(d.zipCode < 10000) {
      
      console.log('Found id - ' + d._id)
    }
  })
})