export function getImage(item:any){
  return (
    item.image?.find((i:any)=>i.quality==="500x500")?.link ||
    item.image?.find((i:any)=>i.quality==="500x500")?.url ||
    item.image?.[2]?.link ||
    item.image?.[2]?.url ||
    item.image?.[1]?.link ||
    item.image?.[1]?.url ||
    item.image?.[0]?.link ||
    item.image?.[0]?.url ||
    "https://via.placeholder.com/100"
  );
}