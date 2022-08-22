import { rest } from 'msw';

const handlers = [
  rest.get(`${process.env.API_URL}/movies/406997`, (req, res, ctx) => {
    const mockApiResponse = {
      id: 406997,
      title: 'Wonder',
      tagline: 'Are you ready to meet Auggie Pullman?',
      vote_average: 8.2,
      vote_count: 1620,
      release_date: '2017-11-13',
      poster_path: 'https://image.tmdb.org/t/p/w500/ouYgAatYH4JzIThj6FI3UYf31RI.jpg',
      overview: 'The story of August Pullman – a boy with facial differences – who enters fifth grade, attending a mainstream elementary school for the first time.',
      budget: 20000000,
      revenue: 0,
      genres: ['Drama', 'Family'],
      runtime: 113
    };
    return res(ctx.json(mockApiResponse));
  }),
];

export { handlers };
