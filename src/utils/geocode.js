const request = require('request')


const geocode =(address,callback) =>{
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoicmcyNDI1NSIsImEiOiJja2R2bDI0N24wODdrMzBxaXFlM2pudzdzIn0.rU6QLgwnu1kbx0MSAvZMew'
    request({url , json:true},(error,{body}={}) => {
        if(error){
            callback('Unable to connect to the location service!',undefined)
        }else if(!body.features.length){
        callback('Unable to find the location.Try another search! ',undefined)
        }else{
            
            callback(undefined,{
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location:body.features[0].place_name
            })
        }
    })

}
module.exports = geocode