import { customAlphabet } from 'nanoid';
import Url from './../models/url.js'

const nanoid = customAlphabet('1234567890abcdefgh', 8);


const processUrl = async (req, res, next) => {
  const { url } = req.body;

  const _id = nanoid();
  const newUrl = `${process.env.BASE_URL}/api/shorturl/${_id}`;
  const shortUrlRecord = new Url({
    _id,
    originalUrl: url
  });

  try {
    const saveRecord = await shortUrlRecord.save();
    const { originalUrl: original_url, _id: short_url } = saveRecord;
    res.json({ original_url, short_url, newUrl });
  }
  catch (err) {
    console.log(err);
    next();
  };
};

const findId = async (req, res, next) => {
  const { shortId } = req.params;
  const urlRecord = await Url.findById(shortId);
  if (urlRecord) {
    const { originalUrl } = urlRecord;
    res.redirect(originalUrl);
  }
  else {
    res.json({ "error": "No short URL found for the given input" });
  }
};


export { processUrl, findId };