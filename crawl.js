 const { JSDOM } = require('jsdom')
function getURLsFromHTML(htmlBody, baseURL) {

    const URLs = [];
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll('a')
    console.log(linkElements)
    for (const linkElement of linkElements) {
     if (linkElement.href.slice(0,1) === '/') {
        //relative url
      try {
        const URLObj = new URL(`${baseURL}${linkElement.href}`)
        URLs.push(URLObj.href)
      } catch (err) {
        console.log(`error with relative url: ${err.message}`)
      }
     
      } else {
        try {
          const URLObj = new URL(linkElement.href)
          URLs.push(URLObj.href)
        } catch (err) {
          console.log(`error with absolute url: ${err.message}`)
        }
       }
      
      
    }
    return URLs
  
}

function normaliseURL(urlString) {
       const urlObj = new URL(urlString)
   
      const hostPath = `${urlObj.hostname}${urlObj.pathname}`
      if (hostPath.length > 0 && hostPath.slice( -1 ) === `/`) {

        return hostPath.slice(0, -1)
              
      } else {
        //console.log(realHostPath)
        return hostPath;
      }
     
}

module.exports = {
    normaliseURL,
    getURLsFromHTML
}

