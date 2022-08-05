import { customAlphabet } from 'nanoid';
import Url from './../models/url.js'

const nanoid = customAlphabet('1234567890abcdefgh', 8);

const processUrl = async (req, res, next) => {
  const { url } = req.body;
  const existingId = await findExistingUrl(url);
  const _id = existingId ?? nanoid();
  const newUrl = `${process.env.BASE_URL}/api/shorturl/${_id}`;
  try {
    if (!existingId) {
      const shortUrlRecord = new Url({
        _id,
        originalUrl: url
      });
      const saveRecord = await shortUrlRecord.save();
    }
    res.json({ original_url: url, short_url: _id, newUrl });
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

const findExistingUrl = async (url) => {
  const urlRecord = await Url.findOne({ originalUrl: url }).exec();
  if (urlRecord) {
    const { _id } = urlRecord;
    return _id;
  }
  return null;
};


export {
  processUrl,
  findId,
  findExistingUrl
};