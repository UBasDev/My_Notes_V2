/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images:{
    remotePatterns:[
      {
        protocol: `https`,
        hostname: `assets.coingecko.com*`,
          //hostname: `**.example.com` ->Bu wildcard ile hostnamein sonu `.example.com` şeklinde biten tüm routelara izin verir, başlangıç kısmını kontrol etmez.
          //hostname: `*bcde.co*` ->Bu wildcard ile hostnameinin içerisindeki sadece `bcde.co` textinin olduğunu kontrol edecek, en başındaki `*` ve en sonundaki `*` karakterler ise herhangi bir değer alabilirler.
        //port: ``,
        //pathname: `/account123/**`, //Bu wildcard ile `/account123` path adıyla başlayan tüm routelara izin verir, URLin geri kalanını kontrol etmez.
      }
    ]
  }
}

module.exports = nextConfig
