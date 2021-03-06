const auth = require('../src/utils/auth');
const client = require('../src/utils/client');
const cleaner = require('../src/textmining/cleaner');

const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const csvWriter = createCsvWriter({
   path: 'out.csv',
   append: true,
   header: [
      { id: 'username', title: 'username' },
      { id: 'tweet', title: 'tweet' },
      { id: 'id', title: 'id' },
      { id: 'date', title: 'date' },
   ],
});
async function collect(url = '', classify = '') {
   const id = url.split('/').pop();
   const T = client();
   try {
      const { data } = await T.get('statuses/show', {
         id: id,
         tweet_mode: 'extended',
      });
      console.log(data);

      const tweet = [
         {
            username: data.user.screen_name,
            tweet: data.full_text,
            id: data.id,
            date: Date.now(),
         },
      ];
      await csvWriter.writeRecords(tweet);
      console.log('The CSV file was written successfully');
   } catch (error) {
      console.log(error);
   }
}

collect(
   'https://twitter.com/akunusam/status/1326942545415266304?s=20',
   'bingung'
);
