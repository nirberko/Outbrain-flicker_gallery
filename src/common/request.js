import jsonp from "jsonp";

export default (url) => new Promise((resolve, reject) => {
    jsonp(url, {
        name: "jsonFlickrFeed"
    }, (err, data) => {
        if (err) {
            reject(err)
        } else {
            resolve(data)
        }
    })
})
