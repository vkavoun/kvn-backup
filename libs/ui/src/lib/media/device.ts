const size = {
  mobileS: {
    min: '320px',
    max: '480px'
  },
  mobileM: {
    min: '320px',
    max: '568px'
  },
  mobileL: {
    min: '414px',
    max: '736px'
  },
  tablet: {
    min: '768px',
    max: '1024px'
  },
  tabletL: {
    min: '1024px',
    max: '1366px'
  },
  laptop: {
    min: '1224px'
  },
  desktop: {
    min: '1824px'
  }
};

export const device = {
  mobileS: `(min-device-width: ${size.mobileS.min}) and (max-device-width: ${size.mobileS.max})`,
  mobileM: `(min-device-width: ${size.mobileM.min}) and (max-device-width: ${size.mobileM.max})`,
  mobileL: `(min-device-width: ${size.mobileL.min}) and (max-device-width: ${size.mobileL.max})`,
  tablet: `(min-device-width: ${size.tablet.min}) and (max-device-width: ${size.tablet.max})`,
  tabletL: `(min-device-width: ${size.tabletL.min}) and (max-device-width: ${size.tabletL.max})`,
  laptop: `(min-width: ${size.laptop})`,
  desktop: `(min-width: ${size.desktop})`
};
