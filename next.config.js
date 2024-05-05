/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains:[
            "utfs.io"
        ]
    },
    typescript: {
        ignoreBuildErrors: true,
      },
}

module.exports = nextConfig
