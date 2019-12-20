/**
 * Returns the properly formatted url for retrieving the favicon. This is attempted by trimming the start and end
 * to gain a url of the form '(www.)website.com'.
 * @param {string} url the url to process
 */
export const getFaviconURL = (url: string) => {
  let faviconURL = url.replace('https://', '').replace('http://', '')
  faviconURL = faviconURL.substring(0, faviconURL.indexOf('/'))
  return `http://icons.duckduckgo.com/ip2/${faviconURL}.ico`
}
