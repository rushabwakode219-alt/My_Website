const fs=require("fs"),path=require("path"),sharp=require("sharp");
const SOURCE=path.join(__dirname,"..","assets","images-source"),OUT=path.join(__dirname,"..","assets","images");
const SUPPORTED=new Set([".jpg",".jpeg",".png",".webp",".avif",".gif",".tif",".tiff",".bmp",".heic",".heif"]),SIZES=[480,768,1200,1920],quality=82;
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>{const p=path.join(dir,e.name);return e.isDirectory()?walk(p):[p]})}
(async()=>{let files=walk(SOURCE).filter(f=>SUPPORTED.has(path.extname(f).toLowerCase())),processed=0,failed=0,originalBytes=0,outputBytes=0;
for(const file of files){const rel=path.relative(SOURCE,file),base=path.basename(file,path.extname(file)),outDir=path.join(OUT,path.dirname(rel));fs.mkdirSync(outDir,{recursive:true});originalBytes+=fs.statSync(file).size;
try{const meta=await sharp(file).metadata();for(const width of SIZES.filter(w=>w<=Math.max(meta.width||1920,480))){const target=path.join(outDir,`${base}-${width}.webp`);await sharp(file).resize({width,withoutEnlargement:true}).webp({quality}).toFile(target);outputBytes+=fs.statSync(target).size}const main=path.join(outDir,`${base}.webp`);await sharp(file).webp({quality}).toFile(main);outputBytes+=fs.statSync(main).size;processed++}catch(e){failed++;console.error(`FAILED: ${rel} — ${e.message}`)}}
console.log(`\nImage Optimization Complete\nProcessed: ${processed}\nFailed: ${failed}\nOriginal Size: ${(originalBytes/1048576).toFixed(2)} MB\nOptimized Size: ${(outputBytes/1048576).toFixed(2)} MB`)})()
