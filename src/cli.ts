import { program, Option } from 'commander';
import pkg from '../package.json';
import { createWallet, pathChoices, lengthChoices } from './createWallet';

program.version(pkg.version, '-v, --version');

program
  .command('wallet')
  .description("Handle Bitcoin's wallet")
  .command('create')
  .description('Create a new wallet')
  .addOption(
    new Option('-l, --length <length>', 'Length of the mnemonic').choices(
      lengthChoices.map((choice) => choice.value.toString())
    )
  )
  .addOption(
    new Option('-p, --path <path>', 'Derivation path').choices(
      pathChoices.map((choice) => choice.value)
    )
  )
  .action(createWallet);

program.parse(process.argv);
