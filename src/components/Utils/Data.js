
//only the token prices
export const tokenPriceData = [
  [["1", "0"], "BTC/USD", 27223.576963497],
  [["2", "0"], "ETH/USD", 1634.022009615],
  [["3", "0"], "TICP/USD", 3.017254156],
  [["3", "0"], "ICP/USD", 3.017254156],
  [["3", "4"], "ICP/XDR", 2.285384485],
  [["4", "0"], "XDR/USD", 1.3202391876743664],
  [["5", "3"], "XTC/ICP", 0.12923718914916146],
  [["5", "0"], "XTC/USD", 0.38994144607006553],
  [["5", "4"], "XTC/XDR", 0.2953566669665039],
  [["6", "3"], "OGY/ICP", 0.003388261162138671],
  [["6", "0"], "OGY/USD", 0.010223245073076294],
  [["6", "4"], "OGY/XDR", 0.007743479491079787],
  [["7", "3"], "ckBTC/ICP", 8934.566419356985],
  [["7", "0"], "TCKBTC/USD", 26957.8576608629],
  [["7", "0"], "ckBTC/USD", 26957.8576608629],
  [["7", "4"], "ckBTC/XDR", 20418.919475000454],
  [["8", "3"], "GHOST/ICP", 0.000016101932984926882],
  [["8", "0"], "GHOST/USD", 0.00004858362421840412],
  [["8", "4"], "GHOST/XDR", 0.00003679910782226163],
  [["9", "3"], "CHAT/ICP", 0.04831788385559583],
  [["9", "0"], "TCHAT/USD", 0.14578733587242182],
  [["9", "0"], "CHAT/USD", 0.14578733587242182],
  [["9", "4"], "CHAT/XDR", 0.11042494211161068],
  [["10", "3"], "OT/ICP", 0.00022197999999999999],
  [["10", "0"], "OT/USD", 0.00066977007754888],
  [["10", "4"], "OT/XDR", 0.0005073096479802999],
  [["11", "3"], "KINIC/ICP", 0.2681536309581689],
  [["11", "0"], "KINIC/USD", 0.8090876574550254],
  [["11", "4"], "KINIC/XDR", 0.6128341477882149],
  [["12", "3"], "HOT/ICP", 0.0031532993304218804],
  [["12", "0"], "HOT/USD", 0.009514305509827436],
  [["12", "4"], "HOT/XDR", 0.007206501366307053],
  [["13", "3"], "SNS1/ICP", 239.66756635460285],
  [["13", "0"], "SNS1/USD", 723.1379606418312],
  [["13", "4"], "SNS1/XDR", 547.7325377045173],
  [["14", "3"], "MOD/ICP", 0.004477622097662716],
  [["14", "0"], "MOD/USD", 0.013510123883170268],
  [["14", "4"], "MOD/XDR", 0.010233088071691526],
];








//token prices and other information about the token


