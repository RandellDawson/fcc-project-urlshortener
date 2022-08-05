import { customAlphabet } from 'nanoid';
import Url from '../models/url.js'
import dns from 'dns';
import { URL } from 'url';

const dnsPromises = dns.promises;
const nanoid = customAlphabet('1234567890abcdefgh', 8);

const errResponse = { error: 'invalid url' };

const isValidUrl = async (url) => {
  const urlObj = new URL(url);
  const { hostname, protocol } = urlObj;
  try {
    const dnsLookup = await dnsPromises.lookup(hostname);
    return /^https?:/.test(protocol) && dnsLookup;
  }
  catch(err) {
    return false;
  }
};

const processUrl = async (req, res, next) => {
  const { url } = req.body;
  const existingId = await findExistingUrl(url);
  const _id = existingId ?? nanoid();
  const newUrl = `${process.env.BASE_URL}/api/shorturl/${_id}`;

  try {
    if (!(await isValidUrl(url))) {
      res.json(errResponse);
      return;
    }

    if (!existingId) {
      const shortUrlRecord = new Url({
        _id,
        originalUrl: url
      });
      await shortUrlRecord.save();
    }
    res.json({ original_url: url, short_url: _id, newUrl });
  }
  catch (err) {
    res.json(errResponse);
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