export default function subwayMarker(line: string) {
  let defaultCSS = `flex justify-center items-center font-bold w-[24px] h-[24px] rounded-full `;
  switch (line) {
    case '1':
    case '2':
    case '3':
      defaultCSS += `bg-[#EE352E] text-white`;
      break;
    case '4':
    case '5':
    case '6':
      defaultCSS += `bg-[#00933C] text-white`;
      break;
    case '7':
      defaultCSS += `bg-[#B933AD] text-white`;
      break;
    case 'A':
    case 'C':
    case 'E':
      defaultCSS += `bg-[#0039A6] text-white`;
      break;
    case 'B':
    case 'D':
    case 'F':
    case 'M':
      defaultCSS += `bg-[#FF6319] text-white`;
      break;
    case 'G':
      defaultCSS += `bg-[#6CBE45] text-white`;
      break;
    case 'L':
      defaultCSS += `bg-[#A7A9AC] text-white`;
      break;
    case 'J':
    case 'Z':
      defaultCSS += `bg-[#996633] text-white`;
      break;
    case 'N':
    case 'Q':
    case 'R':
    case 'W':
      defaultCSS += `bg-[#FCCC0A] text-black`;
      break;
    default:
      defaultCSS += `bg-[#00ADD0] text-white`;
      break;
  }
  return defaultCSS;
}
