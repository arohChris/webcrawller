 const { JSDOM } = require('jsdom')
 

async function crawlPage(currentURL) {
  console.log(`actively crawling: ${currentURL}`)
 try {
  const resp = await fetch(currentURL)

  if (resp.status > 399){
    console.log(resp.status)
    console.log(`Error in fetch with status code: ${resp.status} on page: ${currentURL}`)
   return
  }

  const contentType = resp.headers.get('content-type')
  if (! contentType.includes('text/html')) {
    console.log(`non html response, content Type: ${contentType}, on page: ${currentURL}`)
    return
  }


  const respData =  await resp.text();
  console.log(respData);

 } catch (error) {
  console.log(`error in fetch: ${error.message} on page: ${currentURL}`)
 }
  
}






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
    getURLsFromHTML,
    crawlPage
}

