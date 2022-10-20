/* eslint-disable no-undef */
/**
 * Copyright (c) 2022 - Ferdon Vietnam Limited
 *
 * @author  NNTruong / nhuttruong6496@gmail.com
 */

export function cryptoRandomString({length = 5} = {}) {
  return crypto.randomBytes(length).toString('hex');
}

export const compact = (string = '', lg = 20, position) => {
  if (string?.length > lg) {
    if (position === 'end') {
      return string.substr(0, lg) + '...';
    }

    return (
      string.substring(0, lg / 2) +
      '...' +
      string.substring(string.length - lg / 2, string.length)
    );
  }

  return string;
};

export const getName = info => {
  return (info.firstName || '') + ' ' + (info.lastName || '');
};
export const deepClone = (object = {}) => {
  return JSON.parse(JSON.stringify(object));
};

export const asset = {
  decimals: 6,
  name: 'ADA',
  unitName: '₳',
  amount: '0',
};
