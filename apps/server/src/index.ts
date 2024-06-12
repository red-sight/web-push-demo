import { IUserCreateInput, IUserCreateOutput } from '@lib/types';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { randomUUID } from 'crypto';
import * as cors from 'cors';
const app = express();
const port = 3000;

app.use(cors({ origin: '*' }));
app.use(bodyParser.json());

app.post(
  '/user',
  (
    req: express.Request<object, object, IUserCreateInput>,
    res: express.Response<IUserCreateOutput>
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const inputData = req.body;
    res.send({
      ...inputData,
      id: randomUUID(),
    });
  }
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port.toString()}`);
});
