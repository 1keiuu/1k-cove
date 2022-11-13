import * as functions from 'firebase-functions';
const cors = require('cors')({ origin: true });

export const getOgpInfo = functions
  .region('asia-northeast1')
  .https.onRequest((req: any, res: any) => {
    return cors(req, res, async () => {
      res.set('Access-Control-Allow-Origin', '*');
      res.set('Access-Control-Allow-Methods', 'POST');
      res.set('Access-Control-Allow-Headers', 'Content-Type');
      res.set('Access-Control-Max-Age', '3600');

      const cheerio = require('cheerio');
      const request = require('request');
      const url = req.body.data.url;
      await request(url, (e: any, _res: any, html: any) => {
        if (e) {
          console.error(e);
        }
        try {
          const ogp = {
            src: url,
            title: '',
            description: '',
            imgSrc: '',
          };
          const $ = cheerio.load(html);
          ogp.title = $('title').text();
          if ($("meta[property='og:image']").attr('content')) {
            ogp.imgSrc = $("meta[property='og:image']").attr('content');
          } else {
            ogp.imgSrc =
              'https://storage.googleapis.com/portfolio21-56e7e.appspot.com/articles/placeholder/lazy_with_icon.png';
          }
          ogp.description =
            $("meta[name='og:description']").attr('content') ||
            $("meta[name='description']").attr('content') ||
            $("meta[name='zenn:description']").attr('content');

          res.send({
            status: 200,
            data: {
              ogp: ogp,
            },
          });
        } catch (e) {
          res.status(500).send({ error: e });
        }
      });
    });
  });
