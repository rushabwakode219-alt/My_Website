const fs=require("fs"),path=require("path"),{spawnSync}=require("child_process");
const SOURCE=path.join(__dirname,"..","assets","videos-source"),OUT=path.join(__dirname,"..","assets","videos");
const SUPPORTED=new Set([".mp4",".webm",".mov",".m4v",".avi",".mkv",".mpeg",".mpg",".ogv",".3gp"]);
const files=fs.readdirSync(SOURCE).filter(f=>SUPPORTED.has(path.extname(f).toLowerCase()));fs.mkdirSync(OUT,{recursive:true});
let processed=0,failed=0;for(const file of files){const input=path.join(SOURCE,file),base=path.basename(file,path.extname(file)),size=fs.statSync(input).size;
if(size>500*1024*1024)console.warn(`WARNING: ${file} is ${(size/1073741824).toFixed(2)} GB. Consider compressing/resizing before deployment.`);
let r=spawnSync("ffmpeg",["-y","-i",input,"-c:v","libx264","-crf","23","-preset","medium","-c:a","aac","-b:a","128k","-movflags","+faststart",path.join(OUT,base+".mp4")],{stdio:"inherit"});
if(r.status!==0){failed++;console.error(`FAILED: ${file}`);continue}
r=spawnSync("ffmpeg",["-y","-i",input,"-c:v","libvpx-vp9","-crf","32","-b:v","0","-c:a","libopus",path.join(OUT,base+".webm")],{stdio:"inherit"});
if(r.status!==0)console.warn(`WebM conversion skipped: ${file}`);processed++}
console.log(`\nVideo Optimization Complete\nProcessed: ${processed}\nFailed: ${failed}\nIf FFmpeg is missing, install it and add it to PATH.`)
