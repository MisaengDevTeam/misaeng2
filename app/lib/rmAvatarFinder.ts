export default function rmAvatarFinder(gender: string, status: string) {
  switch (`${gender}${status}`) {
    case '남자학생':
      return '/assets/images/avatar/rm_avatar/male_student_transparent.png';
    case '남자직장인':
      return '/assets/images/avatar/rm_avatar/male_professional_transparent.png';
    case '남자비공개':
      return '/assets/images/avatar/rm_avatar/male_visitor_transparent.png';
    case '여자학생':
      return '/assets/images/avatar/rm_avatar/female_student_transparent.png';
    case '여자직장인':
      return '/assets/images/avatar/rm_avatar/female_professional_transparent.png';
    case '여자비공개':
      return '/assets/images/avatar/rm_avatar/female_visitor_transparent.png';
    default:
      return '';
  }
}
