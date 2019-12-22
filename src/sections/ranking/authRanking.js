const fetch =  require ('node-fetch')

const url =
    'https://accounts.google.com/o/oauth2/token?client_id=414884461150-q5t5769qhisv21v8nnpd6kdqrqlsua1h.apps.googleusercontent.com&client_secret=RZKM1myMA0mX3W4I1Agx9lu4&refresh_token=1//03lQ3nHvl07lRCgYIARAAGAMSNwF-L9IrfSU_rWGTTArlEM-1r0pzXO_mcn15NaUYikOWgP_pQhPrU_z_CBgTL3hzD5V7EbLHEBs&grant_type=refresh_token'

async function getInfoSheets  () {

    let options = {
        'method': 'post',
    }

    
     fetch(url, options)
    .then(res =>{ return res.json()})
    .then(res =>{ 
        
        console.log(res, 'ffdsfdsof0ds90f809sd')
    
    let accessToken = "Bearer " + res.access_token;

    const sheetUrl = 'https://sheets.googleapis.com/v4/spreadsheets/1DDbnsGxLsPAJIQflI7jNet3INpeEJ2yh5hUZOpVc7w8/values/hoja!A1:J13'

    options = {
        'method': 'get',
        'headers': {
            Authorization: accessToken
        }
    }

    fetch(sheetUrl, options)
    .then(res =>{ return res.json()})
    .then(res =>{ 
console.log('este es el resultado', res)

})

    })

}


    getInfoSheets()
    .then(res =>{ return res})
    .then(res =>{console.log(res) })



module.exports = getInfoSheets