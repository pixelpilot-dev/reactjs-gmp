import { rest } from 'msw';
import { MOVIES } from '../../mocks';

const handlers = [
  rest.get(`ttp://localhost:4000/movies`, (req, res, ctx) => {
    const mockApiResponse = {"totalAmount":3000,"data":MOVIES,"offset":0,"limit":15};

    return res(ctx.status(200), ctx.json(mockApiResponse), ctx.delay(30))
  }),
];

export { handlers };
