

export async function dnsLookup(domain, type) {
  console.log(`performing dns lookup for ${domain}, type ${type}`)
  let url;
  if (type) {
    url = `https://1.1.1.1/dns-query?name=${domain}&type=${type}`
  } else {
    url = `https://1.1.1.1/dns-query?name=${domain}`
  } 
  const resp = await fetch(url, { headers: { 'accept': 'application/dns-json' }})
  if (resp.ok) {
    return await resp.json();
  } else {
    throw resp.status
  }
}