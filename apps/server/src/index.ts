import { config } from '@packages/config';
import { AppServer } from './AppServer';

const port = config.appServer.port || 3000;

const appServer = new AppServer({ port });

appServer.start().catch(e => console.error(e));
