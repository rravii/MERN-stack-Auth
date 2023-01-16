// converting image to base64 so we can store that image in the mongoDB
export default function convertToBase64(file) {

    // Promise is a JavaScript object that represents the eventual 
    // completion (or failure) of an asynchronous operation, and its resulting 
    // value. Promises are used to handle asynchronous operations in JavaScript, 
    // such as fetching data from a server or reading a file. They provide a way
    // to register callbacks to be called once the promise is fulfilled (resolved) 
    // or rejected. A promise can be in one of three states: pending, fulfilled, or rejected.

    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
            resolve(fileReader.result)
        }

        fileReader.onerror = (error) => {
            reject(error)
        }
    })
}