# BTC CLI

<img src="./logo.webp" height="300">

## Introduction

**BTC CLI** is a command-line interface (CLI) tool for creating Bitcoin wallets easily and securely. It supports different BIP path standards, such as BIP-44, BIP-49, and BIP-84.

### Features

- Generate Seed Phrases (12, 18, or 24 words).
- Create private keys and public keys.
- Support for HD-wallet paths: BIP-44, BIP-49, and BIP-84.
- Generate Bitcoin addresses compatible with P2PKH, P2SH, and Bech32 standards.

## Installation

```bash
npm install -g @arantespp/btc-cli
```

## Quick Start

### Create a Bitcoin Wallet

```bash
btc wallet create
```

#### Example Output

```bash
┌─────────────┬────────────────────────────────────────────────────────────────────┐
│         Key │ Value                                                              │
├─────────────┼────────────────────────────────────────────────────────────────────┤
│    Mnemonic │ adjust frame bright rather edit panda gaze weapon settle climb     │
│             │ primary castle sauce help ask year sound retire vicious air helmet │
│             │ flock leave olive                                                  │
│ Private Key │ L3ZFPrNVYbyrC1FDEtAh9Cj8MEymYgsMpJr1deUJGRnE73xG2bZd               │
│  Public Key │ 02f6981ba64d8280c5b69cb8b47126738a18b7624fac62b3893400f038e13cf277 │
│     Address │ bc1qu8zm9yuguexgsngajx9s84lxznrxf7mggzn4mh                         │
└─────────────┴────────────────────────────────────────────────────────────────────┘
```

## Donate

If you like the project, consider donating to help its development.

BTC Address: `bc1quwkkf9neyk3he7lac4qjkej96wjs47spna7e0e`

Thank you for your support!

## License

This project is open-source and available under the [MIT License](LICENSE).