export const extendedTokenData = [
  {
    id: '1',
    last: {
      fee: '0',
      dissolving_30d: '0',
      circulating_supply: '19564225',
      other_treasuries: [],
      total_locked: '0',
      dissolving_1d: '0',
      dissolving_1y: '0',
      total_supply: '21000000',
      treasury: '0',
    },
    config: {
      decimals: '0',
      deleted: false,
      locking: {
        none: null,
      },
      name: 'Bitcoin',
      ledger: {
        none: null,
      },
      details: [],
      symbol: 'BTC',
    },
    rates: [
      {
        to_token: '0',
        rate: 43803.980397996,
        volume: 9115097054.688477,
        depth50: 0,
        depth2: 0,
        depth8: 0,
        symbol: 'BTC/USD',
      },
    ],
  },
  {
    id: '2',
    last: {
      fee: '0',
      dissolving_30d: '0',
      circulating_supply: '120220036',
      other_treasuries: [],
      total_locked: '0',
      dissolving_1d: '0',
      dissolving_1y: '0',
      total_supply: '120220036',
      treasury: '0',
    },
    config: {
      decimals: '0',
      deleted: false,
      locking: {
        none: null,
      },
      name: 'Ethereum',
      ledger: {
        none: null,
      },
      details: [],
      symbol: 'ETH',
    },
    rates: [
      {
        to_token: '0',
        rate: 2350.315008,
        volume: 5172164695.992712,
        depth50: 0,
        depth2: 0,
        depth8: 0,
        symbol: 'ETH/USD',
      },
    ],
  },
  {
    id: '3',
    last: {
      fee: '10000',
      dissolving_30d: '0',
      circulating_supply: '44991300300000000',
      other_treasuries: [],
      total_locked: '0',
      dissolving_1d: '0',
      dissolving_1y: '0',
      total_supply: '51029874060919924',
      treasury: '0',
    },
    config: {
      decimals: '8',
      deleted: false,
      locking: {
        none: null,
      },
      name: 'Internet Computer',
      ledger: {
        icrc1: {
          ledger: 'ryjl3-tyaaa-aaaaa-aaaba-cai',
        },
      },
      details: [],
      symbol: 'ICP',
    },
    rates: [
      {
        to_token: '0',
        rate: 5.1955195,
        volume: 26833406.099067267,
        depth50: 0,
        depth2: 0,
        depth8: 0,
        symbol: 'ICP/USD',
      },
      {
        to_token: '4',
        rate: 2.409525831,
        volume: 0,
        depth50: 0,
        depth2: 0,
        depth8: 0,
        symbol: 'ICP/XDR',
      },
    ],
  },
  {
    id: '4',
    config: {
      decimals: '0',
      deleted: false,
      locking: {
        none: null,
      },
      name: 'XDR',
      ledger: {
        none: null,
      },
      details: [],
      symbol: 'XDR',
    },
    rates: [
      {
        to_token: '0',
        rate: 1.32928292160138,
        volume: 0,
        depth50: 0,
        depth2: 0,
        depth8: 0,
        symbol: 'XDR/USD',
      },
    ],
  },
  {
    id: '5',
    last: {
      fee: '2000000000',
      dissolving_30d: '0',
      circulating_supply: '699412723133304193',
      other_treasuries: [],
      total_locked: '0',
      dissolving_1d: '0',
      dissolving_1y: '0',
      total_supply: '699412723133304193',
      treasury: '0',
    },
    config: {
      decimals: '12',
      deleted: false,
      locking: {
        none: null,
      },
      name: 'XTC',
      ledger: {
        dip20: {
          ledger: 'aanaa-xaaaa-aaaah-aaeiq-cai',
        },
      },
      details: [],
      symbol: 'XTC',
    },
    rates: [
      {
        to_token: '3',
        rate: 0.08089247642520397,
        volume: 11.69866052635314,
        depth50: 14893.803516135622,
        depth2: 595.7521406454248,
        depth8: 2383.008562581699,
        symbol: 'XTC/ICP',
      },
      {
        to_token: '0',
        rate: 0.40971656883134716,
        volume: 37.61265787447999,
        depth50: 47102.287693676,
        depth2: 1884.0915077470397,
        depth8: 7536.366030988159,
        symbol: 'XTC/USD',
      },
      {
        to_token: '4',
        rate: 0.3121610644600231,
        volume: 28.65690141054904,
        depth50: 35887.0042939674,
        depth2: 1435.4801717586959,
        depth8: 5741.920687034783,
        symbol: 'XTC/XDR',
      },
    ],
  },
  {
    id: '6',
    last: {
      fee: '200000',
      dissolving_30d: '0',
      circulating_supply: '1041885012194998566',
      other_treasuries: [],
      total_locked: '0',
      dissolving_1d: '0',
      dissolving_1y: '0',
      total_supply: '1041885012194998566',
      treasury: '0',
    },
    config: {
      decimals: '8',
      deleted: false,
      locking: {
        none: null,
      },
      name: 'Origyn',
      ledger: {
        icrc1: {
          ledger: 'jwcfb-hyaaa-aaaaj-aac4q-cai',
        },
      },
      details: [],
      symbol: 'OGY',
    },
    rates: [
      {
        to_token: '3',
        rate: 0.00430628578082015,
        volume: 579.9864054472862,
        depth50: 1918.3827147322506,
        depth2: 76.73530858929003,
        depth8: 306.9412343571601,
        symbol: 'OGY/ICP',
      },
      {
        to_token: '0',
        rate: 0.013618812113348271,
        volume: 1834.2316989882816,
        depth50: 6066.967006648057,
        depth2: 242.67868026592228,
        depth8: 970.7147210636891,
        symbol: 'OGY/USD',
      },
      {
        to_token: '4',
        rate: 0.010376106824554155,
        volume: 1397.4922255540748,
        depth50: 4622.392704891262,
        depth2: 184.89570819565049,
        depth8: 739.5828327826019,
        symbol: 'OGY/XDR',
      },
    ],
  },
  {
    id: '7',
    last: {
      fee: '10',
      dissolving_30d: '0',
      dissolving_30d: '0',
      circulating_supply: '10833674611',
      other_treasuries: [],
      total_locked: '0',
      dissolving_1d: '0',
      dissolving_1y: '0',
      total_supply: '10833674611',
      treasury: '0',
    },
    config: {
      decimals: '8',
      deleted: false,
      locking: {
        none: null,
      },
      name: 'ckBTC',
      ledger: {
        icrc1: {
          ledger: 'mxzaz-hqaaa-aaaar-qaada-cai',
        },
      },
      details: [],
      symbol: 'ckBTC',
    },
    rates: [
      {
        to_token: '3',
        rate: 8695.745530919861,
        volume: 35183.763880354025,
        depth50: 2638.1326287451675,
        depth2: 105.52530514980671,
        depth8: 422.10122059922685,
        symbol: 'ckBTC/ICP',
      },
      {
        to_token: '0',
        rate: 45178.915472931985,
        volume: 182797.93132377497,
        depth50: 177981.22987684116,
        depth2: 7119.249195073647,
        depth8: 28476.996780294587,
        symbol: 'ckBTC/USD',
      },
      {
        to_token: '4',
        rate: 21718.934058227565,
        volume: 363.2101473797526,
        depth50: 6356.648714565414,
        depth2: 254.26594858261657,
        depth8: 1017.0637943304663,
        symbol: 'ckBTC/XDR',
      },
    ],
  },
  {
    id: '8',
    last: {
      fee: '100000000',
      dissolving_30d: '12510683688167931',
      circulating_supply: '788796960489390023',
      other_treasuries: [['3', '94130000']],
      total_locked: '197987025628967299',
      dissolving_1d: '1294374600000000',
      dissolving_1y: '29085458448246806',
      total_supply: '988032985718357322',
      treasury: '1248999600000000',
    },
    config: {
      decimals: '8',
      deleted: false,
      locking: {
        sns: {
          root: '4m6il-zqaaa-aaaaq-aaa2a-cai',
          swap: '4f5dx-pyaaa-aaaaq-aaa3q-cai',
          ledger: '4c4fd-caaaa-aaaaq-aaa3a-cai',
          other_treasuries: [],
          index: '5ithz-aqaaa-aaaaq-aaa4a-cai',
          governance: '4l7o7-uiaaa-aaaaq-aaa2q-cai',
          treasury_subaccount: {
            0: 17,
            1: 44,
            2: 162,
            3: 242,
            4: 30,
            5: 254,
            6: 239,
            7: 180,
            8: 137,
            9: 10,
            10: 130,
            11: 128,
            12: 99,
            13: 93,
            14: 131,
            15: 65,
            16: 225,
            17: 167,
            18: 149,
            19: 111,
            20: 236,
            21: 5,
            22: 182,
            23: 182,
            24: 135,
            25: 0,
            26: 101,
            27: 1,
            28: 226,
            29: 106,
            30: 155,
            31: 190,
          },
        },
      },
      name: 'GHOST',
      ledger: {
        icrc1: {
          ledger: '4c4fd-caaaa-aaaaq-aaa3a-cai',
        },
      },
      details: [],
      symbol: 'GHOST',
    },
    rates: [
      {
        to_token: '3',
        rate: 0.000016232753232680397,
        volume: 18.17869788610644,
        depth50: 7598.615091646105,
        depth2: 303.9446036658442,
        depth8: 1215.778414663377,
        symbol: 'GHOST/ICP',
      },
      {
        to_token: '0',
        rate: 0.00005133677317535513,
        volume: 57.49090598651672,
        depth50: 24030.9437231711,
        depth2: 961.2377489268442,
        depth8: 3844.950995707377,
        symbol: 'GHOST/USD',
      },
      {
        to_token: '4',
        rate: 0.00003911323822239217,
        volume: 43.80204213051856,
        depth50: 18309.05934314772,
        depth2: 732.3623737259089,
        depth8: 2929.4494949036357,
        symbol: 'GHOST/XDR',
      },
    ],
  },
  {
    id: '9',
    last: {
      fee: '100000',
      dissolving_30d: '8353245822625',
      circulating_supply: '981719625173636',
      other_treasuries: [['3', '82289011805470']],
      total_locked: '4006347169769881',
      dissolving_1d: '152728585651',
      dissolving_1y: '444906072554285',
      total_supply: '10003066794443517',
      treasury: '5014999999500000',
    },
    config: {
      decimals: '8',
      deleted: false,
      locking: {
        sns: {
          root: '3e3x2-xyaaa-aaaaq-aaalq-cai',
          swap: '2hx64-daaaa-aaaaq-aaana-cai',
          ledger: '2ouva-viaaa-aaaaq-aaamq-cai',
          other_treasuries: [],
          index: '2awyi-oyaaa-aaaaq-aaanq-cai',
          governance: '2jvtu-yqaaa-aaaaq-aaama-cai',
          treasury_subaccount: {
            0: 209,
            1: 33,
            2: 111,
            3: 68,
            4: 62,
            5: 173,
            6: 136,
            7: 248,
            8: 249,
            9: 138,
            10: 128,
            11: 178,
            12: 234,
            13: 89,
            14: 105,
            15: 119,
            16: 38,
            17: 241,
            18: 141,
            19: 255,
            20: 170,
            21: 88,
            22: 208,
            23: 160,
            24: 21,
            25: 109,
            26: 12,
            27: 96,
            28: 90,
            29: 1,
            30: 182,
            31: 114,
          },
        },
      },
      name: 'CHAT',
      ledger: {
        icrc1: {
          ledger: '2ouva-viaaa-aaaaq-aaamq-cai',
        },
      },
      details: [],
      symbol: 'CHAT',
    },
    rates: [
      {
        to_token: '3',
        rate: 0.046755442137931404,
        volume: 637.4864695993482,
        depth50: 20865.845334767644,
        depth2: 834.6338133907059,
        depth8: 3338.5352535628235,
        symbol: 'CHAT/ICP',
      },
      {
        to_token: '0',
        rate: 0.2739697163029028,
        volume: 34313.3884423759,
        depth50: 107874.78164000626,
        depth2: 4314.991265600251,
        depth8: 17259.965062401003,
        symbol: 'CHAT/USD',
      },
      {
        to_token: '4',
        rate: 0.11265844557117158,
        volume: 1536.0401154126257,
        depth50: 50276.793319773475,
        depth2: 2011.0717327909394,
        depth8: 8044.286931163758,
        symbol: 'CHAT/XDR',
      },
    ],
  },
  {
    id: '10',
    last: {
      fee: '10000000',
      dissolving_30d: '0',
      circulating_supply: '45000000000000000',
      other_treasuries: [],
      total_locked: '0',
      dissolving_1d: '0',
      dissolving_1y: '0',
      total_supply: '45000000000000000',
      treasury: '0',
    },
    config: {
      decimals: '8',
      deleted: false,
      locking: {
        none: null,
      },
      name: 'ICOracle Token',
      ledger: {
        icrc1: {
          ledger: 'imeri-bqaaa-aaaai-qnpla-cai',
        },
      },
      details: [],
      symbol: 'OT',
    },
    rates: [
      {
        to_token: '3',
        rate: 0.00020919,
        volume: 0,
        depth50: 130.63622634,
        depth2: 5.2254490536,
        depth8: 20.9017962144,
        symbol: 'OT/ICP',
      },
      {
        to_token: '0',
        rate: 0.00066157228084587,
        volume: 0,
        depth50: 413.142627376314,
        depth2: 16.52570509505256,
        depth8: 66.10282038021025,
        symbol: 'OT/USD',
      },
      {
        to_token: '4',
        rate: 0.00050404870858689,
        volume: 0,
        depth50: 314.7713618305926,
        depth2: 12.590854473223704,
        depth8: 50.363417892894816,
        symbol: 'OT/XDR',
      },
    ],
  },
  {
    id: '11',
    last: {
      fee: '100000',
      dissolving_30d: '504727008494',
      circulating_supply: '41020952072287',
      other_treasuries: [['3', '43242344378093']],
      total_locked: '252348205242498',
      dissolving_1d: '16059680261',
      dissolving_1y: '10205504506214',
      total_supply: '600012857114785',
      treasury: '306643699800000',
    },
    config: {
      decimals: '8',
      deleted: false,
      locking: {
        sns: {
          root: '7jkta-eyaaa-aaaaq-aaarq-cai',
          swap: '7sppf-6aaaa-aaaaq-aaata-cai',
          ledger: '73mez-iiaaa-aaaaq-aaasq-cai',
          other_treasuries: [],
          index: '7vojr-tyaaa-aaaaq-aaatq-cai',
          governance: '74ncn-fqaaa-aaaaq-aaasa-cai',
          treasury_subaccount: {
            0: 65,
            1: 246,
            2: 130,
            3: 115,
            4: 197,
            5: 218,
            6: 13,
            7: 55,
            8: 202,
            9: 96,
            10: 0,
            11: 195,
            12: 144,
            13: 52,
            14: 25,
            15: 194,
            16: 148,
            17: 205,
            18: 68,
            19: 16,
            20: 241,
            21: 105,
            22: 57,
            23: 105,
            24: 232,
            25: 244,
            26: 242,
            27: 187,
            28: 127,
            29: 243,
            30: 220,
            31: 120,
          },
        },
      },
      name: 'KINIC',
      ledger: {
        icrc1: {
          ledger: '73mez-iiaaa-aaaaq-aaasq-cai',
        },
      },
      details: [],
      symbol: 'KINIC',
    },
    rates: [
      {
        to_token: '3',
        rate: 0.26987110866753644,
        volume: 0,
        depth50: 4020.9100183370892,
        depth2: 160.83640073348357,
        depth8: 643.3456029339343,
        symbol: 'KINIC/ICP',
      },
      {
        to_token: '0',
        rate: 0.8534788703837933,
        volume: 0,
        depth50: 12716.299115193257,
        depth2: 508.65196460773024,
        depth8: 2034.607858430921,
        symbol: 'KINIC/USD',
      },
      {
        to_token: '4',
        rate: 0.650261407375037,
        volume: 0,
        depth50: 9688.4865533099,
        depth2: 387.539462132396,
        depth8: 1550.157848529584,
        symbol: 'KINIC/XDR',
      },
    ],
  },
  {
    id: '12',
    last: {
      fee: '100000',
      dissolving_30d: '351950300000000',
      circulating_supply: '5193870122655025',
      other_treasuries: [['3', '104402677445875']],
      total_locked: '54139618680391146',
      dissolving_1d: '0',
      dissolving_1y: '1189392928279957',
      total_supply: '100000002602846171',
      treasury: '40666513799800000',
    },
    config: {
      decimals: '8',
      deleted: false,
      locking: {
        sns: {
          root: '67bll-riaaa-aaaaq-aaauq-cai',
          swap: '6eexo-lqaaa-aaaaq-aaawa-cai',
          ledger: '6rdgd-kyaaa-aaaaq-aaavq-cai',
          other_treasuries: [],
          index: '6dfr2-giaaa-aaaaq-aaawq-cai',
          governance: '6wcax-haaaa-aaaaq-aaava-cai',
          treasury_subaccount: {
            0: 145,
            1: 123,
            2: 109,
            3: 245,
            4: 63,
            5: 222,
            6: 241,
            7: 135,
            8: 57,
            9: 204,
            10: 114,
            11: 207,
            12: 200,
            13: 234,
            14: 11,
            15: 155,
            16: 25,
            17: 125,
            18: 148,
            19: 161,
            20: 144,
            21: 247,
            22: 151,
            23: 178,
            24: 131,
            25: 188,
            26: 172,
            27: 144,
            28: 159,
            29: 154,
            30: 193,
            31: 97,
          },
        },
      },
      name: 'HotOrNot',
      ledger: {
        icrc1: {
          ledger: '6rdgd-kyaaa-aaaaq-aaavq-cai',
        },
      },
      details: [],
      symbol: 'HOT',
    },
    rates: [
      {
        to_token: '3',
        rate: 0.0038476697253293627,
        volume: 12.486255705,
        depth50: 160.60512902175262,
        depth2: 6.424205160870106,
        depth8: 25.696820643480425,
        symbol: 'HOT/ICP',
      },
      {
        to_token: '0',
        rate: 0.012168419313197327,
        volume: 39.48831524442663,
        depth50: 507.9205579734505,
        depth2: 20.316822318938026,
        depth8: 81.2672892757521,
        symbol: 'HOT/USD',
      },
      {
        to_token: '4',
        rate: 0.009271059592337774,
        volume: 30.085955653668613,
        depth50: 386.9822069690007,
        depth2: 15.47928827876003,
        depth8: 61.91715311504012,
        symbol: 'HOT/XDR',
      },
    ],
  },
  {
    id: '13',
    last: {
      fee: '1000',
      dissolving_30d: '7138667640',
      circulating_supply: '364531421136',
      other_treasuries: [['3', '568460000']],
      total_locked: '635157688799',
      dissolving_1d: '249997000',
      dissolving_1y: '25319844825',
      total_supply: '999689202000',
      treasury: '92065',
    },
    config: {
      decimals: '8',
      deleted: false,
      locking: {
        sns: {
          root: 'zxeu2-7aaaa-aaaaq-aaafa-cai',
          swap: 'zcdfx-6iaaa-aaaaq-aaagq-cai',
          ledger: 'zfcdd-tqaaa-aaaaq-aaaga-cai',
          other_treasuries: [],
          index: 'zlaol-iaaaa-aaaaq-aaaha-cai',
          governance: 'zqfso-syaaa-aaaaq-aaafq-cai',
          treasury_subaccount: {
            0: 206,
            1: 194,
            2: 20,
            3: 90,
            4: 117,
            5: 15,
            6: 212,
            7: 164,
            8: 114,
            9: 178,
            10: 160,
            11: 33,
            12: 246,
            13: 223,
            14: 241,
            15: 228,
            16: 169,
            17: 7,
            18: 41,
            19: 151,
            20: 0,
            21: 6,
            22: 42,
            23: 10,
            24: 2,
            25: 188,
            26: 30,
            27: 166,
            28: 92,
            29: 162,
            30: 146,
            31: 88,
          },
        },
      },
      name: 'SNS-1',
      ledger: {
        icrc1: {
          ledger: 'zfcdd-tqaaa-aaaaq-aaaga-cai',
        },
      },
      details: [],
      symbol: 'SNS1',
    },
    rates: [
      {
        to_token: '3',
        rate: 334.9783915511893,
        volume: 4354.920175605607,
        depth50: 28142.59665355692,
        depth2: 1125.703866142277,
        depth8: 4502.815464569108,
        symbol: 'SNS1/ICP',
      },
      {
        to_token: '0',
        rate: 1059.3834243156998,
        volume: 13772.62045736937,
        depth50: 89002.16003164109,
        depth2: 3560.086401265645,
        depth8: 14240.34560506258,
        symbol: 'SNS1/USD',
      },
      {
        to_token: '4',
        rate: 807.1390872694227,
        volume: 10493.292655064766,
        depth50: 67810.31358815955,
        depth2: 2712.4125435263827,
        depth8: 10849.65017410553,
        symbol: 'SNS1/XDR',
      },
    ],
  },
  {
    id: '14',
    last: {
      fee: '10000',
      dissolving_30d: '10005000000000',
      circulating_supply: '11404934542001783',
      other_treasuries: [['3', '53963344311118']],
      total_locked: '46465079020788201',
      dissolving_1d: '0',
      dissolving_1y: '108836470334797',
      total_supply: '98000003562759984',
      treasury: '40129989999970000',
    },
    config: {
      decimals: '8',
      deleted: false,
      locking: {
        sns: {
          root: 'x4kx5-ziaaa-aaaaq-aabeq-cai',
          swap: 'xhply-dqaaa-aaaaq-aabga-cai',
          ledger: 'xsi2v-cyaaa-aaaaq-aabfq-cai',
          other_treasuries: [],
          index: 'xaonm-oiaaa-aaaaq-aabgq-cai',
          governance: 'xvj4b-paaaa-aaaaq-aabfa-cai',
          treasury_subaccount: {
            0: 90,
            1: 6,
            2: 93,
            3: 235,
            4: 172,
            5: 132,
            6: 172,
            7: 64,
            8: 24,
            9: 134,
            10: 16,
            11: 65,
            12: 195,
            13: 193,
            14: 255,
            15: 54,
            16: 139,
            17: 183,
            18: 73,
            19: 48,
            20: 24,
            21: 183,
            22: 21,
            23: 217,
            24: 180,
            25: 86,
            26: 110,
            27: 128,
            28: 161,
            29: 134,
            30: 4,
            31: 173,
          },
        },
      },
      name: 'Modclub',
      ledger: {
        icrc1: {
          ledger: 'xsi2v-cyaaa-aaaaq-aabfq-cai',
        },
      },
      details: [],
      symbol: 'MOD',
    },
    rates: [
      {
        to_token: '3',
        rate: 0.005009719645396592,
        volume: 0,
        depth50: 11194.729076610467,
        depth2: 447.7891630644187,
        depth8: 1791.1566522576748,
        symbol: 'MOD/ICP',
      },
      {
        to_token: '0',
        rate: 0.015843451657361188,
        volume: 0,
        depth50: 35403.807297981584,
        depth2: 1416.1522919192632,
        depth8: 5664.609167677053,
        symbol: 'MOD/USD',
      },
      {
        to_token: '4',
        rate: 0.012071048891651249,
        volume: 0,
        depth50: 26973.988881139696,
        depth2: 1078.9595552455878,
        depth8: 4315.838220982351,
        symbol: 'MOD/XDR',
      },
    ],
  },
  {
    id: '15',
    last: {
      fee: '100000',
      dissolving_30d: '1311039217790',
      circulating_supply: '6255508552195334',
      other_treasuries: [['3', '40898488073898']],
      total_locked: '66744489071504666',
      dissolving_1d: '0',
      dissolving_1y: '6469270595794781',
      total_supply: '99999997623700000',
      treasury: '27000000000000000',
    },
    config: {
      decimals: '8',
      deleted: false,
      locking: {
        sns: {
          root: 'xjngq-yaaaa-aaaaq-aabha-cai',
          swap: 'vuqiy-liaaa-aaaaq-aabiq-cai',
          ledger: 'vtrom-gqaaa-aaaaq-aabia-cai',
          other_treasuries: [],
          index: 'v5tde-5aaaa-aaaaq-aabja-cai',
          governance: 'xomae-vyaaa-aaaaq-aabhq-cai',
          treasury_subaccount: {
            0: 139,
            1: 233,
            2: 242,
            3: 170,
            4: 28,
            5: 96,
            6: 95,
            7: 194,
            8: 153,
            9: 42,
            10: 51,
            11: 71,
            12: 79,
            13: 254,
            14: 216,
            15: 214,
            16: 215,
            17: 255,
            18: 91,
            19: 4,
            20: 127,
            21: 112,
            22: 183,
            23: 252,
            24: 128,
            25: 92,
            26: 169,
            27: 37,
            28: 221,
            29: 151,
            30: 33,
            31: 210,
          },
        },
      },
      name: 'BoomDAO',
      ledger: {
        icrc1: {
          ledger: 'vtrom-gqaaa-aaaaq-aabia-cai',
        },
      },
      details: [],
      symbol: 'BOOM',
    },
    rates: [
      {
        to_token: '3',
        rate: 0.0024807573522786595,
        volume: 111.48698379070167,
        depth50: 561.516249548806,
        depth2: 22.460649981952237,
        depth8: 89.84259992780895,
        symbol: 'BOOM/ICP',
      },
      {
        to_token: '0',
        rate: 0.007845500739864019,
        volume: 352.58233257345495,
        depth50: 1775.8190446293909,
        depth2: 71.03276178517564,
        depth8: 284.13104714070255,
        symbol: 'BOOM/USD',
      },
      {
        to_token: '4',
        rate: 0.005977448920758596,
        volume: 268.63076726397395,
        depth50: 1352.98790781409,
        depth2: 54.1195163125636,
        depth8: 216.4780652502544,
        symbol: 'BOOM/XDR',
      },
    ],
  },
  {
    id: '16',
    last: {
      fee: '100000',
      dissolving_30d: '45316965493',
      circulating_supply: '300153645569451',
      other_treasuries: [['3', '14999996410000']],
      total_locked: '2799867670430549',
      dissolving_1d: '0',
      dissolving_1y: '27359064565641',
      total_supply: '10000021316000000',
      treasury: '6900000000000000',
    },
    config: {
      decimals: '8',
      deleted: false,
      locking: {
        sns: {
          root: 'u67kc-jyaaa-aaaaq-aabpq-cai',
          swap: 'rmg5p-zaaaa-aaaaq-aabra-cai',
          ledger: 'rffwt-piaaa-aaaaq-aabqq-cai',
          other_treasuries: [],
          index: 'rlh33-uyaaa-aaaaq-aabrq-cai',
          governance: 'rceqh-cqaaa-aaaaq-aabqa-cai',
          treasury_subaccount: {
            0: 183,
            1: 28,
            2: 7,
            3: 195,
            4: 125,
            5: 73,
            6: 4,
            7: 46,
            8: 246,
            9: 207,
            10: 33,
            11: 74,
            12: 9,
            13: 222,
            14: 58,
            15: 213,
            16: 49,
            17: 34,
            18: 207,
            19: 207,
            20: 204,
            21: 92,
            22: 205,
            23: 88,
            24: 167,
            25: 175,
            26: 232,
            27: 35,
            28: 237,
            29: 54,
            30: 197,
            31: 23,
          },
        },
      },
      name: 'IC-X',
      ledger: {
        icrc1: {
          ledger: 'rffwt-piaaa-aaaaq-aabqq-cai',
        },
      },
      details: [],
      symbol: 'ICX',
    },
    rates: [
      {
        to_token: '3',
        rate: 0.014230099855045523,
        volume: 23.161220770653237,
        depth50: 265.05353016166157,
        depth2: 10.602141206466465,
        depth8: 42.40856482586586,
        symbol: 'ICX/ICP',
      },
      {
        to_token: '0',
        rate: 0.0450032966096226,
        volume: 73.24834672984274,
        depth50: 838.2430732601943,
        depth2: 33.52972293040778,
        depth8: 134.11889172163112,
        symbol: 'ICX/USD',
      },
      {
        to_token: '4',
        rate: 0.03428779317844154,
        volume: 55.807559724382706,
        depth50: 638.6533275222611,
        depth2: 25.54613310089045,
        depth8: 102.1845324035618,
        symbol: 'ICX/XDR',
      },
    ],
  },
  {
    id: '27',
    last: {
      fee: '2000000000000',
      dissolving_30d: '0',
      circulating_supply: '94701809066545572483',
      other_treasuries: [],
      total_locked: '0',
      dissolving_1d: '0',
      dissolving_1y: '0',
      total_supply: '94701809066545572483',
      treasury: '0',
    },
    config: {
      decimals: '18',
      deleted: false,
      locking: {
        none: null,
      },
      name: 'ckETH',
      ledger: {
        icrc1: {
          ledger: 'ss2fx-dyaaa-aaaar-qacoq-cai',
        },
      },
      details: [],
      symbol: 'ckETH',
    },
    rates: [
      {
        to_token: '3',
        rate: 464.9464616931301,
        volume: 1365.47839360386,
        depth50: 12065.934893542,
        depth2: 482.63739574168,
        depth8: 1930.54958296672,
        symbol: 'ckETH/ICP',
      },
      {
        to_token: '0',
        rate: 2415.6384081826604,
        volume: 7094.36962079753,
        depth50: 62688.80002512788,
        depth2: 2507.552001005115,
        depth8: 10030.20800402046,
        symbol: 'ckETH/USD',
      },
    ],
  },
];
