import crypto from "crypto";

export const generateCloudinarySignature = (req, res) => {
  const { public_id, timestamp, folder } = req.body;

  if (!public_id || !timestamp || !folder) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const paramsToSign = {
    folder,
    public_id,
    timestamp,
  };

  const sortedParams = Object.keys(paramsToSign)
    .sort()
    .map((key) => `${key}=${paramsToSign[key]}`)
    .join("&");

  const signature = crypto
    .createHash("sha1")
    .update(sortedParams + process.env.CLOUDINARY_API_SECRET)
    .digest("hex");

  return res.json({ signature });
};
