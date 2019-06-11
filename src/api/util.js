import md5 from "blueimp-md5";

export function genKey(token, uid, time) {
  let digest = [];
  for (let i = 0; i < 8; i++) digest.push(token[i * 4 + (time % 4)]);
  let orig = [digest.join(""), uid.toString(), time.toString()].join("");
  console.log(orig);
  return md5(orig);
}
