/**
 * Copyright (c) 2022 - Ferdon Vietnam Limited
 *
 * @author  NNTruong / nhuttruong6496@gmail.com
 */
const MockData = {
  notifications: [],
  documents: [],
  settings: {
    document: {
      typeDocument: {
        'Certificate of Analysis (COA)': {
          network: 'testnet',
          forms: [
            {
              data: {
                name: 'Certificate of Analysis (COA)',
                title: 'Test Title By Caps2',
                remarks: 'Test Remarks By Caps',
                fileName: 'Certificate of Analysis (COA)',
                nameAddressCountry: {
                  farmerName: 'John Doe',
                  address:
                    '10 Pasir Panjang Road #10-01 Mapletree Business City',
                  countryName: 'Singapore',
                  zipCode: '900000',
                },
                analysisResults: {
                  CuSO45H2O: '99.3',
                  Cu: '25.13',
                  Pb: '3.6',
                  As: '2.3',
                  water: '0.18',
                },
              },
              logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/BYR_color_wheel.svg/1024px-BYR_color_wheel.svg.png',
              attachments: false,
              extension: 'fl',
              style: {
                backgroundColor: '#ffffff',
                titleColor: '#000000',
                descriptionColor: '#ff0000',
              },
            },
          ],
        },
      },
    },
  },
};
export default MockData;
