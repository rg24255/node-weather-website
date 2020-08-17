const request = require('request')

const forecast=(latitude,longitude,callback)=>{
   
    const url = 'http://api.weatherstack.com/current?access_key=d1c71207bf53e4cfa120edf318eb466f&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+''

    request({url,json : true},(error,{body}={})=>{
        if(error){
        callback('Unable to connect to Weather Service!',undefined)
        }else if( body.error){
          callback('Unable to find the location!',undefined)
        }
        else{
           callback(undefined,{
               
            msg: body.current.weather_descriptions[0]+' .Current temperature is '+ body.current.temperature+'  degrees,but it feelslike ' +body.current.feelslike+' out there!.'
           })
        }
    })

}

module.exports = forecast