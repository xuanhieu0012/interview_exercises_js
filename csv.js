// Permissive line ending
const CRLF = /\r?\n/;

function parse(content, options) {
    let array = content.split('\n')
    let array2 =[]
    
    // first iterate array to get each sentence
    for(let i =0; i < array.length; i++){
        // split each sentence into array
        let splitStringToArray = array[i].split(options ? options.delim : ',')
        let array1 = []
        // iterate each word in the array after split line 11
        for(let j = 0; j < splitStringToArray.length; j++){
            // check if word[0] === quotes and next word in array has quotes
            if(splitStringToArray[j][0] === '"' && splitStringToArray[j + 1].includes('"')){
                //if true combine two words together and use split to eliminate double quotes and push to array 1
                array1.push((splitStringToArray[j] + ',' + splitStringToArray[j + 1]).slice(1,-1))
            
            }
            // check word if it's not includes quotes
            else if(!splitStringToArray[j].includes('"')){
                // if false just push word back to array 1
                array1.push(splitStringToArray[j])
            }
        }
        // push array1 into array2 after manipulate them in right format
        array2.push(array1)
    }
    
    const array3 = array2.slice(0, array.length -1)
    

    for(let j = 1; j < array3.length-1  ; j++){
    
            if(array3[j].length !== array3[j+1].length){
                throw "it's not equal width'"
            }
    }

    
    
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
