
function loadMap() {
    const script = `https://maps.googleapis.com/maps/api/js?key=&libraries=places&language=en&v=weekly`
    const scripts = document.getElementsByTagName('script')
  for (let i = 0; i <scripts.length; i++) {
    if (scripts[i].src.indexOf(script) === 0) {
      return script[i]
    }
  }
  const googleScript = document.createElement('script')
  googleScript.src = script
  googleScript.async = true
    googleScript.defer = true
    
    document.body.appendChild(googleScript)
    return googleScript
  
}

export default loadMap