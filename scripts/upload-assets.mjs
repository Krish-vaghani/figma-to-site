/**
 * Uploads all images from src/assets to S3 via Vedify API and writes URL map to src/generated-asset-urls.json
 * Run: node scripts/upload-assets.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const ASSETS_DIR = path.join(ROOT, "src", "assets");

const API_URL = "https://devapi.vedify.app/api/v1/assets/upload";
const BEARER =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjk2MDljZmZkOTI2ZGRhNDU2YjI2OWJjIiwiaWF0IjoxNzY3OTM5NTg2LCJleHAiOjE3OTk0NzU1ODZ9.xrbkW-zZmt0eLAflppUFkYwwLCjCGVQO37Ye7FTW2qA";

const IMAGE_EXT = /\.(png|jpg|jpeg|svg|gif|webp)$/i;

async function uploadFile(filePath) {
  const filename = path.basename(filePath);
  const blob = new Blob([fs.readFileSync(filePath)]);
  const form = new FormData();
  form.append("file", blob, filename);

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${BEARER}`,
    },
    body: form,
  });

  const json = await res.json();
  if (json.status !== 200 || !json.data?.url) {
    throw new Error(`Upload failed for ${filename}: ${JSON.stringify(json)}`);
  }
  return json.data.url;
}

function getUrlsKey(filename) {
  const map = {
    "avatar.jpg": "avatar",
    "avatar-female.png": "avatarFemale",
    "avatar-male.jpg": "avatarMale",
    "category-clutches.png": "categoryClutches",
    "category-mini.png": "categoryMini",
    "category-sling.png": "categorySling",
    "category-tote.png": "categoryTote",
    "elevate-1.png": "elevate1",
    "elevate-2.png": "elevate2",
    "elevate-3.png": "elevate3",
    "elevate-4.png": "elevate4",
    "footer-background.png": "footerBackground",
    "Frame 2147226348.png": "instagramBackground",
    "Frame 2147226358.png": "aboutUsBackground",
    "hero-background.png": "heroBackground",
    "hero-product.jpg": "heroProduct",
    "instagram-background.png": "instagramBackgroundLegacy",
    "leaf-decoration.svg": "leafDecoration",
    "logo.png": "logo",
    "product-1.png": "product1",
    "product-2.png": "product2",
    "product-3.png": "product3",
    "product-4.png": "product4",
    "shop-background.png": "shopBackground",
    "testimonials-card-bg.png": "testimonialCardBg",
  };
  return map[filename] || filename.replace(/\.[^.]+$/, "").replace(/[- ]/g, "");
}

async function main() {
  const files = fs.readdirSync(ASSETS_DIR).filter((f) => IMAGE_EXT.test(f));
  const urlMap = {};
  const urlByKey = {};

  for (const file of files) {
    const filePath = path.join(ASSETS_DIR, file);
    if (!fs.statSync(filePath).isFile()) continue;
    try {
      const url = await uploadFile(filePath);
      urlMap[file] = url;
      urlByKey[getUrlsKey(file)] = url;
      console.log(`Uploaded: ${file} -> ${url}`);
    } catch (err) {
      console.error(`Error uploading ${file}:`, err.message);
    }
  }

  const outPath = path.join(ROOT, "src", "generated-asset-urls.json");
  fs.writeFileSync(outPath, JSON.stringify({ byFile: urlMap, byKey: urlByKey }, null, 2));
  console.log(`\nWrote ${outPath}`);
}

main();
