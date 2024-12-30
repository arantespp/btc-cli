import { select } from '@inquirer/prompts';
import * as bip39 from 'bip39';
import * as bitcoin from 'bitcoinjs-lib';
import { Table } from 'console-table-printer';
import { BIP32Factory } from 'bip32';
import * as ecc from 'tiny-secp256k1';

const bip32 = BIP32Factory(ecc);

export const lengthChoices = [
  {
    name: '24 words',
    value: 256,
  },
  {
    name: '18 words',
    value: 192,
  },
  {
    name: '12 words',
    value: 128,
  },
];

export const pathChoices = [
  {
    name: 'BIP-84',
    value: 'BIP-84',
  },
  {
    name: 'BIP-49',
    value: 'BIP-49',
  },
  {
    name: 'BIP-44',
    value: 'BIP-44',
  },
];

const pathsValues = {
  'BIP-44': "m/44'/0'/0'/0/0",
  'BIP-49': "m/49'/0'/0'/0/0",
  'BIP-84': "m/84'/0'/0'/0/0",
};

export const createWallet = async (args: {
  length?: number;
  path?: string;
}) => {
  const length =
    args.length ||
    (await select({
      message: 'Select the length of the mnemonic',
      default: lengthChoices[0].value,
      choices: lengthChoices,
    }));

  const path =
    args.path ||
    (await select({
      message: 'Enter the derivation path',
      default: pathChoices[0].value,
      choices: pathChoices,
    }));

  const mnemonic = bip39.generateMnemonic(length);

  const isValid = bip39.validateMnemonic(mnemonic);
  if (!isValid) {
    throw new Error('Invalid mnemonic. Please try again.');
  }

  const seed = bip39.mnemonicToSeedSync(mnemonic);

  const root = bip32.fromSeed(seed);

  const child = root.derivePath(pathsValues[path]);

  const pubkey = Buffer.from(child.publicKey);

  const network = bitcoin.networks.bitcoin;

  const { address } = (() => {
    if (path === 'BIP-84') {
      return bitcoin.payments.p2wpkh({ pubkey, network });
    }

    if (path === 'BIP-49') {
      return bitcoin.payments.p2sh({
        redeem: bitcoin.payments.p2wpkh({ pubkey, network }),
      });
    }

    return bitcoin.payments.p2pkh({ pubkey, network });
  })();

  const table = new Table({
    columns: [
      { name: 'Key', alignment: 'right' },
      { name: 'Value', alignment: 'left', maxLen: 50 },
    ],
  });

  table.addRow({
    Key: 'Mnemonic',
    Value: mnemonic,
  });

  table.addRow({
    Key: 'Private Key',
    Value: child.toWIF(),
  });

  table.addRow({
    Key: 'Public Key',
    Value: pubkey.toString('hex'),
  });

  table.addRow({
    Key: 'Address',
    Value: address,
  });

  table.printTable();
};
