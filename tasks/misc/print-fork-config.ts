import { task } from 'hardhat/config';
import { getOmniDexProtocolDataProvider } from '../../helpers/contracts-getters';

task('print-config:fork', 'Deploy development enviroment')
  .addFlag('verify', 'Verify contracts at Etherscan')
  .setAction(async ({ verify }, DRE) => {
    await DRE.run('set-DRE');
    await DRE.run('omnidex:mainnet');

    const dataProvider = await getOmniDexProtocolDataProvider();
    await DRE.run('print-config', { dataProvider: dataProvider.address, pool: 'OmniDex' });
  });
