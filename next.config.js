/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/** @type {import("next").NextConfig} */
const config = {
  webpack: (config) => {
    config.resolve.alias.canvas = false

    return config
  },
}

export default config
