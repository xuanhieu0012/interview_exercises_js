// Permissive line ending
const CRLF = /\r?\n/;

function parse(content, options) {
    let array = content.split('\n')
    let array2 =[]

    for(let i =0; i < array.length; i++){
       
        let splitStringToArray = array[i].split(options ? options.delim : ',')
        console.log(222,splitStringToArray)
        for(let j = 0; j < splitStringToArray.length; j++){
            
            if(splitStringToArray[j].includes('"') && splitStringToArray[j]!== ','){
               console.log( 1,splitStringToArray[j]+',' +splitStringToArray[j+1])
            }
        }
        // if(splitStringToArray.includes('"'))
        array2.push(splitStringToArray)
        
    }
    const array3 = array2.slice(0, array.length -1)

    //  for(let j = 1; j < array3.length-1  ; j++){
         
    //         if(array3[j].length !== array3[j+1].length){
    //             throw "it's not equal width'"
    //         }
    // }

    // console.log(1, array3)
    
    return array3
}

function parseRecords(content, options) {
    
    const internal = parse(content, options);
    
    let object = []
    //set header as first array
    let header = internal[0]
    // get new array of data except first element
    const newArray = internal.slice(1, internal.length )

    // first for loop will iterate through newArray
    for(let i = 0; i < newArray.length; i++){
        //set new data with first element of array
        let data = newArray[i]
        //create empty object
        let eachObject= {}
        // second for loop will assign key value pair into eachObject
        for(let j=0; j < internal[0].length; j++){
            eachObject[header[j]] = data[j];
            
        }
        //finally will push whole object into array
        object.push(eachObject)
    }
    
    return object

}

module.exports = {
    parse,
    parseRecords
}