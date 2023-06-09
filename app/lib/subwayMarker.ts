export default function subwayMarker(line: string) {
  let defaultCSS = `flex justify-center items-center font-semibold w-[24px] h-[24px] rounded-full text-[16px] `;
  switch (line) {
    case '1':
    case '2':
    case '3':
      defaultCSS += `bg-[#EE352E] text-[#fff] `;
      break;
    case '4':
    case '5':
    case '6':
      defaultCSS += `bg-[#00933C] text-[#fff] `;
      break;
    case '7':
      defaultCSS += `bg-[#B933AD] text-[#fff] `;
      break;
    case 'A':
    case 'C':
    case 'E':
      defaultCSS += `bg-[#0039A6] text-[#fff] `;
      break;
    case 'B':
    case 'D':
    case 'F':
    case 'M':
      defaultCSS += `bg-[#FF6319] text-[#fff] `;
      break;
    case 'G':
      defaultCSS += `bg-[#6CBE45] text-[#fff] `;
      break;
    case 'L':
      defaultCSS += `bg-[#A7A9AC] text-[#fff] `;
      break;
    case 'J':
    case 'Z':
      defaultCSS += `bg-[#996633] text-[#fff] `;
      break;
    case 'N':
    case 'Q':
    case 'R':
    case 'W':
      defaultCSS += `bg-[#FCCC0A] text-[#000] `;
      break;
    default:
      defaultCSS += `bg-[#00ADD0] text-[#fff] `;
      break;
  }
  return defaultCSS;
}
